import React, { PropTypes, Component }  from "react";
import ToDoActions from "../actions/ToDoActions";


export default class ToDoInput extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ""};
  }

  _onChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  _save() {
    ToDoActions.create(this.state.value);
    this.setState({
      value: ''
    });
  }

  render() {
    return (
      <input type="text"
             value={this.state.value}
             onChange={this._onChange.bind(this)}
             onBlur={this._save.bind(this)}/>
    )
  }
}