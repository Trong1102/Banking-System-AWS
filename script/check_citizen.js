document.getElementById('chekingform').addEventListener('submit', function(e) {
    e.preventDefault();
    const citizen_number = document.getElementById('citizen_number').value;

    // Log giá trị nhập vào để kiểm tra
    console.log('Citizen Number:', citizen_number);

    // Giả sử bạn có một API để kiểm tra Citizen Number
    fetch('https://encrz0mjri.execute-api.ap-southeast-1.amazonaws.com/dev/auth/check_citizen', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            citizen_number: citizen_number
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.statusCode === 200) {
            document.getElementById('message').textContent = 'The customer already exists in the system, please create an account.!';
            document.getElementById('message').style.color = 'green';
        } else {
            document.getElementById('message').textContent = 'The customer profile does not exist in the system, please register before creating an account';
            document.getElementById('message').style.color = 'red';
    }
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById('result').textContent = 'Error checking citizen number';
    });
});
