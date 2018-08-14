import { LIST_COMMENTS, DELETE_COMMENT, ADD_VOTE_ON_COMMENT, ADD_COMMENT, SHOW_COMMENT, EDIT_COMMENT} from '../actions/commentsActions';

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
        case ADD_COMMENT:
            return{
                ...state,
                comments: state.comments.concat([action.comment])
            }
        case SHOW_COMMENT: 
            return{
                ...state,
                comment: action.comment
            }
        case EDIT_COMMENT:
            return{
                ...state,
                comments: state.comments.map(comment => {
                    if(comment.id === action.id)
                        comment = action.comment
                    return comment;
                }),
                comment: null
            }
        case DELETE_COMMENT:
            return{
                ...state,
                comments: state.comments.filter(comment => comment.id !== action.id)
            }  
        case ADD_VOTE_ON_COMMENT:
            return{
                ...state,
                comments: state.comments.map(comment => {
                    if(comment.id === action.id)
                        comment.voteScore = comment.voteScore + action.vote
                    return comment;
                }),
            }
        default:
            return state
    }
}

export default comments;