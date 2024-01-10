import React, { useEffect, useRef } from 'react'
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';

export default function DragContainer(props) {
  const containerRef = useRef(null);
  const pos = useSpring({x:0, y:0});
  
  const bindPos = useDrag((params)=>{
    if (props.draggable) {
      pos.x.set(params.offset[0]);
      pos.y.set(params.offset[1]);
    }
  });

  return (
    <animated.div {...bindPos()} 
    style={{
          x: pos.x,
          y: pos.y,
          touchAction : 'none'
      }}>
      {props.children}
    </animated.div>
  )
}