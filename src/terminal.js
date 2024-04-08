import React, { useState, useEffect } from "react";
import "./terminal.css"; // Importa estilos específicos para el terminal
import "./font.css"; // Importa el CSS donde definiste la fuente

const Terminal = () => {
  const [inputValue, setInputValue] = useState("");
  const [outputBeforeRobco, setOutputBeforeRobco] = useState("");
  const [outputAfterRobco, setOutputAfterRobco] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showRobcoAscii, setShowRobcoAscii] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showRobcoSystemMessage, setShowRobcoSystemMessage] = useState(false);

  const messagesBeforeRobco = [
    "Initializing boot...",
    "Loading RobCo Unified OS...",
    "64K RAM detected...",
    "Launching Interface...",
  ];

  const robcoAsciiArt = [
    "   _____       _      _____                   ",
    "  |  __ \\     | |    / ____|                  ",
    "  | |__) |___ | |__ | |      ___               ",
    "  |  _  // _ \\| '_ \\| |     / _ \\              ",
    "  | | \\ \\ (_) | |_) | |____| (_) |             ",
    "  |_|  \\_\\___/|___./ \\_____|\\___/          ",
    " ",
  ];

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

  const clearHomeScreen = () => {
    setOutputAfterRobco("");
    setShowRobcoSystemMessage(false);
    setShowInput(false);
  };

  useEffect(() => {
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

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === "start") {
      setOutputAfterRobco("");
      setShowRobcoAscii(false);
      setShowRobcoSystemMessage(true);
      setInputValue("");
    } else if (inputValue.trim() === "1") {
      clearHomeScreen();
      setOutputAfterRobco("Option 1 selected. Doing something...\n");
      setInputValue("");
    } else if (inputValue.trim() === "2") {
      clearHomeScreen();
      setOutputAfterRobco("Option 2 selected. Doing something else...\n");
      setInputValue("");
    } else if (inputValue.trim() === "3") {
      clearHomeScreen();
      setOutputAfterRobco("Option 3 selected. Doing something different...\n");
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
