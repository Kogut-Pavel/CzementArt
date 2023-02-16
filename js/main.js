
let input = document.querySelector('#phone');
let iti = window.intlTelInput(input, {
    allowDropdown: true,
    initialCountry: 'ru',
    preferredCountries: ['ru', 'ua', 'by', 'kz'],
    nationalMode: true,
    utilsScript: 'utils.js',
});


let slider = tns({
    container: '.training__slider',
    gutter: 20,
    controls: false,
    navPosition: 'bottom',
    mouseDrag: true,
    responsive: {
        768: {
            items: 2,
        },
        320: {
            items: 1,
        },
    }
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
    responsive: {
        1200: {
            items: 4,
        },
        768: {
            items: 3,
        },
        480: {
            items: 2,
        },
        320: {
            items: 1,
        },
    }
});


document.addEventListener('DOMContentLoaded', function() {

    // Табы 
    const tabHeaders = document.querySelectorAll('[data-tab]');
    const contentBoxes = document.querySelectorAll('[data-tab-content]');

    tabHeaders.forEach(function (item) {
    item.addEventListener('click', function () {
        tabHeaders.forEach(function (item) {
            item.classList.remove('active');
        });
        item.classList.add('active');
        const contentBox = document.querySelector('#' + this.dataset.tab);
        contentBoxes.forEach(function (item) {
            item.classList.add('hidden');
        });
        contentBox.classList.remove('hidden');
     });
    });

    // Бургер-меню
    const toggleMenu = event => {
        const target = event.target;
        let menuBtn = document.querySelector('.menu-btn');
        let menu = document.querySelector('.menu');

        const showMenu = () => {
            menuBtn.classList.toggle('active');
            menu.classList.toggle('active');
        };

        if (target.closest('.menu-btn')) {
            showMenu();
        } else if (!target.classList.contains('active') && !target.closest('.menu__wrapper') && menuBtn.classList.contains('active')) {
            showMenu();
        } else if (target.classList.contains('menu__link')) {
            showMenu();
        }
    
    };

    document.addEventListener('click', toggleMenu);
    

    let modalButtons = document.querySelectorAll('.open-modal'),
        overlay      = document.querySelector('#overlay-modal'),
        closeButtons = document.querySelectorAll('.modal__close');

    /* открытие окон. */
    modalButtons.forEach(function(item){
       
       item.addEventListener('click', function(e) {
          
        e.preventDefault();

        let modalId = this.getAttribute('data-modal'),
            modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');
        
        modalElem.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = "hidden";
       }); 
    }); 
  
    /* закрытие окон */
    closeButtons.forEach(function(item){
  
      item.addEventListener('click', function(e) {
        let parentModal = this.closest('.modal');
  
        parentModal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = "";
      });
  
    }); // end foreach
  
    /* закрытие по ESC */
    document.body.addEventListener('keyup', function (e) {
      let key = e.keyCode;
  
      if (key == 27) {
          document.querySelector('.modal.active').classList.remove('active');
          document.querySelector('.overlay.active').classList.remove('active');
          document.body.style.overflow = "";
      }
    }, false);
  
    /* скрытие окна при клике на подложку */
    overlay.addEventListener('click', function() {
      document.querySelector('.modal.active').classList.remove('active');
      this.classList.remove('active');
      document.body.style.overflow = "";
    });

    // Forms 

    const forms = () => {

        const checkNumInputs = (selector) => {
            const numInputs = document.querySelectorAll(selector);
        
        // Всем инпутам с вводом телефона разрешаем только цифры
            numInputs.forEach(item => {
                item.addEventListener('input', () => {
                    item.value = item.value.replace(/[^0-9+]/g, '');
                });
            });
        };
    
        const clearInputs = () => { // Очищаем инпуты
            const inputs = document.querySelectorAll('input');
            const checkbox = document.querySelectorAll('input[name="checkbox"]');
            inputs.forEach(item => {
                item.value = '';
            });
            checkbox.forEach(item => {
                item.checked = false;
            });
        };
    
        const form = document.querySelectorAll('form');
        const modalSuccess = document.querySelector('.success');
        const modalNoneSuccess = document.querySelector('.none-success');
        const overlay = document.querySelector('#overlay-modal');
        const modal = document.querySelector('.modal');
        checkNumInputs('input[name="phone"]');
    
        const postData = async (url, data) => { // Отправка запроса
            let res = await fetch(url, {
                method: "POST",
                body: data,
            });
            if (!res.ok) {
                throw new Error(res.statusText);
            } else {
                return await res.text();
            }
        };
    
        form.forEach(item => { // Перебираем формы и навешиваем обработчик события
            item.addEventListener('submit', (event) => {
                event.preventDefault();
    
                const formData = new FormData(item); // Собираем данные из формы
    
                // Отправляем запрос на сервер с данными из formData
                postData('mailer/smart.php', formData)
                    .then(() => {
                        modal.classList.remove('active');
                        overlay.classList.remove('active');
                        document.body.style.overflow = "";
                        modalSuccess.classList.add('active');
                        overlay.classList.add('active');
                        document.body.style.overflow = "hidden";
                    })
                    .catch(err => {
                        console.error(err);
                        modal.classList.remove('active');
                        overlay.classList.remove('active');
                        document.body.style.overflow = "";
                        modalNoneSuccess.classList.add('active');
                        overlay.classList.add('active');
                        document.body.style.overflow = "hidden";
                    })
                    .finally(() => {
                        clearInputs();
                    });
            });
        });
    };

    forms();
  
}); 


