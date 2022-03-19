const firebaseURL = 'https://courseproject-73f30-default-rtdb.europe-west1.firebasedatabase.app/'


function profilePageJs() {
    const getPageId = () => {
        const location = decodeURI(window.location.toString());
        const index = location.indexOf("?") + 1;
        const substrings = location.substring(index, location.length);
        const splitedSubstring = substrings.split("=");
        return splitedSubstring[1]
    }
    const pageId = getPageId()
    const allUsers = () => {
        let parentContainer = document.querySelector('.js-wrapper-selector')
        async function getAllUsers() {
            const response = await fetch(firebaseURL + '/korisnici.json')
            const allUsers = await response.json()
            return allUsers
        }
        async function showUser(id) {
            const allUsers = await getAllUsers()
            let userList = objectToArray(allUsers)
            let userId = findObjectKeys(allUsers)
            parentContainer.innerHTML = ''
            for (let i = 0; i < userId.length; i++) {
                if (userId[i] == id) {
                    parentContainer.appendChild(fillTemplates(userList[i], userId[i]))
                }
            }

        }

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

        function fillTemplates(user, id) {
            let userCard = document.createElement('div')
            userCard.className = "profile-container"
            userCard.id = id
            userCard.innerHTML = `<div class="left-box">
            <div class="left-box-container">
                <img src="../assets/customer-avatar.png" alt="User" class="user-avatar">
                <h2 class="user-name">${user.korisnickoIme}</h2>
                <!--Shows the edit version for the page-->
                <button 
                    class="edit-button button js-profile-edit-button">Edit</button>
            </div>
        </div>
        <div class="right-box">
            <ul class="user-info">
                <li class="info-item">
                    <p class="info-type">Name</p>
                    <p class="info-value">${user.ime}</p>
                </li>
                <li class="info-item">
                    <p class="info-type">Last name</p>
                    <p class="info-value">${user.prezime}</p>
                </li>
                <li class="info-item">
                    <p class="info-type">E-mail</p>
                    <p class="info-value">${user.email}</p>
                </li>
                <li class="info-item">
                    <p class="info-type">Phone number</p>
                    <p class="info-value">${user.telefon}</p>
                </li>
                <li class="info-item">
                    <p class="info-type">Adress</p>
                    <p class="info-value">${user.adresa}</p>
                </li>
                <li class="info-item">
                    <p class="info-type">Date of birth</p>
                    <p class="info-value">${user.datumRodjenja}</p>
                </li>
            </ul>

        </div>`;
            return userCard
        }
        showUser(getPageId())
    }
    const addlistener = () => {
        const editButton = document.querySelector('.js-profile-edit-button')
        editButton.addEventListener('click', () => {
            window.location.href = `/html/profile-page-form.html?id=${getPageId()}`
        })
    }
    allUsers()
    setTimeout(() => {
        addlistener()
    }, 1000)
}

export default profilePageJs