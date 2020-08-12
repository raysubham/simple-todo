import React, { useState, useEffect } from "react";
import "./css/App.css";
import { Button, Input, FormControl, InputLabel } from "@material-ui/core";
import Todo from "./Todo";
import firebase from "firebase";
import { db } from "./firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            todo: doc.data().todo,
            id: doc.id,
          }))
        );
      });
  });

  const addTodo = (e) => {
    e.preventDefault();
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  return (
    <div className="App">
      <h1>
        Todo App<span>🐱‍🏍</span>
      </h1>
      <form>
        <FormControl>
          <InputLabel>
            <span>⏹</span>Write a Todo
          </InputLabel>
          <Input
            autoFocus={true}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </FormControl>
        <Button
          disabled={!input}
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="secondary"
        >
          Add Task
        </Button>
      </form>
      <ul>
        {todos.map((todo) => (
          <Todo key={todo} todo={todo.todo} id={todo.id} />
        ))}
      </ul>
    </div>
  );
}

export default App;
