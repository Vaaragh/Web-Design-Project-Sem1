const firebaseURL = 'https://courseproject-73f30-default-rtdb.europe-west1.firebasedatabase.app/'


function homepageJS() {
    let cardContainer = document.querySelector('.card-container')
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
        let random = Math.floor(Math.random() * course.brojKorisnika);
        let courseCard = document.createElement('div')
        courseCard.className = "course-card"
        courseCard.id = id
        courseCard.innerHTML = `
        <div class="image-container-box">
        <img src="${course.slika}" alt="Course" class="course-image"></div>
        <div class="card-body">
            <h5 class="course-category">${course.kategorija}</h5>
            <h3 class="course-name">${course.naziv}</h3>
            <div class="rating">
                <h4 class="course-rating">Ocena: ${course.prosecnaOcena}</h4>
                <div class="course-rating numbers">(${random} recenzija)</div>
            </div>
        </div>
        <div class="card-footer">
            <div class="course-footer-box">
                <div class="dur-icon"><i class="bi bi-clock fa-lg"></i></div>
                <div class="dur-time">${course.brojLekcija} Lekcija</div>
            </div>
            <div class="course-footer-box">
                <div class="cert-icon"><i class="bi bi-file-check fa-lg"></i></div>
                <div class="cert-bool">${course.sertifikovan}</div>
            </div>
            <div class="course-footer-box">
                <div class="lang-icon"><i class="bi bi-chat-text fa-lg"></i></div>
                <div class="lang-value">${course.jezik}</div>
            </div>
        </div>
        `;
        return courseCard
    }
    const addListeners = () => {
        const selectAll = document.querySelectorAll('.course-card')
        selectAll.forEach(elid => {
            elid.addEventListener('click', () => {
                window.location.href = `/html/course-page.html?id=${elid.getAttribute('id')}`;

            })
        })
    }
    showAllCourses()
    setTimeout(() => {
        addListeners()
    }, 1000)
}


export default homepageJS

