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