import React from 'react'

interface ColordotProps {
    color: string;
}

const Colordot: React.FC<ColordotProps> = (color) => {    
    return (
        <div style={{ border: '2px solid black', backgroundColor: `#${color.color}`, borderRadius: '50%', height: '20px', width: '20px' }}/>
    )
}

export default Colordot