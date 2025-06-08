fetch('products.json')
    .then(response => response.json())
    .then(data => {
        // عرض المنتجات هنا
    });
    function addToCart(name, image, price) {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems.push({name, image, price});
        localStorage.setItem('cart', JSON.stringify(cartItems));
        alert('تمت الإضافة إلى السلة');
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