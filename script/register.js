document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const customer_name = document.getElementById('customer_name').value;
    const citizen_number = document.getElementById('citizen_number').value;
    const date_of_birth = document.getElementById('date_of_birth').value;
    const gender = document.getElementById('gender').value;
    const phone_number = document.getElementById('phone_number').value;
    const email = document.getElementById('email').value;
    
    const data = {
        customer_name: customer_name,
        citizen_number: citizen_number,
        date_of_birth: date_of_birth,
        gender: gender,
        phone_number: phone_number,
        email: email
    };

    fetch('https://encrz0mjri.execute-api.ap-southeast-1.amazonaws.com/dev/create/customer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.statusCode === 200) {
            document.getElementById('message').textContent = 'Registration successful!';
            document.getElementById('message').style.color = 'green';
            alert('Registration successful!');
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
        document.getElementById('message').textContent = 'An error occurred.';
        document.getElementById('message').style.color = 'red';
    });
});
