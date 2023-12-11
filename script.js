document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.querySelector('.toggle_btn');
    const toggleBtnIcon = document.querySelector('.toggle_btn i');
    const dropDownMenu = document.querySelector('.dropdown_menu');

    toggleBtn.onclick = function (event) {
        event.stopPropagation();
        dropDownMenu.classList.toggle('open');
        const isOpen = dropDownMenu.classList.contains('open');
        toggleBtnIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    };

    // Close dropdown menu when clicking outside toggle button
    document.body.addEventListener('click', function (event) {
        if (!event.target.closest('.dropdown_menu') && !event.target.closest('.toggle_btn')) {
            dropDownMenu.classList.remove('open');
            toggleBtnIcon.className = 'fa-solid fa-bars';
        }
    });

    // Close dropdown menu on navigation events
    document.body.addEventListener('click', function (event) {
        if (event.target.tagName === 'A' && event.target.closest('.navbar')) {
            dropDownMenu.classList.remove('open');
            toggleBtnIcon.className = 'fa-solid fa-bars';
        }
    });

    // ------------- Slider function --------------//

    let slides = document.getElementsByClassName("slides");
    let navlinks = document.getElementsByClassName("dot");
    let currentSlide = 0;

    document.getElementById("next").addEventListener("click", () => {
        changeSlide(currentSlide + 1)
    });
    document.getElementById("prev").addEventListener("click", () => {
        changeSlide(currentSlide - 1)
    });
    
    function changeSlide(moveTo) {
        if (moveTo >= slides.length) {
            moveTo = 0;
        }
        if (moveTo < 0) {
            moveTo = slides.length - 1;
        }
    
        slides[currentSlide].classList.toggle("active");
        navlinks[currentSlide].classList.toggle("activeDot");
        slides[moveTo].classList.toggle("active");
        navlinks[moveTo].classList.toggle("activeDot");
        currentSlide = moveTo;
    }
    
    document.querySelectorAll(".dot").forEach((bullet, bulletIndex) => {
        bullet.addEventListener("click", () => {
            if (currentSlide !== bulletIndex) {
                changeSlide(bulletIndex);
            }
        });
    });
    
    window.onload = setInterval(function () {
        changeSlide(currentSlide + 1)
    }, 3000);

    // ------------- Work data function --------------//

    const workSection = document.querySelector('.section-work-data');
    const workObserver = new IntersectionObserver(
        (entries, observer) => {
            const [entry] = entries;

            if (!entry.isIntersecting) return;

            // animate number counter
            const counterNum = document.querySelectorAll(".counter-numbers");
            const speed = 200;

            counterNum.forEach((curElem) => {
                const updateNumber = () => {
                    const targetNumber = parseInt(curElem.dataset.number);
                    let currentNumber = parseInt(curElem.innerText);

                    const incrementNumber = Math.ceil(targetNumber / speed);

                    if (currentNumber < targetNumber) {
                        currentNumber = Math.min(currentNumber + incrementNumber, targetNumber);
                        curElem.innerText = currentNumber;
                        setTimeout(updateNumber, 10);
                    }
                };

                updateNumber();
            });

            observer.unobserve(workSection);
        },
        {
            root: null,
            threshold: 0,
        });

    workObserver.observe(workSection);

});
