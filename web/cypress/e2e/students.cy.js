
import students from '../fixtures/students.json'

import studentPage from '..//support/pages/StudentPage'

describe('alunos', () => {


    it('deve poder cadastrar um novo aluno', () => {
        const student = students.create

        cy.deleteStudent(student.email)
        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.popup.haveText('Dados cadastrados com sucesso.')

    })

    it('não deve cadastrar com email duplicado', () => {
        const student = students.duplicate

        cy.resetStudent(student)
        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.popup.haveText('O email informado já foi cadastrado!')
    })

    it('deve remover um aluno sem matricula', () => {
        const student = students.remove

        cy.resetStudent(student)
        cy.adminLogin()

        studentPage.search(student.name)
        studentPage.remove(student.email)
        studentPage.popup.confirm()
        studentPage.popup.haveText('Exclusão realizada com sucesso.')
    })

    it('todos os campos são obrigatórios', () => {

        const student = students.required

        cy.adminLogin()
        studentPage.goToRegister()
        studentPage.submitForm(student)

        studentPage.alertMessage('Nome completo', 'Nome é obrigatório')
        studentPage.alertMessage('E-mail', 'O email é obrigatório')
        studentPage.alertMessage('Idade', 'A idade é obrigatória')
        studentPage.alertMessage('Peso (em kg)', 'O peso é obrigatório')
        studentPage.alertMessage('Altura', 'A altura é obrigatória')

    })

    it('não deve cadastrar aluno com idade menor que 16 anos', () => {

        const student = students.inv_age

        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)

        studentPage.alertMessage('Idade', 'A idade mínima para treinar é 16 anos!')

    })

    it.skip('não deve cadastrar aluno com peso menor ou igual a zero', () => {

        const student = students.inv_weight

        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)

        studentPage.alertMessage('Peso (em kg)', 'O peso não pode ser menor ou igual a zero')
    })

    it.skip('não deve cadastrar aluno com altura menor ou igual a zero', () => {

        const student = students.inv_feet_tall

        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)

        studentPage.alertMessage('Altura', 'A altura não pode ser menor ou igual a zero')
    })

})