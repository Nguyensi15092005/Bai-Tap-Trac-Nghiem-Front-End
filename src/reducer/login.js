export const LoginReducer = (state = false, action) => {
    switch (action.type) {
        case "CHECK_LOGIN":
            return action;
    
        default:
            return state;
    }
} 