import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Link, useMatch, Routes, Route } from "react-router-dom";

import BlogList from "./BlogList";
import UserInfo from "./UserInfo";
import BlogDetail from "./BlogDetail";
import BlogsByAuthor from "./BlogsByAuthor";
import Togglable from "./Togglable";
import CreateBlog from "./CreateBlog";

const Menu = ({ user, users, blogs }) => {
  const dispatch = useDispatch();
  const userMatch = useMatch("/users/:id");
  const userToShow = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  const blogMatch = useMatch("/blogs/:id");
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(setUser(null));

    dispatch(setNotification("Logged out successfully"));
    setTimeout(() => dispatch(setNotification("")), 5000);
  };

  const padding = {
    paddingRight: 5,
  };

  return (
    <div>
      <div>
        <Link to="/blogs" style={padding}>
          Blogs
        </Link>
        <Link to="/users" style={padding}>
          Users
        </Link>
        {user.username} logged in
        <button id="logoutButton" onClick={handleLogout}>
          <Link to="/">Logout</Link>
        </button>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <Togglable>
              <CreateBlog></CreateBlog>
            </Togglable>
          }
        ></Route>
        <Route
          path="/blogs"
          element={<BlogList user={user}></BlogList>}
        ></Route>
        <Route
          path="/blogs/:id"
          element={<BlogDetail blog={blog}></BlogDetail>}
        ></Route>
        <Route
          path="/users"
          element={<UserInfo users={users}></UserInfo>}
        ></Route>
        <Route
          path="/users/:id"
          element={<BlogsByAuthor user={userToShow}></BlogsByAuthor>}
        ></Route>
      </Routes>
    </div>
  );
};

export default Menu;
