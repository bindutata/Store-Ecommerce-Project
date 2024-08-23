const products=fetch('https://fakestoreapi.com/products')
    products.then(function(response){
        if (!response.ok){
            throw new Error("Network is not good");
        }
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })
    .catch(function(err){
        console.log("There is a problem in fetching the required data : ",err)
    });


