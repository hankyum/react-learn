const reducerMap = {
  "INCREMENT": ({num}, state) => {
    console.log(JSON.stringify(num) + "   " + state);
    return state + num
  },
  "DECREMENT": (payload = -1, state) => state + payload,
  "RESET": ()=> 0
};

const createReducer = (reducerMap, initial = 0) => {
  return (state = initial, {type, payload}) => {
    if (typeof reducerMap[type] === "function") {
      return reducerMap[type](payload, state);
    }
    return state;
  }
};

export const counterReducer = createReducer(reducerMap, 0);