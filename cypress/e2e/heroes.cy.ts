describe('Heroes list', () => {
  const heroList = [
    { id: 1, name: 'Dr Nice' },
    { id: 2, name: 'Narco' },
  ];

  it('should show heading My Heroes when open heroes page', () => {
    cy.visit('localhost:4200/heroes');

    cy.get('h2').should('contain', 'My Heroes');
  });

  it('should return response of heroList when fetch from api/heroes url', () => {
    const heroList = [
      { id: 1, name: 'Dr Nice' },
      { id: 2, name: 'Narco' },
    ];
    cy.intercept(
      {
        method: 'GET',
        url: 'api/heroes',
      },
      heroList,
    ).as('getHeroes');

    cy.visit('localhost:4200/heroes');

    cy.wait('@getHeroes').then(interception => {
      assert.deepEqual(interception.response.body, heroList);
    });
  });

  it('should show list heroes when fetch data from api/heroes url', () => {
    cy.intercept(
      {
        method: 'GET',
        url: 'api/heroes',
      },
      heroList,
    ).as('getHeroes');

    cy.visit('localhost:4200/heroes');
    cy.wait('@getHeroes').then(() => {
      cy.get('[data-cy="heroes"]')
        .should('contain', 'Dr Nice')
        .and('contain', 'Narco');
    });
  });
});
