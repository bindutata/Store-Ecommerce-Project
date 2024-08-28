
document.addEventListener('DOMContentLoaded', () => {
    const selectedId = new URLSearchParams(window.location.search).get('id');
    let selectedcategory="";
    console.log(selectedcategory);
    const productData = JSON.parse(localStorage.getItem('productData'));
    
    function productDetails(productId) {

        if (productId) {
            fetch(`https://fakestoreapi.com/products/${productId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network is not good");
                    }
                    return response.json();
                })
                .then(product => {
                    selectedcategory=product.category;
                    
                    const selectedpdt = document.getElementById('selected-pdt');
                    selectedpdt.innerHTML = `
                        <img src="${product.image}" alt="image"/>
                        <div class="about-pdt">
                            <p class="category">${product.category}</p>
                            <p class="title">${product.title}</p>
                            <p class="rating">${product.rating.rate}</p>
                            <pre class="price">$ ${product.price}</pre>
                            <p class="desc">${product.description}</p>
                            <a href="#"><button class="cart-btn">AddToCart</button></a>
                            <a href="#"><button class="gotocart-btn">GoToCart</button></a>
                        </div>
                    `;
                    SimilarProducts(selectedcategory);
                })
                .catch(error => {
                    console.log("Product not found. Error is: ", error);
                })
                
        } else {
            console.error("No product ID found in the URL.");
        }
    }
    function SimilarProducts(selectedcategory){
        console.log(selectedcategory);
        const similarpdtsContainer=document.getElementById('similar_pdts');
        if (selectedcategory && productData.length>0){
            const similarPdts=productData.filter((product)=>
                product.category.toLowerCase().trim()===selectedcategory.toLowerCase().trim());
            console.log(similarPdts); 
            similarpdtsContainer.innerHTML=similarPdts.map((product)=>
                `<div class="simimage">
                    <img src="${product.image}" alt="image"/>
                    <div class="name">
                        <p>${product.title}</p>
                    </div>    
                    <div class='buttons'>
                        <a href="./productsinfo.html?id=${product.id}" class='details-btn'>Details</a>
                        <a href="#" class='addtocart-btn' >AddToCart</a>
                    </div>  
                </div>`
            ).join('');
        }
        else {
            similarpdtsContainer.innerHTML = '<p>No similar products found.</p>';
        }
    }

    // Call productDetails with the ID from the URL
    productDetails(selectedId);
    
    
});

