// Importa React y los hooks necesarios
import React, { useState, useEffect } from "react";
import "./terminal.css"; // Importa estilos específicos para el terminal
import "./font.css"; // Importa el CSS donde definiste la fuente

// Definición del componente funcional Terminal
const Terminal = () => {
  // Definición de múltiples estados utilizando el hook useState
  const [inputValue, setInputValue] = useState(""); // Estado para almacenar el valor del input
  const [outputBeforeRobco, setOutputBeforeRobco] = useState(""); // Estado para el output antes de mostrar el ASCII de RobCo
  const [outputAfterRobco, setOutputAfterRobco] = useState(""); // Estado para el output después de mostrar el ASCII de RobCo
  const [messageIndex, setMessageIndex] = useState(0); // Estado para el índice del mensaje actual
  const [charIndex, setCharIndex] = useState(0); // Estado para el índice del carácter actual en el mensaje
  const [showRobcoAscii, setShowRobcoAscii] = useState(false); // Estado para controlar la visibilidad del ASCII de RobCo
  const [showInput, setShowInput] = useState(false); // Estado para controlar la visibilidad del input
  const [showRobcoSystemMessage, setShowRobcoSystemMessage] = useState(false); // Estado para controlar la visibilidad del mensaje del sistema de RobCo

  // Mensajes mostrados antes de mostrar el ASCII de RobCo
  const messagesBeforeRobco = [
    "Initializing boot...",
    "Loading RobCo Unified OS...",
    "64K RAM detected...",
    "Launching Interface...",
  ];

  // Arte ASCII de RobCo
  const robcoAsciiArt = [
    "  _____       _      _____                   ",
    "  |  __ \\     | |    / ____|                  ",
    "  | |__) |___ | |__ | |      ___               ",
    "  |  _  // _ \\| '_ \\| |     / _ \\              ",
    "  | | \\ \\ (_) | |_) | |____| (_) |             ",
    "  |_|  \\_\\___/|_.__/ \\_____|\\___/          ",
    " ",
  ];

  // Mensajes mostrados después de mostrar el ASCII de RobCo
  const messagesAfterRobco = [
    "==============================================",
    "Personal Terminal 'Proto-Boy' Manufactured by RobCo",
    "Type start to continue:",
  ];

  const robcoSystemMessage = `
ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM
COPYRIGHT 2075-2077 ROBCO INDUSTRIES
-Server 1-
`;

  const MessageAfterRobcoSystem = `
Personal Terminal -Proto-Boy- Manufactured by RobCo
_______________________________________
`;

  const Menu = `
  What would you like to do?
  1) View Journal Entries
  2) Log a Journal Entry
  3) Delete last Journal Entry
    `;

  // Función para limpiar la pantalla y reiniciar los estados relacionados con la visualización
  const clearHomeScreen = () => {
    setOutputAfterRobco("");
    setShowRobcoSystemMessage(false);
    setShowInput(false);
  };

  // Hook useEffect para simular la escritura de los mensajes
  useEffect(() => {
    const typingTimer = setInterval(() => {
      if (messageIndex < messagesBeforeRobco.length) {
        // Si hay mensajes antes del ASCII de RobCo
        const currentMessage = messagesBeforeRobco[messageIndex];
        if (charIndex < currentMessage.length) {
          // Si aún quedan caracteres en el mensaje actual, se añade al output
          setOutputBeforeRobco(
            (prevOutput) => prevOutput + currentMessage.charAt(charIndex)
          );
          setCharIndex((prevIndex) => prevIndex + 1);
        } else {
          // Si se completó el mensaje actual, se pasa al siguiente
          setMessageIndex((prevIndex) => prevIndex + 1);
          setCharIndex(0);
          setOutputBeforeRobco((prevOutput) => prevOutput + "\n");
        }
      } else if (messageIndex === messagesBeforeRobco.length) {
        // Después de mostrar todos los mensajes antes del ASCII de RobCo, se muestra el ASCII
        setOutputBeforeRobco("");
        setShowRobcoAscii(true);
        setMessageIndex((prevIndex) => prevIndex + 1);
      } else if (
        messageIndex <
        messagesBeforeRobco.length + messagesAfterRobco.length
      ) {
        // Si hay mensajes después del ASCII de RobCo
        const currentMessage =
          messagesAfterRobco[messageIndex - messagesBeforeRobco.length];
        if (currentMessage === "Type start to continue:") {
          // Si se llega al mensaje de inicio, se muestra el input
          setShowInput(true);
        }

        if (charIndex < currentMessage.length) {
          // Si aún quedan caracteres en el mensaje actual, se añade al output
          setOutputAfterRobco(
            (prevOutput) => prevOutput + currentMessage.charAt(charIndex)
          );
          setCharIndex((prevIndex) => prevIndex + 1);
        } else {
          // Si se completó el mensaje actual, se pasa al siguiente
          setMessageIndex((prevIndex) => prevIndex + 1);
          setCharIndex(0);
          setOutputAfterRobco((prevOutput) => prevOutput + "\n");
        }
      } else {
        // Si se muestran todos los mensajes, se limpia el intervalo
        clearInterval(typingTimer);
      }
    }, 25);

    // Limpieza del intervalo al desmontar el componente
    return () => clearInterval(typingTimer);
  }, [
    charIndex,
    messageIndex,
    messagesBeforeRobco,
    messagesAfterRobco,
    showRobcoAscii,
  ]);

  // Función para manejar cambios en el input
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Función para manejar el envío del input
  const handleInputSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === "start") {
      // Si se envía 'start', se reinicia el output después del ASCII de RobCo
      setOutputAfterRobco("");
      setShowRobcoAscii(false);
      setShowRobcoSystemMessage(true); // Mostrar el mensaje de sistema de RobCo
      setInputValue("");
    } else if (inputValue.trim() === "1") {
      // Si se envía '1', limpiar la pantalla y mostrar el texto de la opción 1
      clearHomeScreen();
      setOutputAfterRobco("Option 1 selected. Doing something...\n");
      setInputValue("");
    } else if (inputValue.trim() === "2") {
      // Si se envía '2', limpiar la pantalla y mostrar el texto de la opción 2
      clearHomeScreen();
      setOutputAfterRobco("Option 2 selected. Doing something else...\n");
      setInputValue("");
    } else if (inputValue.trim() === "3") {
      // Si se envía '3', limpiar la pantalla y mostrar el texto de la opción 3
      clearHomeScreen();
      setOutputAfterRobco("Option 3 selected. Doing something different...\n");
      setInputValue("");
    } else {
      // Si se envía otro comando, se muestra un mensaje de error
      setOutputAfterRobco(
        (prevOutput) => prevOutput + `Command '${inputValue}' not recognized.\n`
      );
      setInputValue("");
    }
  };

  // Retorno del JSX que representa el componente Terminal
  // Retorno del JSX que representa el componente Terminal
  // Retorno del JSX que representa el componente Terminal
  return (
    <div className="terminal">
      <div
        className="content"
        style={{
          padding: "10px",
          overflowY: "auto",
        }}
      >
        {/* Output antes del ASCII de RobCo */}
        {outputBeforeRobco && <pre>{outputBeforeRobco}</pre>}
        {/* Se muestra el ASCII de RobCo si showRobcoAscii es verdadero */}
        {showRobcoAscii && <pre>{robcoAsciiArt.join("\n")}</pre>}
        {/* Output después del ASCII de RobCo */}
        {outputAfterRobco && <pre>{outputAfterRobco}</pre>}
        {/* Se muestra el mensaje de sistema de RobCo solo si showRobcoSystemMessage es verdadero */}
        {showRobcoSystemMessage && (
          <>
            <pre style={{ textAlign: "center" }}>{robcoSystemMessage}</pre>
            <pre>{MessageAfterRobcoSystem}</pre>
            <pre>{Menu}</pre>
          </>
        )}
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
                width: "calc(100% - 30px)",
              }}
              autoFocus
            />
          </form>
        )}
        {/* Se muestra el salto de línea si showRobcoAscii es verdadero */}
        {showRobcoAscii && <br />}
      </div>
    </div>
  );
};

// Exporta el componente Terminal para poder ser utilizado en otros archivos
export default Terminal;
