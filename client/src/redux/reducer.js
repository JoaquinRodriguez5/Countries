const initialState = {
    countries: [],
  };
  
const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_COUNTRIES':
        return {
          ...state,
          countries: action.payload,
        };
      default:
        return state;
    }
  }
  
  export default reducer;