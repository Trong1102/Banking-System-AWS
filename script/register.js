document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const education = document.getElementById('education').value;
    const maritalStatus = document.getElementById('maritalStatus').value;
    
    fetch('YOUR_API_REGISTER_URL', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
            age: age,
            gender: gender,
            education: education,
            maritalStatus: maritalStatus
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.statusCode === 200) {
            document.getElementById('message').textContent = 'Registration successful!';
            document.getElementById('message').style.color = 'green';
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            document.getElementById('message').textContent = JSON.parse(data.body).message;
            document.getElementById('message').style.color = 'red';
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'An error occurred. Please try again.';
        document.getElementById('message').style.color = 'red';
    });
});
