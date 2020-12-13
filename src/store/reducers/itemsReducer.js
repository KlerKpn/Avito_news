import { SET_ITEMS, CHANGE_LOADING } from '../actions/actionTypes'

const initialState = {
    items: [],
    loading: true
}

export default function itemsReducer(state = initialState, action) {
    
    switch (action.type) {
        case SET_ITEMS:
            return {
                ...state, items: action.payload
            }
        case CHANGE_LOADING: {
            return {
                ...state, loading: action.payload
            }
        }

        default:
            return state
    }
}
