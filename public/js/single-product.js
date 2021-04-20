fetch('/public/json/products.json')
    .then(response => response.json())
    .then((data) => {
        renderProduct(data.products);
        slider_product();
    });

//#region -------------------- GET ELEMENTS --------------------
const render_SProduct = document.querySelector('.render-single-product');
const switch_tab = document.querySelectorAll('.product-switch-tab a');
const review_tab = document.querySelector('.tab-reviews');
const desc_tab = document.querySelector('.tab-description');
//#endregion

//#region -------------------- DOTENV --------------------
function switchActive(clearActive, addActive) {
    clearActive.forEach((value) => {
        value.classList.remove('active');
    })
    addActive.classList.add('active');
}
function getQueryParam() {
    return window.location.search.substring(4);
}
//#endregion

//#region -------------------- SWITCH LIST - GRID PRODUCT --------------------
switch_tab.forEach(value => {
    value.addEventListener('click', () => {
        switchActive(switch_tab, value);
        if (value.getAttribute('data-toggle') === "review") {
            review_tab.classList.add('active');
            desc_tab.classList.remove('active');
        } else {
            desc_tab.classList.add('active');
            review_tab.classList.remove('active');
        }
    })
})
//#endregion

//#region -------------------- REDNER PRODUCR --------------------
function renderProduct(dataProducts) {
    const dataProduct = dataProducts.filter(value => value.id === getQueryParam());
    const content = dataProduct.map(item => {
        return `
                <div class="row">
                    <div class="col-md-12 col-lg-5">
                        <div class="product-details-img">
                            <div class = "product-imgs">
                                <div class = "img-display">
                                  <div class = "img-showcase">
                                    <img src = "${item.product_imgs.img_first}" alt = "shoe image">
                                    <img src = "${item.product_imgs.img_second}" alt = "shoe image">
                                    <img src = "${item.product_imgs.img_third}" alt = "shoe image">
                                    <img src = "${item.product_imgs.img_fourth}" alt = "shoe image">
                                  </div>
                                </div>
                                <div class = "img-select">
                                  <div class = "img-item">
                                    <a href = "#" data-id = "1">
                                      <img src = "${item.product_imgs.img_first}" alt = "shoe image">
                                    </a>
                                  </div>
                                  <div class = "img-item">
                                    <a href = "#" data-id = "2">
                                      <img src = "${item.product_imgs.img_second}" alt = "shoe image">
                                    </a>
                                  </div>
                                  <div class = "img-item">
                                    <a href = "#" data-id = "3">
                                      <img src = "${item.product_imgs.img_third}" alt = "shoe image">
                                    </a>
                                  </div>
                                  <div class = "img-item">
                                    <a href = "#" data-id = "4">
                                      <img src ="${item.product_imgs.img_fourth}" alt = "shoe image">
                                    </a>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12 col-lg-7">
                        <div class="product-details-content">
                            <!--Product Nav End-->
                            <h2>${item.product_name}</h2>
                            <div class="product-details-reviews">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star-o"></i>
                                <a class="review-link" href="#">(1 customer review)</a>
                            </div>
                            <div class="product-details-price">
                                <span class="old-price">$66.00</span>
                                <span class="new-price">$77.00</span>
                            </div>
                            <div class="product-details-description">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est
                                    tristique auctor. Donec non est at libero vulputate rutrum. Morbi ornare lectus quis
                                    justo gravida semper. Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id
                                    nulla.</p>
                            </div>
                            <p class="product-details-stock">150 in stock</p>
                            <div class="product-details-quantity">
                                <form class="add-quantity" action="#">
                                    <div class="product-quantity">
                                        <input value="1" type="number">
                                    </div>
                                    <div class="add-to-link">
                                        <button>add to cart</button>
                                    </div>
                                </form>
                            </div>
                            <div class="wishlist-compare-btn">
                                <a href="#" class="wishlist-btn">Add to Wishlist</a>
                                <a href="#" class="add-compare">Compare</a>
                            </div>
                            <div class="product-details-tag">
                                <span class="posted-in">
                                    Categories:
                                    <a href="#">Accessories</a>,
                                    <a href="#">Electronics</a>
                                </span>
                            </div>
                            <div class="product-details-sharing">
                                <h3>Share this product</h3>
                                <ul>
                                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                                    <li><a href="#"><i class="fa fa-pinterest"></i></a></li>
                                    <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
                                    <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
        `
    }).join('');
    render_SProduct.innerHTML = content;
}
//#endregion

//#region -------------------- SLIDER PRODUCT --------------------
function slider_product() {
    const imgs = document.querySelectorAll('.img-select a');
    const imgBtns = [...imgs];
    let imgId = 1;
    imgBtns.forEach((imgItem) => {
        imgItem.addEventListener('click', (event) => {
            event.preventDefault();
            imgId = imgItem.dataset.id;
            slideImage();
        });
    });
    function slideImage() {
        const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;
        document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
    }
    window.addEventListener('resize', slideImage);
}
//#endregion