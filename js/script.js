const firebaseURL = 'https://courseproject-73f30-default-rtdb.europe-west1.firebasedatabase.app/'
const burger = document.querySelector('.burger');
const header = document.querySelector('.header');
const navbar = document.querySelector('.navbar');
const loginbtn = document.querySelector('.bi-person-fill');
const shoppingCart = document.querySelector('.bi-cart-check-fill');
const registbtn = document.querySelector('#register-btn');
const searchBtn = document.querySelector('.bi-search');
const searchFloat = document.querySelector('#search-bar-float')
const cancelbtnreg = document.querySelector('#cancel-reg-btn');
const cancelbtnlog = document.querySelector('#cancel-log-btn');
const cancelBtn = document.querySelectorAll('.js-cancel-button')
const pageId = document.children[0].getAttribute("page-id");

const confirmButton = document.querySelector('.js-confirm-deactivate')


import adminJs from "./admin.js";
import homepageJS from "./homepage.js";
import coursePageJS from "./course-page.js";
import coursePageFormJS from "./course-page-form.js";
import profilePageJs from "./profile-page.js";
import profilePageFormJs from "./profile-page-form.js";
import lrforms from "./lrform-validation.js";
import searchB from "./search.js";
import { shopCart, shoppingJS } from "./shopping-cart.js"





if (pageId == "homepage-page") {
    homepageJS()
}

else if (pageId == "admin-page") {
    adminJs()
}

else if (pageId == "course-page") {
    coursePageJS()
}

else if (pageId == "course-page-form") {
    coursePageFormJS()
}

else if (pageId == "profile-page") {
    profilePageJs()
}

else if (pageId == "profile-page-form") {
    profilePageFormJs()
}

else if (pageId == "shop-page") {
    shoppingJS()
}

console.log(pageId[0].toUpperCase() + pageId.slice(1).split('-')[0]);
console.log(lrforms);
console.log(searchB);
console.log(shopCart());


burger.addEventListener("click", () => {
    navbar.classList.toggle('navbar-active')
});


loginbtn.addEventListener("click", () => {
    document.getElementById('float-form-login').style.display = "flex"
});

cancelBtn.forEach((event) => {
    event.addEventListener('click', () => {
        document.getElementById('float-form-login').style.display = "none"
        document.getElementById('float-form-register').style.display = "none"
        document.getElementById('deactivation-confirm-float').style.display = "none"
    })
});


registbtn.addEventListener("click", () => {
    document.getElementById('float-form-login').style.display = "none"
    document.getElementById('float-form-register').style.display = "flex"
});

shoppingCart.addEventListener("click", () => {
    window.location.href = './shopping-cart.html'
});

if (!(pageId == "shop-page")) {
    confirmButton.addEventListener('click', () => {
        document.querySelector('#deactivation-confirm-float').style.display = 'none'
        alert('Deleted successfully')
        setTimeout(() => { document.location.assign(`./admin.html`) }, 500);
    })
}

searchBtn.addEventListener('click', () => {
    if (searchFloat.classList.contains('search-bar-active')) {
        searchFloat.classList.remove('search-bar-active')
    } else {
        searchFloat.classList.add('search-bar-active')
    }
})

window.addEventListener("scroll", () => {
    if (getWindowHeight() > 0) {
        header.classList.add("header-active");
    } else {
        header.classList.remove("header-active");
    }
});


const getWindowHeight = () => {
    return window.scrollY;
};


