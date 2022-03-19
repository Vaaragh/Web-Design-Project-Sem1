const firebaseURL = 'https://courseproject-73f30-default-rtdb.europe-west1.firebasedatabase.app/'

const inputField = document.querySelector('.search-field')
const parentDiv = document.querySelector('.result-list')
const request = new XMLHttpRequest()
let searchB = 'Search active'

request.onreadystatechange = function () {
    if (this.readyState == 4) {
        if (this.status == 200) {
            let courseInfoFull = JSON.parse(request.responseText);
            const coursesInfo = Object.values(courseInfoFull)
            searchCourses(coursesInfo)
        }
    }
}

request.open("GET", firebaseURL + '/kursevi.json')
request.send()


function searchCourses(courses) {
    inputField.addEventListener('keyup', (e) => {
        parentDiv.innerHTML = ''
        let term = inputField.value.toLowerCase();
        let resultList = courses.filter(course => {
            let naziv = course.naziv.toLowerCase().includes(term)
            let autor = course.autor.toLowerCase().includes(term)
            let kategorija = course.kategorija.toLowerCase().includes(term)

            return naziv || autor || kategorija
        })
        generateCards(resultList)
        markQueryResult(parentDiv, term)
    })
}
function generateCards(results) {
    let resultList = results
    resultList.forEach(result => {
        let info = result
        let cardBody = document.createElement('div')
        cardBody.className = "result-card"
        cardBody.id = info.id
        cardBody.innerHTML = `<div class="result-card-left">
    <img src="${info.slika}" class="result-image" alt="Result">
</div>
<div class="result-card-right">
    <p class="match-target">${info.naziv}</p>
    <p class="match-target">${info.autor}</p>
    <p class="match-target">${info.kategorija}</p>
</div>`
        parentDiv.appendChild(cardBody)
        cardBody.addEventListener('click', () => {
            window.location.href = `/html/course-page.html?id=${result.id}`
        })
    })
}
function markQueryResult(allResults, searchTerm) {
    let text = document.querySelectorAll('.match-target')
    let term = searchTerm
    const regex = new RegExp(`${term}`, 'gi')
    text.forEach(i => {
        i.innerHTML = i.textContent.replace(regex, word => `<span class="term-result">${word}</span>`)
    })
}

console.log('ilija');

export default searchB

