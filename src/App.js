import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import bgImage from './bg2.png'; // Importa la imagen aquí
import Terminal from './terminal';
import PP from "./pip-boy-fallout-3-concept/source/low.fbx"

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

    const geometry = new THREE.PlaneGeometry(13, 10); // Cambia las dimensiones del plano para estirar la imagen
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '99.62vh', maxWidth: '100%', maxHeight: '100%' }}>

      <div ref={containerRef}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      </div>
      <div style={{ position: 'absolute', top: '37.5%', left: '53%', transform: 'translate(-50%, -50%)' }}>
        <Terminal />
      </div>
    </div>
  );
}

export default ImageThreeJs;
