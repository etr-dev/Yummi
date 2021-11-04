const dateReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_DATE":
      return action.selection;
  }
  return state;
};
export default dateReducer;
