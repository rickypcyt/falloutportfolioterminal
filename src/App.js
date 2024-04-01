import React from 'react';
import terminalImage from './bg3nobg.png'; // Importa la imagen aquí
import Terminal from './terminal';

const ImageComponent = () => {
  return (
    <div style={{ position: 'relative', width: '99vw', height: '99.6vh', backgroundColor: 'black' }}>
      <img src={terminalImage} alt="Terminal" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      <div style={{ position: 'absolute', top: '39%', left: '43.5%', transform: 'translate(-50%, -50%)' }}>
        <Terminal />
      </div>
    </div>
  );
}

export default ImageComponent;
