import React, { useEffect, useRef, useState } from 'react';
import './App.css'; // Asegúrate de que sea la ruta correcta al archivo CSS
import imagenLocal from './bg2.png'; // Ruta relativa a la imagen local

const ImageComponent = () => {
  const canvasRef = useRef(null);
  const [canvasPosition, setCanvasPosition] = useState({ top: '104px', left: '592px' });
  useEffect(() => {
    const updateCanvasPosition = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        canvas.width = windowWidth; // Ajusta el ancho del canvas al ancho de la ventana
        canvas.height = windowHeight; // Ajusta la altura del canvas a la altura de la ventana
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#5a585f'; // Establece el color de fondo en negro
        ctx.fillRect(0, 0, windowWidth, windowHeight); // Dibuja un rectángulo negro que cubre toda la pantalla
      }
    };

    // Llama a la función para inicializar la posición y el color del canvas
    updateCanvasPosition();

    // Agrega un event listener para detectar cambios en el tamaño de la ventana
    window.addEventListener('resize', updateCanvasPosition);

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('resize', updateCanvasPosition);
    };
  }, []); // El array vacío indica que este efecto se ejecuta solo una vez, al montar el componente

  return (
    <div className="image-container">
      <img src={imagenLocal} alt="Descripción de la imagen" />
      <canvas
        className="canvas-overlay"
        style={{ top: canvasPosition.top, left: canvasPosition.left, position: 'absolute' }}
        ref={canvasRef}>
      </canvas>
    </div>
  );
};

export default ImageComponent;
