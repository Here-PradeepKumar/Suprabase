document.getElementById('verifyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('verifyEmail').value;
    const otp = document.getElementById('otp').value;
    const messageElement = document.getElementById('message');
    
    fetch('http://localhost:3000/verify-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, otp: otp })
    })
    .then(response => response.json())
    .then(data => {
        messageElement.textContent = data.message || 'User verified and created!';
    })
    .catch(error => {
        console.error('Error:', error);
        messageElement.textContent = 'Failed to verify OTP.';
    });

    document.getElementById('logoutButton').addEventListener('click', function() {
        fetch('http://localhost:3000/logout', {
            method: 'POST',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            console.log('Logged out:', data.message);
        })
        .catch(error => {
            console.error('Error logging out:', error);
        });
    });
});
