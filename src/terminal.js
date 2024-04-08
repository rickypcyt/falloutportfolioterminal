import React, { useState, useEffect } from 'react';
import './terminal.css'; // Importa estilos específicos para el terminal
import './font.css'; // Importa el CSS donde definiste la fuente

// Definición del componente funcional Terminal
const Terminal = () => {
  
  // Definición de múltiples estados utilizando el hook useState
  const [inputValue, setInputValue] = useState(''); // Estado para almacenar el valor del input
  const [outputBeforeRobco, setOutputBeforeRobco] = useState(''); // Estado para el output antes de mostrar el ASCII de RobCo
  const [outputAfterRobco, setOutputAfterRobco] = useState(''); // Estado para el output después de mostrar el ASCII de RobCo
  const [messageIndex, setMessageIndex] = useState(0); // Estado para el índice del mensaje actual
  const [charIndex, setCharIndex] = useState(0); // Estado para el índice del carácter actual en el mensaje
  const [showRobcoAscii, setShowRobcoAscii] = useState(false); // Estado para controlar la visibilidad del ASCII de RobCo
  const [showInput, setShowInput] = useState(false); // Estado para controlar la visibilidad del input
  const [showOutputAfterStart, setShowOutputAfterStart] = useState(true); // Estado para controlar la visibilidad del output después de iniciar

  // Mensajes mostrados antes de mostrar el ASCII de RobCo
  const messagesBeforeRobco = [
    "Initializing boot...",
    "Loading RobCo Unified OS...",
    "64K RAM detected...",
    "Launching Interface..."
  ];

  // Arte ASCII de RobCo
  const robcoAsciiArt = [
    "  _____       _      _____                   ",
    " |  __ \\     | |    / ____|                  ",
    " | |__) |___ | |__ | |      ___               ",
    " |  _  // _ \\| '_ \\| |     / _ \\              ",
    " | | \\ \\ (_) | |_) | |____| (_) |             ",
    " |_|  \\_\\___/|_.__/ \\_____|\\___/          ",
    "",
  ];

  // Mensajes mostrados después de mostrar el ASCII de RobCo
  const messagesAfterRobco = [
    "==============================================",
    "Personal Terminal 'Proto-Boy' Manufactured by RobCo",
    "Type start to continue:"
  ];

  // Hook useEffect para simular la escritura de los mensajes
  useEffect(() => {
    const typingTimer = setInterval(() => {
      if (messageIndex < messagesBeforeRobco.length) {
        // Si hay mensajes antes del ASCII de RobCo
        const currentMessage = messagesBeforeRobco[messageIndex];
        if (charIndex < currentMessage.length) {
          // Si aún quedan caracteres en el mensaje actual, se añade al output
          setOutputBeforeRobco(prevOutput => prevOutput + currentMessage.charAt(charIndex));
          setCharIndex(prevIndex => prevIndex + 1);
        } else {
          // Si se completó el mensaje actual, se pasa al siguiente
          setMessageIndex(prevIndex => prevIndex + 1);
          setCharIndex(0);
          setOutputBeforeRobco(prevOutput => prevOutput + '\n');
        }
      } else if (messageIndex === messagesBeforeRobco.length) {
        // Después de mostrar todos los mensajes antes del ASCII de RobCo, se muestra el ASCII
        setOutputBeforeRobco('');
        setShowRobcoAscii(true);
        setMessageIndex(prevIndex => prevIndex + 1);
      } else if (messageIndex < messagesBeforeRobco.length + messagesAfterRobco.length) {
        // Si hay mensajes después del ASCII de RobCo
        const currentMessage = messagesAfterRobco[messageIndex - messagesBeforeRobco.length];
        if (currentMessage === "Type start to continue:") {
          // Si se llega al mensaje de inicio, se muestra el input
          setShowInput(true);
        }
        if (charIndex < currentMessage.length) {
          // Si aún quedan caracteres en el mensaje actual, se añade al output
          setOutputAfterRobco(prevOutput => prevOutput + currentMessage.charAt(charIndex));
          setCharIndex(prevIndex => prevIndex + 1);
        } else {
          // Si se completó el mensaje actual, se pasa al siguiente
          setMessageIndex(prevIndex => prevIndex + 1);
          setCharIndex(0);
          setOutputAfterRobco(prevOutput => prevOutput + '\n');
        }
      } else {
        // Si se muestran todos los mensajes, se limpia el intervalo
        clearInterval(typingTimer);
      }
    }, 50);

    // Limpieza del intervalo al desmontar el componente
    return () => clearInterval(typingTimer);
  }, [charIndex, messageIndex, messagesBeforeRobco, messagesAfterRobco, showRobcoAscii]);

  // Función para manejar cambios en el input
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Función para manejar el envío del input
  const handleInputSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === 'start') {
      // Si se envía 'start', se reinicia el output después del ASCII de RobCo
      setOutputAfterRobco('');
      setShowRobcoAscii(false);
      setShowOutputAfterStart(false);
      setInputValue('');
    } else {
      // Si se envía otro comando, se muestra un mensaje de error
      setOutputAfterRobco(prevOutput => prevOutput + `Command '${inputValue}' not recognized.\n`);
      setInputValue('');
    }
  };

  // Retorno del JSX que representa el componente Terminal
  return (
    <div className="terminal">
      <div className="content" style={{
        padding: "10px",
        overflowY: "auto"
      }}>
        {/* Output antes del ASCII de RobCo */}
        <pre>{outputBeforeRobco}</pre>
        {/* Se muestra el ASCII de RobCo si showRobcoAscii es verdadero */}
        {showRobcoAscii && (
          <pre>{robcoAsciiArt.join('\n')}</pre>
        )}
        <br />
        {/* Output después del ASCII de RobCo si showOutputAfterStart es verdadero */}
        {showOutputAfterStart && <pre>{outputAfterRobco}</pre>}
        {/* Se muestra el input si showInput es verdadero */}
        {showInput && (
          <form onSubmit={handleInputSubmit}>
            <span className="prompt">$ </span>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="input"
              style={{
                background: "transparent",
                border: "none",
                color: "lime",
                fontFamily: "FSEX300", // También aquí
                outline: "none",
                fontSize: "large",
                width: "calc(100% - 30px)"
              }}
              autoFocus
            />
          </form>
        )}
      </div>
    </div>
  );
};

// Exporta el componente Terminal para poder ser utilizado en otros archivos
export default Terminal;
