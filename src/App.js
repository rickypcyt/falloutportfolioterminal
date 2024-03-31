import React, { useEffect } from 'react';
import './App.css'; // Asegúrate de que sea la ruta correcta al archivo CSS
import imagenLocal from './bg.png'; // Ruta relativa a la imagen local

class ImageComponent extends React.Component {
  componentDidMount() {
    // Función para dibujar en el canvas
    const draw = () => {
      const canvas = this.refs.canvas; // Usamos refs para acceder al elemento canvas
      if (canvas) {
        const ctx = canvas.getContext('2d');
        // Limpiar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Obtener las coordenadas del centro del canvas
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        // Dibujar un rectángulo de ejemplo en el centro del canvas
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(centerX + 30 , centerY + 50, 175, 175); // El rectángulo se posiciona en el centro y se ajusta su tamaño
        // Ejemplo de ejecución de código
        console.log('¡Código ejecutado dentro del canvas!');
      }
    };

    // Llamar a la función draw al cargar el componente
    draw();
  }

  render() {
    return (
      <div className="image-container">
        <img src={imagenLocal} alt="Descripción de la imagen" />
        <canvas className="canvas-overlay" ref="canvas"></canvas>
      </div>
    );
  }
}

export default ImageComponent;
