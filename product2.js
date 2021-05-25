let carts=document.querySelectorAll('.add-cart');
let products=[
    {
        name:'AMPLIP 10MG TAB',
        tag:'amlip',
        price:55,
        incart:0

    },
    {
        name:'Geminor MP 2mg Tablet 15',
        tag:'geminor',
        price:176,
        incart:0


    },
    {
        name:'Dolo 500 Paracetamol Tablet',
        tag:'pcm',
        price:12,
        incart:0
    },
    {
        name:'A To Z Ns New Tablet 15',
        tag:'a2z',
        price:105,
        incart:0
    },
    {
        name:'Cartigen Forte Plus, 10 Tablets',
        tag:'cartigen',
        price:409,
        incart:0
    },
    {
        name:'Venusia Max Lotion 300gm',
        tag:'venusia',
        price:607,
        incart:0
    },
    {
        name:'Pantop 40 MG Tablet',
        tag:'pantop',
        price:45,
        incart:0
    },
    {
        name:'Jalra M50/500',
        tag:'jalra',
        price:234,
        incart:0
    },
    
     
];
for(let i=0;i<carts.length;i++){
    carts[i].addEventListener('click',()=>{
        cartNumbers(products[i]);
        totalcost(products[i]);

    })
}
function onLoadCartNumbers(){
    let productNumbers=localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart span').textContent=productNumbers;
    }
}
function cartNumbers(product){
    
    let productNumbers=localStorage.getItem('cartNumbers');
    
    productNumbers=parseInt(productNumbers);
    if(productNumbers){
        localStorage.setItem('cartNumbers',productNumbers+1);
        document.querySelector('.cart span').textContent=productNumbers+1;
    }else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart span').textContent=1;
    }
   setItems(product);
}
function setItems(product){
    let cartitems= localStorage.getItem("productsInCart");
    cartitems= JSON.parse(cartitems);
    if(cartitems != null){
        if(cartitems[product.tag] == undefined){
            cartitems={
                ...cartitems,
                [product.tag]:product
            }
        }
        cartitems[product.tag].incart += 1;
    }
    else{
        product.incart = 1;
        cartitems = {
            [product.tag]:product

        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartitems));
}
function totalcost(product){
    // console.log("the product price is", product.price);
    let cartcost=localStorage.getItem('totalcost');
    
    console.log("my cart is ", cartcost);
    console.log(typeof cartcost);
    if(cartcost !=null){
       cartcost= parseInt(cartcost);
       localStorage.setItem("totalcost", cartcost+product.price);
    }
    else{
        localStorage.setItem("totalcost", product.price);
    }
    
}
// Add here
function decr(e){
    let cartitems= JSON.parse(localStorage.getItem("productsInCart"));
    let cartcost=localStorage.getItem('totalcost');
    if(cartitems[e.id].incart > 1){
        cartitems[e.id].incart--;
        cartcost = parseInt(cartcost) - parseInt(cartitems[e.id].price);
        console.log(cartitems[e.id].incart, cartcost);
    }else{
        cartcost = parseInt(cartcost) - parseInt(cartitems[e.id].price);
        localStorage.setItem('cartNumbers', parseInt(localStorage.getItem('cartNumbers'))-1);
        document.querySelector('.cart span').innerText = localStorage.getItem('cartNumbers');
        delete cartitems[e.id];
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartitems));
    localStorage.setItem('totalcost', cartcost);
    displaycart();
}
function incr(e){
    let cartitems= JSON.parse(localStorage.getItem("productsInCart"));
    let cartcost=localStorage.getItem('totalcost');
    cartitems[e.id].incart++;
    cartcost = parseInt(cartitems[e.id].price) + parseInt(cartcost);
    console.log(cartitems[e.id].incart);
    localStorage.setItem("productsInCart", JSON.stringify(cartitems));
    localStorage.setItem('totalcost', cartcost);
    displaycart();
}




function displaycart(){
    let cartitems= localStorage.getItem("productsInCart");
    cartitems = JSON.parse(cartitems);
    let productcontainer =document.querySelector("tbody");
    let cartcost=localStorage.getItem('totalcost');
    console.log(cartcost);
    if( cartitems && productcontainer){
        productcontainer.innerHTML = '';
        Object.values(cartitems).map((item, index) =>{
            productcontainer.innerHTML +=`
            <tbody >
                        <tr>
                            <td>
                                <div class="main">
                                    <div class="d-flex">
                     <!--W=145 H=98--> <img src="./images/${item.tag}.jpg">
                                    </div>
                                    <div class="des">
                                        <p>${item.name}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <h6>${item.price}</h6>
                            </td>
                            <td>
                                <div class="counter">
                                    <i id="${item.tag}" onclick = "decr(this)" class="fa fa-angle-down"></i>
                                    <input class="input-number"type="text"
                                    value="${item.incart}"min="0"max="10">
                                    <i id="${item.tag}" onclick ="incr(this)" class="fa fa-angle-up"></i>
                                </div>
                            </td>
                            <td>
                                <h6>₹${item.incart * item.price}</h6>
                            </td>
                        </tr>
             `
             });
             if(cartcost != 0){
                productcontainer.innerHTML +=`
                <div class="col-lg-4 offset-lg-4">
                <div class="checkout">
                    <ul>
                        <li class="subtotal">subtotal
                            <span>₹${cartcost}</span>
                        </li>
                        <li class="cart-total">Total
                        <span>₹${cartcost}</span></li>
                    </ul>
                    <a href="shipping.html"class="proceed-btn">Proceed to Checkout</a>
                </div>
                </div>`
            }else{
                productcontainer.innerHTML = '';
            }
            
    }
    
   

}

onLoadCartNumbers();
displaycart();