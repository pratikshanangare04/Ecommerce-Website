async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:5000/get-product');
        const data = await response.json();
        if (data.success) {
            renderProducts(data.products);
        } else {
            document.getElementById('product-list').innerHTML = `<p>${data.message}</p>`;
        }
    } catch (error) {
        document.getElementById('product-list').innerHTML = `<p>Error fetching products: ${error.message}</p>`;
    }
}

// Render products to the page
function renderProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productCard = `
            <div class="product-card">
                <div class="image-container">
                    <img src="${product.img}" alt="${product.name}">
                    <button class="view-details-btn" data-id="${product.productId}">View Details</button>
                </div>
                <h3>${product.name}</h3>
                <p class="price">Rs. ${product.price}</p>
            </div>
        `;
        productList.innerHTML += productCard;
    });

    // Add event listeners for "View Details" buttons
    document.querySelectorAll('.view-details-btn').forEach(button => {
        button.addEventListener('click', event => {
            const productId = event.target.getAttribute('data-id');
            const product = products.find(p => p.productId === productId);
            if (product) {
                openProductDetails(product);
            }
        });
    });
}

// Open the product details modal
function openProductDetails(product) {
    const detailsContainer = document.getElementById('product-details-container');
    document.getElementById('details-product-img').src = product.img;
    document.getElementById('details-product-img').alt = product.name;
    document.getElementById('details-product-name').textContent = product.name;
    document.getElementById('details-product-category').textContent = `Category: ${product.category}`;
    document.getElementById('details-product-price').textContent = `Price: Rs. ${product.price}`;
    document.getElementById('details-product-rating').textContent = `Rating: ${product.rating || 'No rating yet'}`;
    document.getElementById('details-product-stock').textContent = `In Stock: ${product.inStockValue || 'Unavailable'}`;
    
    detailsContainer.style.display = 'flex';
    detailsContainer.productDetails = product;
}

// Close the product details modal
function closeProductDetails() {
    const detailsContainer = document.getElementById('product-details-container');
    detailsContainer.style.display = 'none';
}

// Add the product to the cart
async function addToCart() {
    const detailsContainer = document.getElementById('product-details-container');
    const product = detailsContainer.productDetails;
    const quantity = document.getElementById('details-quantity').value;

    const cartItem = {
        productId: product.productId,
        name: product.name,
        price: product.price,
        quantity: quantity,
        img: product.img
    };
   
    try {
        const response = await fetch('http://localhost:5000/cart/addtocart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartItem)
        });
        const data = await response.json();
        if (data.success) {
            alert('Product added to cart successfully!');
            closeProductDetails();
        } else {
            alert('Failed to add product to cart.');
        }
    } catch (error) {
        alert('Error adding product to cart: ' + error.message);
    }
}

const userName = localStorage.getItem('userName');

    // Display the user's name if available
    if (userName) {
      document.getElementById('userNameDisplay').textContent = `Hello, ${userName}!`;
    } else {
      document.getElementById('userNameDisplay').textContent = 'Hello, Guest!';
    }

    // Logout function to clear session
    function logout() {
        fetch('/logout', {
          method: 'POST',
          credentials: 'same-origin',  // Ensure session cookie is sent with the request
        })
        .then(response => response.json())
        .then(data => {
          if (data.message) {
            alert(data.message); // Show a success message
            // Redirect to homepage or login page after successful logout
            window.location.href = '/'; // Change this to the appropriate page
          }
        })
        .catch(error => {
          alert('An error occurred while logging out. Please try again.'); // Show an error message
        });
      }
      

// Fetch products on page load
fetchProducts();