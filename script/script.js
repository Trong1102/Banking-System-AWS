document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const data = {
        username: username,
        password: password
    };
    
    fetch('https://encrz0mjri.execute-api.ap-southeast-1.amazonaws.com/dev/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.statusCode === 200) {
            const userData = JSON.parse(data.data);
            localStorage.setItem('user_id', userData.user_id);
            window.location.href = 'dashboard.html';
        } else {
            document.getElementById('message').textContent = JSON.parse(data.data).message;
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'An error occurred. Please try again.';
    });
});


document.getElementById('h1').addEventListener('regis', function(e){
    e.preventDefault();
    window.location.href = 'dashboard.html'
});