import TopNav from "./TopNav";
import SideNav from "./SideNav";
import React, { useState, useEffect, useContext, useLayoutEffect, useRef } from 'react';
import imageSrc from './repeat-x.jpg';
import { ContextApi } from "../Utilities";

const VisualizeContent = () => {
  // Context
  const { showRuler,  width, height, isFlipped, isGrayscale, rotation , showWidthLines} = useContext(ContextApi);
  // Refs for canvas and image
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  // State for image dimensions and scale
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [scale, setScale] = useState(1);
  
  // Effect to set image dimensions when image is loaded
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };
    img.src = imageSrc;
    imageRef.current = img;
  }, []);

  // Effect to calculate scale based on container size and image dimensions
  useLayoutEffect(() => {
    if (containerRef.current) {
      const scaleX = containerRef.current.offsetWidth / imageDimensions.width;
      const scaleY = containerRef.current.offsetHeight / imageDimensions.height;
      const scale = Math.min(scaleX, scaleY);
      setScale(scale);
    }
  }, [imageDimensions]);

// Effect to draw canvas when certain props change
useEffect(() => {
  if (canvasRef.current) {
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      const imageWidth = imageDimensions.width;
      const imageHeight = imageDimensions.height;

      let canvasWidth, canvasHeight;

      // Adjust canvas size based on specific conditions
      if (imageWidth === 500 && imageHeight === 500) {
        // Keep canvas size equal to image size if image size is 500cm x 500cm
        canvasWidth = imageWidth;
        canvasHeight = imageHeight;
      } else {
        // Set canvas size based on window width and other parameters
        canvasWidth = window.innerWidth >= 768 ? Math.min(width, width) : Math.min(width, 300);
        canvasHeight = window.innerWidth >= 768 ? Math.min(height, height) : Math.min(height, 280);

        // Adjust canvas size based on additional conditions
        if (width > 900) {
          canvasWidth = 900;
        }
        if (height > 600) {
          canvasHeight = 600;
        }
      }

      canvasRef.current.width = canvasWidth;
      canvasRef.current.height = canvasHeight;
      ctx.save();
      ctx.translate(canvasWidth / 2, canvasHeight / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(imageRef.current, -canvasWidth / 2, -canvasHeight / 2, canvasWidth, canvasHeight);
      ctx.restore();
      
      if (showRuler) {
        drawRulers(ctx);
      }
      if (showWidthLines) {
        drawWidthLines(ctx);
      }
    }
  }
}, [showRuler, imageDimensions, rotation, showWidthLines, width , height]);

  // Effect to apply grayscale filter
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        if (isGrayscale) {
          applyGrayscale(ctx);
        } else {
          ctx.save();
          ctx.translate(canvasRef.current.width / 2, canvasRef.current.height / 2);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.drawImage(imageRef.current, -canvasRef.current.width / 2, -canvasRef.current.height / 2, canvasRef.current.width, canvasRef.current.height);
          ctx.restore();
        }
      }
    }
  }, [isGrayscale, rotation]);

  // Effect to apply flip
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        if (isFlipped) {
          applyFlip(ctx);
        } else {
          ctx.save();
          ctx.translate(canvasRef.current.width / 2, canvasRef.current.height / 2);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.drawImage(imageRef.current, -canvasRef.current.width / 2, -canvasRef.current.height / 2, canvasRef.current.width, canvasRef.current.height);
          ctx.restore();
        }
      }
    }
  }, [isFlipped, rotation]);

// Function to draw rulers
const drawRulers = (ctx) => {
  ctx.fillStyle = 'black';
  ctx.font = '10px Arial';

  const scaleX = canvasRef.current.width / (width * 100); // Convert width to meters
  const scaleY = canvasRef.current.height / (height * 100); // Convert height to meters

  // Draw top ruler (in meters) for width
  for (let i = 0; i <= width; i += width / 10) {
    const x = i * 100 * scaleX; // Convert back to centimeters for drawing
    ctx.fillText(`${(i / 100).toFixed(2)}m`, x, 15);
  }

  // Draw left ruler (in meters) for height
  for (let i = 0; i <= height; i += height / 8) {
    const y = i * 100 * scaleY; // Convert back to centimeters for drawing
    ctx.fillText(`${(i / 100).toFixed(2)}m`, 0, y);
  }
};




  // Function to draw width lines
  const drawWidthLines = (ctx) => {
    ctx.strokeStyle = 'green';
    ctx.beginPath();
    for (let i = 0; i <= imageDimensions.width; i += imageDimensions.width / 20) {
      const x = (i * canvasRef.current.width) / imageDimensions.width;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasRef.current.height);
    }
    ctx.stroke();
  };

  // Function to apply grayscale filter
  const applyGrayscale = (ctx) => {
    const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = brightness;
      data[i + 1] = brightness;
      data[i + 2] = brightness;
    }
    ctx.putImageData(imageData, 0, 0);
  };

  // Function to apply flip
  const applyFlip = (ctx) => {
    ctx.translate(canvasRef.current.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(imageRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  // Function to handle image movement
  const handleImageMove = (event) => {
    if (showWidthLines) {
      const offsetX = event.nativeEvent.offsetX;
      const imageWidth = canvasRef.current.width;
      const scaleFactor = imageDimensions.width / imageWidth;
      const newImageX = (offsetX - imageWidth / 2) * scaleFactor;
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(imageRef.current, -newImageX, -canvasRef.current.height / 2, canvasRef.current.width, canvasRef.current.height);
      if (showRuler) {
        drawRulers(ctx);
      }
      if (showWidthLines) {
        drawWidthLines(ctx);
      }
    }
  };

  return (
    <>
      <TopNav />
      <div className="w-full flex justify-between ">
        <div className="md:w-[440px]">
          <SideNav />
        </div>
        <div className="w-full overflow-scroll p-5 md:p-0 md:w-full flex justify-center items-start" style={{ position: 'relative' }} ref={containerRef}>
          
          <div className="w-full flex flex-col justify-center items-center canva_wrapper h-[700px] object-contain overflow-scroll object-center">
           <p className="flex items-center "><img className="w-[20px] h-[20px]" src="images/left.png" alt="right"/> {width}cm<img className="w-[20px] h-[20px]" src="images/right.png" alt="right"/></p>
           

           <div className="flex">
           <p className="flex w-[39px] -rotate-90 items-center "><img className="w-[20px] h-[20px]" src="images/left.png" alt="right"/> <span className="flex w-40">{height}cm</span><img className="w-[20px] h-[20px]" src="images/right.png" alt="right"/></p>
           
           <canvas
      className="mt-1 object"
      ref={canvasRef}
      style={{ objectFit: 'cover', objectPosition: 'center', cursor: showWidthLines ? 'ew-resize' : 'move' }}
    />
           </div>
          </div>
         
        </div>
      </div>
    </>
  );
};

export default VisualizeContent;
