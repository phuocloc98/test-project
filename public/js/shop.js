fetch('../public/json/products.json')
    .then(response => response.json())
    .then((data) => {
        console.log(data.products);

        /* RENDER GRID PAGE */
        renderProduct_grid(data.products);
        renderPagination_grid(data.products);
        changPage_grid(data.products);

        /* RENDER LIST PAGE */
        renderProduct_list(data.products);
        renderPagination_list(data.products);
        changPage_list(data.products);


        /* RENDER MODAL PRODUCT */
        renderQuickProduct(data.products);
        filter_U_input();
        /* Cart Localstorage */

    });

//#region -------------------- GET ELEMENT --------------------
const grid_list_options = document.querySelectorAll('.grid-list-option li a');
const grid_view = document.querySelector('.product-grid-view');
const list_view = document.querySelector('.product-list-view');


const showTotalPages = document.querySelector('.show-product');

const select = document.getElementById('select-grid');
//#endregion

//#region -------------------- SLIDER --------------------
const slideValue = document.querySelector(".value-range");
const inputSlider = document.querySelector(".input-organe");
inputSlider.oninput = (() => {
    let value = inputSlider.value;
    slideValue.textContent = value;
    slideValue.style.left = (value / 2) + "%";
    slideValue.classList.add("show");
});
inputSlider.onblur = (() => {
    slideValue.classList.remove("show");
});

var slides = document.querySelectorAll('.slide');
var btns = document.querySelectorAll('.btn');
let currentSlide = 1;

// Javascript for image slider manual navigation
var manualNav = function (manual) {
    slides.forEach((slide) => {
        slide.classList.remove('show');

        btns.forEach((btn) => {
            btn.classList.remove('show');
        });
    });

    slides[manual].classList.add('show');
    btns[manual].classList.add('show');
}

btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        manualNav(i);
        currentSlide = i;
    });
});

// Javascript for image slider autoplay navigation
var repeat = function (showClass) {
    let show = document.getElementsByClassName('show');
    let i = 1;

    var repeater = () => {
        setTimeout(function () {
            [...show].forEach((showSlide) => {
                showSlide.classList.remove('show');
            });

            slides[i].classList.add('show');
            btns[i].classList.add('show');
            i++;

            if (slides.length == i) {
                i = 0;
            }
            if (i >= slides.length) {
                return;
            }
            repeater();
        }, 10000);
    }
    repeater();
}
repeat();
//#endregion

//#region -------------------- EFFECT ANIMATION --------------------
function renderEffect() {
    document.querySelectorAll('.effect').forEach(childEffect => {
        childEffect.innerHTML = `
            <span class="li-effect"></span>
            <span class="li-effect"></span>
            <span class="li-effect"></span>
            <span class="li-effect"></span>
            `
    })
}
renderEffect();

document.querySelectorAll('li.filter').forEach(value => {
    value.addEventListener('click', () => {
        switchActive(document.querySelectorAll('.effect'), value.querySelector('.effect'))
    })
})
//#endregion
//#region -------------------- FILTER SIDEBAR --------------------
$(document).ready(function () {
    // PRODUCT BRAND
    $('.filter').click(function () {
        const value = $(this).attr('data-filter');
        if (value == 'all') {
            $('.itemBox').show('1000');
        } else {
            $('.itemBox').not('.' + value).hide('1000');
            $('.itemBox').filter('.' + value).show('1000');
        }
    })
    $('.filter').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    })
})
//#endregion

//#region -------------------- Toastify --------------------
function toast({ title = "", message = "", type = "info", duration = 1700 }) {
    const main = document.getElementById("toast");
    if (main) {
        const toast = document.createElement("div");

        // Auto remove toast
        const autoRemoveId = setTimeout(function () {
            main.removeChild(toast);
        }, 3000);

        // Remove toast when clicked
        toast.onclick = function (e) {
            if (e.target.closest(".toast__close")) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        };

        const icons = {
            success: "fas fa-check-circle",
            info: "fas fa-info-circle",
            warning: "fas fa-exclamation-circle",
            error: "fas fa-exclamation-circle"
        };
        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        toast.classList.add("toast", `toast--${type}`);
        toast.style.animation = `show_slide ease .6s`;

        toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__msg">${message}</p>
            </div>
            <div class="toast__close">
                <i class="fas fa-times"></i>
            </div>
        `;
        main.appendChild(toast);
    }
}
//#endregion

//#region -------------------- SWITCH LIST - GRID PRODUCT --------------------

grid_list_options.forEach(value => {
    value.addEventListener('click', () => {
        switchActive(grid_list_options, value);
        if (value.getAttribute('data-toggle') === 'list') {
            list_view.classList.add('active');
            grid_view.classList.remove('active');
        } else {
            grid_view.classList.add('active');
            list_view.classList.remove('active');
        }
    })
})

function switchActive(clearActive, addActive) {
    clearActive.forEach((value) => {
        value.classList.remove('active');
    })
    addActive.classList.add('active');
}

//#endregion

//#region -------------------- RENDER GRID PRODUCT --------------------
let perPage_grid = 12;
let currentPage_grid = 1;
let start_grid = 0;
let end_grid = perPage_grid;

function getCurrentPage_grid(currentPage) {
    start_grid = (currentPage - 1) * perPage_grid;
    end_grid = currentPage * perPage_grid;
}

function renderPagination_grid(numberPages) {
    let totalPages = Math.ceil(numberPages.length / perPage_grid);
    let html = '';
    html += `<li class="active"><a href="javascript:void(0);">1</a></li>`
    for (let i = 2; i <= totalPages; i++) {
        html += `<li><a href="javascript:void(0);">${i}</a></li>`;
    }
    html += `<li><a href="#"><i class="fa fa-angle-double-right" aria-hidden="true"></i></a></li>`
    document.querySelector('.grid-pagination ul').innerHTML = html;
}

function renderProduct_grid(dataProducts) {
    html = '';
    const content = dataProducts.map((item, index) => {
        if (index >= start_grid && index < end_grid) {
            return `
            <div class="col-md-4 itemBox ${item.product_brand} ${item.product_sport}">
                <!---------- START Gird Product ---------->
                <div class="grid-single">
                <img class="btn-quick" data-id="${item.id}" src="/public/img/quick.png">
                    <div class="grid-single-img">
                        <img src="${item.product_imgs.img_first}">
                        <h2>${item.product_name}</h2>
                    </div>
                    <div class="grid-single-ifm">
                        <div class="ifm-size">
                            <h3>Size: </h3>
                            <span>39</span>
                            <span>40</span>
                            <span>41</span>
                            <span>42</span>
                        </div>
                        <div class="ifm-color">
                            <h3>Color: </h3>
                            <span style="background:${item.product_colors.color_first}"></span>
                            <span style="background:${item.product_colors.color_second}"></span>
                            <span style="background:${item.product_colors.color_third}"></span>                            
                            <span style="background:${item.product_colors.color_fourth}"></span>                            
                        </div>
                        <button class="custom-btn btn-add" id-add="${item.id}">Buy Now</button>
                    </div>
                </div>
                <!---------- End Gird Product ---------->
            </div>
          `
        }
    }).join('');
    document.querySelector('.product-grid-view .row').innerHTML = content;
    renderQuickProduct(dataProducts);
    init_grid(dataProducts);
}

function changPage_grid(dataProducts) {
    const currentPages_grid = document.querySelectorAll('.grid-pagination li');
    currentPages_grid.forEach((value, index) => {
        value.addEventListener('click', () => {
            currentPage_grid = index + 1;
            getCurrentPage_grid(currentPage_grid);
            renderProduct_grid(dataProducts);
            switchActive(currentPages_grid, value);
            filter_U_input();
        })
    })
}
//#endregion

//#region -------------------- RENDER LIST PRODUCT --------------------
let perPage_list = 5;
let currentPage_list = 1;
let start_list = 0;
let end_list = perPage_list;

function getCurrentPage_list(currentPage) {
    start_list = (currentPage - 1) * perPage_list;
    end_list = currentPage * perPage_list;
}

function renderPagination_list(numberPages) {
    let totalPages = Math.ceil(numberPages.length / perPage_list);
    let html = '';
    html += `<li class="active"><a href="javascript:void(0);">1</a></li>`
    for (let i = 2; i <= totalPages; i++) {
        html += `<li><a href="javascript:void(0);">${i}</a></li>`;
    }
    html += `<li><a href="#"><i class="fa fa-angle-double-right" aria-hidden="true"></i></a></li>`
    document.querySelector('.list-pagination ul').innerHTML = html;
}

function renderProduct_list(dataProducts) {
    html = '';
    const content = dataProducts.map((item, index) => {
        if (index >= start_list && index < end_list) {
            return `
            <div class="list-single itemBox ${item.product_brand} ${item.product_sport}">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-4">
                        <div class="list-single-img">
                            <img src="${item.product_imgs.img_first}" alt="">
                            <span class="onsale">Sale!</span>
                        </div>
                    </div>

                    <div class="col-xs-12 col-sm-12 col-md-8">
                        <div class="list-single-ifm">
                            <div class="ifm-header">
                                <a href="/views/single-product.html?id=${item.id}"><h2>${item.product_name}</h2></a>
                                <div class="ifm-header-color">
                                    <span style= "background:${item.product_colors.color_first}" class="active"></span>
                                    <span style= "background:${item.product_colors.color_second}"></span>
                                    <span style= "background:${item.product_colors.color_third}"></span>
                                    <span style= "background:${item.product_colors.color_fourth}"></span>
                                </div>
                            </div>

                            <div class="ifm-reviews">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star-o"></i>
                            </div>

                            <div class="ifm-description">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Fusce posuere metus vitae arcu imperdiet, id aliquet ante
                                    scelerisque. Sed sit amet sem vitae urna fringilla tempus.
                                </p>
                            </div>

                            <div class="ifm-price">
                                <div class="price-box">
                                    <span class="price">$${item.product_price.cost}</span>
                                    <span class="regular-price">$${item.product_price.sale}</span>
                                </div>
                            </div>

                            <div class="ifm-action">
                                <button class="custom-btn btn-buy" id-buy="${item.id}">Buy Now</button>
                                <button class="custom-btn btn-quick" data-id="${item.id}">Quick View</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          `
        }
    }).join('');
    document.querySelector('.render_list').innerHTML = content;
    renderQuickProduct(dataProducts);
    init_list(dataProducts);
}

function changPage_list(dataProducts) {
    const currentPages_list = document.querySelectorAll('.list-pagination li');
    console.log(currentPages_list);
    currentPages_list.forEach((value, index) => {
        value.addEventListener('click', () => {
            currentPage_list = index + 1;
            getCurrentPage_list(currentPage_list);
            renderProduct_list(dataProducts);
            switchActive(currentPages_list, value);
            filter_U_input();
        })
    })
}

//#endregion

//#region -------------------- RENDER QUICK PRODUCT --------------------

function renderQuickProduct(dataProducts) {
    const quick_button = document.querySelectorAll('.btn-quick');
    quick_button.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.popup-view').classList.add('active');
            const dataSingle = dataProducts.filter(value => {
                return value.id === button.getAttribute('data-id');
            })
            document.querySelector('.popup-view').innerHTML = `
            <div class="popup-card">
          <a><i class="fas fa-window-close close-btn"></i></a>
          <div class="popup-img" 
                style="background:linear-gradient(45deg,${dataSingle[0].product_colors.color_first}, transparent);">
            <img src="${dataSingle[0].product_imgs.img_first}" alt="" class="shoe current" color="${dataSingle[0].product_colors.color_first}">
            <img src="${dataSingle[0].product_imgs.img_second}" alt="" class="shoe" color="${dataSingle[0].product_colors.color_second}">
            <img src="${dataSingle[0].product_imgs.img_third}" alt="" class="shoe" color="${dataSingle[0].product_colors.color_third}">
            <img src="${dataSingle[0].product_imgs.img_fourth}" alt="" class="shoe" color="${dataSingle[0].product_colors.color_fourth}">
          </div>
          <div class="popup-info">
            <h2>${dataSingle[0].product_name}<br><span>${dataSingle[0].product_brand}</span></h2>
            <p>${dataSingle[0].product_description}</p>
              <div class="popup-color">
                <h3>Color:</h3>
                    <span 
                        class="color active" 
                        color="${dataSingle[0].product_colors.color_first}" 
                        style="background:${dataSingle[0].product_colors.color_first}">
                    </span>
                    <span 
                        class="color" 
                        color="${dataSingle[0].product_colors.color_second}" 
                        style="background:${dataSingle[0].product_colors.color_second}">
                    </span>
                    <span 
                        class="color" 
                        color="${dataSingle[0].product_colors.color_third}" 
                        style="background:${dataSingle[0].product_colors.color_third}">
                    </span>
                    <span 
                        class="color" 
                        color="${dataSingle[0].product_colors.color_fourth}" 
                        style="background:${dataSingle[0].product_colors.color_fourth}">
                    </span>
              </div>

              <div class="popup-size">
                <h3>Size:</h3>
                  <span class="size active">6</span>
                  <span class="size">7</span>
                  <span class="size">8</span>
                  <span class="size">9</span>
              </div>
             <div class="popup-price">
                <span class="price">$${dataSingle[0].product_price.cost}</span>
                <span class="regular-price">$${dataSingle[0].product_price.sale}</span>
             </div>
             <a href="/views/single-product.html?id=${dataSingle[0].id}" class="custom-btn btn-quick">View More</a>
          </div>
        </div>
            `
            animateQuick();
        })
    })
}
function animateQuick() {
    document.querySelector('.close-btn').addEventListener('click', () => {
        document.querySelector('.popup-view').classList.remove('active');
    })
    const colors = document.querySelectorAll('.color');
    const shoes = document.querySelectorAll('.shoe');

    colors.forEach(value => value.addEventListener('click', () => {
        let color = value.getAttribute('color');
        let shoe = document.querySelector(`.shoe[color="${color}"]`);

        colors.forEach(c => c.classList.remove('active'));
        value.classList.add('active');

        shoes.forEach(changeShoes => changeShoes.classList.remove('current'));
        shoe.classList.add('current');

        document.querySelector('.popup-img').style.background = 'linear-gradient(45deg,' + color + ', transparent)';
    }));
}
//#endregion

//#region -------------------- Quick Search Filter --------------------
function filter_U_input() {
    const searchInput = document.getElementById('searchBar');
    const products_grid = document.querySelectorAll('.product-grid-view .col-md-4');
    const products_list = document.querySelectorAll('.list-single');

    searchInput.addEventListener('keyup', (event) => {
        const q = event.target.value.toLowerCase();
        products_grid.forEach((product) => {
            product.querySelector('.grid-single-img h2').textContent.toLowerCase().includes(q) ?
                product.style.display = 'block' :
                (product.style.display = 'none');
        });

        products_list.forEach((product) => {
            product.querySelector('.ifm-header h2').textContent.toLowerCase().includes(q) ?
                product.style.display = 'block' :
                (product.style.display = 'none');
        });
    })
}
//#endregion

//#region -------------------- Cart using localStorage --------------------
function init_list(dataProducts) {
    const buy_product = document.querySelectorAll('.btn-buy');
    buy_product.forEach((value) => {
        value.addEventListener('click', () => {
            const value_Attribute = value.getAttribute('id-buy');
            const id_list_product = dataProducts.find(value => value.id === value_Attribute);
            console.log(id_list_product);
            cartNumbers(id_list_product);
            totalCost(id_list_product);
            renderMiniCart();
        })
    })
}
function init_grid(dataProducts) {
    const buy_add = document.querySelectorAll('.btn-add');
    buy_add.forEach((value) => {
        value.addEventListener('click', () => {
            const value_Attribute = value.getAttribute('id-add');
            const id_grid_product = dataProducts.find(value => value.id === value_Attribute);
            console.log(id_grid_product);
            cartNumbers(id_grid_product);
            totalCost(id_grid_product);
            renderMiniCart();
        })
    })
}
/* -------- Load number cart -------- */
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.num-cart-product').textContent = productNumbers;
    }
}

/* -------- set number cart -------- */
function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.num-cart-product').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.num-cart-product').textContent = 1;
    }
    setItems(product);
}

/* -------- get item product -------- */
function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {

        if (cartItems[product.product_name] == undefined) {
            cartItems = {
                ...cartItems,
                [product.product_name]: product
            }
        }
        cartItems[product.product_name].inCart += 1
    } else {
        product.inCart = 1;
        cartItems = {
            [product.product_name]: product
        }
    }
    localStorage.setItem('productsInCart', JSON.stringify
        (cartItems));
    toast({
        title: "Success!",
        message: `Added ${product.product_name} to the cart`,
        type: "success",
        duration: 5000
    });
}

/* -------- get total cost -------- */
function totalCost(product) {

    let cartCost = localStorage.getItem('totalCost');

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.product_price.sale);
    } else {
        localStorage.setItem('totalCost', product.product_price.sale);
    }
}

/* -------- render product in mini-cart -------- */
function renderMiniCart() {
    let productNumbers = localStorage.getItem('cartNumbers');
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
            </div>
            `
        }).join('');

        const cart_total = `
        <span>Quantity: <strong>${productNumbers}</strong> </span>
        <span>Subtotal. <strong>$${cartCost}</strong></span>
        `
        renderMiniCart.innerHTML = listShoppingCart;
        document.querySelector('.cart_total').innerHTML = cart_total;
    }
}

onLoadCartNumbers();
renderMiniCart();

/* -------- render product in cart-page -------- */
function renderShoppingCart() {
    let cartCost = localStorage.getItem('totalCost');
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let renderShoppingCart = document.querySelector('.table-content tbody');
    if (cartItems && renderShoppingCart) {
        const listShoppingCart = Object.values(cartItems).map((item) => {
            return `
            <tr>
                <td class="product-thumbnail"><a href="#"><img src="${item.product_imgs.img_first}"
                    alt=""></a></td>
                <td class="product-name"><a href="#">${item.product_name}</a></td>
                <td class="product-price"><span class="amount">$${item.product_price.sale}</span></td>
                <td class="product-quantity">
                    <input value="${item.inCart}" type="number">
                </td>
                <td class="product-subtotal"><span class="amount">$${item.product_price.sale * item.inCart}</span></td>
                <td class="product-remove"><a href="#"><i class="fas fa-trash-alt"></i></a></td>
            </tr>
            `
        }).join('');
        renderShoppingCart.innerHTML = listShoppingCart;
        deleteButtons();
    }
}
renderShoppingCart();

/* -------- delete cart item -------- */
function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product-remove a');
    let productNumbers = localStorage.getItem('cartNumbers');

    let cartCost = localStorage.getItem("totalCost");
    cartCost = parseInt(cartCost);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;

    for (let i = 0; i < deleteButtons.length; i++) {
        let node = document.querySelector('td.product-name a').textContent;
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.nextElementSibling.innerText;
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - (cartItems[productName].product_price.sale * cartItems[productName].inCart));
            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            renderMiniCart();
            renderShoppingCart();
            onLoadCartNumbers();
        })
    }
}


//#endregion

//#region -------------------- Resize --------------------
let changeView = window.matchMedia('(max-width: 768px)');
let changeImg = window.matchMedia('(max-width: 991px)');
function switchOption() {
    if (changeView.matches) {
        document.querySelector('.grid-list-option').style.display = "none";
        grid_view.classList.remove('active');
        list_view.classList.add('active');
    }
    else {
        document.querySelector('.grid-list-option').style.display = 'block';
        document.querySelectorAll('.grid-list-option li a').forEach(value => {
            value.classList.remove('active');
            if (value.getAttribute('data-toggle') === "grid") {
                value.classList.add('active');
            }
        })
        grid_view.classList.add('active');
        list_view.classList.remove('active');
    }
}
switchOption();
window.addEventListener('resize', switchOption);

function switchImg() {
    if (changeImg.matches) {
        document.querySelector('.banner-img img').src = "../img/breadcrumb-img.jpg";
    }
    else {
        document.querySelector('.banner-img img').src = "../img/sidebar-banner.gif";
    }
}
switchImg();
window.addEventListener('resize', switchImg);
//#endregion

