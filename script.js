/// PRODUCT
class Product {
  /**
   * Creating new instance of product
   *
   * @param {string} name
   * @param {number} price
   * @param {string} category
   * @param {number} star
   * @param {string} imagePath - URL of the image product
   */
  constructor(name, price, category, star, imagePath) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.star = star;
    this.imagePath = imagePath;
  }

  /**
   *  Creating new instance of product from the given element
   *
   *  @param {Element} e
   */
  static fromElement(e) {
    const name = e.querySelector("h5").innerText;
    const category = e.querySelector("span").innerText;
    const imagePath = e.querySelector("img").attributes["src"].value;
    const star = e.querySelectorAll("i.fa-solid.fa-star").length;
    let price = e.querySelector("h4").innerText;
    price = price.split(" ")[1];
    price = parseInt(price.replace(".", ""));

    return new Product(name, price, category, star, imagePath);
  }

  /**
   *  Making the cart button interactable, for the given product element
   *
   *  @param {Element} e
   */
  static interactableCart(e) {
    const cartButton = e.querySelector("a");

    const product = Product.fromElement(e);

    cartButton.addEventListener("click", (l) => {
      l.preventDefault();
      cart.addProduct(product);
    });
  }
}

/// CART
class CartLocalStorage {
  /**
   * get cart from the local storage
   *
   * @returns {CartItem[]}
   */
  get() {
    let cartItems = localStorage.getItem("cartItems") ?? [];

    if (cartItems.length !== 0) {
      cartItems = JSON.parse(cartItems).map(
        (item) =>
          new CartItem(
            item.id,
            item.amount,
            new Product(
              item.product.name,
              item.product.price,
              item.product.category,
              item.product.star,
              item.product.imagePath,
            ),
          ),
      );
    }

    return cartItems;
  }

  /**
   * store list of product in the cart into local storage
   *
   * @param {CartItem[]} cartItems
   */
  store(cartItem) {
    localStorage.setItem("cartItems", JSON.stringify(cartItem));
  }
}

class CartItem {
  /**
   * Create new instnace of CartItem
   *
   * @param {number} id
   * @param {number} amount - amount of item that are in the cart
   * @param {Product} product - the product that are in the cart
   */
  constructor(id, amount, product) {
    this.id = id;
    this.amount = amount;
    this.product = product;
  }

  /**
   * @method
   */
  addAmount = () => this.amount++;

  /**
   * @method
   */
  decreaseAmount = () => this.amount--;

  /**
   * @method
   */
  changeAmount = (amount) => (this.amount = amount);
}

class Cart {
  /**
   * Create new instance of Cart object/class
   *
   * @param {CartLocalStorage} cartLocalStorage
   */
  constructor(cartLocalStorage) {
    this.totalPrice = 0;
    this.cartLocalStorage = cartLocalStorage;

    /**
     * @type {CartItem[]}
     */
    this.cartItems = this.cartLocalStorage.get();
  }

  /**
   * Will show up pop up menu that notify the user the product are getting added into the cart
   * @param {HTMLElement} content
   */
  notify(content) {
    const popupContainer = document.querySelector(".popup-container");
    popupContainer.innerHTML = content;
    const overlay = document.querySelector(".overlay");

    overlay.addEventListener("click", () => {
      popupContainer.classList.remove("active");
      overlay.classList.remove("active");
    });

    popupContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  /**
   * Adding a product that passed in into the cart
   * @param {Product} product
   * @param {boolean} shouldNotify - wether notify product has been added or not (will open up a popup)
   */
  addProduct(product) {
    const existingProduct = this.cartItems.findIndex(
      (item) => item.product.name === product.name,
    );

    if (existingProduct === -1) {
      const lastIndex = this.cartItems.length - 1;
      this.cartItems.push(
        new CartItem((this.cartItems[lastIndex]?.id ?? 0) + 1, 1, product),
      );
    } else {
      this.cartItems[existingProduct].addAmount();
    }

    this.notify("<h4>Successfully added product to cart</h4>");

    this.cartLocalStorage.store(this.cartItems);
  }

  /**
   * get cart item by id
   *
   * @param {number} id
   * @returns {CartItem}
   */
  getCartById(id) {
    return this.cartItems.find((item) => item.id === id);
  }

  /**
   * Removing/reduce(the amount) of a product that are in the [cartItems]
   * @param {number} id - id that will get removed/deleted
   * @param {HTMLElement} amountElement - element that show the current amount
   */
  removeProductById(id) {
    const indexToRemove = this.cartItems.findIndex((item) => item.id === id);
    // let currentAmount = this.cartItems[indexToRemove].amount;

    if (indexToRemove !== -1) {
      this.cartItems.splice(indexToRemove, 1);
      this.cartLocalStorage.store(this.cartItems);
      this.generateCartItem();
      // TODO: REMOVE FROM LOCALSTORAGE
    }
  }

  checkout() {
    this.notify("<h4>Checkout Successfull</h4>");

    this.cartItems.length = 0;
    this.generateCartItem();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    this.cartLocalStorage.store(this.cartItems);
  }

  /**
   * Create a cart item element
   * @param {Product} product
   * @returns {HTMLElement}
   */
  generateCartItem() {
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartEmptyElement = document.querySelector(".cart-empty");
    cartItemsContainer.innerHTML = "";

    if (this.cartItems.length === 0) {
      const cartTableContainer = document.querySelector(".cart-table");
      cartTableContainer.classList.toggle("hidden");
      cartEmptyElement.classList.add("shown");
    } else {
      cartEmptyElement.classList.remove("shown");

      this.cartItems.forEach((item) => {
        const newItem = document.createElement("tr");
        const productDetail = document.createElement("td");
        const quantityProduct = document.createElement("td");
        const price = document.createElement("td");
        let totalPriceProduct = item.product.price * item.amount;
        let formattedTotalPrice = numberFormat.format(totalPriceProduct);

        productDetail.innerHTML = `
       <div class="cart-info">
         <img src="${item.product.imagePath}"/>
         <div>
           <p>${item.product.name}</p>
           <small>Price: ${numberFormat.format(item.product.price)}</small>
           <br />
           <a href="#">Remove</a>
         </div>
       </div>
    `;
        quantityProduct.innerHTML =
          `<input type="number" value="${item.amount}" min="1" max="99"/>`;
        price.innerHTML = formattedTotalPrice;

        productDetail.querySelector("a").addEventListener("click", () => {
          this.removeProductById(item.id);
        });

        quantityProduct
          .querySelector("input")
          .addEventListener("change", (e) => {
            let val = e.currentTarget.value;

            if (parseInt(val) <= 0 || val === "") {
              e.currentTarget.value = 1;
              val = 1;
            }

            if (parseInt(val) > 99) {
              e.currentTarget.value = 99;
              val = 99;
            }

            item.changeAmount(val);
            this.cartLocalStorage.store(this.cartItems);

            totalPriceProduct = item.product.price * item.amount;
            formattedTotalPrice = numberFormat.format(totalPriceProduct);
            price.innerHTML = formattedTotalPrice;

            this.calculateAndShowTotalPrice();
          });

        newItem.appendChild(productDetail);
        newItem.appendChild(quantityProduct);
        newItem.appendChild(price);

        cartItemsContainer.append(newItem);
      });
      this.calculateAndShowTotalPrice();
    }
  }

  calculateAndShowTotalPrice() {
    this.totalPrice = this.cartItems.reduce(
      (acc, item) => acc + item.product.price * item.amount,
      0,
    );

    let formattedTotalPrice = numberFormat.format(this.totalPrice);
    document.querySelector(".total-price td:last-child").innerText =
      formattedTotalPrice;
  }
}

// scripts
const cartDB = new CartLocalStorage();
const cart = new Cart(cartDB);

const delayPage = 300; // millisecond
const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");
const header = document.getElementById("header");
const root = document.querySelector(".root-container");
const numberFormat = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

const navLinks = document.querySelectorAll("#navbar li a, #mobile a");

window.scrollTo({
  top: 0,
  behavior: "smooth",
});

navLinks.forEach((e) => {
  e.addEventListener("click", (el) => {
    el.preventDefault();

    document.querySelectorAll(".active").forEach((e) => {
      e.classList.remove("active");
    });

    el.currentTarget.classList.add("active");

    let path = el.currentTarget.getAttribute("href");

    changePage(path);
  });
});

/// LOADING INDICATOR
const loadingIndicatorElement = document.querySelector(".loading-indicator");
const loadingIndicatorContainer = document.querySelector(
  ".loading-indicator-container",
);

function showLoadingIndicator() {
  loadingIndicatorElement.classList.add("active");
  loadingIndicatorContainer.classList.add("active");
}

function hideLoadingIndicator() {
  loadingIndicatorElement.classList.remove("active");
  loadingIndicatorContainer.classList.remove("active");
}

const routes = {
  "": {
    init: homePage, // an initializer function that will be called when the page finished loading.
  },
  "home.php": {
    init: homePage,
  },
  "shop.php": {
    init: shopPage,
  },
  "cart.html": {
    init: cartPage,
  },
  "about.html": {
    init: aboutPage,
  },
  "contact.html": {
    init: contactPage,
  },
};

/**
 * @param {string} path
 */
async function changePage(path) {
  document.querySelectorAll(".active").forEach((e) => {
    e.classList.remove("active");
  });

  const currentNavLink = document.querySelector(`#navbar li a[href="${path}"]`);
  currentNavLink.classList.add("active");

  showLoadingIndicator(); // show
  root.innerHTML = "";
  let newPage = await fetch(path).then((response) => response.text());

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  // for loading effect to show (only for demo purposes)
  setTimeout(async () => {
    hideLoadingIndicator(); // hide
    root.innerHTML = newPage;

    routes[path]?.init();
  }, delayPage);
}

// Initial Page
changePage("home.php");

function homePage() {
  console.log("home page loaded");

  const productElements = document.querySelectorAll(".pro");

  productElements.forEach((e) => Product.interactableCart(e));

}

function shopPage() {
  console.log("shop page loaded");
  const productContainer = document.querySelector(".pro-container");
  const productElements = document.querySelectorAll(".pro");
  const searchButton = document.querySelector(".search-btn");

  /**
   * @param {string} query
   */
  function search(query) {
    productContainer.innerHTML = "";

    showLoadingIndicator();

    const noResultElement = document.querySelector(".no-result");
    noResultElement.classList.remove("show"); // hide no result element

    const filteredProducts = [];

    productElements.forEach((e) => {
      const productName = e.querySelector("h5");
      if (productName.innerText.toLowerCase().includes(query)) {
        filteredProducts.push(e);
      }
    });

    setTimeout(() => {
      if (filteredProducts.length !== 0) {
        filteredProducts.forEach((productElement) => {
          productContainer.appendChild(productElement);
        });
      } else {
        noResultElement.classList.add("show"); // show no result element
      }

      hideLoadingIndicator();
    }, delayPage);
  }

  productElements.forEach((e) => Product.interactableCart(e));

  searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    const searchInput = document.querySelector("[type='text']#query");
    search(searchInput.value.toLowerCase());
  });
}

function cartPage() {
  console.log("cart page loaded");

  const checkoutBtn = document.querySelector("#checkout");

  checkoutBtn.addEventListener("click", (e) => {
    e.preventDefault();

    cart.checkout();
  });

  cart.generateCartItem();
}

function aboutPage() {
  console.log("about page loaded");
}

function contactPage() {
  console.log("contact page loaded");
}

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}
if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}
