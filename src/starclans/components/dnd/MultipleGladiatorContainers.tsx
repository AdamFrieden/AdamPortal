import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal, unstable_batchedUpdates } from 'react-dom';
import {
    CancelDrop,
    closestCenter,
    pointerWithin,
    rectIntersection,
    CollisionDetection,
    DndContext,
    DragOverlay,
    DropAnimation,
    getFirstCollision,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    Modifiers,
    useDroppable, // Keep for Trash and Placeholder
    UniqueIdentifier,
    useSensors,
    useSensor,
    MeasuringStrategy,
    KeyboardCoordinateGetter,
    defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
    AnimateLayoutChanges,
    SortableContext,
    useSortable,
    arrayMove,
    defaultAnimateLayoutChanges,
    verticalListSortingStrategy,
    SortingStrategy,
    horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Typography, useTheme, alpha } from '@mui/material'; // Added MUI imports
import { coordinateGetter as multipleContainersCoordinateGetter } from './multipleContainersKeyboardCoordinates'; // Keep keyboard nav for now

// Import the NEW Gladiator components
import { GladiatorContainer, GladiatorContainerProps } from './GladiatorContainer';
import { GladiatorItem, GladiatorItemProps } from './GladiatorItem'; // Assuming interface is exported

// Helper function (can be moved later) - might need adaptation depending on ID format
import { createRange } from '../createRange'; // Assuming this exists and is suitable

// --- Constants ---
export const TRASH_ID = 'void';
const PLACEHOLDER_ID = 'placeholder';
const empty: UniqueIdentifier[] = [];

// --- Types ---
type Items = Record<UniqueIdentifier, UniqueIdentifier[]>;

interface MultipleGladiatorContainersProps {
    adjustScale?: boolean;
    cancelDrop?: CancelDrop;
    columns?: number;
    // Removed containerStyle, coordinateGetter (using default), getItemStyles, wrapperStyle, minimal, strategy (using default?)
    coordinateGetter?: KeyboardCoordinateGetter; // Keep coordinateGetter for now
    strategy?: SortingStrategy; // Keep strategy
    itemCount?: number;
    initialItems?: Items; // Renamed from 'items' prop to avoid conflict with state
    handle?: boolean;
    // Removed renderItem - styling is now internal to GladiatorItem
    modifiers?: Modifiers;
    trashable?: boolean;
    scrollable?: boolean;
    vertical?: boolean; // Keep vertical/horizontal layout control
}

// Default animation for drag overlay
const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: {
                opacity: '0.5',
            },
        },
    }),
};

// Default layout animation function
const animateLayoutChanges: AnimateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({ ...args, wasDragging: true });

// --- Main Component ---
export function MultipleGladiatorContainers({
    adjustScale = false,
    itemCount = 3, // Default items per container
    cancelDrop,
    columns,
    handle = false, // Default to no handle for items
    initialItems,
    coordinateGetter = multipleContainersCoordinateGetter,
    strategy = verticalListSortingStrategy,
    modifiers,
    trashable = false,
    vertical = false,
    scrollable,
}: MultipleGladiatorContainersProps) {
    // --- State ---
    const [items, setItems] = useState<Items>(() =>
        initialItems ?? {
            // Example initial state - Adapt ID format if needed
            Squad1: createRange(itemCount, (index) => `G${index + 1}-S1`),
            Squad2: createRange(itemCount, (index) => `G${index + 1}-S2`),
            Bench: createRange(itemCount, (index) => `G${index + 1}-BN`),
        }
    );
    const [containers, setContainers] = useState<UniqueIdentifier[]>(
        Object.keys(items)
    );
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const lastOverId = useRef<UniqueIdentifier | null>(null);
    const recentlyMovedToNewContainer = useRef(false);
    const isSortingContainer = activeId ? containers.includes(activeId) : false;

    // --- Refs and Memos ---
    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter,
        })
    );

    // --- Helper Functions ---
    const findContainer = useCallback((id: UniqueIdentifier) => {
        if (id in items) {
            return id;
        }
        return Object.keys(items).find((key) => items[key].includes(id));
    }, [items]);

    const getIndex = useCallback((id: UniqueIdentifier) => {
        const container = findContainer(id);
        if (!container) {
            return -1;
        }
        return items[container].indexOf(id);
    }, [items, findContainer]);

    // Container ID Generation - consider a more robust method (UUID, counter)
    function getNextContainerId() {
        const containerIds = Object.keys(items);
        // Very basic increment - replace if needed
        const lastId = containerIds[containerIds.length - 1];
        const match = lastId.match(/\d+$/);
        const num = match ? parseInt(match[0], 10) + 1 : 1;
        const prefix = lastId.replace(/\d+$/, '') || 'NewSquad';
        return `${prefix}${num}`;
    }

    // --- Drag Handlers ---

    const collisionDetectionStrategy: CollisionDetection = useCallback(
        (args) => {
            // Reuse the same collision strategy logic for now
            // It might need tweaks depending on visual layout differences
            if (activeId && activeId in items) {
                return closestCenter({
                    ...args,
                    droppableContainers: args.droppableContainers.filter(
                        (container) => container.id in items
                    ),
                });
            }

            const pointerIntersections = pointerWithin(args);
            const intersections =
                pointerIntersections.length > 0
                    ? pointerIntersections
                    : rectIntersection(args);
            let overId = getFirstCollision(intersections, 'id');

            if (overId != null) {
                if (overId === TRASH_ID) {
                    return intersections;
                }

                if (overId in items) {
                    const containerItems = items[overId];
                    if (containerItems.length > 0) {
                        overId = closestCenter({
                            ...args,
                            droppableContainers: args.droppableContainers.filter(
                                (container) =>
                                    container.id !== overId &&
                                    containerItems.includes(container.id)
                            ),
                        })[0]?.id;
                    }
                }

                lastOverId.current = overId;
                return [{ id: overId }];
            }

            if (recentlyMovedToNewContainer.current) {
                lastOverId.current = activeId;
            }

            return lastOverId.current ? [{ id: lastOverId.current }] : [];
        },
        [activeId, items]
    );

    const [clonedItems, setClonedItems] = useState<Items | null>(null);

    const onDragStart = useCallback(({ active }: { active: { id: UniqueIdentifier }}) => {
        setActiveId(active.id);
        setClonedItems(items);
    }, [items]);

    const onDragOver = useCallback(({ active, over }: { active: any, over: any }) => {
        const overId = over?.id;

        if (overId == null || overId === TRASH_ID || active.id in items) {
            return;
        }

        const overContainer = findContainer(overId);
        const activeContainer = findContainer(active.id);

        if (!overContainer || !activeContainer || activeContainer === overContainer) {
            return;
        }

        setItems((prevItems) => {
            const activeItems = prevItems[activeContainer];
            const overItems = prevItems[overContainer];
            const overIndex = overItems.indexOf(overId);
            const activeIndex = activeItems.indexOf(active.id);

            let newIndex: number;

            if (overId in prevItems) {
                // Dropping on container (below last item)
                newIndex = overItems.length; // Changed from length + 1 as index is 0-based
            } else {
                 // Dropping on item
                const isBelowOverItem =
                    over &&
                    active.rect.current.translated &&
                    active.rect.current.translated.top >
                    over.rect.top + over.rect.height / 2; // Adjusted threshold slightly

                const modifier = isBelowOverItem ? 1 : 0;
                newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length; // Ensure dropping at end if index is -1
            }

            recentlyMovedToNewContainer.current = true;

            const itemToMove = prevItems[activeContainer][activeIndex];

            return {
                ...prevItems,
                [activeContainer]: prevItems[activeContainer].filter(
                    (item) => item !== active.id
                ),
                [overContainer]: [
                    ...prevItems[overContainer].slice(0, newIndex),
                    itemToMove,
                    ...prevItems[overContainer].slice(newIndex),
                ],
            };
        });
    }, [activeId, findContainer, items]);


    const onDragEnd = useCallback(({ active, over }: { active: any, over: any }) => {
        if (active.id in items && over?.id) {
            // Handling container sorting
            setContainers((currentContainers) => {
                const activeIndex = currentContainers.indexOf(active.id);
                const overIndex = currentContainers.indexOf(over.id);
                if (activeIndex !== overIndex) {
                    return arrayMove(currentContainers, activeIndex, overIndex);
                }
                return currentContainers;
            });
        }

        const activeContainer = findContainer(active.id);
        if (!activeContainer) {
            setActiveId(null);
            setClonedItems(null);
            return;
        }

        const overId = over?.id;
        if (overId == null) {
            setActiveId(null);
            setClonedItems(null);
            return;
        }

        if (overId === TRASH_ID) {
            setItems((prevItems) => ({
                ...prevItems,
                [activeContainer]: prevItems[activeContainer].filter(
                    (id) => id !== activeId
                ),
            }));
            setActiveId(null);
            setClonedItems(null);
            return;
        }

        if (overId === PLACEHOLDER_ID) {
            const newContainerId = getNextContainerId();
            unstable_batchedUpdates(() => {
                setContainers((currentContainers) => [...currentContainers, newContainerId]);
                setItems((prevItems) => ({
                    ...prevItems,
                    [activeContainer]: prevItems[activeContainer].filter(
                        (id) => id !== activeId
                    ),
                    [newContainerId]: [active.id],
                }));
                setActiveId(null);
                setClonedItems(null);
            });
            return;
        }

        const overContainer = findContainer(overId);
        if (overContainer) {
            const activeIndex = items[activeContainer].indexOf(active.id);
            const overIndex = items[overContainer].indexOf(overId);

            if (activeContainer === overContainer && activeIndex !== overIndex) {
                // Handling item sorting within the same container
                 setItems((prevItems) => ({
                    ...prevItems,
                    [overContainer]: arrayMove(
                        prevItems[overContainer],
                        activeIndex,
                        overIndex
                    ),
                }));
            }
            // Note: Moving between containers is primarily handled in onDragOver now
        }

        setActiveId(null);
        setClonedItems(null);
    }, [activeId, items, findContainer, getNextContainerId]);


    const onDragCancel = useCallback(() => {
        if (clonedItems) {
            setItems(clonedItems);
        }
        setActiveId(null);
        setClonedItems(null);
    }, [clonedItems]);

    useEffect(() => {
        requestAnimationFrame(() => {
            recentlyMovedToNewContainer.current = false;
        });
    }, [items]);

    // --- Render Functions ---

    function renderSortableItemDragOverlay(id: UniqueIdentifier) {
        // Note: The 'value' prop will need to map to actual gladiator data/display
        return (
            <GladiatorItem
                id={id}
                value={id} // Replace with actual gladiator data lookup if needed
                handle={handle}
                // No style props needed unless specific overlay tweaks are required via 'style' or 'sx'
                dragOverlay // Pass dragOverlay prop
            />
        );
    }

    function renderContainerDragOverlay(containerId: UniqueIdentifier) {
        return (
            <GladiatorContainer
                label={`Container ${containerId}`} // Adjust label as needed
                // columns={columns} // Removed columns prop
                elevation={8} // Use elevation instead of shadow (e.g., 8 for high elevation)
                sx={{ height: '100%' }} // Example sx override for overlay
            >
                {items[containerId].map((item, index) => (
                    // Render GladiatorItem for visual representation in overlay
                    <GladiatorItem
                        key={item}
                        id={item}
                        value={item} // Replace with actual gladiator data
                        handle={handle}
                        // No specific item styling needed for overlay items?
                        index={index}
                    />
                ))}
            </GladiatorContainer>
        );
    }

    function handleRemoveContainer(containerID: UniqueIdentifier) {
        // Add logic to handle items in the removed container if necessary (e.g., move to another)
        setContainers((currentContainers) =>
            currentContainers.filter((id) => id !== containerID)
        );
        setItems(currentItems => {
            const {[containerID]: _, ...rest} = currentItems; // Remove container from items state
            return rest;
        });
    }

    function handleAddColumn() {
        const newContainerId = getNextContainerId();
        unstable_batchedUpdates(() => {
            setContainers((currentContainers) => [...currentContainers, newContainerId]);
            setItems((prevItems) => ({
                ...prevItems,
                [newContainerId]: [],
            }));
        });
    }

    // --- JSX ---
    return (
        <DndContext
            sensors={sensors}
            collisionDetection={collisionDetectionStrategy}
            measuring={{
                droppable: {
                    strategy: MeasuringStrategy.Always,
                },
            }}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
            cancelDrop={cancelDrop}
            onDragCancel={onDragCancel}
            modifiers={modifiers}
        >
            {/* Use Box for overall layout instead of custom styled div */}
            <Box
                sx={{
                    display: 'inline-grid', // Use grid for layout
                    boxSizing: 'border-box',
                    p: 2.5, // padding: 20px
                    gridAutoFlow: vertical ? 'row' : 'column',
                }}
            >
                <SortableContext
                    items={[...containers, PLACEHOLDER_ID]}
                    strategy={
                        vertical
                            ? verticalListSortingStrategy
                            : horizontalListSortingStrategy
                    }
                >
                    {containers.map((containerId) => (
                        <SortableGladiatorContainer // Use the new Sortable Container
                            key={containerId}
                            id={containerId}
                            label={`Container ${containerId}`} // Adjust label as needed
                            // columns={columns} // Removed columns prop
                            items={items[containerId]}
                            scrollable={scrollable}
                            handle={true} // Assuming containers should have handles
                            onRemove={() => handleRemoveContainer(containerId)}
                        >
                            <SortableContext items={items[containerId]} strategy={strategy}>
                                {items[containerId].map((value, index) => (
                                    <SortableGladiatorItem // Use the new Sortable Item
                                        key={value}
                                        id={value}
                                        index={index}
                                        handle={handle} // Use item handle setting
                                        value={value} // Pass value/id, replace with real data later
                                        containerId={containerId}
                                        // No getItemStyles/wrapperStyle needed
                                    />
                                ))}
                            </SortableContext>
                        </SortableGladiatorContainer>
                    ))}
                    {/* Placeholder Container */}
                    <SortableGladiatorContainer // Use Gladiator based placeholder
                        id={PLACEHOLDER_ID}
                        disabled={isSortingContainer}
                        items={empty}
                        onClick={handleAddColumn}
                        placeholder
                        // columns={columns} // Removed columns prop
                        label="+ Add Container" // Use label prop for text
                        children={null} // Explicitly pass null children
                    >
                        {/* Placeholder content managed by GladiatorContainer's placeholder prop */}
                    </SortableGladiatorContainer>
                </SortableContext>
            </Box>
            {createPortal(
                <DragOverlay adjustScale={adjustScale} dropAnimation={dropAnimation}>
                    {activeId
                        ? containers.includes(activeId)
                            ? renderContainerDragOverlay(activeId)
                            : renderSortableItemDragOverlay(activeId)
                        : null}
                </DragOverlay>,
                document.body
            )}
            {/* Trash remains mostly the same, styled with MUI Box */}
            {trashable && activeId && !containers.includes(activeId) ? (
                <Trash id={TRASH_ID} />
            ) : null}
        </DndContext>
    );
}

// --- Sortable Wrapper Components ---

// Sortable Wrapper for GladiatorItem
interface SortableGladiatorItemProps {
  containerId: UniqueIdentifier;
  id: UniqueIdentifier;
  index: number;
  handle: boolean;
  disabled?: boolean;
  value: React.ReactNode; // Placeholder for gladiator data
  // Removed style and wrapperStyle props
}

function SortableGladiatorItem({
  id,
  index,
  handle,
  disabled,
  value,
  containerId, // Keep containerId if needed for specific logic, though maybe not for styling now
}: SortableGladiatorItemProps) {
  const {
    setNodeRef,
    setActivatorNodeRef,
    listeners,
    isDragging,
    isSorting,
    transform,
    transition,
  } = useSortable({
    id: id,
    animateLayoutChanges, // Apply layout animation
    disabled,
  });

  // No need for useMountStatus unless specific fadeIn logic requires it beyond basic CSS animation
  // const mounted = useMountStatus();
  // const mountedWhileDragging = isDragging && !mounted;

  return (
    <GladiatorItem
      ref={setNodeRef} // Pass ref to the GladiatorItem
      id={id}
      value={value} // Pass data/placeholder value
      dragging={isDragging}
      sorting={isSorting}
      handle={handle}
      handleProps={handle ? { ref: setActivatorNodeRef } : undefined} // Pass activator ref if handle is used
      index={index}
      // No wrapperStyle needed
      // No style prop needed unless specific overrides needed
      transition={transition}
      transform={transform}
      // fadeIn={mountedWhileDragging} // Remove fadeIn logic tied to mount status for now
      listeners={listeners} // Pass dnd-kit listeners
      disabled={disabled}
    />
  );
}

// Sortable Wrapper for GladiatorContainer
interface SortableGladiatorContainerProps extends GladiatorContainerProps {
    id: UniqueIdentifier;
    items: UniqueIdentifier[];
    disabled?: boolean;
    handle?: boolean; // Add handle prop
}

function SortableGladiatorContainer({
    id,
    items,
    disabled,
    children,
    handle, // Receive handle prop
    ...rest // Pass other GladiatorContainerProps down
}: SortableGladiatorContainerProps) {
    const {
        setNodeRef,
        setActivatorNodeRef, // Get activator ref for handle
        listeners,
        isDragging,
        transform,
        transition,
        attributes, // Get attributes for a11y etc.
    } = useSortable({
        id,
        data: {
            type: 'container',
            children: items,
        },
        animateLayoutChanges, // Apply layout animation
        disabled,
    });

    return (
        <GladiatorContainer
            ref={setNodeRef} // Pass outer ref
            handleProps={handle ? { ref: setActivatorNodeRef, ...attributes, ...listeners } : undefined} // Pass handle props if enabled
            sx={{ // Apply transform/transition styles via sx
                transition,
                transform: CSS.Translate.toString(transform),
                opacity: isDragging ? 0.5 : undefined, // Example: fade container when dragged
            }}
            {...rest} // Pass other props like label, columns, etc.
        >
            {children}
        </GladiatorContainer>
    );
}


// --- Trash Component --- (Styled with MUI)
function Trash({ id }: { id: UniqueIdentifier }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const theme = useTheme();

  return (
    <Box
      ref={setNodeRef}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed', // Keep fixed positioning for now
        left: '50%',
        bottom: 20,
        width: 300,
        height: 60,
        ml: -18.75, // -(width / 2 / 16) rem -> -(300/2)px = -150px
        borderRadius: theme.shape.borderRadius,
        border: '1px solid',
        borderColor: isOver ? theme.palette.error.main : theme.palette.divider,
        bgcolor: isOver ? alpha(theme.palette.error.main, 0.1) : 'background.paper', // Visual feedback on hover
        p: 2,
      }}
    >
      <Typography color={isOver ? theme.palette.error.main : 'text.secondary'}>
          Drop here to delete
      </Typography>
    </Box>
  );
}

// Note: Removed useMountStatus hook as it's not currently used
// Note: Removed getColor function as styling is theme-based 