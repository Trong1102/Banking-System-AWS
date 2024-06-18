document.addEventListener('DOMContentLoaded', function() {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
        window.location.href = '../html/index.html';
    } else {
        fetchUserInfo(userId);
    }

    document.getElementById('logoutButton').addEventListener('click', function() {
        localStorage.removeItem('user_id');
        window.location.href = '../html/index.html';
    });
});

function fetchUserInfo(userId) {
    fetch('https://encrz0mjri.execute-api.ap-southeast-1.amazonaws.com/dev/user-info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"user_id": userId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.statusCode === 200) {
            const userData = JSON.parse(data.data);
            displayUserInfo(userData);
        } else {
            document.getElementById('user-info').textContent = 'Failed to load user information.';
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById('user-info').textContent = 'An error occurred. Please try again.';
    });
}

function displayUserInfo(userData) {
    const userInfoContainer = document.getElementById('user-info');
    userInfoContainer.innerHTML = `
        <p>Name: ${userData.name}</p>
        <p>Account Number: ${userData.account_number}</p>
        <p>Balance: ${userData.balance}</p>
    `;
}


