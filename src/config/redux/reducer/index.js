
const initialState = {
    popup: false,
    user: {},
    loading: false,
    isLogin: false
  }


const reducer = (state = initialState, action) => {
    if(action.type === 'CHANGE_POPUP') {
      return {
        ...state,
        popup: action.value
      }
    }

    if(action.type === 'CHANGE_USER') {
      return {
        ...state,
        user: action.value
      }
    }

    if(action.type === 'SET_LOADING') {
      return {
        ...state,
        loading: action.value
      }
    }

    if(action.type === 'CHANGE_ISLOGIN') {
      return {
        ...state,
        isLogin: action.value
      }
    }
  
    return state
  }
  
export default reducer;