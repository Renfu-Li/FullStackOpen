describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);

    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };

    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
  });

  describe("before logged in", function () {
    beforeEach(function () {
      cy.visit("");
    });

    it("front page can be opened", function () {
      cy.contains("Notes");
      cy.contains(
        "Note app, Department of Computer Science, University of Helsinki 2023"
      );
    });

    it("user can log in", function () {
      cy.contains("Log in").click();
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();

      cy.contains("mluukkai logged in");
    });

    it("login fails with wrong password", function () {
      cy.contains("Log in").click();
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get(".error").should("contain", "Wrong credentials");
      cy.get("html").should("not.contain", "mluukkai logged in");
      cy.contains("mluukkai logged in").should("not.exist");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "mluukkai", password: "salainen" });
    });

    it("a new note can be created", function () {
      cy.contains("Create New Note").click();
      cy.get("input").type("a new note created by cypress");
      cy.contains("save").click();
      cy.contains("a new note created by cypress");
    });

    describe("and a note exists", function () {
      beforeEach(function () {
        cy.createNote({
          content: "a new note created by cypress",
          important: true,
        });
      });

      it("it can be made not important", function () {
        cy.contains("a new note created by cypress")
          .parent()
          .find("button")
          .click();
        cy.contains("a new note created by cypress")
          .parent()
          .contains("make important");
      });
    });

    describe("and several notes exists", function () {
      beforeEach(function () {
        cy.createNote({
          content: "a new note created by cypress",
          important: false,
        });

        cy.createNote({
          content: "second note",
          important: false,
        });

        cy.createNote({
          content: "third note",
          important: false,
        });
      });

      it("one of those can be made important", function () {
        cy.contains("second note").parent().find("button").as("theButton");
        cy.get("@theButton").click();
        cy.get("@theButton").should("contain", "make not important");
      });
    });
  });
});
