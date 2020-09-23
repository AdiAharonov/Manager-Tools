import React from 'react'

interface HoverHelperProps {
    name: string;
}

export const HoverHelper:React.FC<HoverHelperProps> = ({name}) => {
    return (
        <>
            <span className="tooltip">{name}</span>
        </>
    )
}
