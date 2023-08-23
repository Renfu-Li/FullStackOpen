import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateBlog from "./CreateBlog";

test("form calls the event handler with the right details", async () => {
  const createBlog = jest.fn();
  render(<CreateBlog createBlog={createBlog}></CreateBlog>);

  const inputBoxes = screen.getAllByRole("textbox");
  const createButton = screen.getByText("Create");

  const mockBlog = {
    title: "fake title",
    author: "developer & businessman",
    url: "www.apple.com",
  };

  userEvent.type(inputBoxes[0], mockBlog.title);
  userEvent.type(inputBoxes[1], mockBlog.author);
  userEvent.type(inputBoxes[2], mockBlog.url);
  userEvent.click(createButton);

  expect(createBlog).toHaveBeenCalledWith(mockBlog);
});
