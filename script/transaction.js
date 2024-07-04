document.getElementById('transactionForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn form gửi đi để kiểm tra giá trị

    // Lấy giá trị từ các trường input
    const account_id = localStorage.getItem('account_id');
    const recipient_number = document.getElementById('recipient_number').value;
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const verification = document.getElementById('verification').value;

    // Log giá trị nhập vào để kiểm tra
    console.log('Account ID:', account_id);
    console.log('Recipient Number:', recipient_number);
    console.log('Amount:', amount);
    console.log('Description:', description);
    console.log('Verification Code:', verification);

    // Gửi dữ liệu lên server thông qua API
    fetch('https://encrz0mjri.execute-api.ap-southeast-1.amazonaws.com/dev/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            account_id: account_id,
            recipient_number: recipient_number,
            amount: amount,
            description: description,
            verification: verification
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        document.getElementById('message').textContent = JSON.parse(data.body).message;
        if(data.statusCode === 200){
            document.getElementById('message').style.color = 'green';
        }else {
            document.getElementById('message').style.color = 'red';
        }x
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'Error making transaction';
    });
});


document.getElementById('logoutButton').addEventListener('click', function() {
    localStorage.removeItem('account_id');
    alert('Logged out successfully!');
});