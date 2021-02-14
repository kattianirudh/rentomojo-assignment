import axios from "axios";

const URL = 'https://jsonplaceholder.typicode.com';
export const fetchUsers = async (dispatch) => {
//   const res = await axios.get(URL+"/users");
//   dispatch({ type: 'random', payload: res.data });
    axios.get(URL+"/users").then((res) => {
        dispatch({ type: 'setUsers', payload: res.data })
    })
};

export const fetchTodos = () => async (dispatch) => {
  const res = await axios.get(URL+"/todos");
  dispatch({ type: 'stuff', payload: res.data });
};

export const fetchPosts = (userId, skip=0, limit=10) => async (dispatch) => {
  if(userId) {
    axios.get(URL+"/posts?userId="+userId+"&skip="+skip+"&limit="+limit).then((res) => {
    dispatch({ type: 'setPosts', payload: res.data })
  }).catch((err) => {
    console.error('fetch Posts did not work');
  })
  }
};

export const fetchPost = (postId) => async (dispatch) => {
  if(postId) {
    return axios.get(URL+"/posts/"+postId)
  }
};

export const fetchComments = (postId) => async (dispatch) => {
  if(postId) {
    return axios.get(URL+"/comments?postId="+postId)
  }
};

export const deleteComments = (postId) => async (dispatch) => {
  if(postId) {
    return axios.delete(URL+"/posts/"+postId)
  }
};



