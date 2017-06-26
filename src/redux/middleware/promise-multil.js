export default ({dispatch}) => (next) => (action) => {
  return Array.isArray(action)
    ? Promise.all(action.filter(Boolean).map((a) => dispatch(a)))
    : next(action);
};
