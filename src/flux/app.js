import React from "react";
import ToDoInput from "./components/ToDoInput";
import ToDoList from "./components/ToDoList";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>React flux todo demo with es6</h1>
        <ToDoInput/>
        <ToDoList/>
      </div>
    );
  }
}