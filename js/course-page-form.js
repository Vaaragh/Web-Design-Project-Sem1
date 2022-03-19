const firebaseURL = 'https://courseproject-73f30-default-rtdb.europe-west1.firebasedatabase.app/'
const confirmPop = document.querySelector('#deactivation-confirm-float')


// main function
function coursePageFormJS() {
    const getPageId = () => {
        const location = decodeURI(window.location.toString());
        const index = location.indexOf("?") + 1;
        const substrings = location.substring(index, location.length);
        const splitedSubstring = substrings.split("=");
        return splitedSubstring[1]

    }

    // fetch object from firebase
    const allCourses = () => {
        let parentContainer = document.querySelector('.course-form')
        async function getAllCourses() {
            const response = await fetch(firebaseURL + '/kursevi.json')
            const allCourses = await response.json()
            return allCourses
        }
        // generate page
        async function showCourse(id) {
            const allCourses = await getAllCourses()
            let courseList = objectToArray(allCourses)
            parentContainer.innerHTML = ''
            let categories = []
            let languages = []
            console.log(languages);
            for (let i = 0; i < courseList.length; i++) {
                if (!(categories.includes(courseList[i].kategorija))) {
                    categories.push(courseList[i].kategorija)
                }
                if (!(languages.includes(courseList[i].jezik))) {
                    languages.push(courseList[i].jezik)
                }
            }
            for (let i = 0; i < courseList.length; i++) {
                if (courseList[i].id == id) {
                    parentContainer.appendChild(fillTemplates(courseList[i], categories, languages))
                    let certificationCheck = document.getElementById('course-certificate-edit')
                    if (courseList[i].sertifikovan == 'da') {
                        certificationCheck.setAttribute('checked', true)
                    }
                }
            }
            const disableButton = document.querySelector('.js-course-disable-button')
            const formBlock = document.querySelector('.course-edit-container')
            const cName = document.querySelector('#course-cname-edit')
            const cAuthor = document.querySelector('#course-cauthor-edit')
            const cCategory = document.querySelector('#course-ccategory-edit')
            const cImage = document.querySelector('#course-image-edit')
            const cDuration = document.querySelector('#course-duration-edit')
            const cPrice = document.querySelector('#course-price-edit')
            const cCertificate = document.querySelector('#course-certificate-edit')
            const cLanguage = document.querySelector('#course-clanguage-edit')
            const cGraduates = document.querySelector('#course-graduates-edit')
            const cRating = document.querySelector('#course-rating-edit')
            const cId = document.querySelector('#course-id-edit')
            const cLastChange = document.querySelector('#course-change-edit')
            const cDescription = document.querySelector('#course-cdescription-edit')
            const formFields = [cName, cAuthor, cCategory, cImage, cDuration, cPrice, cCertificate, cLanguage, cGraduates, cRating, cId, cLastChange, cDescription]
            addSubmitListener(formFields, formBlock)
            disableButton.addEventListener('click', () => {
                confirmPop.style.display = 'flex'
            })




        }
        // on successful edit go to course page
        function goToProfile() {
            setTimeout(() => { document.location.assign(`./course-page.html?id=${getPageId()}`) }, 500);
        }

        // add button listeners
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
                e.preventDefault()
                if (rerrorList.length == 0) {
                    alert('Change successful')
                    goToProfile()
                }

            })
        }


        // turn firebase object into array
        function objectToArray(object) {
            const array = [];
            const keys = Object.keys(object);
            keys.forEach((key) => {
                array.push(object[key]);
            });
            return array;
        }
        // create option for select input
        function getSelectOptionTemplate(property, selectedProperty) {
            let option = document.createElement('option')
            option.className = 'select-options'
            option.value = property
            if (property == selectedProperty) {
                option.setAttribute("selected", "selected")
            }
            option.innerHTML = property
            return option

        }
        // create select field for template
        function getAllSelects(propertyList, parentId, parentName, selectedProperty) {
            let holdingDiv = document.createElement('div')
            let selectDiv = document.createElement('select')
            selectDiv.id = parentId
            selectDiv.name = parentName
            selectDiv.className = 'course-info-input select-box-menu'
            for (let i in propertyList) {
                selectDiv.appendChild(getSelectOptionTemplate(propertyList[i], selectedProperty))
            }
            holdingDiv.appendChild(selectDiv)
            return holdingDiv
        }

        //create and fill template
        function fillTemplates(course, categories, languages) {
            let categoriesField = getAllSelects(categories, 'course-ccategory-edit', 'ccategory', course.kategorija)
            let languageField = getAllSelects(languages, 'course-clanguage-edit', 'clang', course.jezik)
            let courseCard = document.createElement('form')
            courseCard.className = "course-edit-container"
            courseCard.action = '#'
            courseCard.id = course.id
            courseCard.innerHTML = `<div class="left-info edit-container">
            <div class="left-info-container height-stretcher">
            <div class="course-info-list form-field height-stretcher">
            <div class="course-input-item">
            <label for="course-cname-edit" class="course-info-type">Course name</label>
            <input type="text" id="course-cname-edit" name="cname" value="${course.naziv}"
            class="course-info-input">
            </div>
            <div class="course-input-item">
            <label for="course-cauthor-edit" class="course-info-type">Author</label>
            <input type="text" id="course-cauthor-edit" name="cauthor"
            value="${course.autor}" class="course-info-input">
            </div>
            <div class="course-input-item">
            <label for="course-ccategory-edit" class="course-info-type">Category</label>
            ${categoriesField.innerHTML}
            </div>
            <div class="course-input-item">
            <label for="course-image-edit" class="course-info-type">Image</label>
            <input type="url" id="course-image-edit" name="cimage" value="${course.slika}"
            class="course-info-input">
            </div>
            <div class="course-input-item">
            <label for="course-duration-edit" class="course-info-type">Num. of
            lessons</label>
            <input type="number" id="course-duration-edit" name="cduration"
            value="${course.brojLekcija}" class="course-info-input">
            </div>
            <div class="course-input-item">
            <label for="course-price-edit" class="course-info-type">Price</label>
            <input type="number" id="course-price-edit" name="cprice" value="${course.cena}"
            class="course-info-input">
            </div>
            <div class="course-input-item">
            <label for="course-certificate-edit" class="course-info-type">Certified</label>
            <input type="checkbox" id="course-certificate-edit" name="ccertif"
            class="course-info-checkbox">
            </div>
            <div class="course-input-item">
            <label for="course-clanguage-edit" class="course-info-type">Language</label>
                        ${languageField.innerHTML}
                        </div>
                        <div class="course-input-item">
                        <label for="course-graduates-edit" class="course-info-type">Graduates</label>
                        <input type="number" id="course-graduates-edit" name="cgraduates"
                        value="${course.brojKorisnika}" class="course-info-input" readonly>
                        </div>
                        <div class="course-input-item">
                        <label for="course-rating-edit" class="course-info-type">Rating</label>
                        <input type="number" id="course-rating-edit" name="crating"
                        value="${course.prosecnaOcena}" class="course-info-input" readonly>
                        </div>
                        <div class="course-input-item">
                        <label for="course-id-edit" class="course-info-type">ID</label>
                        <input type="number" id="course-id-edit" name="cid" value="${course.id}"
                        class="course-info-input" readonly>
                        </div>
                        <div class="course-input-item">
                        <label for="course-change-edit" class="course-info-type">Last
                        changed</label>
                        <input type="date" style='background:white;' id="course-change-edit" name="cchange"
                        value="${course.datumIzmene}" class="course-info-input">
                        </div>
                        </div>
                        </div>
                        </div>
                        <div class="right-info">
                        <div class="right-info-container">
                        <div class="course-user-info">
                        <div class="course-input-item" id="description-area">
                        <label for="course-cdescription-edit"
                        class="course-info-type">Description</label>
                        <textarea rows="15" cols="50" id="course-cdescription-edit" name="cdescription"
                        class="course-info-input">${course.opis}</textarea>
                        </div>
                        <div class="button-item course-input-item flex-button-box">
                        <button type="submit" class="button special-button">Submit</button>
                        
                        <button type="reset" class="button special-button">Reset</button>
                        <!--Shows the confirmation pop up-->
                        <button type="button" class="button special-button js-course-disable-button"
                        >Disable</button>
                        </div>
                        </div>
                        </div>
                        </div>`;

            return courseCard
        }
        showCourse(getPageId())
    }

    allCourses()

}

export default coursePageFormJS