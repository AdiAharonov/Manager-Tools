import React, { useState, createRef, useEffect } from 'react'
import SvgLines from 'react-mt-svg-lines';   


interface SvgCmpProps {

}

const SvgComponent:React.FC<SvgCmpProps> = () => {
  

  return (
    // <Wrapper ref={inViewRef} pathLength={pathLength}>
    <SvgLines animate={ true } duration={ 10000 }>

      <svg
        className="svg-animation"
        viewBox='0 0 1225 930'
        
        >
         <path stroke="#ff6c00" strokeWidth="5" fill="none" d="m460.57174,548.57037l2.28451,287.1423l-305.7137,0l1.42857,-481.42764l54.28561,0l-188.57106,-5.71427c2.00118,-4.28571 4.85832,-252.85666 4.85832,-252.85666c0,0 428.57061,2.85713 427.99799,1.42857c0.57262,1.42856 2.00119,258.57093 1.42856,257.14236c0.57263,1.42857 -126.56998,0 -127.14261,-1.42857c0.57263,1.42857 64.85822,4.28571 64.28559,2.85714c0.57263,1.42857 0.57263,61.42845 0,61.42845c0.57263,0 67.71536,-1.42857 67.14273,-1.42857c0.57263,0 -0.85594,-138.57116 -1.42857,-139.99973c0.57263,1.42857 286.28637,2.85714 285.71374,1.42857c0.57263,1.42857 0.57263,135.71403 0,135.71403c0.57263,0 0.57263,-229.99956 0,-231.42813c0.57263,1.42857 443.42893,0 442.85629,-1.42857c0.57264,1.42857 2.0012,362.85645 1.42856,362.85645c0.57264,0 -439.42652,2.85714 -439.99915,2.85713c0.57263,0.00001 130.57239,0.00001 129.99975,0c0.57264,0.00001 0.57264,191.42821 0,191.42821c0.57264,0 -307.9982,1.42857 -307.9982,1.42857c0,0 1.42857,74.28557 0.85594,74.28557" />
      </svg>
      </SvgLines>


    
   
  )
}

// const Wrapper = styled.div`
//   .animated {
    
//     width: 100%;
//     height: 100%;
//     stroke-dasharray: ${(props: any) => props.pathLength};
//     stroke-dashoffset: ${(props: any) => props.pathLength};
//   }
//   .animated.visible {
//     animation: draw 6s linear forwards;
//   }
//   @keyframes draw {
//     from {
//       stroke-dashoffset: ${(props: any) => props.pathLength};
//     }
//     to {
//       stroke-dashoffset: 0;
//     }
//   }
// `

export default SvgComponent