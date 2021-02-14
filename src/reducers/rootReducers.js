// import authReducer from "./authReducers";

// export default combineReducers({
//   auth: authReducer,
// });
let finalState = {}
const initialstate = {
    todos: [],
    users: [],
    posts: []
}

const rootReducer = (state = initialstate, action) => {
    if(action.type==='setUsers'){    
        return {
            ...state,
            users: [...action.payload]
        }   
    }
    if(action.type === 'setPosts') {
        initialstate.posts = [];
        return {
            ...state,
            posts: [...action.payload]
        }
    }
    if(action.type==='update') {
        return {
            ...state,
            cart: state.cart.map((val) => {
                if(val.id===action.data.id){
                    if(action.data.qty>-1){
                       val.qty = action.data.qty
                       val.price = val.singlePrice * val.qty;
                       return val;
                    }
                }
                return val;
            })
        }
    }
    if(action.type=='clearCart') {
        return {
            ...state,
            cart: []
        }
    }
    return state;
    
}

export default rootReducer;
