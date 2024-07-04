document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn form gửi đi để kiểm tra giá trị

    // Lấy giá trị từ các trường input
    const citizen_number = document.getElementById('citizen_number').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const verification = document.getElementById('verification').value;

    // Log giá trị nhập vào để kiểm tra
    console.log('Citizen Identification Number:', citizen_number);
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Verification Code:', verification);

    // Đoạn code sau đây có thể dùng để gửi dữ liệu lên server thông qua API
    // Bạn có thể sử dụng fetch hoặc axios để thực hiện điều này

    // Ví dụ sử dụng fetch:
    
    fetch('https://encrz0mjri.execute-api.ap-southeast-1.amazonaws.com/dev/create/personal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            citizen_number: citizen_number,
            username: username,
            password: password,
            verification: verification
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('status:', data.statusCode);
        document.getElementById('message').textContent = JSON.parse(data.body).message;
        if(data.statusCode === 200){
            document.getElementById('message').style.color = 'green';
        }else {
            document.getElementById('message').style.color = 'red';
        }
            
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').textContent = JSON.parse(data.body).message;
    });
    
});
