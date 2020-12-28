import React, { useState, useEffect } from "react";
import ToDoItem from './toDoitem';
import InputArea from "./InputArea";
import axios from 'axios';

function App() {
  const [inputData, setInputData] = useState([]);
  const [text, setText] = useState({ name: "" });

  useEffect(() => {
    requestToDoList()
  }, []);



  const requestToDoList = async () => {
    await axios
      .get('http://localhost:5000/')
      .then(res => {
        setInputData(res.data);
      })
      .catch(error => {
        console.error('error: ', error);
      });
  }

  function HandleChange(event) {
    const newData = event.target.value;
    setText({ name: newData });
  }

  const HandleClick = async () => {

    await axios.post('http://localhost:5000/', text)
      .then(res => setInputData((prevData) => {
        return [...prevData, res.data];
      }));
    setText({ name: "" });
  }

  function DeleteItem(id) {
    axios.delete(`http://localhost:5000/${id}`)
      .then(res => {
        setInputData((prevData) => {
          return prevData.filter((data) => {
            return data._id !== id;
          });
        });
      });
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <InputArea
        onChanging={HandleChange}
        value={text.name}
        onClicking={HandleClick}
      />
      <div>
        <ul>
          {inputData.map((data, index) => {
            return (
              <ToDoItem key={index} id={data._id} text={data.name} onChecked={DeleteItem} />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
