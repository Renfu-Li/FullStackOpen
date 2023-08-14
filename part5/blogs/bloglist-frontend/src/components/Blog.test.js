import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./BlogList.js";

describe("Blog component", () => {
  let container;
  let mockSetBlogs;

  beforeEach(() => {
    const mockUser = {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRlYWQgVHJ1bXAiLCJpZCI6IjY0YzVlZDFiMWY0YzI2MWYzOTcwYTE0OCIsImlhdCI6MTY5MTYzODEwMCwiZXhwIjoxNjkxNjQxNzAwfQ.iWEo2QLhRUxqkcpGY0OK3n8Em5EqxZeIhgQD34Q9Ljk",
      username: "Dead Trump",
      name: "Truly Dead Trump",
    };

    const mockBlog = {
      id: 1,
      title: "testing Blog component",
      author: "tester",
      likes: 10,
    };

    const mockBlogs = [];

    mockSetBlogs = jest.fn();

    const mockBlogService = {
      update: jest.fn(),
    };

    container = render(
      <Blog
        user={mockUser}
        blog={mockBlog}
        blogs={mockBlogs}
        setBlogs={mockSetBlogs}
        blogService={mockBlogService}
      ></Blog>
    ).container;
  });

  test("Blog component only renders the title and author initially", async () => {
    const title = container.querySelector(".title");
    const author = container.querySelector(".author");
    const url = container.querySelector(".url");
    const likes = container.querySelector(".likes");

    expect(title).toBeInTheDocument();
    expect(author).toBeInTheDocument();
    expect(url).not.toBeInTheDocument();
    expect(likes).not.toBeInTheDocument();
  });

  test("show blog details when button clicked", async () => {
    const button = screen.getByText("Show");
    userEvent.click(button);

    const url = container.querySelector(".url");
    const likes = container.querySelector(".likes");

    expect(url).toBeInTheDocument();
    expect(likes).toBeInTheDocument();
  });

  test("likes button calls the event handler", async () => {
    const showButton = screen.getByText("Show");
    userEvent.click(showButton);

    const likeButton = screen.getByText("Like");
    userEvent.click(likeButton);
    userEvent.click(likeButton);

    await waitFor(() => {
      expect(mockSetBlogs.mock.calls).toHaveLength(2);
    });
  });
});
