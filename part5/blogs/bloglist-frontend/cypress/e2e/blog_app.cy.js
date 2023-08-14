describe("Blog app", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("secondUser");
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
  });

  describe("Login", function () {
    this.beforeEach(function () {
      const firstUser = {
        username: "cypressUser",
        name: "log in",
        password: "loginPass",
      };
      cy.request("POST", "http://localhost:3003/api/users", firstUser);

      const secondUser = {
        username: "secondUser",
        name: "second example user",
        password: "secondPass",
      };
      cy.request("POST", "http://localhost:3003/api/users", secondUser);
    });

    it("succeeds with correct credentials", function () {
      cy.get("#username").type("cypressUser");
      cy.get("#password").type("loginPass");
      cy.get("#loginButton").click();
      cy.contains("Logged in successfully");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("cypressUser");
      cy.get("#password").type("wrongPass");
      cy.get("#loginButton").click();
      cy.contains("Wrong username or password").should("exist");
    });

    describe("when logged in", function () {
      beforeEach(function () {
        cy.request("POST", "http://localhost:3003/api/login", {
          username: "cypressUser",
          password: "loginPass",
        }).then((response) => {
          localStorage.setItem("loggedInUser", JSON.stringify(response.body));
          cy.visit("http://localhost:3000");
        });
      });

      it("A blog can be created", function () {
        cy.get("#newNote").click();
        const newNote = {
          title: "new note test",
          author: "cypress user",
          url: "www.apple.com",
        };

        cy.get("#title").type(newNote.title);
        cy.get("#author").type(newNote.author);
        cy.get("#url").type(newNote.url);
        cy.get("#createButton").click();

        cy.contains("Successfully created a new blog").should("exist");
        cy.contains(`${newNote.title} by ${newNote.author}`);
      });

      describe("and multiple blogs exists", function () {
        beforeEach(function () {
          const headers = {
            Authorization: `bearer ${
              JSON.parse(localStorage.getItem("loggedInUser")).token
            }`,
          };

          const firstBlog = {
            title: "example blog title",
            author: "Mac mini user",
            url: "www.apple.com",
            likes: 10,
          };

          const secondBlog = {
            title: "second example blog title",
            author: "Mac user",
            url: "www.canada.com",
            likes: 1,
          };

          cy.request({
            url: "http://localhost:3003/api/blogs",
            method: "POST",
            body: firstBlog,
            headers: headers,
          });

          cy.request({
            url: "http://localhost:3003/api/blogs",
            method: "POST",
            body: secondBlog,
            headers: headers,
          });

          cy.visit("http://localhost:3000");
        });

        it("user can like a blog", function () {
          cy.get(".detailButton").eq(0).click();
          cy.get(".likes")
            .eq(0)
            .invoke("text")
            .then((text) => {
              const currentLikes = Number(text);
              cy.get(".likeButton").eq(0).click();
              cy.get(".likes")
                .eq(0)
                .should("have.text", `${currentLikes + 1}`);
            });
        });

        it("user who created a blog can delete it", function () {
          cy.get(".title")
            .eq(0)
            .invoke("text")
            .then((text) => {
              cy.get(".deleteButton").eq(0).click();
              cy.get(".title").eq(0).should("not.have.text", text);
            });
        });

        it("only the creator can see the delete button of a blog", function () {
          cy.get("#logoutButton").click();
          cy.contains("Logged out successfully");

          cy.request("POST", "http://localhost:3003/api/login", {
            username: "secondUser",
            password: "secondPass",
          }).then((response) => {
            localStorage.setItem("secondUser", JSON.stringify(response.body));

            cy.visit("http://localhost:3000");

            cy.get(".detailButton").eq(0).should("exist");
            cy.get(".deleteButton").should("not.exist");
          });
        });

        it("blogs are ordered according to the number of likes", function () {
          cy.get(".detailButton").each(($button) => {
            cy.wrap($button).click();
          });

          cy.get(".title").eq(0).should("contain", "example blog title");
        });
      });
    });
  });
});
