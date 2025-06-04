 // دالة لتحميل عربة التسوق من localStorage
 function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const itemCountElement = document.getElementById('item-count');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const paypalBtn = document.getElementById('paypal-btn');
    
    // تحديث عدد المنتجات
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    itemCountElement.textContent = `${itemCount} ${itemCount === 1 ? 'منتج' : 'منتجات'}`;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <p>لا توجد منتجات في سلة التسوق الخاصة بك</p>
                <p class="continue-shopping" onclick="window.location.href='index.html'">تابع التسوق</p>
            </div>
        `;
        checkoutBtn.disabled = true;
        paypalBtn.disabled = true;
        return;
    }
    
    checkoutBtn.disabled = false;
    paypalBtn.disabled = false;
    
    // مسح المحتوى الحالي
    cartItemsContainer.innerHTML = '';
    
    let subtotal = 0;
    
    // إضافة كل منتج إلى السلة
    cart.forEach((item, index) => {
        subtotal += item.price * item.quantity;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="item-image" style="background-image: url('${item.image}')"></div>
            <div class="item-details">
                <div class="item-title">${item.name}</div>
                <div class="item-category">${item.category}</div>
                <div class="item-color">${item.color}</div>
                <div class="item-size">المقاس: ${item.size}</div>
                <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                <div class="item-actions">
                    <div class="quantity-selector">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                    <div class="action-btn" onclick="removeItem(${index})">حذف</div>
                    <div class="action-btn" onclick="saveForLater(${index})">حفظ للمستقبل</div>
                </div>
            </div>
        `;
        
        cartItemsContainer.appendChild(itemElement);
    });
    
    // حساب التكاليف
    const shipping = itemCount > 0 ? 8.00 : 0.00;
    const total = subtotal + shipping;
    
    // تحديث الأسعار
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    shippingElement.textContent = `$${shipping.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

// دالة لتحديث كمية المنتج
function updateQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const newQuantity = cart[index].quantity + change;
    
    if (newQuantity < 1) {
        removeItem(index);
        return;
    }
    
    cart[index].quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// دالة لحذف منتج من السلة
function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// دالة لحفظ المنتج للمستقبل
function saveForLater(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    
    savedItems.push(cart[index]);
    localStorage.setItem('savedItems', JSON.stringify(savedItems));
    
    removeItem(index);
    alert('تم حفظ المنتج للمستقبل');
}

// تحميل السلة عند فتح الصفحة
document.addEventListener('DOMContentLoaded', loadCart);