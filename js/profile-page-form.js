const firebaseURL = 'https://courseproject-73f30-default-rtdb.europe-west1.firebasedatabase.app/'


const request = new XMLHttpRequest()

const confirmPop = document.querySelector('#deactivation-confirm-float')
const parentContainer = document.querySelector('.profile-form')


const getPageId = () => {
    const location = decodeURI(window.location.toString());
    const index = location.indexOf("?") + 1;
    const substrings = location.substring(index, location.length);
    const splitedSubstring = substrings.split("=");
    return splitedSubstring[1]
}
const pageId = getPageId()


function profilePageFormJS() {
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                let userInfoFull = JSON.parse(request.responseText);
                let userList = objectToArray(userInfoFull)
                let userId = findObjectKeys(userInfoFull)
                parentContainer.innerHTML = ''
                for (let i = 0; i < userId.length; i++) {
                    if (userId[i] == pageId) {
                        parentContainer.appendChild(fillTemplates(userList[i], userId[i]))
                    }
                }
                const deleteButton = document.querySelector('#delete-btn')
                const formBlock = document.querySelector('.profile-container')
                const pUsernameField = document.querySelector('#profile-page-uname')
                const pPasswordField = document.querySelector('#profile-page-pswd')
                const pNameField = document.querySelector('#profile-page-fname')
                const pLastnameField = document.querySelector('#profile-page-lname')
                const pEmailField = document.querySelector('#profile-page-email')
                const pPhoneField = document.querySelector('#profile-page-phnumber')
                const pAdressField = document.querySelector('#profile-page-adress')
                const pdObField = document.querySelector('#profile-page-dob')
                const formFields = [pUsernameField, pPasswordField, pNameField, pLastnameField, pEmailField, pPhoneField, pAdressField, pdObField]
                addSubmitListener(formFields, formBlock)
                deleteButton.addEventListener('click', () => {
                    confirmPop.style.display = 'flex'
                })

            }
        }

    }
    request.open("GET", firebaseURL + '/korisnici.json')
    request.send()


    function objectToArray(object) {
        const array = [];
        const keys = Object.keys(object);
        keys.forEach((key) => {
            array.push(object[key]);
        });
        return array;
    }

    function findObjectKeys(object) {
        const keyedobject = Object.keys(object)
        return keyedobject
    }

    function goToProfile() {
        setTimeout(() => { document.location.assign(`./profile-page.html?id=${pageId}`) }, 500);
    }

    function addSubmitListener(formFields, formBlock) {
        formBlock.addEventListener('submit', (e) => {
            e.preventDefault()
            let rerrorList = []
            for (let i in formFields) {
                checkEmpty(formFields[i])
            }
            function checkEmpty(input) {
                if (input.value.trim() == '') {
                    rerrorList.push(formFields.indexOf(input))
                    input.style.border = '2px solid red'
                    input.placeholder = 'Invalid input'
                } else {
                    input.style.border = '2px solid #fba81f'
                }
            }

            const pPhoneRegCheck = new RegExp('^[0-9]{6,12}$')
            if (pPhoneRegCheck.test(formFields[5].value) == false) {
                rerrorList.push(5)
                formFields[5].style.border = '2px solid red'
                formFields[5].value = null
                formFields[5].placeholder = "Invalid Reg input"
            }

            if (!(formFields[7].value == '')) {
                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                let dateOfBirth = formFields[7].value.split('-')
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
                            rerrorList.push(5)
                            formFields[7].style.border = '2px solid red'
                        }
                    } else {
                        rerrorList.push(5)
                        formFields[7].style.border = '2px solid red'
                    }
                } else {
                    rerrorList.push(5)
                    formFields[7].style.border = '2px solid red'
                }

            }
            if (rerrorList.length == 0) {
                alert('Change successful')
                goToProfile()
            }

        })
    }


    function fillTemplates(user, id) {
        let userCard = document.createElement('form')
        userCard.className = "profile-container"
        userCard.id = id
        userCard.innerHTML = `<div class="left-box">
    <div class="left-box-container">
        <img src="../assets/customer-avatar.png" alt="User" class="user-avatar">
        <div class="info-item">
            <label for="profile-page-uname" class="info-type info-centered">Username</label>
            <input type="text" id="profile-page-uname" name="uname" value="${user.korisnickoIme}"
                class="info-value-input">
        </div>
        <div class="info-item">
            <label for="profile-page-pswd" class="info-type info-centered">Password</label>
            <input type="password" id="profile-page-pswd" name="pswd" value="${user.lozinka}" class="info-value-input">
        </div>
    </div>
</div>
<div class="right-box">
    <div class="user-info">
        <div class="info-item">
            <label for="profile-page-fname" class="info-type">Name</label>
            <input type="text" id="profile-page-fname" name="fname" value="${user.ime}"
                class="info-value-input">
        </div>
        <div class="info-item">
            <label for="profile-page-lname" class="info-type">Last name</label>
            <input type="text" id="profile-page-lname" name="lname" value="${user.prezime}"
                class="info-value-input">
        </div>
        <div class="info-item">
            <label for="profile-page-email" class="info-type">E-mail</label>
            <input type="email" id="profile-page-email" name="email"
                value="${user.email}" class="info-value-input">
        </div>
        <div class="info-item">
            <label for="profile-page-phnumber" class="info-type">Phone number</label>
            <input type="number" id="profile-page-phnumber" name="phone" value="${user.telefon}"
                class="info-value-input">
        </div>
        <div class="info-item">
            <label for="profile-page-adress" class="info-type">Adress</label>
            <input type="text" id="profile-page-adress" name="adress" value="${user.adresa}"
                class="info-value-input">
        </div>
        <div class="info-item">
            <label for="profile-page-dob" class="info-type">Date of birth</label>
            <input style="background: white;" type="date" id="profile-page-dob" name="dob" value="${user.datumRodjenja}"
                class="info-value-input">
        </div>
        <div id="profile-change-buttons" class="info-item">
            <button type="submit" class="edit-button button">Submit</button>
            <button type="reset" class="edit-button button">Reset</button>
            <!--Shows the confirmation pop up-->
            <button type="button" id='delete-btn' class="edit-button button"
                >Delete</button>
        </div>
    </div>

</div>`;
        return userCard
    }
}

export default profilePageFormJS
