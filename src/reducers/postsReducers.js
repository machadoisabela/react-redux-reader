import { LIST_POSTS, LIST_POSTS_FOR_CATEGORY, DELETE_POST, ADD_VOTE, ADD_POST } from '../actions/postActions';

const postsInitialState = {
    posts: []
}

function posts(state = postsInitialState, action){
    switch(action.type){
        case LIST_POSTS:
            return{
                ...state,
                posts: action.posts
            }
        case LIST_POSTS_FOR_CATEGORY:
            return{
                ...state,
                category: action.category,
                posts: action.posts
            }
        case ADD_POST:
            return{
                ...state,
                posts: state.posts.concat([action.post])
            }
        case DELETE_POST:
            return{
                ...state,
                posts: state.posts.filter(post => post.id !== action.id)
            }
        case ADD_VOTE: 
            return{
                ...state,
                posts: state.posts.map(post => {
                    if(post.id === action.id)
                        post.voteScore = post.voteScore + action.vote
                    return post;
                })
            }
        default:
            return state
    }
}

export default posts;