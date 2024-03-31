import React, { useState } from 'react';
import './terminal.css';

const Terminal = () => {
  const [inputValue, setInputValue] = useState('');
  const [output, setOutput] = useState('Welcome to my portfolio terminal. Type "start" to initiate.');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === 'start') {
      setOutput('Portfolio initiated. You can now proceed with your commands.');
    } else {
      setOutput(`Command '${inputValue}' not recognized.`);
    }
    setInputValue('');
  };

  return (
    <div className="terminal">
      <div className="content">
        <pre>{output}</pre>
        <form onSubmit={handleInputSubmit}>
          <span className="prompt">$ </span>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="input"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;
