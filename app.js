
document.addEventListener('DOMContentLoaded', () => {
    let productData = [];
    const fakeproducts=fetch('https://fakestoreapi.com/products')
    fakeproducts.then(function(response){
        if (!response.ok){
            throw new Error("Network is not good");
        }
        return response.json();
    })
    .then((response)=>{
        productData=response;
        console.log("Fetched Products:", productData);
        localStorage.setItem('productData', JSON.stringify(productData));
        const productsContainer=document.getElementById('latest_pdts');
        if (productsContainer){
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
                            <a href="./productsinfo.html?id=${product.id}" class='details-btn'>Details</a>
                            <a href="#" class='addtocart-btn' >AddToCart</a>
                        </div>    
                    </div>
                    `);
        });productsContainer.innerHTML=products.join(' ');
    }
    else{
        console.log ('No products');
    }
    })
    .catch((err)=>{
        console.log("There is a problem in fetching the required data : ",err);
    });

    let categorybtns=document.querySelectorAll('.category-btn');
    console.log(categorybtns);
        categorybtns.forEach((btn)=>{
            btn.addEventListener('click',(e)=>{
            const category=e.target.id;
            console.log("Selected Category:", category);
            const filteredpdts=filterProducts(category);
            console.log("Filtered Products:", filteredpdts);
            displayFilteredProducts(filteredpdts);
        });
    });
        

    function filterProducts(category){
        console.log("Filtering Products for Category:", category);
        if (category==="All"){
            return productData;
        }
        else{
            const normalizedCategory = category.toUpperCase().trim();
            return productData.filter(product => {
                
                console.log("Product Category:", product.category); // Log each product's category
                return product.category.toUpperCase().trim() === normalizedCategory;
            })
        }
    }


    function  displayFilteredProducts(products){
        const productContainer=document.getElementById('latest_pdts');
        productContainer.innerHTML=products.map((product)=>{
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
                                <a href="./productsinfo.html?id=${product.id}" class='details-btn'>Details</a>
                                <a href="#" class='addtocart-btn' >AddToCart</a>
                            </div>    
                        </div>
                        `);
        }).join('');
    }
});
    
    
    
    

    

    
        
        
    
    
    
    
    
    
    

   




