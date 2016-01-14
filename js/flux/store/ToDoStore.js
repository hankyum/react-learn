import Dispatcher from "../dispatcher/AppDispatcher";
import {EventEmitter} from "events";

let _todos = [{
  text: "hello this is test todo"
}];

let CHANGE_EVENT = "change";

class ToDoStore extends EventEmitter {

   emitChange() {
    this.emit(CHANGE_EVENT);
  }

   addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

   removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

   getAll() {
    return _todos;
  }
}

let _Store = new ToDoStore();

Dispatcher.register(function (action) {
  switch (action.actionType) {
    case "CREATE":
      _todos.push({
        text: action.text
      });
      _Store.emitChange();
      break;
    default:
      console.log("Not action type defined");
  }

});

export default _Store;