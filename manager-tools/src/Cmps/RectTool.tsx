import React from 'react';



interface RectToolProps  {
    handleClick: Function
}


export const RectTool:React.FC<RectToolProps> = ({handleClick}) => {



    return (
        <div className="rect tool" onClick={(ev) => {handleClick(ev, "rect")}}>
            
        </div>
    )
}