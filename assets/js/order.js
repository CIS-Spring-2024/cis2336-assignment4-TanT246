/**
* Template Name: Delicious
* Updated: Jan 29 2024 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/delicious-free-restaurant-bootstrap-theme/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
    "use strict";
  
    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }
  
    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all)
      if (selectEl) {
        if (all) {
          selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
          selectEl.addEventListener(type, listener)
        }
      }
    }
  
    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
    }
  
    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
      let position = window.scrollY + 200
      navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return
        let section = select(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active')
        } else {
          navbarlink.classList.remove('active')
        }
      })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)
  
    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
      let header = select('#header')
      let offset = header.offsetHeight
  
      let elementPos = select(el).offsetTop
      window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
      })
    }
  
    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    let selectTopbar = select('#topbar')
    if (selectHeader) {
      const headerScrolled = () => {
        if (window.scrollY > 100) {
          selectHeader.classList.add('header-scrolled')
          if (selectTopbar) {
            selectTopbar.classList.add('topbar-scrolled')
          }
        } else {
          selectHeader.classList.remove('header-scrolled')
          if (selectTopbar) {
            selectTopbar.classList.remove('topbar-scrolled')
          }
        }
      }
      window.addEventListener('load', headerScrolled)
      onscroll(document, headerScrolled)
    }
  
    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active')
        } else {
          backtotop.classList.remove('active')
        }
      }
      window.addEventListener('load', toggleBacktotop)
      onscroll(document, toggleBacktotop)
    }
  
    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
      select('#navbar').classList.toggle('navbar-mobile')
      this.classList.toggle('bi-list')
      this.classList.toggle('bi-x')
    })
  
    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function(e) {
      if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault()
        this.nextElementSibling.classList.toggle('dropdown-active')
      }
    }, true)
  
    /**
     * Scroll with offset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e) {
      if (select(this.hash)) {
        e.preventDefault()
  
        let navbar = select('#navbar')
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile')
          let navbarToggle = select('.mobile-nav-toggle')
          navbarToggle.classList.toggle('bi-list')
          navbarToggle.classList.toggle('bi-x')
        }
        scrollto(this.hash)
      }
    }, true)
  
    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
      if (window.location.hash) {s
        if (select(window.location.hash)) {
          scrollto(window.location.hash)
        }
      }
    });
  
    
  
    /**
     * Menu isotope and filter
     */

  
  })()
  
  document.addEventListener('DOMContentLoaded', function () {
    var sendMessageButton = document.getElementById('sendMessage');
    var loadingMessage = document.querySelector('.loading');
    var sentMessage = document.querySelector('.sent-message');
    var contactForm = document.querySelector('.email-form')
  
    sendMessageButton.addEventListener('click', function(e) {
      // Prevent the default form submission
        if(contactForm.checkValidity()){
        e.preventDefault();
  
        // Show loading message and hide send button
        loadingMessage.style.display = 'block';
        sendMessageButton.style.display = 'none';
  
        //processing delay
        setTimeout(function() {
          // Hide loading and show sent message
          loadingMessage.style.display = 'none';
          sentMessage.style.display = 'block';
  
        }, 2000); 
      }
      else{
        contactForm.reportValidity();
      }
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    // DOM element selection
    const iconCart = document.querySelector('.icon-cart');
    const body = document.querySelector('body');
    const closeCart = document.querySelector('.close');
    const checkOut = document.querySelector('.checkOut');
    const menuFilters = document.getElementById('menu-flters');
    const listProductHTML = document.querySelector('.listItem');
    let listCartHTML = document.querySelector('.listCart');
    let iconCartSpan = document.querySelector('.icon-cart span');
    const messageDiv = document.querySelector('#message'); // Make sure this exists in your HTML

    // Initialize cart from localStorage if available, otherwise start with an empty array
    let carts = JSON.parse(localStorage.getItem('cart') || '[]');
    let products = [];

    // Event listeners for toggling the visibility of the cart
    iconCart.addEventListener('click', () => {
        body.classList.toggle('showCart');
    });

    closeCart.addEventListener('click', () => {
        body.classList.toggle('showCart');
    });

    checkOut.addEventListener('click', () => {
      window.location.href = 'checkout.html';
    });

    // Fetch product data from a JSON file and initialize product display
    fetch('../assets/food.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        displayProducts('*'); // Display all products initially
        addCartToHTML(); // Update the cart display based on loaded cart data
    });

    function displayProducts(filter) {
        listProductHTML.innerHTML = '';
        const filteredProducts = products.filter(product => filter === '*' || product.type === filter);
        filteredProducts.forEach((product, index) => {
            const delay = index * 100;
            const productHTML = document.createElement('div');
            productHTML.className = 'item';
            productHTML.dataset.id = product.id;
            productHTML.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h1>${product.name}</h1>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
            listProductHTML.appendChild(productHTML);
            setTimeout(() => { productHTML.classList.add('item-active'); }, delay);
        });
    }

    listProductHTML.addEventListener('click', (e) => {
        if (e.target.classList.contains('addCart')) {
            const product_id = e.target.closest('.item').dataset.id;
            addToCart(product_id);
        }
    });

    const addToCart = (product_id) => {
      const product = products.find(p => p.id === parseInt(product_id, 10)); // Ensure ID types match and are compared correctly
      if (!product) {
          console.error('Product not found');  // Handle the case where the product does not exist
          messageDiv.textContent = 'Product not found. Please try again!';
          messageDiv.style.color = 'red';
          return;
      }
  
      const cartIndex = carts.findIndex(item => item.product_id === parseInt(product_id, 10));
      if (cartIndex === -1) {  // Product is not in the cart, add new item
          carts.push({
              product_id: parseInt(product_id, 10), // Store product ID as a number
              quantity: 1,
              price: product.price  // Store the product's price
          });
      } else {  // Product is already in the cart, update quantity
          if (carts[cartIndex].quantity < 10) {
              carts[cartIndex].quantity += 1;
          } else {
              messageDiv.textContent = 'Limit reached: You can only add up to 10 units per item.';
              messageDiv.style.color = 'red';
              return;
          }
      }
      localStorage.setItem('cart', JSON.stringify(carts));  // Store the updated cart in localStorage
      addCartToHTML();  // Update the cart display
  };
  
  
console.log(carts);
    const addCartToHTML = () => {
        listCartHTML.innerHTML = '';
        let totalQuantity = 0;
        carts.forEach(item => {
            const positionProduct = products.findIndex(product => product.id == item.product_id);
            const info = products[positionProduct];
            totalQuantity += item.quantity;
            const newItem = document.createElement('div');
            newItem.classList.add('itemList');
            newItem.dataset.id = item.product_id;
            newItem.innerHTML = `
                <div class="image"><img src="${info.image}"></div>
                <div class="name">${info.name}</div>
                <div class="totalPrice">$${(info.price * item.quantity).toFixed(2)}</div>
                <div class="quantity">
                    <button class="minus">-</button>
                    <span>${item.quantity}</span>
                    <button class="plus">+</button>
                </div>`;
            listCartHTML.appendChild(newItem);
        });
        iconCartSpan.innerText = totalQuantity;
    };

    listCartHTML.addEventListener('click', (event) => {
        if (event.target.classList.contains('minus') || event.target.classList.contains('plus')) {
            const product_id = event.target.closest('.itemList').dataset.id;
            changeQuantityCart(product_id, event.target.classList.contains('plus') ? 'plus' : 'minus');
        }
    });

    const changeQuantityCart = (product_id, type) => {
      const positionItemInCart = carts.findIndex(item => item.product_id == product_id);
      if (positionItemInCart >= 0) {
          let newQuantity = carts[positionItemInCart].quantity + (type === 'plus' ? 1 : -1);
  
          // Handling for maximum limit of items
          if (newQuantity > 10) {
              messageDiv.textContent = 'Limit reached: You can only add up to 10 units per item.';
              messageDiv.style.color = 'red';
          } else if (newQuantity < 1) {
              // If quantity falls below 1, remove the item from the cart
              carts.splice(positionItemInCart, 1);
              messageDiv.textContent = 'Item removed from cart.';
              messageDiv.style.color = 'green';
          } else {
              // Update quantity if it's within valid range
              carts[positionItemInCart].quantity = newQuantity;
              messageDiv.textContent = ''; // Clear any previous message
          }
  
          // Update the cart in localStorage and re-render the cart display
          localStorage.setItem('cart', JSON.stringify(carts));
          addCartToHTML();
      }
  };
  
  

    menuFilters.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const filter = e.target.getAttribute('data-filter').replace('.', ''); // Adjust to match the actual data model
            displayProducts(filter);
            document.querySelectorAll('#menu-flters button').forEach(btn => {
                btn.classList.remove('filter-active');
            });
            e.target.classList.add('filter-active');
        }
    });


});
