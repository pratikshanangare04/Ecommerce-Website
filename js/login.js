document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form from submitting normally
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
  
    try {
      // Send login request to the API
      const response = await fetch('http://localhost:5000/auth/login', { // Update URL as needed
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Login successful
        console.log('User ID:', data.userId); // Display the user ID
        localStorage.setItem('userName', data.name);
        localStorage.setItem('userId', data.userId);
        alert('Login successful!');
        

        window.location.href = './LoginHome.html'; // Redirect to a dashboard or homepage
      } else {
        // Handle login errors
        errorMessage.textContent = data.error || 'Login failed. Please try again.';
      }
    } catch (error) {
      console.error('Error logging in:', error);
      errorMessage.textContent = 'An error occurred. Please try again.';
    }
  });
  