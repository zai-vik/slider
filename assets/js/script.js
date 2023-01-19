let images = [
    {
        src            : "./assets/img/slider_1.jpg",
        title          : "Rostov-on-Don, Admiral",
        city           : "Rostov-on-Don LCD admiral",
        apartment_area : "81 m2",
        repair_time    : "3.5 months" ,
        repair_cost    : "Upon request" 
    },
    {
        src            : "./assets/img/slider_2.jpg",
        title          : "Sochi Thieves",
        city           : "Sochi Thieves",
        apartment_area : "105 m2",
        repair_time    : "4 months" ,
        repair_cost    : "Upon request"
    },
    {
        src            : "./assets/img/slider_3.jpg",
        title          : "Rostov-on-Don Patriotic",
        city           : "Rostov-on-Don Patriotic",
        apartment_area : "93 m2",
        repair_time    : "3 months" ,
        repair_cost    : "Upon request"
    }
];

function initSlider() {
    if (!images || !images.length) return;

    let sliderImages = document.querySelector('.slider-viewport'),
    sliderArrows = document.querySelector('.slider-navigation'),
    sliderDots = document.querySelector('.slider-dots'),
    sliderTitles = document.querySelector('.slider-titles'),
    options = {
        titles: true,
        dots: true
    }

    initImages();
    initArrows();
    initInfo();

    if (options.dots) {
        initDots();
    }

    if (options.titles) {
        initTitles();
    }

    function initImages() {
        images.forEach((image, index) => {
            let img = `<img data-id="${index}" class="image n${index} ${index === 0 ? 'active' : ''}" src="${images[index].src}">`;
            sliderImages.innerHTML += img;
        })
    }

    function initArrows() {
        sliderArrows.querySelectorAll('.slider__arrow').forEach(arrow => {
            arrow.addEventListener('click', function() {
                let curNumber = +sliderImages.querySelector('.active').dataset.id;
                let nextNumber;
                if (arrow.classList.contains('left')) {
                    nextNumber = curNumber === 0 ? images.length - 1 : curNumber - 1;
                } else {
                    nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
                }
                moveSlider(nextNumber);
                initInfo();
            })
        })
    }

    function moveSlider(num) {
        sliderImages.querySelector('.active').classList.remove('active');
        sliderImages.querySelector('.n' + num).classList.add('active');
        sliderDots.querySelector(".active").classList.remove("active");
        sliderDots.querySelector(".n" + num).classList.add("active");
        sliderTitles.querySelector(".active").classList.remove("active");
        sliderTitles.querySelector(".n" + num).classList.add("active");
    }

    function initInfo() {
        let city = document.querySelector('.city'),
        apartment_area = document.querySelector('.apartment_area'),
        repair_time = document.querySelector('.repair_time'),
        repair_cost = document.querySelector('.repair_cost'),
        index = +sliderImages.querySelector('.active').dataset.id;

        city.innerHTML = `
            <h3 class="info-row-item__title">City:</h3>
            <p class="info-row-item__description">${images[index].city}</p>
        `;
        apartment_area.innerHTML = `
            <h3 class="info-row-item__title">apartment area:</h3>
            <p class="info-row-item__description">${images[index].apartment_area}</p>
        `;
        repair_time.innerHTML = `
            <h3 class="info-row-item__title">Repair time:</h3>
            <p class="info-row-item__description">${images[index].repair_time}</p>
        `;
        repair_cost.innerHTML = `
            <h3 class="info-row-item__title">Repair Cost:</h3>
            <p class="info-row-item__description">${images[index].repair_cost}</p>
        `;
    }

    function initDots() {
        images.forEach((image, index) => {
            let dot = `<div class="slider-dots__dot n${index} ${index === 0 ? 'active' : ''}" data-id="${index}"></div>`
            sliderDots.innerHTML += dot;
        })
        sliderDots.querySelectorAll('.slider-dots__dot').forEach(dot => {
            dot.addEventListener('click', function() {
                moveSlider(this.dataset.id);
            })
        })
    }

    function initTitles() {
        images.forEach((image, index) => {
            let title = `<p class="slider-titles__title n${index} ${index === 0 ? 'active' : ''}" data-id="${index}">${images[index].title}</p>`
            sliderTitles.innerHTML += title;
        })
        sliderTitles.querySelectorAll('.slider-titles__title').forEach(title => {
            title.addEventListener('click', function() {
                moveSlider(this.dataset.id);
            })
        })
    }
}

document.addEventListener("DOMContentLoaded", initSlider);