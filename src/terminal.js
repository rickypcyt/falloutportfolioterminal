import React, { useState, useEffect } from "react";
import "./terminal.css";
import "./font.css";
import Mensajes from "./Mensajes.js";

const Terminal = () => {
  const [inputValue, setInputValue] = useState("");
  const [outputBeforeRobco, setOutputBeforeRobco] = useState("");
  const [outputAfterRobco, setOutputAfterRobco] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showRobcoAscii, setShowRobcoAscii] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showRobcoSystemMessage, setShowRobcoSystemMessage] = useState(false);
  const [inputHistory, setInputHistory] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  const [loggingMode, setLoggingMode] = useState(false);

  const {
    messagesBeforeRobco,
    robcoAsciiArt,
    messagesAfterRobco,
    robcoSystemMessage,
    MessageAfterRobcoSystem,
    Menu,
    ViewJournalEntries,
    LogJournalEntries,
    DeleteEntries,
  } = Mensajes();

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
  setInputHistory([...inputHistory, inputValue.trim()]);
  if (inputValue.trim() === "start" || inputValue.trim() === "back") {
    setOutputAfterRobco("");
    setShowRobcoAscii(false);
    setShowRobcoSystemMessage(true);
    setInputValue("");
  } else if (inputValue.trim() === "1") {
    clearHomeScreen();
    if (journalEntries.length > 0) {
      setOutputAfterRobco("Select entry number to view:\n");
      setOutputAfterRobco(
        journalEntries.map((entry, index) => `${index + 1}. ${entry}`).join("\n")
      );
      setShowInput(true);
    } else {
      setOutputAfterRobco("No entries found.\n");
    }
    setShowInput(true);
    setLoggingMode(false);
    setInputValue("");
  } else if (inputValue.trim() === "2") {
    clearHomeScreen();
    setOutputAfterRobco(LogJournalEntries);
    setShowInput(true);
    setLoggingMode(true);
    setInputValue("");
  } else if (inputValue.trim() === "3") {
    clearHomeScreen();
    if (journalEntries.length > 0) {
      setOutputAfterRobco("Select entry number to delete:\n");
      setOutputAfterRobco(
        journalEntries.map((entry, index) => `${index + 1}. ${entry}`).join("\n")
      );
      setShowInput(true);
    } else {
      setOutputAfterRobco("No entries found.\n");
      setShowInput(true);
          setInputValue("");


    }
    setInputValue("");
  } else if (inputValue.trim().startsWith("delete ")) {
    const entryIndex = parseInt(inputValue.trim().substring(7), 10) - 1;
    handleDeleteEntry(entryIndex);
    setInputValue("");
  } else if (loggingMode) {
    setJournalEntries([...journalEntries, inputValue]);
    localStorage.setItem("journalEntries", JSON.stringify(journalEntries));
    clearHomeScreen();
    setOutputAfterRobco("Entry logged, you can now go back.\n");
    setShowInput(true);
    setInputValue("");
  } else {
    setOutputAfterRobco(
      (prevOutput) => prevOutput + `Command '${inputValue}' not recognized.\n`
    );
    setInputValue("");
  }
};

  const handleDeleteEntry = (entryIndex) => {
    if (entryIndex >= 0 && entryIndex < journalEntries.length) {
      const updatedEntries = [...journalEntries];
      updatedEntries.splice(entryIndex, 1);
      setJournalEntries(updatedEntries);
      localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
      clearHomeScreen();
      setOutputAfterRobco(`Entry ${entryIndex + 1} deleted, you can now go back.\n`);
      setInputValue("");

    } else {
      setOutputAfterRobco("Invalid entry number.\n");
    }
    setShowInput(true);
  };

  const handleEntrySelection = (entryIndex) => {
    if (entryIndex >= 0 && entryIndex < journalEntries.length) {
      clearHomeScreen();
      setOutputAfterRobco(
        `Entry ${entryIndex + 1}:\n${journalEntries[entryIndex]}\n`
      );
    } else {
      setOutputAfterRobco("Invalid entry number.\n");
    }
    setShowInput(false);
  };

  useEffect(() => {
    const storedEntries = localStorage.getItem("journalEntries");
    if (storedEntries) {
      setJournalEntries(JSON.parse(storedEntries));
    }
  }, []);

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
