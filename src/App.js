import React from 'react';
import terminalImage from './bg3nobgblsc.png'; // Importa la imagen aquí
import Terminal from './terminal';

const ImageComponent = () => {
  return (
    <div style={{ position: 'relative', width: '99vw', height: '99.6vh', backgroundColor: 'black' }}>
      <img src={terminalImage} alt="Terminal" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        <Terminal />
      </div>
  );
}

export default ImageComponent;
