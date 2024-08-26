document.addEventListener('DOMContentLoaded', () => {
    const fakeproducts=fetch('https://fakestoreapi.com/products')
    fakeproducts.then(function(response){
        if (!response.ok){
            throw new Error("Network is not good");
        }
        return response.json();
    })
    .then((response)=>{
        const productData=response;
        console.log(productData);
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
                            <pre>$ ${product.price}</pre>
                        </div><hr>    
                        <div class='buttons'>
                            <a href="./productsinfo.html"><button type="button" class='details-btn' id='${product.id}'>Details</button></a>
                            <a href="#"><button type="button" class='addtocart-btn' >AddToCart</button></a> 
                        </div>    
                    </div>
                    `);
        });
        productsContainer.innerHTML=products.join(' ');


        let detailbuttons=document.querySelectorAll('.latest_pdts .buttons .details-btn');
        console.log(detailbuttons.length);
        detailbuttons.forEach((button)=>{
        button.addEventListener('click',(e)=>{
            const id=e.target.getAttribute('id');
            productDetails(id);
        });
        });
        
        /*function filterProducts(category){
            let categoryButtons = document.querySelectorAll('.category-btn');
            categoryButtons.forEach(button=>{
                if (category.toLowerCase() ==  button.innerText.toLowerCase()){

                }
            })
        }*/
    })
    .catch((err)=>{
        console.log("There is a problem in fetching the required data : ",err);
    });

    function productDetails(productId){
        fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(function(response){
            if(!response.ok){
                throw new Error("Network is not good");
        }
        return response.json();
        })
        .then((response)=>{
            console.log(response);
            const selectedpdt=document.getElementById('selected-pdt');
            selectedpdt.innerHTML=`
                    <img src="${response.image}" alt="image"/>
                    <div class="about-pdt">
                        <p class="category">${response.category}</p>
                        <p class="title">${response.title}</p>
                        <p class="rating">${response.rating.rate}</p>
                        <pre class="price">$ ${response.price}</pre>
                        <p class="desc">${response.description}</p>
                        <a href="#"><button class="cart-btn">AddToCart</button></a>
                        <a href="#"><button class="gotocart-btn">GoToCart</button></a>
                    </div>
                    `;
        })
        .catch((error)=>{
            console.log("Product not found.Error is : ",error);
        });
    };productDetails(5);

    
    
    
        

   /* function specificCategory(category){
        fetch(`fetch('https://fakestoreapi.com/products/category/${category})`)
        .then((response)=>{
            if (!response.ok){
                throw new Error("Network is not good");
        }
        return response.json();
        })
        .then((response)=>{
            const similarpdts=document.getElementById('similar-pdts');
            similarpdts.innerHTML=`<img src="${response.image} alt="image"/>
                        <p class="title">${response.title}</p>
                        <div class='buttons'>
                            <a href="./productsinfo.html" class='details-btn' id='details-btn'>Details</a>
                            <a href="#" class='addtocart-btn' id='addtocart-btn'>AddToCart</a> 
                        </div>
                        `
        })
        .catch((error)=>{
            console.log("No results found.Error is : ",error);
        });
    };specificCategory(category)*/
    
    



 
});
