document.addEventListener('DOMContentLoaded', () => {
    const productid = new URLSearchParams(window.location.search).get('id');
    const productData = JSON.parse(localStorage.getItem('productData')) || [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartItemsContainer = document.getElementById('cart-items');
    
    const totalPriceElement = document.getElementById('totalprice');

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
                }
            });
        });

        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.getAttribute('item-id');
                const item = cart.find(cartItem => cartItem.id == id);
                if (item) {
                    if (item.quantity > 1) {
                        item.quantity -= 1;
                    } else {
                        cart = cart.filter(cartItem => cartItem.id !== id);
                    }
                    localStorage.setItem('cart', JSON.stringify(cart));
                    displayCartItems();
                    updateCartCount();
                }
            });
        });
    }

    function updateCartCount() {
       if(cart.length!=[]){
            document.getElementById('cart-count').innerHTML=cart.length;
       }
    }

    function calculateTotalPrice() {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    }

    function updateTotalPrice() {
        if (totalPriceElement) {
            totalPriceElement.innerText = `$ ${calculateTotalPrice()}`;
        }
    }

    // If a product ID is present in the URL, add it to the cart
    if (productid) {
        addToCart(productid);
    }

    // Display items if they exist in local storage
    displayCartItems();
    updateCartCount();
    updateTotalPrice();
});
