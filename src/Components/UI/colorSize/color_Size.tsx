import React from 'react'

interface ColordotProps {
    color: string;
    selectedColor?: string
}

interface sizeBoxProps {
    size: string;
    selectedSize?: string
}

export const Colordot: React.FC<ColordotProps> = (color) => {
    return (
        <div style={{ border: color.selectedColor === color.color ? '3px solid black' : '1px solid', backgroundColor: `#${color.color}`, borderRadius: '50%', height: '30px', width: '30px' }} />
    )
}
export const SizeBox: React.FC<sizeBoxProps> = ({ size, selectedSize }) => {
    return (
        <div style={{ border: selectedSize === size ? '3px solid black' : 'none', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {size}
        </div>
    );
};