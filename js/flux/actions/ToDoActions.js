import Dispatcher from "../dispatcher/AppDispatcher";

export default class ToDoActions {
  static create(text) {
    Dispatcher.dispatch({
      actionType: "CREATE",
      text: text
    })
  }
}