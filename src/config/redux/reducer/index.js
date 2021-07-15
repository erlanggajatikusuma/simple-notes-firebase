
const initialState = {
    popup: false
  }


const reducer = (state = initialState, action) => {
    if(action.type === 'CHANGE_POPUP') {
      return {
        ...state,
        popup: action.value
      }
    }
  
    return state
  }
  
export default reducer;