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
    const listCartHTML = document.querySelector('.foodList');
    const totalQuantitySpan = document.getElementById('totalQuantity');
    const totalPriceSpan = document.getElementById('totalPrice');
    const checkoutButton = document.querySelector('.checkoutBtn');
    const messageDiv = document.getElementById('message'); // Ensure you have a div with this ID for messages
    let iconCartSpan = document.querySelector('.icon-cart span');
    
    function loadCartItems() {
        let carts = JSON.parse(localStorage.getItem('cart') || '[]');
        let totalQuantity = 0;
        let totalPrice = 0;

        if (carts.length === 0) {
            listCartHTML.innerHTML = '<p>Your cart is empty.</p>';
            checkoutButton.disabled = true;
            checkoutButton.style.opacity = '0.5';
            messageDiv.textContent = 'Your cart is empty. Please add some items before checking out.';
            messageDiv.style.color = 'red';
        } else {
            checkoutButton.disabled = false;
            checkoutButton.style.opacity = '1';
            messageDiv.textContent = '';
            carts.forEach(item => {
                // Assuming the product details are in a local JSON file
                fetch('../assets/food.json')
                    .then(response => response.json())
                    .then(products => {
                        const product = products.find(p => p.id == item.product_id);
                        if (product) {
                            const itemElement = document.createElement('div');
                            itemElement.className = 'itemList';
                            itemElement.innerHTML = `
                                <div class="image"><img src="${product.image}"></div>
                                <div class="name">${product.name}</div>
                                <div class="totalPrice">$${(product.price * item.quantity).toFixed(2)}</div>
                                <div class="quantity">Quantity: ${item.quantity}</div>
                            `;
                            listCartHTML.appendChild(itemElement);
                            totalQuantity += item.quantity;
                            totalPrice += product.price * item.quantity;
                        }
                        iconCartSpan.innerText = totalQuantity;
                    });
            });
        }
    }

    loadCartItems(); // Load cart items on page load
    function submitCheckout() {
        const fullName = document.getElementById('fullName').value.trim();
        const phoneNumber = document.getElementById('phoneNumber').value.trim();
        const address = document.getElementById('address').value.trim();
        const cardNumber = document.getElementById('cardNumber').value.trim();

        if (!fullName || !phoneNumber || !address || !cardNumber) {
            messageDiv.textContent = 'Please fill out all fields before submitting.';
            messageDiv.style.color = 'red';
            return; // Exit the function without redirecting
        }

        if (localStorage.getItem('cart') === '[]') {
            messageDiv.textContent = 'Your cart is empty. Please add some items before checking out.';
            messageDiv.style.color = 'red';
            return;
        }

        // Clear localStorage or perform other cleanup
        localStorage.clear();

        // Update the UI to show a thank you message
        messageDiv.textContent = 'Thank you for your order! You will be redirected shortly.';
        messageDiv.style.color = 'green';
        checkoutButton.style.display = 'none'; // Hide the checkout button

        // Redirect after a short delay to index.html
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 3000); // Adjust time as necessary
    }

    // Event listener for the checkout button
    checkoutButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default form submission if using form button
        submitCheckout();
    });

    if (checkoutButton) {
      checkoutButton.addEventListener('click', function(event) {
          event.preventDefault(); // Stop the form from submitting traditionally
          submitCheckout();
      });
  } else {
      console.error('Checkout button not found');
  }

fetchCartTotals();

function fetchCartTotals() {
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

  if (cartItems.length === 0) {
      document.getElementById('totalQuantity').textContent = '0';
      document.getElementById('totalPrice').textContent = '$0.00';
      console.log("No items in cart."); // Debugging line
      return;
  }

  fetch('http://localhost:3000/process-order', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ items: cartItems })
  })
  .then(response => {
      
      if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
      }
      return response.json();
  })
  .then(data => {
      if (data.status === 'success') {
          document.getElementById('totalQuantity').textContent = data.totalQuantity;
          document.getElementById('totalPrice').textContent = `$${data.totalPrice}`;
      } else {
          console.error('Failed to calculate totals:', data.error);
          document.getElementById('message').textContent = 'Failed to calculate totals: ' + data.error;
      }
  })
  .catch(error => {
      console.error('Error fetching cart totals:', error);
      document.getElementById('message').textContent = `Error: ${error.message}`;
  });
}




});
