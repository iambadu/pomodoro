import React, {useRef, useEffect} from 'react';


const Canvas = ({active, min}) => {
    const canvasRef = useRef(null);
    
    
    useEffect(() => {
    const draw = ctx => {
        /*
        <svg class="search__icon">
                            <use xlink:href="img/sprite.svg#icon-magnifying-glass"></use>
                        </svg>
        */
        
        ctx.beginPath();
        ctx.arc(135, 135, 120, 0, 2*Math.PI);
        context.lineWidth = 16;
        context.strokeStyle = '#E91E63';
        context.stroke();
        context.lineCap = "round";
        
        // let eAngl = 2 * (sec / 59) * Math.PI;
        
        ctx.beginPath();
        ctx.arc(135, 135, 120, 0, min === active ? 2 * Math.PI : 2 * (min / active)  * Math.PI);
        context.lineWidth = 6;
        context.strokeStyle = '#fff';
        context.lineCap = "round";
        context.stroke();
        
    
    }
          
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      
      //Our draw come here
      draw(context)
    }, )
    return (
        <canvas height='270px' width='270px' ref = {canvasRef}/>
            
    )
}

export default Canvas
