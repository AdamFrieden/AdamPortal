import React, { useState, useCallback, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    DropAnimation,
    defaultDropAnimationSideEffects,
    UniqueIdentifier,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
    Active,
    Over,
    CollisionDetection,
    getFirstCollision,
    pointerWithin,
    rectIntersection,
    Modifiers,
    useDroppable,
} from '@dnd-kit/core';
import {
    SortableContext,
    useSortable,
    arrayMove,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    horizontalListSortingStrategy,
    rectSortingStrategy,
    SortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, CircularProgress, Typography, Paper, Button, useTheme, alpha } from '@mui/material';

// Generic Components
import { DraggableListContainer, DraggableListContainerProps } from './DraggableListContainer';
import { DraggableListItem, DraggableListItemProps } from './DraggableListItem';

// --- Constants ---
const PLACEHOLDER_ID = 'dnd-placeholder';
const TRASH_ID = 'dnd-trash'; // Optional trash droppable

// --- Types ---
// Export the Items interface for use in parent components
export interface Items {
    [containerId: string]: string[];
}

// Example data structure - Replace with your actual data type
interface ExampleItemData {
    name: string;
    power?: number;
    description?: string;
}

interface MultipleDraggableListsProps {
    initialItems?: Items;
    itemData?: Record<string, ExampleItemData>; // Pass specific data keyed by item ID
    containerLabels?: Record<string, string>; // Optional labels for containers
    isLoading?: boolean;
    vertical?: boolean; // Layout direction for containers
    itemHandle?: boolean; // Use handles for items?
    containerHandle?: boolean; // Use handles for containers?
    itemStrategy?: SortingStrategy; // Strategy for items within containers
    containerStrategy?: SortingStrategy; // Strategy for sorting containers
    scrollableContainers?: boolean;
    trashableItems?: boolean;
    onItemsChange?: (items: Items) => void; // Callback for state changes
    onContainersChange?: (containers: string[]) => void; // Callback for container order change
    adjustScale?: boolean;
    modifiers?: Modifiers; // Use Modifiers type
}

const dropAnimationConfig: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: { opacity: '0.5' },
        },
    }),
};

// --- Main Component ---
export const MultipleDraggableLists = ({
    initialItems,
    itemData = {},
    containerLabels = {},
    isLoading = false,
    vertical = false,
    itemHandle = false,
    containerHandle = false,
    itemStrategy = verticalListSortingStrategy,
    containerStrategy = rectSortingStrategy,
    scrollableContainers = false,
    trashableItems = false,
    onItemsChange,
    onContainersChange,
    adjustScale = false,
    modifiers,
}: MultipleDraggableListsProps) => {
    const defaultItems = {
        List1: ['1', '2', '3'],
        List2: ['4', '5', '6'],
    };
    const [items, setItems] = useState<Items>(initialItems ?? defaultItems);
    const [containers, setContainers] = useState<string[]>(Object.keys(items));
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [activeIsContainer, setActiveIsContainer] = useState(false);
    const lastOverId = useRef<UniqueIdentifier | null>(null); // Keep track of the last valid overId
    const recentlyMovedToNewContainer = useRef(false); // Flag for collision strategy

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const findContainer = useCallback((id: UniqueIdentifier): string | null => {
        const idStr = id.toString();
        if (containers.includes(idStr)) {
            return idStr;
        }
        return Object.keys(items).find(key => items[key].includes(idStr)) || null;
    }, [items, containers]);

    const getActiveItemData = () => {
        if (!activeId || activeIsContainer) return null;
        return itemData[activeId.toString()];
    };

    const getActiveContainerItems = () => {
        if (!activeId || !activeIsContainer) return [];
        return items[activeId.toString()] || [];
    };

    // Drag Handlers
    const handleDragStart = useCallback(({ active }: DragStartEvent) => {
        setActiveId(active.id);
        setActiveIsContainer(containers.includes(active.id.toString()));
        recentlyMovedToNewContainer.current = false; // Reset flag
    }, [containers]);

    // This strategy is simplified; the original had more complex logic for rect intersections
    // You might need to adapt based on exact requirements and layout.
    const collisionDetectionStrategy: CollisionDetection = useCallback(
        (args) => {
          if (activeId && activeIsContainer) {
            return closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) => container.id in items || container.id === PLACEHOLDER_ID
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
              return intersections; // Allow dropping on trash
            }

            // If over a container, check if items can be dropped into it
            if (overId in items) {
              const containerItems = items[overId.toString()] || [];
              // If the container is empty or items can be dropped into it (e.g., based on rules)
              // Refine logic: use closestCenter for items within the container
               if (containerItems.length > 0) {
                  overId = closestCenter({
                    ...args,
                    droppableContainers: args.droppableContainers.filter(
                      (container) =>
                        container.id !== overId &&
                        containerItems.includes(container.id.toString())
                    ),
                  })[0]?.id ?? overId; // Fallback to container ID if no item is close
               }
            }

            lastOverId.current = overId;
            return [{ id: overId }];
          }

          // If no droppable is matched, return the last match
          return lastOverId.current ? [{ id: lastOverId.current }] : [];
        },
        [activeId, items, activeIsContainer]
      );


    const handleDragOver = useCallback(({ active, over }: DragOverEvent) => {
        const overId = over?.id;
        if (!overId || overId === TRASH_ID || !activeId || activeIsContainer) {
            return; // Don't process if not over a valid target, or if dragging a container
        }

        const activeIdStr = active.id.toString();
        const overIdStr = overId.toString();

        const activeContainer = findContainer(activeIdStr);
        const overContainer = findContainer(overIdStr);

        if (!activeContainer || !overContainer || activeContainer === overContainer) {
            return; // Item sorting within containers is handled by SortableContext in handleDragEnd
        }

        // Logic for moving item between containers
        setItems((prevItems) => {
            const activeItems = prevItems[activeContainer] ?? [];
            const overItems = prevItems[overContainer] ?? [];
            const activeIndex = activeItems.indexOf(activeIdStr);
            const overIndex = overItems.indexOf(overIdStr); // Index of the item being hovered over

            if (activeIndex === -1) return prevItems; // Item not found in source container

            let newIndexInOver: number; // Correctly declare variable

            // Determine insertion index in the destination container
            if (overIdStr in prevItems) { // Dropping directly onto the container ID
                newIndexInOver = overItems.length; // Append to the end
            } else { // Dropping onto an existing item within the container
                 const isBelowOverItem = over && active.rect.current.translated && over.rect.top && over.rect.height &&
                    active.rect.current.translated.top > over.rect.top + over.rect.height / 2;

                 newIndexInOver = overIndex >= 0
                    ? overIndex + (isBelowOverItem ? 1 : 0) // Insert after or before the hovered item
                    : overItems.length; // Append if overIndex is -1 (e.g., hovering empty space?)
            }

            recentlyMovedToNewContainer.current = true; // Set flag for collision strategy

            return {
                ...prevItems,
                [activeContainer]: activeItems.filter((item) => item !== activeIdStr),
                [overContainer]: [
                    ...overItems.slice(0, newIndexInOver),
                    activeIdStr, // Insert the item
                    ...overItems.slice(newIndexInOver),
                ],
            };
        });
    }, [activeId, activeIsContainer, findContainer]); // Removed items dependency to avoid potential loop with setItems


    const handleDragEnd = useCallback(({ active, over }: DragEndEvent) => {
        if (!over) {
            setActiveId(null);
            return;
        }

        const activeIdStr = active.id.toString();
        const overIdStr = over.id.toString();

        // Handle Container Sorting
        if (activeIsContainer && overIdStr !== activeIdStr && containers.includes(overIdStr)) {
             const oldIndex = containers.indexOf(activeIdStr);
             const newIndex = containers.indexOf(overIdStr);
             if (oldIndex !== newIndex) {
                const newContainerOrder = arrayMove(containers, oldIndex, newIndex);
                setContainers(newContainerOrder);
                onContainersChange?.(newContainerOrder);
             }
             setActiveId(null);
             return;
        }

        // Handle Item Sorting or Moving
        if (!activeIsContainer) {
            const activeContainer = findContainer(activeIdStr);
            // If dropping on trash, overContainer is the active one. Otherwise, find container of overId.
            const overContainer = overIdStr === TRASH_ID ? activeContainer : findContainer(overIdStr);

            if (!activeContainer || !overContainer) {
                setActiveId(null); // Could not find containers
                return;
            }

            // Handle dropping onto Trash
            if (overIdStr === TRASH_ID && trashableItems) {
                setItems(prev => ({
                    ...prev,
                    [activeContainer]: (prev[activeContainer] ?? []).filter(id => id !== activeIdStr)
                }));
                onItemsChange?.(items); // Propagate change
                setActiveId(null);
                return;
            }

             // Handle dropping onto Placeholder to create new container
             if (overIdStr === PLACEHOLDER_ID) {
                const newContainerId = `NewContainer-${Date.now()}`;
                setContainers((prev) => [...prev, newContainerId]);
                setItems((prev) => ({
                    ...prev,
                    [activeContainer]: (prev[activeContainer] ?? []).filter(id => id !== activeIdStr),
                    [newContainerId]: [activeIdStr]
                }));
                 onContainersChange?.(containers);
                 onItemsChange?.(items);
                setActiveId(null);
                return;
             }

            const activeIndex = (items[activeContainer] ?? []).indexOf(activeIdStr);
            // Determine overIndex carefully: could be item or container
            const overIsDirectlyContainer = overIdStr in items;
            const overIndex = overIsDirectlyContainer
                ? (items[overContainer] ?? []).length // Dropped on container -> append
                : (items[overContainer] ?? []).indexOf(overIdStr); // Dropped on item -> find index

            if (activeIndex === -1) {
                 setActiveId(null); // Item not found, bail out
                 return;
            }

            if (activeContainer === overContainer) {
                // Sort within the same container
                if (activeIndex !== overIndex && overIndex !== -1) { // Ensure overIndex is valid for arrayMove
                    setItems(prev => ({
                        ...prev,
                        [overContainer]: arrayMove(prev[overContainer] ?? [], activeIndex, overIndex)
                    }));
                     onItemsChange?.(items); // Propagate change
                }
            } else {
                 // Moved between containers - state already updated in handleDragOver
                 // Just trigger the callback
                 onItemsChange?.(items); // Propagate change
            }
        }

        setActiveId(null);
        setActiveIsContainer(false);
    }, [activeIsContainer, containers, findContainer, items, trashableItems, onItemsChange, onContainersChange]); // Added items dependency back carefully

    const handleAddContainer = () => {
        const newId = `NewContainer-${Date.now()}`;
        setContainers(prev => [...prev, newId]);
        setItems(prev => ({ ...prev, [newId]: [] }));
    };

    const handleRemoveItem = (containerId: string, itemId: string) => {
        setItems(prev => ({
            ...prev,
            [containerId]: (prev[containerId] ?? []).filter(id => id !== itemId)
        }));
         onItemsChange?.(items);
    }

    const handleRemoveContainer = (containerId: string) => {
        // Consider what happens to items in the removed container
        setContainers(prev => prev.filter(id => id !== containerId));
        setItems(prev => {
            const newItems = { ...prev };
            delete newItems[containerId];
            return newItems;
        });
         onContainersChange?.(containers);
         onItemsChange?.(items);
    }

    // Render Overlays
    const renderItemOverlay = (id: UniqueIdentifier) => {
        const data = itemData[id.toString()];
        return (
            // Use DraggableListItem directly for the overlay representation
            <DraggableListItem id={id.toString()} dragOverlay handle={itemHandle}>
                {/* Render overlay content based on data */}
                <Typography variant="body1">{data?.name ?? `Item ${id}`}</Typography>
                {data?.power != null && <Typography variant="caption">Power: {data.power}</Typography>}
            </DraggableListItem>
        );
    }

    const renderContainerOverlay = (id: UniqueIdentifier) => {
        const idStr = id.toString();
        return (
            // Use DraggableListContainer for overlay, does not need id prop here
            <DraggableListContainer
                label={containerLabels[idStr] ?? idStr}
                elevation={8} // Example overlay elevation
                handleProps={containerHandle ? {} : undefined} // Indicate handle presence if needed
            >
                {/* Render placeholder items or basic representation */}
                {(items[idStr] ?? []).map(itemId => {
                    const data = itemData[itemId];
                    // Use DraggableListItem for items within the container overlay
                    return (
                        <DraggableListItem key={itemId} id={itemId} handle={itemHandle}>
                            {/* Render items within overlay container */}
                            <Typography variant="body1">{data?.name ?? `Item ${itemId}`}</Typography>
                            {data?.power != null && <Typography variant="caption">Power: {data.power}</Typography>}
                        </DraggableListItem>
                    );
                })}
            </DraggableListContainer>
        )
    }

     // Reset moved state after drag ends, possibly after animation
     useEffect(() => {
        if (!activeId) {
          recentlyMovedToNewContainer.current = false;
        }
      }, [activeId]);


    // --- JSX ---
    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={collisionDetectionStrategy}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            modifiers={modifiers} // Apply modifiers if provided
        >
            <Box
                sx={{
                    display: 'inline-grid',
                    boxSizing: 'border-box',
                    p: 2,
                    gridAutoFlow: vertical ? 'row' : 'column',
                    gap: 2,
                }}
            >
                <SortableContext items={[...containers, PLACEHOLDER_ID]} strategy={containerStrategy}>
                    {containers.map(containerId => (
                        <SortableContainer
                            key={containerId}
                            id={containerId} // ID for useSortable
                            label={containerLabels[containerId] ?? containerId}
                            items={items[containerId] ?? []}
                            itemData={itemData}
                            itemStrategy={itemStrategy}
                            itemHandle={itemHandle}
                            containerHandle={containerHandle}
                            scrollable={scrollableContainers}
                            onRemoveContainer={() => handleRemoveContainer(containerId)}
                            onRemoveItem={(itemId) => handleRemoveItem(containerId, itemId)}
                            // Pass other relevant DraggableListContainerProps if needed
                        />
                    ))}
                    {/* Placeholder - Not sortable, just for adding. */}
                     <DraggableListContainer
                        // No id prop needed here
                        onClick={handleAddContainer}
                        placeholder
                        label="+ Add List"
                        sx={{ height: '100%' }} // Ensure placeholder takes space
                        children={null} // Explicitly pass null children
                     />
                </SortableContext>
            </Box>

            {trashableItems && <TrashDroppable id={TRASH_ID} active={!!activeId && !activeIsContainer} />}

            {createPortal(
                <DragOverlay adjustScale={adjustScale} dropAnimation={dropAnimationConfig}>
                    {activeId
                        ? (activeIsContainer ? renderContainerOverlay(activeId) : renderItemOverlay(activeId))
                        : null}
                </DragOverlay>,
                document.body
            )}
        </DndContext>
    );
};

// --- Sortable Wrapper Components ---

interface SortableContainerProps extends Omit<DraggableListContainerProps, 'children' | 'style'> { // Exclude style, children is handled internally
    id: string; // ID for useSortable
    items: string[];
    itemData: Record<string, ExampleItemData>;
    itemStrategy: SortingStrategy;
    itemHandle?: boolean;
    containerHandle?: boolean;
    onRemoveContainer?: () => void;
    onRemoveItem?: (itemId: string) => void;
}

const SortableContainer = React.memo<SortableContainerProps>(({
    id, items, label, itemData, itemStrategy, itemHandle, containerHandle, scrollable, onRemoveContainer, onRemoveItem, ...props
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef, // Use for handle
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: id,
        data: { type: 'container', children: items },
    });

    // Apply transform/transition using the component's props, not style
    return (
        <DraggableListContainer
            ref={setNodeRef}
            // No id prop passed to DraggableListContainer itself
            label={label}
            handleProps={containerHandle ? { ref: setActivatorNodeRef, ...attributes, ...listeners } : undefined}
            // Remove direct listeners prop - handled by useSortable + handleProps or setNodeRef
            // listeners={!containerHandle ? listeners : undefined} 
            onRemove={onRemoveContainer}
            scrollable={scrollable}
            sx={{
                transition,
                transform: CSS.Translate.toString(transform),
                opacity: isDragging ? 0.5 : 1,
                ...(props.sx ?? {}) // Merge with any incoming sx props
            }}
            {...props}
        >
            <SortableContext items={items} strategy={itemStrategy}>
                {items.map((itemId) => {
                    const data = itemData[itemId];
                    return (
                        <SortableItem
                            key={itemId}
                            id={itemId}
                            handle={itemHandle}
                            onRemove={() => onRemoveItem?.(itemId)}
                        >
                            {/* Render actual item content */}
                            <Typography variant="body1">{data?.name ?? `Item ${itemId}`}</Typography>
                            {data?.power != null && <Typography variant="caption">Power: {data.power}</Typography>}
                        </SortableItem>
                    );
                })}
            </SortableContext>
        </DraggableListContainer>
    );
});
SortableContainer.displayName = 'SortableContainer';


interface SortableItemProps {
    id: string;
    handle?: boolean;
    children: React.ReactNode;
    onRemove?: () => void;
}

// Define SortableItem once
const SortableItem = ({ id, handle, children, onRemove }: SortableItemProps) => {
    const {
        attributes, // Ensure attributes is destructured
        listeners,
        setNodeRef,
        setActivatorNodeRef, // Use this for the handle
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    // Pass transform and transition, not a style object
    return (
        <DraggableListItem
            ref={setNodeRef}
            id={id} // Pass id to DraggableListItem
            dragging={isDragging}
            handle={handle}
            handleProps={handle ? { ref: setActivatorNodeRef, ...attributes, ...listeners } : undefined}
            listeners={!handle ? listeners : undefined}
            onRemove={onRemove}
            transform={transform} // Pass transform prop
            transition={transition} // Pass transition prop
        >
            {children}
        </DraggableListItem>
    );
};


// --- Optional Trash Droppable ---
const TrashDroppable = ({ id, active }: { id: UniqueIdentifier, active: boolean }) => {
    const { setNodeRef, isOver } = useDroppable({ id });
    const theme = useTheme(); // Correctly use hook

    return (
        <Paper
            ref={setNodeRef}
            elevation={2}
            sx={{
                p: 2,
                mt: 2,
                textAlign: 'center',
                borderColor: isOver ? theme.palette.error.main : 'transparent',
                borderWidth: 2,
                borderStyle: 'dashed',
                transition: 'border-color 0.2s ease-in-out',
                backgroundColor: isOver ? alpha(theme.palette.error.light, 0.1) : undefined, // Use alpha
                opacity: active ? 1 : 0.5,
            }}
        >
            <Typography color={isOver ? 'error' : 'textSecondary'}>Drop here to delete</Typography>
        </Paper>
    );
};
