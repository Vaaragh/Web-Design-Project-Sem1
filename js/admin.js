const firebaseURL = 'https://courseproject-73f30-default-rtdb.europe-west1.firebasedatabase.app/'



function adminJs() {

    const allUsers = () => {
        let userTable = document.querySelector('.user-table-body')
        async function getallUsers() {
            const response = await fetch(firebaseURL + '/korisnici.json')
            const allUsers = await response.json()
            return allUsers
        }
        async function showallUsers() {
            const allUsers = await getallUsers()
            let userList = objectToArray(allUsers)
            let userId = findObjectKeys(allUsers)
            userTable.innerHTML = ''
            for (let i = 0; i < userList.length; i++) {
                userTable.appendChild(fillTemplates(userList[i], userId[i]))
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
            let userRow = document.createElement('tr')
            userRow.className = "table-row js-admin-row-selector"
            userRow.id = id
            userRow.innerHTML = `<td class="table-cell">${user.ime}</td>
        <td class="table-cell">${user.prezime}</td>
        <td class="table-cell">${user.korisnickoIme}</td>
        <td class="table-cell"><span class="smaller-text">${user.email}</span></td>
        <td class="table-cell">${user.telefon}</td>
        <td class="table-cell">${user.adresa}</td>
        <td class="table-cell centered-cell">${user.datumRodjenja}</td>
        <td class="table-cell centered-cell">Active</td>
        `;
            return userRow
        }
        showallUsers()
    }

    const allCourses = () => {
        let cardContainer = document.querySelector('.course-table-body')
        async function getAllCourses() {
            const response = await fetch(firebaseURL + '/kursevi.json')
            const allCourses = await response.json()
            return allCourses
        }
        async function showAllCourses() {
            const allCourses = await getAllCourses()
            let courseList = objectToArray(allCourses)
            let courseId = findObjectKeys(allCourses)
            cardContainer.innerHTML = ''
            for (let i = 0; i < courseList.length; i++) {
                cardContainer.appendChild(fillTemplates(courseList[i], courseId[i]))
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

        function fillTemplates(course, id) {
            let courseCard = document.createElement('tr')
            courseCard.className = "table-row course-selector js-admin-row-selector"
            courseCard.id = id
            courseCard.innerHTML = `<td class="table-cell">${course.naziv}</td>
        <td class="table-cell">${course.id}</td>
        <td class="table-cell">${course.autor}</td>
        <td class="table-cell centered-cell">${course.prosecnaOcena}</td>
        <td class="table-cell centered-cell">Active</td>
        `;
            return courseCard
        }
        showAllCourses()
    }
    const addListeners = () => {
        const selectAll = document.querySelectorAll('.js-admin-row-selector')
        selectAll.forEach(elid => {
            elid.addEventListener('click', () => {
                if (elid.getAttribute('id')[0] == '1') {
                    window.location.href = `/html/course-page.html?id=${elid.getAttribute('id')}`;
                }
                else {
                    window.location.href = `/html/profile-page.html?id=${elid.getAttribute('id')}`;
                }
            })
        })
    }

    allCourses()
    allUsers()
    setTimeout(() => {
        addListeners()
    }, 1000)
}

export default adminJs