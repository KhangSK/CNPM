export default (state, action) => {
  switch (action.type) {
    case 'GET_STALLS': {
      return {
        ...state,
        stalls: action.payload
      }
    }
    case 'GET_PRODUCTS': {
      return {
        ...state,
        products: action.payload
      }
    }

    case 'SET_CURRENT_USER': {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      }
    }

    case 'LOGOUT_USER': {
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      }
    }

    case 'ADD_NEW_STALL': {
      return {
        ...state,
        stalls: [...state.stalls, action.payload]
      }
    }

    case 'ADD_NEW_PRODUCT': {
      return {
        ...state,
        products: [...state.products, action.payload]
      }
    }

    case 'DELETE_PRODUCT': {
      return {
        ...state,
        products: state.products.filter(item => item._id !== action.payload)
      }
    }

    case 'ADD_PRODUCT_TO_BILL': {
      let id = action.payload
      if (state.bill && Object.keys(state.bill).includes(id)) {
        state.bill[`${id}`] += 1
      } else {
        state.bill[`${id}`] = 1
      }
      return {
        ...state,
        bill: state.bill
      }
    }

    case 'MINUS_PRODUCT_FROM_BILL': {
      // console.log('22')
      let id = action.payload
      if (state.bill && Object.keys(state.bill).includes(id)) {
        if (state.bill[`${id}`] == 1) {
          delete state.bill[`${id}`]
        } else {
          state.bill[`${id}`] += -1
        }
        // console.log(state.bill[`${id}`])
      }
      return {
        ...state,
        bill: state.bill
      }
    }

    case 'CLEAR_BILL': {

      return {
        ...state,
        bill: {}
      }
    }

    case 'SET_CURRENT_BILL': {
      return {
        ...state,
        bill: action.payload
      }
    }

    case 'GET_BILLS': {
      return {
        ...state,
        bills: action.payload
      }
    }

    default:
      return state
  }
}