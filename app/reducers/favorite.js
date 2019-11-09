const initialState = {
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FAVORITES':
      return {
        ...state,
        favorites: action.favorites
      }
    default:
      return state;
  }
};
