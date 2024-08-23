const fakeproducts=fetch('https://fakestoreapi.com/products')
    fakeproducts.then(function(response){
        if (!response.ok){
            throw new Error("Network is not good");
        }
        return response.json();
    })
    .then((response)=>{
        console.log(response);
        const productsContainer=document.getElementById('latest_pdts');
        const products=response.map((product)=>{
            return (`<div class='product-card'>
                        <img src='${product.image}' alt='image'/><hr>
                        <p class='pdt-desc'>${product.description}</p><hr>
                        <pre>${product.price}</pre><hr>
                        <div class='buttons'>
                            <button class='details-btn' id='details-btn'>Details</button>
                            <button class='addtocart-btn' id='addtocart-btn'>AddToCart</button>
                        </div>     
                    </div>
                    `);
        });
        productsContainer.innerHTML=products.join(' ');
    })
    .catch((err)=>{
        console.log("There is a problem in fetching the required data : ",err);
    });

     
    

