const initialState = {
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LIKES':
      return {
        ...state,
        likes: action.likes
      }
    default:
      return state;
  }
};
