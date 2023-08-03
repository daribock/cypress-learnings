/// <reference types="Cypress" />

describe('tasks management', () => {
  it('should open and close the new taks modal', () => {
    cy.visit('http://localhost:5173/');
    cy.get('button').contains('Add Task').click();
    cy.get('.backdrop').click({ force: true });
    cy.get('.backdrop').should('not.exist');
    cy.get('.modal').should('not.exist');

    cy.get('button').contains('Add Task').click();
    cy.get('button').contains('Cancel').click();
    cy.get('.backdrop').should('not.exist');
    cy.get('.modal').should('not.exist');
  });

  it('should create a new task', () => {
    const task = 'New Task';
    const taskSummary = 'Task summary';

    cy.visit('http://localhost:5173/');
    cy.get('button').contains('Add Task').click();
    cy.get('#title').type(task);
    cy.get('#summary').type(taskSummary);
    cy.get('.modal').contains('Add Task').click();
    cy.get('.backdrop').should('not.exist');
    cy.get('.modal').should('not.exist');

    cy.get('.task').should('have.length', 1);
    cy.get('.task h2').contains(task);
    cy.get('.task p').contains(taskSummary);
  });

  it('should validate user input', () => {
    cy.visit('http://localhost:5173/');
    cy.get('button').contains('Add Task').click();
    cy.get('.modal').contains('Add Task').click();
    cy.contains('Please provide values');
  });

  it('should filter tasks', () => {
    const task = 'New Task';
    const taskSummary = 'Task summary';

    cy.visit('http://localhost:5173/');
    cy.get('button').contains('Add Task').click();
    cy.get('#title').type(task);
    cy.get('#summary').type(taskSummary);
    cy.get('#category').select('urgent');
    cy.get('.modal').contains('Add Task').click();
    cy.get('.task').should('have.length', 1);
    cy.get('#filter').select('moderate');
    cy.get('.task').should('have.length', 0);
    cy.get('#filter').select('urgent');
    cy.get('.task').should('have.length', 1);
    cy.get('#filter').select('all');
    cy.get('.task').should('have.length', 1);
  });

  it('should add multiple tasks', () => {
    const numberTaks = 4;
    const task = 'Task';
    const taskSummary = 'Task summary';

    cy.visit('http://localhost:5173/');

    for (let i = 0; i < numberTaks; i++) {
      cy.get('button').contains('Add Task').click();
      cy.get('#title').type(task + i.toString());
      cy.get('#summary').type(taskSummary);
      cy.get('.modal').contains('Add Task').click();
      cy.get('.task').should('have.length', i + 1);
      cy.get('.task')
        .eq(i)
        .contains(task + i.toString());
    }
  });
});
