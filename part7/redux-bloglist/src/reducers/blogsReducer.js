import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    set(state, action) {
      return action.payload;
    },

    create(state, action) {
      state.push(action.payload);
    },

    update(state, action) {
      const id = action.payload.id;
      return state.map((blog) => (blog.id === id ? action.payload : blog));
    },

    remove(state, action) {
      const id = action.payload.id;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const { set, create, update, remove } = blogSlice.actions;

export const initializedBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(set(blogs));
  };
};

export const updateBlog = (user, newBlog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(user, newBlog);
    dispatch(update(updatedBlog));
  };
};

export const commentBlog = (user, blogId, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.comment(user, blogId, comment);

    dispatch(update(updatedBlog));
  };
};

export const createNew = (user, newBlog) => {
  return async (dispatch) => {
    const blog = await blogService.create(user, newBlog);
    dispatch(create(blog));
  };
};

export const deleteBlog = (user, blogId) => {
  return async (dispatch) => {
    const blogToDelete = await blogService.deleteBlog(user, blogId);
    dispatch(remove(blogToDelete));
  };
};

export default blogSlice.reducer;
