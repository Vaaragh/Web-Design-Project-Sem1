const firebaseURL = 'https://courseproject-73f30-default-rtdb.europe-west1.firebasedatabase.app/'


function coursePageJS() {
    const getPageId = () => {
        const location = decodeURI(window.location.toString());
        const index = location.indexOf("?") + 1;
        const substrings = location.substring(index, location.length);
        const splitedSubstring = substrings.split("=");
        return splitedSubstring[1]

    }
    const pageId = getPageId()
    const allCourses = () => {
        let parentContainer = document.querySelector('.course-profile')
        async function getAllCourses() {
            const response = await fetch(firebaseURL + '/kursevi.json')
            const allCourses = await response.json()
            return allCourses
        }
        async function showCourse(id) {
            const allCourses = await getAllCourses()
            let courseList = objectToArray(allCourses)
            let courseId = findObjectKeys(allCourses)
            parentContainer.innerHTML = ''
            for (let i = 0; i < courseId.length; i++) {
                if (courseId[i] == id) {
                    parentContainer.appendChild(fillTemplates(courseList[i], courseId[i]))
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
        function fillTemplates(course, id) {
            let courseCard = document.createElement('div')
            courseCard.className = "wrapper"
            courseCard.id = id
            courseCard.innerHTML = `<div class="course-profile-container">
                <div class="left-info">
                    <div class="left-info-container">
                        <img src="${course.slika}" alt="Course" class="course-info-image">
                        <ul class="course-info-list">
                            <li class="course-info-item">
                                <p class="course-info-type">Rating</p>
                                <p class="course-info-value">${course.prosecnaOcena}</p>
                            </li>
                            <li class="course-info-item">
                                <p class="course-info-type">Language</p>
                                <p class="course-info-value">${course.jezik}</p>
                            </li>
                            <li class="course-info-item">
                                <p class="course-info-type">Num. of lessons</p>
                                <p class="course-info-value">${course.brojLekcija}</p>
                            </li>
                            <li class="course-info-item">
                                <p class="course-info-type">Certified</p>
                                <p class="course-info-value">${course.sertifikovan}</p>
                            </li>
                            <li class="course-info-item">
                                <p class="course-info-type">Price</p>
                                <p class="course-info-value">$${course.cena}</p>
                            </li>
                            <li class="course-info-item">
                                <p class="course-info-type">Graduates</p>
                                <p class="course-info-value">${course.brojKorisnika}</p>
                            </li>
                            <li class="button-item course-info-item"><button
                                    class="buy-button button special-button js-add-btn" item-id="${id}">Add to
                                    cart</button>
                            </li>
                            <!--Opens the edit version for the course-->
                            <li class="button-item course-info-item js-course-edit-button"><button class="buy-button button"
                                    >Edit</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="right-info">
                    <div class="right-info-container">
                        <div class="course-user-info">
                            <div class="course-user-info-top">
                                <div class="course-info-title">
                                    <h3>${course.naziv}</h3>
                                </div>
                                <div class="course-info-author">
                                    <h4>${course.autor}</h4>
                                </div>
                            </div>
                            <div class="course-user-info-mid">
                                <h6>${course.kategorija}</h6>

                            </div>
                            <div class="course-user-info-bottom">
                                <p>${course.opis}</p>
                            </div>
                        </div>
                        <div class="course-admin-information">
                            <div class="course-admin-box">
                                <ul class="course-info-list">
                                    <li class="course-info-item">
                                        <p class="admin-info-type">ID</p>
                                        <p class="admin-info-value">${course.id}</p>
                                    </li>
                                    <li class="course-info-item">
                                        <p class="admin-info-type">Last changed</p>
                                        <p class="admin-info-value">${course.datumIzmene}</p>
                                    </li>
                                </ul>
                            </div>

                        </div>

                    </div>
                </div>
            </div>`;
            return courseCard
        }
        showCourse(getPageId())
    }
    const addlistener = () => {
        const editButton = document.querySelector('.js-course-edit-button')
        editButton.addEventListener('click', () => {
            window.location.href = `/html/course-page-form.html?id=${getPageId()}`
        })
    }
    const addShopListener = () => {
        const addBtn = document.querySelector('.js-add-btn')
        const id = addBtn.getAttribute('item-id')
        addBtn.addEventListener('click', () => {
            let current = localStorage.getItem('id')
            localStorage.setItem('id', [current, id])
            alert(`Added to cart`)
        })
    }
    allCourses()
    setTimeout(() => {
        addlistener(), addShopListener()
    }, 1000)
}

export default coursePageJS
