
import navbar from './components/Navbar'
import popup from './components/Popup'

class StudentPage {

    constructor() {
        this.navbar = navbar
        this.popup = popup
    }

    goToRegister() {
        cy.get('a[href="/students/new"]').click()
    }

    submitForm(student) {
        cy.get('input[name=name]').clear({ force: true }).as('name')
        cy.get('input[name=email]').clear({ force: true }).as('email')
        cy.get('input[name=age]').clear({ force: true }).as('age')
        cy.get('input[name=weight]').clear({ force: true }).as('weight')
        cy.get('input[name=feet_tall]').clear({ force: true }).as('feet_tall')


        student.name ? cy.get('@name').clear().type(student.name) : cy.log('empty name')
        student.email ? cy.get('@email').clear().type(student.email) : cy.log('empty email')
        student.age ? cy.get('@age').clear().type(student.age) : cy.log('empty age')
        student.weight ? cy.get('@weight').clear().type(student.weight) : cy.log('empty weight')
        student.feet_tall ? cy.get('@feet_tall').clear().type(student.feet_tall) : cy.log('empty feet_tall')

        cy.contains('button', 'Cadastrar')
            .click()
    }

    search(name) {
        cy.get('input[placeholder="Buscar por nome"]').type(name)
    }

    remove(email) {
        cy.contains('tr', email, { timeout: 10000 })
            .find('button')
            .click()
    }

    alertMessage(label, text) {
        cy.contains('label', label)
            .parent()
            .find('span')
            .should('have.text', text)
    }

}

export default new StudentPage