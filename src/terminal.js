import React, { useState, useEffect } from 'react';
import './terminal.css';
import './font.css'; // Importa el CSS donde definiste la fuente


const Terminal = () => {
  const [inputValue, setInputValue] = useState('');
  const [outputBeforeRobco, setOutputBeforeRobco] = useState('');
  const [outputAfterRobco, setOutputAfterRobco] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showRobcoAscii, setShowRobcoAscii] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showOutputAfterStart, setShowOutputAfterStart] = useState(true);

  const messagesBeforeRobco = [
    "Initializing boot...",
    "Loading RobCo Unified OS...",
    "64K RAM detected...",
    "Launching Interface..."
  ];

  const robcoAsciiArt = [
    "  _____       _      _____                   ",
    " |  __ \\     | |    / ____|                  ",
    " | |__) |___ | |__ | |      ___               ",
    " |  _  // _ \\| '_ \\| |     / _ \\              ",
    " | | \\ \\ (_) | |_) | |____| (_) |             ",
    " |_|  \\_\\___/|_.__/ \\_____|\\___/          ",
    "",
  ];

  const messagesAfterRobco = [
    "==============================================",
    "Personal Terminal 'Proto-Boy' Manufactured by RobCo",
    "Type start to continue:"
  ];

  useEffect(() => {
    const typingTimer = setInterval(() => {
      if (messageIndex < messagesBeforeRobco.length) {
        const currentMessage = messagesBeforeRobco[messageIndex];
        if (charIndex < currentMessage.length) {
          setOutputBeforeRobco(prevOutput => prevOutput + currentMessage.charAt(charIndex));
          setCharIndex(prevIndex => prevIndex + 1);
        } else {
          setMessageIndex(prevIndex => prevIndex + 1);
          setCharIndex(0);
          setOutputBeforeRobco(prevOutput => prevOutput + '\n');
        }
      } else if (messageIndex === messagesBeforeRobco.length) {
        setOutputBeforeRobco('');
        setShowRobcoAscii(true);
        setMessageIndex(prevIndex => prevIndex + 1);
      } else if (messageIndex < messagesBeforeRobco.length + messagesAfterRobco.length) {
        const currentMessage = messagesAfterRobco[messageIndex - messagesBeforeRobco.length];
        if (currentMessage === "Type start to continue:") {
          setShowInput(true);
        }
        if (charIndex < currentMessage.length) {
          setOutputAfterRobco(prevOutput => prevOutput + currentMessage.charAt(charIndex));
          setCharIndex(prevIndex => prevIndex + 1);
        } else {
          setMessageIndex(prevIndex => prevIndex + 1);
          setCharIndex(0);
          setOutputAfterRobco(prevOutput => prevOutput + '\n');
        }
      } else {
        clearInterval(typingTimer);
      }
    }, 50);
    return () => clearInterval(typingTimer);
  }, [charIndex, messageIndex, messagesBeforeRobco, messagesAfterRobco, showRobcoAscii]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === 'start') {
      setOutputAfterRobco('');
      setShowRobcoAscii(false);
      setShowOutputAfterStart(false);
      setInputValue('');
    } else {
      setOutputAfterRobco(prevOutput => prevOutput + `Command '${inputValue}' not recognized.\n`);
      setInputValue('');
    }
  };

  return (
    <div className="terminal">
      <div className="content" style={{
        padding: "10px",
        overflowY: "auto"
      }}>
        <pre>{outputBeforeRobco}</pre>
        {showRobcoAscii && (
          <pre>{robcoAsciiArt.join('\n')}</pre>
        )}
        <br />
        {showOutputAfterStart && <pre>{outputAfterRobco}</pre>}
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

export default Terminal;
