const firebaseURL = 'https://courseproject-73f30-default-rtdb.europe-west1.firebasedatabase.app/'

const request = new XMLHttpRequest()

const loginBlock = document.querySelector('.float-form-login')
const loginForm = document.querySelector('.login-form')
const emailField = document.querySelector('#email-box')
const passwordField = document.querySelector('#password-box')

const registerBlock = document.querySelector('.float-form-register')
const registerForm = document.querySelector('.register-form')
const rusernameField = document.querySelector('#username-reg-box')
const rpasswordField = document.querySelector('#password-reg-box')
const remailField = document.querySelector('#email-reg-box')
const rnameField = document.querySelector('#name-reg-box')
const rlastnameField = document.querySelector('#lastname-reg-box')
const rdobField = document.querySelector('#dob-reg-box')
const rphoneField = document.querySelector('#phone-reg-box')
const radressField = document.querySelector('#adress-reg-box')


let lrforms = 'Form validation active'
request.onreadystatechange = function () {
    if (this.readyState == 4) {
        if (this.status == 200) {
            let userInfoFull = JSON.parse(request.responseText);
            const userInfo = Object.values(userInfoFull)
            let allpasswords = []
            let allemails = []
            userInfo.forEach(user => {
                allpasswords.push(user.lozinka)
                allemails.push(user.email)
            })
            addLoginListeners(allpasswords, allemails)
            addRegisterListeners()
        }
    }

}
request.open("GET", firebaseURL + '/korisnici.json')
request.send()


function addLoginListeners(passwordslist, emailsList) {
    const passwords = passwordslist
    const emails = emailsList
    let keyemail = ''
    let bool = false
    loginForm.addEventListener('submit', (e) => {
        if (!(emailField.value.trim() === '')) {
            if (emails.includes(emailField.value)) {
                keyemail = emailField.value
                emailField.style.border = '2px solid #fba81f'
            }
            else {
                emailField.value = ''
                emailField.placeholder = 'Invalid input'
                emailField.style.border = '2px solid red'
                e.preventDefault()
            }
        }
        else {
            emailField.value = ''
            emailField.placeholder = 'Invalid input'
            emailField.style.border = '2px solid red'
            e.preventDefault()
        }
        let key = emails.indexOf(keyemail)


        if (!(passwordField.value.trim() === '')) {
            if (passwordField.value == passwords[key]) {
                bool = true
                passwordField.style.border = '2px solid #fba81f'
            }
            else {
                passwordField.value = ''
                passwordField.placeholder = 'Invalid input'
                passwordField.style.border = '2px solid red'
                e.preventDefault()
            }
        }
        else {
            passwordField.value = ''
            passwordField.placeholder = 'Invalid input'
            passwordField.style.border = '2px solid red'
            e.preventDefault()

        }
        e.preventDefault()
        if (bool) {
            passwordField.value = ''
            emailField.value = ''
            loginBlock.style.display = 'none'
            alert('Login successful')
            bool = false
            passwordField.style.border = '2px solid #fba81f'
            emailField.style.border = '2px solid #fba81f'
        }
    }
    )
}


function addRegisterListeners() {
    const inputFields = [rusernameField, rpasswordField, remailField, rnameField, rlastnameField, rdobField, rphoneField, radressField]
    registerForm.addEventListener('submit', (e) => {
        let errorList = []

        for (let i in inputFields) {
            checkEmpty(inputFields[i])
        }
        // check for empty input
        function checkEmpty(input) {
            if (input.value.trim() == '') {
                errorList.push(inputFields.indexOf(input))
                input.style.border = '2px solid red'
                input.placeholder = 'Invalid input'
            } else {
                input.style.border = '2px solid #fba81f'
            }
        }
        // example of specific expected values
        const phoneRegCheck = new RegExp('^[0-9]{6,12}$')
        // could also be if (inputFields[6].value.length < 6 || inputFields[6].value.length > 12) {...}
        if (phoneRegCheck.test(inputFields[6].value) == false) {
            errorList.push(6)
            rphoneField.style.border = '2px solid red'
            if (inputFields[6].value.length < 6) {
                inputFields[6].placeholder = 'Too short'
            } else if (inputFields[6].value.length > 12) {
                inputFields[6].placeholder = 'Too long'
            }
            rphoneField.value = null
        }


        if (!(rdobField.value == '')) {
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let dateOfBirth = rdobField.value.split('-')
            let year = Date().split(' ')[3]
            let day = Date().split(' ')[2]
            let month = monthNames.indexOf(Date().split(' ')[1]) + 1
            e.preventDefault()
            if (dateOfBirth[0] < year) {

            } else if (dateOfBirth[0] == year) {

                if (dateOfBirth[1] < month) {

                } else if (dateOfBirth[1] == month) {

                    if (dateOfBirth[2] < day) {

                    } else {
                        errorList.push(5)
                        rdobField.style.border = '2px solid red'
                    }
                } else {
                    errorList.push(5)
                    rdobField.style.border = '2px solid red'
                }
            } else {
                errorList.push(5)
                rdobField.style.border = '2px solid red'
            }

        }
        e.preventDefault()
        if (errorList.length == 0) {
            registerBlock.style.display = 'none'
            alert('Register successful')
            for (let i in inputFields) {
                inputFields[i].value = ''
            }
        }
    })

}


export default lrforms





