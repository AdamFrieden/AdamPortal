# Dnd-Kit Multiple Containers Example

This directory contains a comprehensive example demonstrating drag-and-drop functionality across multiple containers using the `@dnd-kit` library. It showcases sorting items within containers, moving items between containers, sorting the containers themselves, and dynamic addition/removal of items and containers.

## Core Library

-   **`@dnd-kit/core`**: Provides the fundamental building blocks like `DndContext`, sensors, collision detection, and drag overlays.
-   **`@dnd-kit/sortable`**: Extends `@dnd-kit/core` with utilities for creating sortable lists and grids, including `SortableContext` and the `useSortable` hook.
-   **`@dnd-kit/utilities`**: Helper functions, including CSS transformations.

## Component Structure

-   **`MultipleContainers.tsx`**:
    -   The main component orchestrating the entire drag-and-drop experience.
    -   Sets up `DndContext` with sensors, custom collision detection, and measuring strategies.
    -   Manages the primary state:
        -   `items`: An object where keys are container IDs and values are arrays of item IDs within that container.
        -   `containers`: An array of container IDs, defining their order.
        -   `activeId`: The ID of the item or container currently being dragged.
        -   `clonedItems`: A temporary copy of `items` used for cancellation logic.
    -   Defines the core event handlers (`onDragStart`, `onDragOver`, `onDragEnd`, `onDragCancel`).
    -   Renders the `SortableContext` for containers and nested `SortableContext` for items within each container.
    -   Utilizes `createPortal` to render the `DragOverlay` outside the main component tree.
    -   Handles dynamic container addition (`handleAddColumn`) and removal (`handleRemove`).
    -   Includes logic for a droppable "trash" area (`TRASH_ID`).
-   **`Container.tsx`**:
    -   Represents a droppable container area.
    -   Can be configured with columns, labels, and styles.
    -   Renders children (usually `SortableItem` components) within a `ul` or directly if it's a placeholder.
    -   Includes optional `Handle` and `Remove` actions in its header.
    -   Uses `classNames` and `Container.module.scss` for styling based on state (hover, placeholder, etc.).
-   **`Item.tsx`**:
    -   Represents a single draggable and sortable item.
    -   Uses the `useSortable` hook (indirectly via `SortableItem` in `MultipleContainers.tsx`) to get properties like `transform`, `transition`, `listeners`, etc.
    -   Applies styles for dragging, sorting, and drag overlay states using `Item.module.scss`.
    -   Can optionally render a `Handle` for dragging.
    -   Includes an effect to change the body cursor during drag overlay.
-   **`SortableItem` (Internal to `MultipleContainers.tsx`)**:
    -   A wrapper component that directly uses the `useSortable` hook and passes the necessary props down to the `Item` component.
-   **`Handle.tsx`**:
    -   A dedicated component providing a visual handle that users can grab to initiate dragging. Uses `Action.tsx`.
-   **`Action.tsx`**:
    -   A generic, styleable button component used by `Handle` and `Remove`. Uses `Action.module.scss`.
-   **`multipleContainersKeyboardCoordinates.ts`**:
    -   Provides a custom `KeyboardCoordinateGetter` function used by the `KeyboardSensor`.
    -   Calculates the destination coordinates when navigating and moving items between containers using keyboard arrow keys, enhancing accessibility.

## Key Logic & Concepts

1.  **State Management**: The `items` and `containers` state in `MultipleContainers.tsx` is central. Event handlers update this state immutably to reflect drag-and-drop operations.
2.  **Sensors**: `MouseSensor`, `TouchSensor`, and `KeyboardSensor` are initialized using `useSensors` and `useSensor` to detect drag-and-drop interactions across different input methods. The `KeyboardSensor` uses the custom `coordinateGetter`.
3.  **Contexts**:
    -   `DndContext`: Wraps the entire draggable area, providing shared context and configuration.
    -   `SortableContext`: Two levels are used: one for the sortable `containers` and one nested within each container for its sortable `items`. The `strategy` prop (e.g., `verticalListSortingStrategy`) dictates how sorting behavior works.
4.  **Event Handling**:
    -   `onDragStart`: Captures the `active.id` and clones the `items` state for potential cancellation.
    -   `onDragOver`: The most complex handler. It determines if the dragged item is over a different container and updates the `items` state accordingly *during* the drag. It calculates the target index based on pointer position or item collision. It uses `recentlyMovedToNewContainer` to mitigate potential issues caused by layout shifts.
    -   `onDragEnd`: Finalizes the operation. It handles:
        -   Sorting containers if a container was dragged.
        -   Sorting items within the *same* container using `arrayMove`.
        -   Moving items to the trash (`TRASH_ID`).
        -   Moving items to a new container created via the placeholder (`PLACEHOLDER_ID`).
        -   Finalizing moves between containers (although the primary logic is in `onDragOver`).
        -   Resets `activeId`.
    -   `onDragCancel`: Resets `items` state using `clonedItems` if the drag is cancelled (e.g., by pressing Esc).
5.  **Collision Detection**: A `collisionDetectionStrategy` function is provided to `DndContext`. This custom strategy prioritizes pointer intersection (`pointerWithin`), then rectangle intersection (`rectIntersection`), handles the `TRASH_ID` specifically, and uses `closestCenter` for items within a matched container. It relies on `lastOverId` and `recentlyMovedToNewContainer` for complex inter-container transitions.
6.  **Drag Overlay**: `DragOverlay` renders a visually distinct representation of the item being dragged, detached from its original position. `renderSortableItemDragOverlay` and `renderContainerDragOverlay` provide the specific JSX for item and container overlays, respectively.
7.  **Styling**: CSS Modules (`.module.scss`) are used for scoped styling, applying classes dynamically based on component state (dragging, sorting, hover, etc.). CSS variables are used extensively in `Item.module.scss` and `Container.module.scss` to apply transforms and other style properties.

## Refactoring & Extension Considerations

-   **`onDragOver` Complexity**: The logic for moving items between containers in `onDragOver`, especially the index calculation and the use of `recentlyMovedToNewContainer`, is intricate. Refactoring this section requires careful testing to ensure edge cases are handled correctly. Consider if state updates can be further optimized or batched (`unstable_batchedUpdates`).
-   **Collision Strategy**: The custom `collisionDetectionStrategy` is powerful but complex. Changes to layout or container behavior might require adjustments here. Ensure thorough testing after modifications.
-   **ID Generation**: `getNextContainerId` is simplistic (using character codes). For robust applications, replace this with UUIDs or a numeric counter.
-   **Type Safety**: Improve type safety by replacing instances of `any`.
-   **Keyboard Navigation**: The `coordinateGetter` logic is specific to the current layout and styling. Changes might require updates to this function.
-   **Performance**: For very large numbers of items or containers, performance profiling might be necessary. `dnd-kit` offers virtualization options, but this example does not implement them. `React.memo` is used on `Item.tsx`, which helps.

This example provides a strong foundation, but be mindful of the inherent complexity when extending or modifying the core interaction logic, particularly concerning state updates during drag operations and the custom collision detection.