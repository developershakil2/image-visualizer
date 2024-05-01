import React, { useState, createContext } from "react";

// Create a context for managing shared state
export const ContextApi = createContext();

// Define a component to manage and provide the context
const ContextComponent = ({ children }) => {
    // Define state variables for different settings and tools
    const [showRuler, setShowRuler] = useState(false);
    const [isGrayscale, setIsGrayscale] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [showWidthLines, setShowWidthLines] = useState(false);
    const [width, setWidth] = useState(500); // Initial width in centimeters
    const [height, setHeight] = useState(500); // Initial height in centimeters

    // Toggle the state for showing or hiding the ruler
    const tool1 = () => {
        setShowRuler(!showRuler);
    }

    // Toggle the state for showing or hiding width lines
    const tool2 = () => {
        setShowWidthLines(!showWidthLines);
    }

    // Toggle the state for grayscale mode
    const tool3 = () => {
        setIsGrayscale(!isGrayscale);
    }

    // Rotate the image by 90 degrees clockwise
    const tool4 = () => {
        setRotation(rotation + 90);
    }

    // Toggle flipping the image horizontally
    const handleToggleFlip = () => {
        setIsFlipped(!isFlipped);
    };
   
    const tool5 = () => {
        handleToggleFlip();
    }

    // Provide the state and functions to the context
    return (
        <ContextApi.Provider value={{
            tool1,
            tool2,
            tool3,
            tool4,
            tool5,
            setShowRuler,
            showRuler,
            setIsGrayscale,
            isGrayscale,
            isFlipped,
            rotation,
            showWidthLines,
            width,
            setWidth,
            height,
            setHeight
        }}>
            {children}
        </ContextApi.Provider>
    );
}

export default ContextComponent;
