import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter desde React Router
import terminalImage from './bg3nobgblsc.png'; // Importa la imagen aquí
import Terminal from './terminal';

const App = () => {
  return (
    <BrowserRouter> {/* Envuelve tu componente App con BrowserRouter */}
      <div style={{ position: 'relative', width: '99vw', height: '99.6vh', backgroundColor: 'black' }}>
        <img src={terminalImage} alt="Terminal" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        <Terminal />
      </div>
    </BrowserRouter>
  );
}

export default App;
