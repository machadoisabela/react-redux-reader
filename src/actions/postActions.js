export const LIST_POSTS = "LIST_POSTS"
export const LIST_POSTS_FOR_CATEGORY = "LIST_POSTS_FOR_CATEGORY"
export const ADD_POST = "ADD_POST"
export const DELETE_POST = "DELETE_POST"
export const ADD_VOTE = "ADD_VOTE"


export function listPosts(posts){
    return{
        type: LIST_POSTS,
        posts
    }
}


export function listPostsForCategory(category, posts){
    return{
        type: LIST_POSTS_FOR_CATEGORY,
        category,
        posts
    }
}

export function addPost(post){
    return{
        type: ADD_POST,
        post
    }
}


export function deletePost(id){
    return{
        type: DELETE_POST,
        id
    }
}

export function addVote(id, vote){
    return{
        type: ADD_VOTE,
        id,
        vote
    }
}
