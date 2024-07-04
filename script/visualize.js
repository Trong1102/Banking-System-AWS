document.addEventListener('DOMContentLoaded', function() {
    // Lấy account_id từ localStorage
    const account_id = localStorage.getItem('account_id');

    // Định nghĩa hàm gọi API để lấy dữ liệu cho biểu đồ column
    function fetchColumnChartData() {
        return fetch('https://encrz0mjri.execute-api.ap-southeast-1.amazonaws.com/dev/chart/column_chart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Account_id: account_id })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Column Chart Data:', data);
            return JSON.parse(data.body);
        })
        .catch(error => {
            console.error('Error fetching column chart data:', error);
            throw error;
        });
    }

    // Định nghĩa hàm gọi API để lấy dữ liệu cho biểu đồ pie chart
    function fetchPieChartData() {
        return fetch('https://encrz0mjri.execute-api.ap-southeast-1.amazonaws.com/dev/chart/pie_chart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Account_id: account_id })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Pie Chart Data:', data);
            return JSON.parse(data.body);
        })
        .catch(error => {
            console.error('Error fetching pie chart data:', error);
            throw error;
        });
    }
    function fetchAnotherTableData() {
        return fetch('https://encrz0mjri.execute-api.ap-southeast-1.amazonaws.com/dev/chart/history_txn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Account_id: account_id })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Another Table Data:', data);
            return JSON.parse(data.body);
        })
        .catch(error => {
            console.error('Error fetching another table data:', error);
            throw error;
        });
    }

    // Gọi cả hai hàm và xử lý dữ liệu khi cả hai API đều đã hoàn thành
    Promise.all([fetchColumnChartData(), fetchPieChartData(),fetchAnotherTableData()])
    .then(([columnData, pieData,anotherTableData]) => {
        // Vẽ biểu đồ cột
        const columnMonths = columnData.map(item => item.month);
        const columnAmounts = columnData.map(item => item.amount);
        drawColumnChart(columnMonths, columnAmounts);

        // Vẽ biểu đồ pie
        const pieLabels = pieData.map(item => item.type);
        const pieAmounts = pieData.map(item => item.amount);
        drawPieChart(pieLabels, pieAmounts);

        fillAnotherTable(anotherTableData);
    })
    .catch(error => {
        console.error('Error in fetching data:', error);
        alert('Failed to fetch data for one of the charts.');
    });

    function drawColumnChart(labels, data) {
        const ctx = document.getElementById('columnCanvas').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Monthly Spending',
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235, 0.8)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function drawPieChart(labels, data) {
        const ctx = document.getElementById('pieCanvas').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    // label: 'Business Type Spending',
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(255, 159, 64, 0.8)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        display: false,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        display: false,
                        grid: {
                            display: false
                        },
                        beginAtZero: true
                    }

                },
                plugins:{
                    legend:{
                        display: true, // Hiển thị chú giải
                        position: 'right'
                    }
                }
            }
        });
    }
    function fillAnotherTable(data) {
        const tableBody = document.getElementById('anotherTable').querySelector('tbody');
        tableBody.innerHTML = '';
        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.Transaction_date}</td>
                <td>${row.Account_number}</td>
                <td>${row.Amount}</td>
                <td>${row.recipient_number}</td>
                <td>${row.description}</td>
            `;
            tableBody.appendChild(tr);
        });
    }
});
