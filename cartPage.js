document.addEventListener('DOMContentLoaded', () => {
    const productid=new URLSearchParams(window.location.search).get('id');
    console.log(productid);
    const productData=JSON.parse(localStorage.getItem('productData'));
    console.log(productData);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartItemsContainer=document.getElementById('cart-items');
    function addToCart(productid){
        
        if (productid){
            console.log(productid);
            const item=productData.find((product)=>productid==product.id);
            console.log(item);
            if (item){
                const Cartitem = cart.find(cartItem => cartItem.id === item.id);
                if (Cartitem){
                    item.quantity+=1;
                }    
                else{
                    item.quantity=1;
                    cart.push(item);
                }    
                localStorage.setItem('cart', JSON.stringify(cart));
                displayInCart();
            }            
        }            
    }
    function displayInCart(){
        cartItemsContainer.innerHTML=
                        `<tr class="heading">
                            <td>ItemList</td>
                        </tr>
                        ${cart.map((item,index)=>
                        
                        `<tr class="item-row">
                        <td><img src="${item.image}" alt="image"/></td>
                        <td><p class="name">${item.title}</p></td>
                        <td><button class="delete" index=${index}>-</button></td>
                        <td><span id="quantity">${item.quantity}</span></td>
                        <td><button class="add" index="${index}">+</button></td>
                        <td><pre class="price">$ ${(item.price*item.quantity)}</pre></td>
                        </tr>`
                    ).join('')}`;
                    attachButtonEventListeners();
    }    
    function attachButtonEventListeners(){
        document.querySelectorAll('.delete').forEach((deletebtn)=>
        deletebtn.addEventListener('click',(e)=>{
            const index=e.target.dataset.index;
            if(cart[index].quantity>1){
                cart[index].quantity-=1;
            }
            else{
                cart.splice(index,1);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            displayInCart();
        }    
        ))
        document.querySelectorAll('.add').forEach((addbtn)=>{
            addbtn.addEventListener('click',(e)=>{
            const index=e.target.dataset.index;
            cart[index].quantity+=1;
            localStorage.setItem('cart', JSON.stringify(cart));
            displayInCart();})
        }    
        )
    }
    addToCart(productid);
    displayInCart();
});
                