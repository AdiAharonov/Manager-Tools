import React from 'react';



interface PenToolProps  {
    handleClick: Function
}


export const PenTool:React.FC<PenToolProps> = ({handleClick}) => {



    return (
        <div className="pen tool" onClick={(ev) => {handleClick(ev, "pen")}}>
            
        </div>
    )
}