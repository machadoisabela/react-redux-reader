export const LIST_CATEGORIES = "LIST_CATEGORIES"
export const SELECT_CATEGORY = "SELECT_CATEGORY"

export function listCategories(categories){
    return{
        type: LIST_CATEGORIES,
        categories
    }
}

export function selectCategory(category){
    return{
        type: SELECT_CATEGORY,
        category
    }
}
