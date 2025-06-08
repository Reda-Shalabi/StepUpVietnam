function addToCart(productName, productPrice, productImage) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let product = cart.find(item => item.name === productName);

  if (product) {
    product.quantity += 1;
  } else {
    cart.push({
      name: productName,
      price: productPrice,
      quantity: 1,
      image: productImage
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  displayCart();
  updateCartTotal();

  // ✅ فتح السلايد بار
  document.getElementById('sidebar').classList.add('open');

  // ✅ عرض رسالة التأكيد
  alert(`${productName} تم إضافته إلى السلة!`);
}



// دالة لتحديث عدد العناصر في السلة المعروضة
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];  // جلب السلة من localStorage
  let cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);  // حساب العدد الإجمالي للعناصر في السلة
  document.getElementById('cart-count').textContent = cartCount;  // تحديث عدد العناصر في السلة
}


// دالة لحذف منتج من السلة
function removeItemFromCart(productName) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];  // جلب السلة من localStorage
  cart = cart.filter(item => item.name !== productName);  // إزالة المنتج من السلة

  // تخزين السلة المحدثة في localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  updateCartCount();  // تحديث عدد العناصر في السلة بعد الحذف
  updateCartTotal();  // تحديث الإجمالي بعد الحذف
  displayCart();  // إعادة عرض السلة
}

// دالة لعرض محتويات السلة
function displayCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];  // جلب السلة من localStorage
  let cartItemsDiv = document.getElementById('cart-items');
  let totalPrice = 0;

  // التحقق إذا كانت السلة فارغة
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>السلة فارغة!</p>";
  } else {
    cartItemsDiv.innerHTML = '';  // مسح المحتوى الحالي لعرض العناصر الجديدة

    // عرض المنتجات في السلة
    cart.forEach(item => {
      let itemDiv = document.createElement('div');
      itemDiv.classList.add('cart-item');
      itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}" style="width: 100px; height: auto;">
        <p>اسم المنتج: ${item.name}</p>
        <p>السعر: ${item.price} جنيه</p>
        <p>الكمية: ${item.quantity}</p>
        <button onclick="removeItemFromCart('${item.name}')">حذف</button>
      `;
      cartItemsDiv.appendChild(itemDiv);
      totalPrice += item.price * item.quantity;
    });

    // تحديث الإجمالي
    document.getElementById('total-price').textContent = "الإجمالي: " + totalPrice + " جنيه";
  }
}

// دالة لتحديث الإجمالي عند إضافة أو حذف المنتجات
function updateCartTotal() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let totalPrice = 0;

  cart.forEach(item => {
    totalPrice += item.price * item.quantity;
  });

  document.getElementById('total-price').textContent = "الإجمالي: " + totalPrice + " جنيه";
}

function selectProduct(name, mainImage, price, gallery) {
  const product = {
    name,
    mainImage,
    price,
    gallery: Array.isArray(gallery) ? gallery : [gallery] // تأكد أن gallery هي مصفوفة
  };
  localStorage.setItem('selectedProduct', JSON.stringify(product));
  window.location.href = "product.html";
}

 const sizeSelect = document.getElementById('sizeChoice');
  const customInput = document.getElementById('customSizeInput');

  sizeSelect.addEventListener('change', function () {
    if (this.value === 'Custom') {
      customInput.classList.remove('hidden');
    } else {
      customInput.classList.add('hidden');
    }
  });

// استدعاء دالة لعرض السلة عند تحميل الصفحة
window.onload = function() {
  updateCartCount();  // تحديث عدد العناصر في السلة عند تحميل الصفحة
  displayCart();  // عرض محتويات السلة عند تحميل الصفحة
};
const colorDots = document.querySelectorAll('.color-dot');

colorDots.forEach(dot => {
  dot.addEventListener('click', () => {
    const newImg = dot.getAttribute('data-img');
    const productCard = dot.closest('.product-card');
    const imgTag = productCard.querySelector('.product-img');
    imgTag.src = newImg;
  });
});

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