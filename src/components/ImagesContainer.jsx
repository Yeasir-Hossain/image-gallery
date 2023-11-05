import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ImageUploader } from './ImageUploader';
import { Image } from './Image';
import { DndContext, DragOverlay, MouseSensor, TouchSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { setValue } from '../redux/reducers/imageReducer';

/**
 * This component renders and manages a list of images, allowing them to be re-ordered via drag-and-drop.
 * It uses the DndKit library for drag-and-drop functionality and integrates with Redux for state management.
 * @returns {React.Component} A React component for rendering and reordering images.
 */
export const ImagesContainer = ({ }) => {
    const dispatch = useDispatch();
    const { images } = useSelector((state) => ({
        images: state.imageStore.images
    }), shallowEqual);
    const sensors = useSensors(useSensor(MouseSensor, {
        // Require the mouse to move by 10 pixels before activating
        activationConstraint: {
            distance: 10,
        },
    }), useSensor(TouchSensor, {
        // Press delay of 250ms, with tolerance of 5px of movement
        activationConstraint: {
            delay: 150,
            tolerance: 5,
        },
    }));
    const [items, setItems] = useState([]);
    const [activeId, setActiveId] = useState(null);
    const [activeImage, setActiveImage] = useState(null);

    // Update the list of images when the Redux store 'images' state changes
    useEffect(() => {
        setItems(images);
    }, [images]);

    /**
     * Handle the start of a drag operation.
     * @param {Object} event - The drag start event.
     */
    function handleDragStart(event) {
        setActiveId(event.active.id);
        setActiveImage(prev => items.find(i => i.id === event.active.id));
    };

    /**
     * Handle the end of a drag operation and update the order of images.
     * @param {Object} event - The drag end event.
     */
    function handleDragEnd(event) {
        const { active, over } = event;
        if (active?.id !== over?.id) {
            setItems((items) => {
                // Find the indices of the active and over images in the 'items' array
                const activeIndex = items.findIndex((item) => item.id === active?.id);
                const overIndex = items.findIndex((item) => item.id === over?.id);

                // Ensure both images exist in the 'items' array
                if (activeIndex !== -1 && overIndex !== -1) {
                    // Reorder the 'items' array based on the drag-and-drop action
                    const updatedArray = arrayMove(items, activeIndex, overIndex);
                    dispatch(setValue({ target: 'images', value: updatedArray }));
                    return updatedArray;
                }
            });
        }
        setActiveId(null);
        setActiveImage(null);
    }

    // Handle the cancellation of a drag operation.
    function handleDragCancel() {
        setActiveId(null);
        setActiveImage(null);
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <SortableContext items={items} strategy={rectSortingStrategy}>
                <div className={`grid ${images.length < 1 ? 'grid-cols-1' : 'sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'} gap-4 px-5 py-5`}>
                    {
                        items.map((image, index) =>
                            <SortableItem key={image.id} image={image} index={index} />
                        )
                    }
                    <ImageUploader />
                </div>
            </SortableContext>
            <DragOverlay adjustScale={true}>
                {activeId ? (
                    <Image image={activeImage} index={items.indexOf(activeId)} />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};
