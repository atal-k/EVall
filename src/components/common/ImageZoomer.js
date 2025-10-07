import React, { useState, useRef, useCallback } from 'react';
import './ImageZoomer.css';

const ImageZoomer = ({ 
  src, 
  alt = "Product Image",
  zoomFactor = 4,
  selectorSize = 140 
}) => {
  // State for tracking mouse and zoom status
  const [isZooming, setIsZooming] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Refs for DOM elements
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  /**
   * Calculate selector position based on mouse coordinates
   * Ensures selector stays within image boundaries
   */
  const calculateSelectorPosition = useCallback((mouseX, mouseY) => {
    if (!imageRef.current) return { x: 0, y: 0 };
    
    const imageRect = imageRef.current.getBoundingClientRect();
    const halfSelector = selectorSize / 2;
    
    // Calculate raw position relative to image
    let selectorX = mouseX - imageRect.left - halfSelector;
    let selectorY = mouseY - imageRect.top - halfSelector;
    
    // Apply boundary constraints
    // Left boundary
    if (selectorX < 0) selectorX = 0;
    // Right boundary
    if (selectorX + selectorSize > imageRect.width) {
      selectorX = imageRect.width - selectorSize;
    }
    // Top boundary
    if (selectorY < 0) selectorY = 0;
    // Bottom boundary
    if (selectorY + selectorSize > imageRect.height) {
      selectorY = imageRect.height - selectorSize;
    }
    
    return { x: selectorX, y: selectorY };
  }, [selectorSize]);

  /**
   * Calculate the background position for magnified view
   * Maps selector position to corresponding area in zoomed image
   */
  const calculateMagnifiedPosition = useCallback((selectorX, selectorY) => {
    if (!imageRef.current) return { x: 0, y: 0 };
    
    const imageRect = imageRef.current.getBoundingClientRect();
    
    // Calculate percentage position of selector within image
    const percentX = selectorX / (imageRect.width - selectorSize);
    const percentY = selectorY / (imageRect.height - selectorSize);
    
    // Convert to background-position values (inverted for proper mapping)
    const bgPosX = percentX * 100;
    const bgPosY = percentY * 100;
    
    return { x: bgPosX, y: bgPosY };
  }, [selectorSize]);

  /**
   * Handle mouse movement over the image
   */
  const handleMouseMove = useCallback((e) => {
    if (!imageLoaded) return;
    
    setMousePos({ x: e.clientX, y: e.clientY });
  }, [imageLoaded]);

  /**
   * Handle mouse enter - start zooming
   */
  const handleMouseEnter = useCallback(() => {
    if (imageLoaded) {
      setIsZooming(true);
    }
  }, [imageLoaded]);

  /**
   * Handle mouse leave - stop zooming
   */
  const handleMouseLeave = useCallback(() => {
    setIsZooming(false);
  }, []);

  /**
   * Handle image load completion
   */
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  // Calculate current selector and magnified positions
  const selectorPos = calculateSelectorPosition(mousePos.x, mousePos.y);
  const magnifiedPos = calculateMagnifiedPosition(selectorPos.x, selectorPos.y);

  return (
    <div className="image-zoomer-container" ref={containerRef}>
      {/* Main Image Section */}
      <div 
        className="image-zoomer-main"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img 
          ref={imageRef}
          src={src}
          alt={alt}
          className="image-zoomer-image"
          onLoad={handleImageLoad}
          draggable={false}
        />
        
        {/* Selector Overlay - only visible when zooming */}
        {isZooming && (
          <div 
            className="image-zoomer-selector"
            style={{
              left: `${selectorPos.x}px`,
              top: `${selectorPos.y}px`,
              width: `${selectorSize}px`,
              height: `${selectorSize}px`,
            }}
          />
        )}
        
        {/* Loading indicator */}
        {!imageLoaded && (
          <div className="image-zoomer-loading">Loading...</div>
        )}
      </div>

      {/* Magnified View Panel - Side Overlay */}
        {isZooming && imageLoaded && (
        <div className="image-zoomer-magnified-overlay">
            <div 
            className="image-zoomer-magnified-content"
            style={{
                backgroundImage: `url(${src})`,
                backgroundSize: `${zoomFactor * 100}%`,
                backgroundPosition: `${magnifiedPos.x}% ${magnifiedPos.y}%`,
                backgroundRepeat: 'no-repeat',
            }}
            />
        </div>
        )}
    </div>
  );
};
//
export default ImageZoomer;