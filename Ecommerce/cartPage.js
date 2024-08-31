document.addEventListener('DOMContentLoaded', () => {
    const productid = new URLSearchParams(window.location.search).get('id');
    const productData = JSON.parse(localStorage.getItem('productData')) || [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartItemsContainer = document.getElementById('cart-items');
    const totalItems = document.getElementById('total-items');
    const productstotal = document.getElementById('product-total');
    const totalamount = document.getElementById('total-amount');
    const shippingCost = 30;

    function addToCart(productid) {
        const item = productData.find((item) => item.id == productid);
        if (item) {
            const existingItem = cart.find(cartItem => cartItem.id == item.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                item.quantity = 1;
                cart.push(item);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItems();
            updateOrderSummary();
        }
    }

    function displayCartItems() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `No Items In The Cart.
                                            <a href="./HomePage.html"><i class="fa-solid fa-arrow-left"></i>
                                            Continue Shopping</a>`;
        } else {
            cartItemsContainer.innerHTML =
                `<tr class="heading">
                    <td>Item List</td>
                </tr>
                ${cart.map((item) =>
                    `<tr class="item-row">
                        <td><img src="${item.image}" alt="image"/></td>
                        <td><p class="name">${item.title}</p></td>
                        <td><button class="delete" item-id="${item.id}">-</button></td>
                        <td><span class="quantity">${item.quantity}</span></td>
                        <td><button class="add" item-id="${item.id}">+</button></td>
                        <td><pre class="price">$ ${(item.price * item.quantity).toFixed(2)}</pre></td>
                    </tr>`
                ).join('')}`;
            addEventListeners();
        }
    }

    function addEventListeners() {
        document.querySelectorAll('.add').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.getAttribute('item-id');
                const item = cart.find(cartItem => cartItem.id == id);
                if (item) {
                    item.quantity += 1;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    displayCartItems();
                    updateCartCount();
                    updateOrderSummary();
                }
            });
        });

        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.getAttribute('item-id');
                const itemIndex = cart.findIndex(cartItem => cartItem.id == id);
                if (itemIndex > -1) {
                    if (cart[itemIndex].quantity > 1) {
                        cart[itemIndex].quantity -= 1;
                    } else {
                        cart.splice(itemIndex, 1); // Use splice to remove the item
                    }
                    localStorage.setItem('cart', JSON.stringify(cart));
                    displayCartItems();
                    updateCartCount()
                    updateOrderSummary();
                    
                }
            });
        });
    }

    function updateCartCount(){
        var cartcount=document.getElementById('cart-count');
        if(cart!=[]){
            cartcount.innerText=cart.length;
        }
    }

    function calculateTotalItems() {
        totalItems.innerText=cart.length;
    }

    function calculateTotalPrice() {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    }

    function updateOrderSummary() {
        const totalItems = calculateTotalItems();
        const productTotal = calculateTotalPrice();
        const totalAmount = cart.length > 0 ? (parseFloat(productTotal) + shippingCost).toFixed(2) : '0';

        if (totalItems) {
            totalItems.innerText = totalItems;
        }
        if (productstotal) {
            productstotal.innerText = `$ ${productTotal}`;
        }
        if (totalamount) {
            totalamount.innerText = `$ ${totalAmount}`;
        }
    }

    
    if (productid) {
        const productInCart = cart.some(cartItem => cartItem.id == productid);
        if (!productInCart) {
            addToCart(productid);
        }
    }
    
    displayCartItems();
    updateCartCount();
    updateOrderSummary();
});

