const productList = document.getElementById('product-list');

// Function to fetch products from the backend
async function fetchProducts() {
  try {
    const response = await fetch('http://localhost:5000/get-product'); // Adjust the URL if hosted elsewhere
    const data = await response.json();

    if (data.success) {
      renderProducts(data.products);
    } else {
      productList.innerHTML = `<p>Error: ${data.message}</p>`;
    }
  } catch (error) {
    productList.innerHTML = `<p>Error fetching products: ${error.message}</p>`;
  }
}

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


// Function to render products in the DOM
function renderProducts(products) {
  productList.innerHTML = ''; // Clear existing content
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

  // Attach event listeners to "View Details" buttons
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

function openProductDetails(product) {
  const detailsContainer = document.getElementById('product-details-container');
  
  // Set product details
  document.getElementById('details-product-img').src = product.img;
  document.getElementById('details-product-img').alt = product.name;
  document.getElementById('details-product-name').textContent = product.name;
  document.getElementById('details-product-category').textContent = `Category: ${product.category}`;
  document.getElementById('details-product-price').textContent = `Price: Rs. ${product.price}`;
  document.getElementById('details-product-rating').textContent = `Rating: ${product.rating || 'No rating yet'}`;
  document.getElementById('details-product-stock').textContent = `In Stock: ${product.inStockValue || 'Unavailable'}`;
  
  // Show the container
  detailsContainer.style.display = 'flex';
  
  // Store the product details for later use (e.g., when adding to cart)
  detailsContainer.productDetails = product;
}


function closeProductDetails() {
  const detailsContainer = document.getElementById('product-details-container');
  detailsContainer.style.display = 'none';
}
  function closeProductModal() {
    document.getElementById('product-modal').style.display = 'none';
  }
  

// Function to close the product modal
function closeModal() {
  const modal = document.getElementById('product-modal');
  modal.style.display = 'none';
}

// Fetch and display products on page load
fetchProducts();


async function getProductById() {
  const productId = document.getElementById('search-input').value;
   const productDetails = document.getElementById('productDetails');
  // const productName = document.getElementById('productName');
  // const productDescription = document.getElementById('productDescription');
  // const productPrice = document.getElementById('productPrice');

  // Clear any previous product details
  productName.textContent = '';
  productRating.textContent = '';
  productPrice.textContent = '';

  try {
    const response = await fetch(`http://localhost:5000/get-product/${productId}`);
    if (response.ok) {
      const product = await response.json();

      // Display product details
      productName.textContent = `Name: ${product.name}`;
      productRating.textContent = `Rating: ${product.rating}`;
      productPrice.textContent = `Price: $${product.price}`;

      // Show the product details section
      productDetails.style.display = 'block';
    } else {
      alert('Product not found');
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    alert('An error occurred. Please try again.');
  }
}
