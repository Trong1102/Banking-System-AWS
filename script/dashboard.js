document.addEventListener('DOMContentLoaded', function() {
    const account_id = localStorage.getItem('account_id');
    if (!account_id) {
        window.location.href = '../html/index.html';
    } else {
        fetchUserInfo(account_id);
    }

    document.getElementById('logoutButton').addEventListener('click', function() {
        localStorage.removeItem('account_id');
        window.location.href = '../html/index.html';
    });
});

function fetchUserInfo(account_id) {
    fetch('https://encrz0mjri.execute-api.ap-southeast-1.amazonaws.com/dev/user-info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"account_id": account_id })
    })
    .then(response => response.json())
    .then(data => {
        if (data.statusCode === 200) {
            const userData = JSON.parse(data.data);
            displayUserInfo(userData,account_id);
        } else {
            document.getElementById('user-info').textContent = 'Failed to load user information.';
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById('user-info').textContent = 'An error occurred. Please try again.';
    });
}

function displayUserInfo(userData,account_id) {
    const userInfoContainer = document.getElementById('user-info');

    if (account_id.substring(0, 2) === "PA") {
        userInfoContainer.innerHTML = `
            <p>Name: ${userData.customer_name}</p>
            <p>Account Number: ${userData.account_number}</p>
            <p>Balance: ${userData.balance}</p>
            <p>Phone: ${userData.phone_number}</p>
        `;
    } else if (account_id.substring(0, 2) === "BA") {
        userInfoContainer.innerHTML = `
            <p>Name: ${userData.business_name}</p>
            <p>Account Number: ${userData.account_number}</p>
            <p>Balance: ${userData.balance}</p>
            <p>Location: ${userData.location}</p>
            <p>Phone: ${userData.phone_number}</p>
        `;
    } else {
        userInfoContainer.innerHTML = `<p>Account type not recognized.</p>`;
    }
}


