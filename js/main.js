

let input = document.querySelector('#phone');
let iti = window.intlTelInput(input, {
    allowDropdown: true,
    initialCountry: 'ru',
    preferredCountries: ['ru', 'ua', 'by'],
    nationalMode: true,
    utilsScript: 'utils.js',
});


let slider = tns({
    container: '.training__slider',
    items: 2,
    gutter: 20,
    controls: false,
    navPosition: 'bottom',
    mouseDrag: true,
    autoplay: true,
    autoplayButtonOutput: false,
});

let objectsSlider = tns({
    container: '.objects__slider',
    items: 4,
    gutter: 20,
    controls: false,
    nav: false,
    mouseDrag: true,
    autoplay: true,
    autoplayButtonOutput: false,
});