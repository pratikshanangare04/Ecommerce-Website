document.getElementById('registrationForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    // Gather form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;
  
    // Display loading message
    const responseMessage = document.getElementById('responseMessage');
    responseMessage.innerHTML = 'Registering...';
  
    try {
      // Send POST request to the API
      const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, phone }),
      });
  
      const data = await response.json();
  
      // Handle response
      if (response.ok) {
        localStorage.setItem('userName', data.name);
        localStorage.setItem('userId', data.userId);
        responseMessage.innerHTML = `<p class="success">${data.message}</p>`;
      } else {
        responseMessage.innerHTML = `<p class="error">${data.error}</p>`;
      }
    } catch (error) {
      console.error('Error:', error);
      responseMessage.innerHTML = `<p class="error">An error occurred while registering. Please try again.</p>`;
    }
  });
  