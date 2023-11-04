// import React, { useState } from 'react';
// import { useDrag, useDrop } from 'react-dnd';

// const ItemType = 'GRID_ITEM';

// const GridItem = ({ item, index, moveItem }) => {
//     const [, ref] = useDrag({
//         type: ItemType,
//         item: { id: item.id, index },
//     });

//     const [, drop] = useDrop({
//         accept: ItemType,
//         hover: (draggedItem) => {
//             if (draggedItem.index !== index) {
//                 moveItem(draggedItem.index, index);
//                 draggedItem.index = index;
//             }
//         },
//     });

//     return (
//         <div ref={(node) => ref(drop(node))} style={{ backgroundColor: 'lightgray', padding: '8px', borderRadius: '4px' }}>
//             {item.content}
//         </div>
//     );
// };

// const Grid = () => {
//     const initialItems = [
//         { id: 'item-1', content: 'Item 1' },
//         { id: 'item-2', content: 'Item 2' },
//         { id: 'item-3', content: 'Item 3' },
//         { id: 'item-4', content: 'Item 4' },
//     ];

//     const [items, setItems] = useState(initialItems);

//     const moveItem = (fromIndex, toIndex) => {
//         const updatedItems = [...items];
//         const [movedItem] = updatedItems.splice(fromIndex, 1);
//         updatedItems.splice(toIndex, 0, movedItem);
//         setItems(updatedItems);
//     };

//     return (
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
//             {items.map((item, index) => (
//                 <GridItem key={item.id} item={item} index={index} moveItem={moveItem} />
//             ))}
//         </div>
//     );
// };

// export default Grid;


// const [draggedOver, setDraggedOver] = useState(null);
// const handleDragStart = (e, item) => {
//     setDraggedItem(item);
// };

// const handleDragEnd = () => {
//     setDraggedItem(null);
// };

// const handleDragOver = (e, item) => {
//     e.preventDefault();
//     console.log(draggedItem);
//     if (draggedItem === item) return;
//     const updatedItems = images.filter((i) => i.id !== draggedItem.id);
//     const itemIndex = images.findIndex((i) => i.id === item.id);
//     updatedItems.splice(itemIndex, 0, draggedItem);
//     dispatch(setValue({ target: 'images', value: updatedItems }));
// };
// const handleDragStart = (e, id) => {
//     e.dataTransfer.setData('text/plain', id);
//     e.dataTransfer.effectAllowed = 'move';
//     e.dataTransfer.dropEffect = 'move';
// };

// const handleDragOver = (e, id) => {
//     e.preventDefault();

//     if (draggedOver !== id) {
//         const updatedItems = [...images];
//         const ashColoredIndex = updatedItems.findIndex((item) => item.id === 'ash');

//         if (ashColoredIndex >= 0) {
//             // Remove the previous ash-colored div
//             updatedItems.splice(ashColoredIndex, 1);
//         }

//         // Create a new ash-colored div
//         const ashColoredItem = { id: 'ash', text: 'Ash-Colored Div' };
//         updatedItems.splice(images.findIndex((item) => item.id === id), 0, ashColoredItem);

//         dispatch(setValue({ target: 'images', value: updatedItems }));
//         setDraggedOver(id);
//     }
// };


// const handleDrop = (e, droppedItemId) => {
//     e.preventDefault();
//     const draggedItemId = e.dataTransfer.getData('text/plain');
//     const updatedItems = [...images];
//     const droppedIndex = updatedItems.findIndex((item) => item.id === droppedItemId);
//     const draggedIndex = updatedItems.findIndex((item) => item.id === draggedItemId);

//     if (draggedItemId !== droppedItemId) {
//         // Remove the item from its original position
//         const draggedItem = updatedItems[draggedIndex];
//         updatedItems.splice(draggedIndex, 1);

//         // Insert the item in its new position
//         updatedItems.splice(droppedIndex, 0, draggedItem);

//         dispatch(setValue({ target: 'images', value: updatedItems }));
//     }
//     setDraggedOver(null);
// };
// const handleDragStart = (e, id) => {
//     e.dataTransfer.setData('text/plain', id);
// };

// const handleDragOver = (e) => {
//     e.preventDefault();
// };

// const handleDrop = (e, droppedItemId) => {
//     e.preventDefault();
//     const draggedItemId = e.dataTransfer.getData('text/plain');
//     const updatedItems = [...items];
//     const droppedIndex = items.findIndex((item) => item.id === droppedItemId);
//     const draggedItem = updatedItems.find((item) => item.id === draggedItemId);

//     updatedItems.splice(droppedIndex, 1, draggedItem);
//     updatedItems.splice(
//         items.findIndex((item) => item.id === draggedItemId),
//         1,
//         { id: draggedItemId, text: 'Ash-Colored Div' }
//     );
//     dispatch(setValue({ target: 'images', value: updatedItems }));
// };