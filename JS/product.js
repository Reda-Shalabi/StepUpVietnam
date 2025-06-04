// تحديث عداد السلة عند التحميل
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  const productData = JSON.parse(localStorage.getItem('selectedProduct'));

  if (productData) {
    // تحديث بيانات المنتج الحالي
    currentProduct.name = productData.name;
    currentProduct.price = productData.price;
    currentProduct.mainImage = productData.mainImage;
    currentProduct.images = productData.gallery;
    currentProduct.id = 'prod_' + productData.name.toLowerCase().replace(/\s+/g, '-');

    // تغيير بيانات الصفحة
    document.getElementById('mainShoe').src = productData.mainImage;
    document.querySelector('.details h2').textContent = productData.name;
    document.querySelector('.price').textContent = `$${productData.price}`;

    // توليد الصور الجانبية تلقائياً
    const sideImagesContainer = document.getElementById('sideImages');
    sideImagesContainer.innerHTML = ''; // تنظيف القديم

    productData.gallery.forEach((imgSrc, index) => {
      const img = document.createElement('img');
      img.src = imgSrc;
      img.classList.add('thumb');
      if (index === 0) img.classList.add('active');
      img.onclick = () => {
        document.getElementById('mainShoe').src = imgSrc;

        // إزالة الكلاس active من الكل
        document.querySelectorAll('.thumb').forEach(el => el.classList.remove('active'));
        img.classList.add('active');

        // تحديث الصورة الحالية في الكائن
        currentProduct.mainImage = imgSrc;
      };
      sideImagesContainer.appendChild(img);
    });
  }
});
document.addEventListener('DOMContentLoaded', function() {
  const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
  
  if (selectedProduct) {
    // عرض البيانات الأساسية
    document.getElementById('product-name').textContent = selectedProduct.name;
    document.getElementById('product-price').textContent = `${selectedProduct.price} جنيه`;
    
    // عرض الصورة الرئيسية
    const mainImg = document.getElementById('main-product-img');
    mainImg.src = selectedProduct.mainImage;
    mainImg.alt = selectedProduct.name;
    
    // عرض معرض الصور (Gallery)
    const galleryContainer = document.getElementById('product-gallery');
    galleryContainer.innerHTML = ''; // مسح المحتوى القديم
    
    selectedProduct.gallery.forEach((imgSrc, index) => {
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = `${selectedProduct.name} - صورة ${index + 1}`;
      img.classList.add('gallery-thumbnail');
      img.addEventListener('click', () => {
        mainImg.src = imgSrc; // تغيير الصورة الرئيسية عند النقر
      });
      galleryContainer.appendChild(img);
    });
  } else {
    alert('لم يتم العثور على منتج!');
    window.location.href = 'index.html'; // ارجع للصفحة الرئيسية إذا لم يكن هناك منتج محدد
  }
});
// متغيرات المنتج الحالي
let currentProduct = {
  id: '',
  name: '',
  category: "Little Kids' Shoes",
  color: 'White/White/Black',
  size: null,
  fit: 'Little Kids',
  price: 0,
  quantity: 1,
  images: [],
  mainImage: ''
};

// تغيير الصورة الرئيسية (للاحتياط)
function changeImage(element) {
  document.querySelectorAll('.thumb').forEach(thumb => {
    thumb.classList.remove('active');
  });
  element.classList.add('active');
  document.getElementById('mainShoe').src = element.src;
  currentProduct.mainImage = element.src;
}

// اختيار المقاس
function selectSize(element) {
  document.querySelectorAll('#sizeGroup button').forEach(btn => btn.classList.remove('selected'));
  element.classList.add('selected');
  currentProduct.size = element.textContent;
}

// اختيار الفئة
function selectFit(element) {
  document.querySelectorAll('#fitGroup button').forEach(btn => btn.classList.remove('selected'));
  element.classList.add('selected');
  currentProduct.fit = element.textContent;

  // تحديث وصف الفئة
  const categoryElement = document.querySelector('.details p:nth-of-type(1)');
  categoryElement.textContent = element.textContent + "'s Shoes";
  currentProduct.category = categoryElement.textContent;
}

// إضافة إلى السلة
function addToCart() {
  if (!currentProduct.size) {
    alert('Please select a size');
    return;
  }

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingItemIndex = cart.findIndex(item =>
    item.id === currentProduct.id &&
    item.size === currentProduct.size &&
    item.fit === currentProduct.fit
  );

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({ ...currentProduct });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert('Item added to cart');
}

// تحديث عداد السلة
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById('cart-count').textContent = totalItems;
}

// الانتقال إلى السلة
function goToCart() {
  window.location.href = 'cart.html';
}
function addToCartFromProductPage() {
  const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
  
  if (selectedProduct) {
    addToCart(
      selectedProduct.name,
      selectedProduct.price,
      selectedProduct.mainImage
    );
    alert('تمت إضافة المنتج إلى السلة!');
  }
}