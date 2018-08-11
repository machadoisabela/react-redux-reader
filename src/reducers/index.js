import { combineReducers } from 'redux'
import posts from './postsReducers'
import comments from './commentsReducers'
import categories from './categoriesReducers'


export default combineReducers({
    posts,
    categories,
    comments
})