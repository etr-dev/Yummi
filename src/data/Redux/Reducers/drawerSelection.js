const drawerReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_DRAWER':
      return action.selection;
  }
  return state
};
export default drawerReducer;
