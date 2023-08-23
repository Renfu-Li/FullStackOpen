import { Table } from "react-bootstrap";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import userService from "../services/users";
import { useState, useEffect } from "react";
import { Routes, Route, Link, useMatch } from "react-router-dom";
import BlogsByAuthor from "../components/BlogsByAuthor";
import BlogDetail from "./BlogDetail";

const UserInfo = ({ users }) => {
  return (
    <div>
      <h3>Users</h3>
      <Table>
        <tbody>
          <tr>
            <td></td>
            <td>
              <strong>Blogs created</strong>
            </td>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserInfo;
