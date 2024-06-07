document.getElementById('authForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const messageElement = document.getElementById('message');
    
    fetch('http://localhost:3000/send-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        messageElement.textContent = data.message || 'Check your email for the OTP!';
    })
    .catch(error => {
        console.error('Error:', error);
        messageElement.textContent = 'Failed to send OTP.';
    });
});
