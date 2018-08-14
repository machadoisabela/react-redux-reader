export const LIST_COMMENTS= "LIST_COMMENTS"
export const DELETE_COMMENT = "DELETE_COMMENT"
export const VOTE_COMMENT = "VOTE_COMMENT"
export const ADD_COMMENT = "ADD_COMMENT"
export const ADD_VOTE_ON_COMMENT = "ADD_VOTE_ON_COMMENT"
export const SHOW_COMMENT = "SHOW_COMMENT"
export const EDIT_COMMENT = "EDIT_COMMENT"

export function listComments(id, comments){
    return{
        type: LIST_COMMENTS,
        id,
        comments
    }
}

export function showComment(comment){
    return{
        type: SHOW_COMMENT,
        comment
    }
}

export function editComment(id, comment){
    return{
        type: EDIT_COMMENT,
        id,
        comment
    }
}

export function addComment(comment){
    return{
        type: ADD_COMMENT,
        comment
    }
}

export function deleteComment(id){
    return{
        type: DELETE_COMMENT,
        id
    }
}

export function addVoteOnComment(id, vote){
    return{
        type: ADD_VOTE_ON_COMMENT,
        id, 
        vote
    }
}



