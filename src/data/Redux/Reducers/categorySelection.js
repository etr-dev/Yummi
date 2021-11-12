const categoryReducer = (state = null, action) => {
    switch (action.type) {
      case 'SET_CATEGORY':
        return action.selection;
    }
    return state
  };
  export default categoryReducer;