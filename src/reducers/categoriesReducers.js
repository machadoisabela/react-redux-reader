import { LIST_CATEGORIES, SELECT_CATEGORY } from '../actions/categoryActions';

const categoriesInitialState = {
    categories: [],
    category: null
}

function categories(state = categoriesInitialState, action){
    switch(action.type){
        case LIST_CATEGORIES:
            return{
                ...state,
                categories: action.categories
            }    
        case SELECT_CATEGORY:
            return{
                ...state,
                category: action.category
            }    
        default:
            return state
    }
}

export default categories;