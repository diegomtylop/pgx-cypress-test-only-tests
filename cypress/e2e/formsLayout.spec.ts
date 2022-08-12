describe('Forms interaction',() => {
  it('Should allow entering data into the forms', () => {
    //cy.visit('/pages/forms/layouts');
    cy.visit('/')
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();
    cy.get('[data-cy="imputEmail1"]').type('Diego name');
    cy.get('#inputPassword2').type('secure');
    cy.get('.form-inline > nb-checkbox > .label > .custom-checkbox').click();

    cy.get('[data-cy="imputEmail1"]')
      .parents('form')
      .find('button')
      .should('contain', 'Sign in')
      .parents('form')
      .find('nb-radio').first()
      .click()

      cy.contains('nb-card','Horizontal form')
        .find('[type="email"]')
        .type('another email')
  }),

  it('then and wrap methods naive', () => {
    //Simple approach but with a lot of replication
    cy.visit('/')
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.contains('nb-card','Using the Grid')
      .find('[for="inputEmail1"]')
      .should('contain','Email');

    cy.contains('nb-card','Using the Grid')
      .find('[for="inputPassword2"]')
      .should('contain','Password');

    cy.contains('nb-card','Basic form')
      .find('[for="exampleInputEmail1"]')
      .should('contain','Email');

    cy.contains('nb-card','Basic form')
      .find('[for="exampleInputPassword1"]')
      .should('contain','Password');
  });

  it.only('then and wrap methods', () => {
    //Simple approach but with a lot of replication
    cy.visit('/')
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.contains('nb-card','Using the Grid')
      .then( firstForm => {
        const emailLabel = firstForm.find('[for="inputEmail1"]').text()
        const password = firstForm.find('[for="inputPassword2"]').text()

        expect(emailLabel).to.eq('Email')
        expect(password).to.eq('Password')

        //Nested call to cy
        cy.contains('nb-card','Basic form')
          .then( secondForm => {
            const emailLabel2 = secondForm.find('[for="exampleInputEmail1"]').text()

            expect(emailLabel2).to.contain(emailLabel)


            //Wrapping the Jquery Object
            cy.wrap( secondForm )
              .find('[for="exampleInputPassword1"]')
              .should('contain','Password')
          });
      });

    //Not nested call is called after the upper nested statements were executed
    cy.contains('nb-card','Basic form')
      .then( firstForm => {
        const emailLabel = firstForm.find('[for="exampleInputEmail1"]').text()
        const password = firstForm.find('[for="exampleInputPassword1"]').text()

        expect(emailLabel).to.eq('Email address')
        expect(password).to.eq('Password')
      });
  });
})