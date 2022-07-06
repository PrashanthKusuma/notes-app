import { useState } from "react";
import data from "./data.json";

const Notes = () => {
  let today = new Date();
  let date =
    today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();

  const [inputData, setInputData] = useState(data);
  const [input, setInput] = useState("");
  const handleSubmit = () => {
    const tempData = [...inputData, { notes: input, date: date }];
    setInputData(tempData);
    setInput("");
  };
  const deleteNotes = (index) => {
    let deleteData = [...inputData];
    deleteData.splice(index, 1);
    setInputData(deleteData);
  };
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="notes">
      <div className="search">
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search notes....."
        />
      </div>
      {!searchTerm ? (
        <div className="notesCards">
          {inputData.map((element, index) => {
            return (
              <div className="cards" key={index}>
                <span className="notesTxt">{element.notes}</span>
                <div className="cardBottom">
                  <span className="notesTime">{element.date}</span>
                  <button
                    className="delete material-symbols-outlined"
                    onClick={() => deleteNotes(index)}
                  >
                    delete
                  </button>
                </div>
              </div>
            );
          })}
          <div className="cards">
            <textarea
              placeholder="Enter text here..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
            ></textarea>
            <button onClick={handleSubmit}>save</button>
          </div>
        </div>
      ) : (
        <div className="notesCards">
          {inputData
            .filter((element) => {
              return element.notes.includes(searchTerm);
            })
            .map((element, index) => {
              return (
                <div className="cards" key={index}>
                  <span className="notesTxt">{element.notes}</span>
                  <div className="cardBottom">
                    <span className="notesTime">{element.date}</span>
                    <button
                      className="delete material-symbols-outlined"
                      onClick={() => deleteNotes(index)}
                    >
                      delete
                    </button>
                  </div>
                </div>
              );
            })}
          <div className="cards">
            <textarea
              placeholder="Enter text here..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
            ></textarea>
            <button onClick={handleSubmit}>save</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Notes;
