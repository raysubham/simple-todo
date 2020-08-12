import React, { useState } from "react";
import { List, ListItem, ListItemText, Modal, Button } from "@material-ui/core";
import { db } from "./firebase";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo({ todo, id }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  // const handleOpen = () => {
  //   setOpen(true);
  // };
  const updateTodo = () => {
    setOpen(false);
    db.collection("todos").doc(id).set(
      {
        todo: input,
      },
      { merge: true }
    );
  };

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <h1>Modal</h1>
          <input
            placeholder={todo}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button onClick={updateTodo}>Update Todo</Button>
        </div>
      </Modal>
      <List className="todo-list">
        <ListItem alignItems="center">
          <ListItemText primary={`✔${todo}`} secondary="Deadline⏰" />
        </ListItem>
        <Button onClick={(e) => setOpen(true)}>Edit</Button>
        <Button>
          <DeleteIcon
            className="delete"
            onClick={(event) => db.collection("todos").doc(id).delete()}
          />
        </Button>
      </List>
    </>
  );
}

export default Todo;
