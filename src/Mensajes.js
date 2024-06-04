import React from "react";

const Mensajes = () => {
  // Mensajes a mostrar antes de la animación de RobCo
  const messagesBeforeRobco = [
    "Initializing boot...",
    "Loading RobCo Unified OS...",
    "64K RAM detected...",
    "Launching Interface...",
  ];

  // Arte ASCII de RobCo
  const robcoAsciiArt = [
    "   _____       _      _____                   ",
    "  |  __ \\     | |    / ____|                  ",
    "  | |__) |___ | |__ | |      ___               ",
    "  |  _  // _ \\| '_ \\| |     / _ \\              ",
    "  | | \\ \\ (_) | |_) | |____| (_) |             ",
    "  |_|  \\_\\___/|___./ \\_____|\\___/          ",
    " ",
  ];

  // Mensajes a mostrar después de la animación de RobCo
  const messagesAfterRobco = [
    "==============================================",
    "Personal Terminal 'Proto-Boy' Manufactured by RobCo",
    "Type start to continue:",
  ];

  // Mensaje del sistema de RobCo
  const robcoSystemMessage = `
ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM
COPYRIGHT 2075-2077 ROBCO INDUSTRIES
-Server 1-
`;

  // Mensaje después del sistema de RobCo
  const MessageAfterRobcoSystem = `
Personal Terminal -Proto-Boy- Manufactured by RobCo
_______________________________________
`;

  // Menú de opciones
  const Menu = `
  What would you like to do?
  1) View Journal Entries
  2) Log a Journal Entry
  3) Delete last Journal Entry
    `;

  const ViewJournalEntries = `Info: Type back to go to the home menu
  
Here are your Journal Entries
`;

  const LogJournalEntries = `Info: Type back to go to the home menu

Here you can log your entries. Type anything and press enter to save
`;
  
  const DeleteEntries=`Info: Type back to go to the home menu

Here you can delete your entries
`;

  return {
    messagesBeforeRobco,
    robcoAsciiArt,
    messagesAfterRobco,
    robcoSystemMessage,
    MessageAfterRobcoSystem,
    Menu,
    ViewJournalEntries,
    LogJournalEntries,
    DeleteEntries,
  };
};

export default Mensajes;
