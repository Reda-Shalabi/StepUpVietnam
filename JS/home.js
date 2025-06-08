
function changeLanguage(lang) {
  const elements = document.querySelectorAll('[data-en]');
  elements.forEach(el => {
    el.textContent = el.getAttribute('data-' + lang);
  });

  // تغيير اتجاه النص
  document.body.dir = (lang === 'ar') ? 'rtl' : 'ltr';
  document.body.style.textAlign = (lang === 'ar') ? 'right' : 'left';
}

function toggleMenu() {
  const navList = document.querySelector('.list-nav ul');
  const overlay = document.getElementById('menu-overlay');
  navList.classList.toggle('active');
  if (navList.classList.contains('active')) {
    overlay.classList.add('active');
    overlay.style.display = 'block';
  } else {
    overlay.classList.remove('active');
    overlay.style.display = 'none';
  }
}

// ----------- السلايدر ----------- //
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideInterval;

function goToSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');

    currentSlide = index;
}

function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    goToSlide(next);
}

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 4000);
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index);
        clearInterval(slideInterval);
        setTimeout(startAutoSlide, 7000);
    });
});

goToSlide(0);
startAutoSlide();

// ----------- الأنيميشن عند التمرير ----------- //
const animatedElements = document.querySelectorAll("[data-animation]");

function handleScroll() {
    animatedElements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect();
        if (elementPosition.top < window.innerHeight && elementPosition.bottom > 0) {
            element.classList.add("visible");
        } else {
            element.classList.remove("visible");
        }
    });
}

window.addEventListener("scroll", handleScroll);
handleScroll();

// ----------- السيرش (البحث) ----------- //
function searchFunction() {
    const input = document.getElementById("searchInput");
    if (!input) {
        console.error("عنصر البحث غير موجود!");
        return;
    }

    const filter = input.value.trim().toUpperCase();
    const products = document.querySelectorAll(".product");
    let firstVisibleProduct = null;

    products.forEach(product => {
        const title = product.querySelector("h3");
        const description = product.querySelector("p");
        const price = product.querySelector(".new-price");

        const textToSearch = [
            title?.textContent || "",
            description?.textContent || "",
            price?.textContent || ""
        ].join(" ").toUpperCase();

        if (filter === "" || textToSearch.includes(filter)) {
            product.style.display = "";
            if (!firstVisibleProduct) {
                firstVisibleProduct = product;
            }
        } else {
            product.style.display = "none";
        }
    });

    // التمرير إلى أول نتيجة بحث
    if (firstVisibleProduct) {
        firstVisibleProduct.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
            
        // إضافة تأثير بصرى
        firstVisibleProduct.style.animation = "highlight 1.5s";
        setTimeout(() => {
            firstVisibleProduct.style.animation = "";
        }, 1500);
    }
}

// إضافة تأثير CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes highlight {
        0% { background-color: rgba(255, 255, 0, 0.3); }
        100% { background-color: transparent; }
    }
`;
document.head.appendChild(style);

// ربط حدث البحث عند الضغط على Enter
document.getElementById("searchInput")?.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        searchFunction();
    }
});

// ربط حدث البحث عند الكتابة (مع تأخير 500 مللي ثانية)
let searchTimer;
document.getElementById("searchInput")?.addEventListener("input", function() {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(searchFunction, 500);
});

