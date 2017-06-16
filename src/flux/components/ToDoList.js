import React, {Component} from "react";
import ToDoStore from "../store/ToDoStore";

export default class ToDoList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allToDos: ToDoStore.getAll()
    };
  }

  componentWillMount() {
    ToDoStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    ToDoStore.removeChangeListener(this._onChange.bind(this));
  }

  render() {
    let eles = this.state.allToDos.map((todo, i) => {
      return <li key={i + todo.text}>{todo.text}</li>
    });

    return (
      <ul>
        {eles}
      </ul>
    );
  }

  _onChange() {
    this.setState({
      allToDos: ToDoStore.getAll()
    });
  }
}