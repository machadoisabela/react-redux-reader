import { LIST_COMMENTS, DELETE_COMMENT} from '../actions/commentsActions';

const commentsInitialState = {
    comments: []
}

function comments(state = commentsInitialState, action){
    switch(action.type){
        case LIST_COMMENTS:
            return{
                ...state,
                comments: action.comments
            }    
        case DELETE_COMMENT:
            return{
                ...state,
                comments: state.comments.filter(comment => comment.id !== action.id)
            }    
        default:
            return state
    }
}

export default comments;