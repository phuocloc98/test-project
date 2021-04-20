function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.num-cart-product').textContent = productNumbers;
    }
}


function renderMiniCart() {
    let cartCost = localStorage.getItem('totalCost');
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let renderMiniCart = document.querySelector('.cart_inner');
    if (cartItems && renderMiniCart) {
        const listShoppingCart = Object.values(cartItems).map((item) => {
            return `
            <div class="cart_item">
            <div class="cart_img">
              <a href="#"><img src="..${item.product_imgs.img_first}" alt=""></a>
            </div>
            <div class="cart_info">
              <a href="#">${item.product_name}</a>
              <span class="quantity">Qty : ${item.inCart}</span>
              <span class="price_cart">Rs. ${item.product_price.sale}</span>
            </div>
            <div class="cart_remove">
              <a href="#"><i class="fas fa-trash"></i></a>
            </div>
          </div>
            `
        }).join('');

        const cart_total = `
        <span>Subtotal : </span>
        <span>Rs. ${cartCost}</span>
        `
        renderMiniCart.innerHTML = listShoppingCart;
        document.querySelector('.cart_total').innerHTML = cart_total;
    }
}

renderMiniCart();



function renderShoppingCart() {
    let cartCost = localStorage.getItem('totalCost');
    cartCost = parseInt(cartCost);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let renderShoppingCart = document.querySelector('.table-content tbody');
    if (cartItems && renderShoppingCart) {
        const listShoppingCart = Object.values(cartItems).map((item) => {
            return `
            <tr>
                <td class="product-remove"><a href="javascript:void(0);"><i class="fas fa-trash-alt"></i></a></td>
                <td class="product-name"><a href="#">${item.product_name}</a></td>
                <td class="product-thumbnail"><a href="#"><img src="${item.product_imgs.img_first}"
                    alt=""></a></td>
                <td class="product-price"><span class="amount">$${item.product_price.sale}</span></td>
                <td class="product-quantity">
                    <input value="${item.inCart}" type="number">
                </td>
                <td class="product-subtotal"><span class="amount">$${item.product_price.sale * item.inCart}</span></td>
            </tr>
            `
        }).join('');
        renderShoppingCart.innerHTML = listShoppingCart;
        const totalCart = `
            <h2>Cart totals</h2>
            <ul>
                <li>Subtotal <span>$${cartCost}</span></li>
                <li>Tax <span>$12</span></li>
                <li class="total">Total <span>$${cartCost +12}</span></li>
            </ul>
            <a href="#">Proceed to checkout</a>
        `
        document.querySelector('.cart-page-total').innerHTML = totalCart;
        deleteButtons();
    }
}
onLoadCartNumbers();
renderShoppingCart();

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product-remove a');
    let productNumbers = localStorage.getItem('cartNumbers');

    let cartCost = localStorage.getItem("totalCost");
    cartCost = parseInt(cartCost);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;

    for(let i=0; i < deleteButtons.length; i++) {
        let node = document.querySelector('td.product-name a').textContent;
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.nextElementSibling.innerText;
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].product_price.sale * cartItems[productName].inCart));
            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            renderMiniCart();
            renderShoppingCart();
            onLoadCartNumbers();
        })
    }
}

function clearAll() {
    document.querySelector('.delete input').addEventListener('click', () => {
        localStorage.clear(); 
   })
}
clearAll();

