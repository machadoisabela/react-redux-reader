const api = "http://localhost:3001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  "Content-Type": "application/json"
}


export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then((data) => {
      return data;
    })

export const getAllPostsForCategory = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then((data) => {
      return data;
    })

export const getPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())
    .then((data) => {
      return data;
    })


export const addNewPost = (data) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then((data) => {
      return data;
    })

export const getDeletePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers
  })

export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then((data) => {
      return data;
    })
export const getAllComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then((data) => {
      return data;
    })

export const addNewComment = (data) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then((data) => {
      return data;
    })

export const deleteComments = (id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers
  })

export const vote = (id, option) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(option)
  })

export const voteComment = (id, option) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(option)
  })


