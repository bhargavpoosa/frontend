const addProduct = async (prodId) => {
    try{
        cartList = document.getElementById('cart-items');
        let add = await fetch(`http://localhost:8080/cart/add/${prodId}`, {method: 'POST', headers: {
            'Content-Type': 'application/json', 
        }})
        if(add.ok){
            cart();
        }
    }
    catch(error){
        console.error("An error occurred:", error);
    }
}

const removeProduct = async (prodId) => {
    try{
        cartList = document.getElementById('cart-items');
        let remove = await fetch(`http://localhost:8080/cart/remove/${prodId}`, {method: 'POST', headers: {
            'Content-Type': 'application/json', 
        }})
        if(remove.ok){
            cart();
        }
    }
    catch(error){
        console.error("An error occurred:", error);
    }
}

const cart = async (event) => {
    try {
        let response = await fetch("http://localhost:8080/cart/");
        if (response.ok) {
            const data = await response.json();
            console.log("Response: ", data);
            const cartList = document.getElementById('cart-items');
            const checkoutDetails = document.getElementById('checkout-details');
            cartList.innerHTML = '';
            checkoutDetails.innerHTML = '';
            let totalAmount = 0;

            data.forEach(cartItem => {
                    totalAmount += cartItem.quantity * cartItem.price;
                    const cartItemElement = document.createElement('div');
                    cartItemElement.classList.add('cart-item');
                        cartItemElement.innerHTML = `
                            <img src="${cartItem.imageUrl}" alt="${cartItem.productName}">
                            <div class="cart-details">
                                <h3>${cartItem.productName}</h3>
                                <p>Rs ${cartItem.price}</p>
                            </div>
                            <div class="incre-decre-btn">
                                <button class="decre-button" onclick="removeProduct('${cartItem.prod_id}')">-</button>
                                <span class="product-quantity">${cartItem.quantity}</span>
                                <button class="incre-button" onclick="addProduct('${cartItem.prod_id}')">+</button>
                            </div> 
                        `;
                        cartList.appendChild(cartItemElement);
                    });

            const checkoutItem = document.createElement('div');
            checkoutItem.classList.add('checkout');
            checkoutItem.innerHTML = `
                <div class="total-amount">
                    <h3 class="total-message">Total:</h3>
                    <h3 class="total-value">Rs ${totalAmount}</h3>
                </div>
                <div class="checkout-btn">
                    <a href="../checkoutpage/checkoutpage.html">Checkout</a>
                </div>`;
            checkoutDetails.appendChild(checkoutItem);
        } else {
            console.error("Failed to fetch data");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

document.addEventListener('DOMContentLoaded', cart);