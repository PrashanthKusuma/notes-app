import { useState } from "react";
import Notes from "./Notes";
import "./styles.css";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div className={darkMode ? "App dark" : "App light"}>
      <div className="header">
        <span>Notes...</span>
        <button onClick={handleDarkMode}>Dark mode</button>
      </div>
      <Notes />
    </div>
  );
}
