import React, { useState, useEffect } from "react";
import "./terminal.css"; // Importa estilos específicos para el terminal
import "./font.css"; // Importa el CSS donde está la fuente
import Mensajes from "./Mensajes.js"; // Importa el componente Mensajes


const Terminal = () => {
  // Estados para manejar la entrada y salida del terminal
  const [inputValue, setInputValue] = useState("");
  const [outputBeforeRobco, setOutputBeforeRobco] = useState("");
  const [outputAfterRobco, setOutputAfterRobco] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showRobcoAscii, setShowRobcoAscii] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showRobcoSystemMessage, setShowRobcoSystemMessage] = useState(false);
  const [inputHistory, setInputHistory] = useState([]);

  const {
    messagesBeforeRobco,
    robcoAsciiArt,
    messagesAfterRobco,
    robcoSystemMessage,
    MessageAfterRobcoSystem,
    Menu,
    ViewJournalEntries,
    LogJournalEntries
  } = Mensajes(); // Extrae los mensajes del componente Mensajes
  // Mensajes a mostrar antes de la animación de RobCo
  

  // Función para limpiar la pantalla del terminal
  const clearHomeScreen = () => {
    setOutputAfterRobco("");
    setShowRobcoSystemMessage(false);
    setShowInput(false);
  };

  useEffect(() => {
    // Efecto para simular la animación de escritura
    const typingTimer = setInterval(() => {
      if (messageIndex < messagesBeforeRobco.length) {
        const currentMessage = messagesBeforeRobco[messageIndex];
        if (charIndex < currentMessage.length) {
          setOutputBeforeRobco(
            (prevOutput) => prevOutput + currentMessage.charAt(charIndex)
          );
          setCharIndex((prevIndex) => prevIndex + 1);
        } else {
          setMessageIndex((prevIndex) => prevIndex + 1);
          setCharIndex(0);
          setOutputBeforeRobco((prevOutput) => prevOutput + "\n");
        }
      } else if (messageIndex === messagesBeforeRobco.length) {
        setOutputBeforeRobco("");
        setShowRobcoAscii(true);
        setMessageIndex((prevIndex) => prevIndex + 1);
      } else if (
        messageIndex <
        messagesBeforeRobco.length + messagesAfterRobco.length
      ) {
        const currentMessage =
          messagesAfterRobco[messageIndex - messagesBeforeRobco.length];
        if (currentMessage === "Type start to continue:") {
          setShowInput(true);
        }

        if (charIndex < currentMessage.length) {
          setOutputAfterRobco(
            (prevOutput) => prevOutput + currentMessage.charAt(charIndex)
          );
          setCharIndex((prevIndex) => prevIndex + 1);
        } else {
          setMessageIndex((prevIndex) => prevIndex + 1);
          setCharIndex(0);
          setOutputAfterRobco((prevOutput) => prevOutput + "\n");
        }
      } else {
        clearInterval(typingTimer);
      }
    }, 25);

    return () => clearInterval(typingTimer);
  }, [
    charIndex,
    messageIndex,
    messagesBeforeRobco,
    messagesAfterRobco,
    showRobcoAscii,
  ]);

  // Manejar el cambio en la entrada del usuario
  const handleInputChange = (event) => {
      setInputValue(event.target.value);
  };

  // Manejar el envío de la entrada del usuario
  const handleInputSubmit = (event) => {
    event.preventDefault();
    setInputHistory([...inputHistory, inputValue.trim()]); // Guardar la entrada en el historial
    if (inputValue.trim() === "start" || inputValue.trim() === "back") {
      setOutputAfterRobco("");
      setShowRobcoAscii(false);
      setShowRobcoSystemMessage(true);
      setInputValue("");
    } else if (inputValue.trim() === "1") {
      clearHomeScreen();
      setOutputAfterRobco(ViewJournalEntries);
      setShowInput(true);
      setInputValue("");
    } else if (inputValue.trim() === "2") {
      clearHomeScreen();
      setOutputAfterRobco(LogJournalEntries);
      setShowInput(true);
      setInputValue("");
    } else if (inputValue.trim() === "3") {
      clearHomeScreen();
      setOutputAfterRobco("Option 3 selected. Doing something different...\n");
      setShowInput(true);
      setInputValue("");
    } else {
      setOutputAfterRobco(
        (prevOutput) => prevOutput + `Command '${inputValue}' not recognized.\n`
      );
      setInputValue("");
    }
  };

  return (
    <div className="terminal">
      <div className="content" style={{ padding: "10px", overflowY: "auto" }}>
        {outputBeforeRobco && <pre>{outputBeforeRobco}</pre>}
        {showRobcoAscii && <pre>{robcoAsciiArt.join("\n")}</pre>}
        {outputAfterRobco && <pre>{outputAfterRobco}</pre>}
        {showRobcoSystemMessage && (
          <>
            <pre style={{ textAlign: "center" }}>{robcoSystemMessage}</pre>
            <pre>{MessageAfterRobcoSystem}</pre>
            <pre>{Menu}</pre>
          </>
        )}
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
                fontFamily: "FSEX300",
                outline: "none",
                fontSize: "large",
                width: "calc(100% - 30px)",
              }}
              autoFocus
            />
          </form>
        )}
        {showRobcoAscii && <br />}
      </div>
    </div>
  );
};

export default Terminal;
