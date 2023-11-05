import React from 'react';

/**
 * This component renders the placeholder image while dragging.
 * @returns react component
 */
export const EmptyImage = () => {
    return (
        <div className={`relative group first:row-span-2 first:col-span-2 first:w-full first:h-full lg:w-44 lg:h-44 border-2 border-gray-200 rounded-lg`}></div>
    );
};