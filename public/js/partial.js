/**
 * ! START GET ELEMENT
 */

/* -------------------- ELEMENT SEARCH-BAR -------------------- */
const open__search__bar = document.querySelector('.search');
const close__search__bar = document.querySelector('.search-cancel');
const form__search__bar = document.querySelector('.search-bar');

/* -------------------- ELEMENT FORM-SIGN -------------------- */
const open__form__sign = document.querySelector('.user');
const switch__form__sign__up = document.querySelector('.sign-up-btn');
const switch__form__sign__in = document.querySelector('.already-account');
const close__form_sign = document.querySelectorAll('.form-cancel');
const form__sign = document.querySelector('.form');


/* -------------------- ELEMENT MINI-CART -------------------- */
const open__minicart = document.querySelector('.shopping-cart');
const close__minicart = document.querySelector('.mini_cart_close');

/* -------------------- ELEMENT NAV-SCROLL -------------------- */
const toggle = document.querySelector('.toggle');
const navigation = document.querySelector('.navigation');


const pre_loading = document.querySelector('.pre-loading');
/**
 * ! END GET ELEMENT
 */



/**
 * ! START ACTION CODE
 */

window.addEventListener('load', () => {
    let loading = setTimeout(animate, 3000);
    function animate() {
        pre_loading.classList.add('done');
        document.querySelector('body').classList.remove('overY-hidden');
        clearTimeout(loading);
    }
})


/* -------------------- START SEARCH-BAR -------------------- */
open__search__bar.addEventListener('click', () => {
    form__search__bar.classList.toggle('search-bar-active')
});
close__search__bar.addEventListener('click', () => {
    form__search__bar.classList.remove('search-bar-active')
})

/* -------------------- START FORM-SIGN -------------------- */
open__form__sign.addEventListener('click', () => {
    form__sign.classList.add('login-active');
    form__sign.classList.remove('sign-up-active');
})
switch__form__sign__up.addEventListener('click', () => {
    document.querySelector('.form').classList.remove('login-active');
    document.querySelector('.form').classList.add('sign-up-active');
})
switch__form__sign__in.addEventListener('click', () => {
    document.querySelector('.form').classList.remove('sign-up-active');
    document.querySelector('.form').classList.add('login-active');
})

close__form_sign.forEach((value) => {
    value.addEventListener('click', () => {
        document.querySelector('.form').classList.remove('sign-up-active');
        document.querySelector('.form').classList.remove('login-active');
    })
})

/* -------------------- START NAV-SCROLL -------------------- */
window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 50 || document.body.scrollTop > 50) {
        navigation.classList.add('fix-nav');
        navigation.classList.add('change-color');
    }
    else {
        navigation.classList.remove('fix-nav');
        navigation.classList.remove('change-color');
    }
})
/* --------------------MENU - TOGGLE - RESPONSIVE-------------------- */
toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navigation.classList.toggle('active');
})
/* --------------------MINI-CART-------------------- */
open__minicart.addEventListener('click', () => {
    document.querySelector('.mini_cart').classList.add('active');
})
close__minicart.addEventListener('click', () => {
    document.querySelector('.mini_cart').classList.remove('active');
})


/**
 * ! END ACTION CODE
 */
 window.addEventListener('scroll', ()=>{
    const scroll = document.querySelector('.scrollTop');
    scroll.classList.toggle('active', window.scrollY > 100);
})

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}
document.querySelector('.scrollTop').addEventListener('click', ()=>{
    scrollToTop();
})
