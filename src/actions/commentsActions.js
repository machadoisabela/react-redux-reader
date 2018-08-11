import * as API from '../utils/api';

export const LIST_COMMENTS= "LIST_COMMENTS"
export const DELETE_COMMENT = "DELETE_COMMENT"
export const VOTE_COMMENT = "VOTE_COMMENT"
export const ADD_COMMENT = "ADD_COMMENT"


export function listComments(id, comments){
    return{
        type: LIST_COMMENTS,
        id,
        comments
    }
}
export function getComments(id){
    return(dispatch) => {
        API.getAllComments(id).then((response) => dispatch(listComments(id, response)))
    }
}

export function deletePostComment(id){
    return{
        type: DELETE_COMMENT,
    }
}
export function deleteComment(id){
    return(dispatch) => {
        API.deleteComments(id).then(() => dispatch(deletePostComment(id)))
    }
}

