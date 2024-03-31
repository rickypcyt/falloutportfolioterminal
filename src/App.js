import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import bgImage from './bg2.png'; // Importa la imagen aquí

const ImageThreeJs = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

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
  }, []);

  return <canvas ref={canvasRef} />;
};

export default ImageThreeJs;
