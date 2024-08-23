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
                        <div class='details'>
                            <img src='${product.image}' alt='image'/>
                            <div class='pdt-name'>
                                <p>${product.title}</p>
                            </div>
                            <div  class='pdt-desc'>   
                                <p>${product.description}</p>
                            </div>    
                        </div><hr>
                        <div class='pdt-price'>
                            <pre>$${product.price}</pre>
                        </div><hr>    
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

     
    

