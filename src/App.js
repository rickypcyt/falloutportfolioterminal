import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import bgImage from './bg2.png'; // Importa la imagen aquí
import Terminal from './terminal';

const ImageThreeJs = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null); // Referencia al contenedor HTML para el terminal

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, windowSize.width / windowSize.height, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(windowSize.width, windowSize.height);

    const geometry = new THREE.PlaneGeometry(10, 10); // Amplía el plano para que sea más visible
    const loader = new THREE.TextureLoader();
    const texture = loader.load(bgImage); // Utiliza la imagen importada
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    camera.position.z = 7;

    const animate = () => {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
    };
  }, [windowSize]);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
      <div style={{ position: 'absolute', top: 20, left: 20 }}>
        <Terminal />
      </div>
    </div>
  );
};

export default ImageThreeJs;
