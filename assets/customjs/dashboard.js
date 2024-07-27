let yearlyTotal = document.getElementById('totalYearlyValue');
yearlyTotal.innerHTML = `&#8377;0`;
let monthlyTotal = document.getElementById('totalMonthlyValue');
monthlyTotal.innerHTML = `&#8377;0`;

const fetchYearlyBreakup = async () => {

    let responseData = {
        "message": "data fetched successfully",
        "data": {
            "paid": 998,
            "unpaid": 599
        }
    };
    let total = 0;
    let series = [];
    total = responseData.data.paid + responseData.data.unpaid;
    series = [responseData.data.paid, responseData.data.unpaid];
    yearlyTotal.innerHTML = `&#8377;${total}`;
    let breakup = {
        color: "#adb5bd",
        series: series,
        labels: ["Paid", "Unpaid"],
        chart: {
            width: 180,
            type: "donut",
            fontFamily: "Plus Jakarta Sans', sans-serif",
            foreColor: "#adb0bb",
        },
        plotOptions: {
            pie: {
                startAngle: 0,
                endAngle: 360,
                donut: {
                    size: '75%',
                },
            },
        },
        stroke: {
            show: false,
        },

        dataLabels: {
            enabled: false,
        },

        legend: {
            show: false,
        },
        colors: ["#17153B", "#C8ACD6"],

        responsive: [{
            breakpoint: 991,
            options: {
                chart: {
                    width: 150,
                },
            },
        }, ],
        tooltip: {
            theme: "dark",
            fillSeriesColor: false,
            y: {
                formatter: function (value) {
                    return `&#8377;${value}`;
                }
            }
        },
    };

    let chart = new ApexCharts(document.querySelector("#yearly"), breakup);
    chart.render();
};


const fetchMonthlyBreakup = async () => {

    let responseData = {
        "message": "data fetched successfully",
        "data": {
            "paid": 1598,
            "unpaid": 599
        }
    };
    let total = 0;
    series = [0, 0];
    total = responseData.data.paid + responseData.data.unpaid;
    series = [responseData.data.paid, responseData.data.unpaid];


    monthlyTotal.innerHTML = `&#8377;${total}`;
    let breakup = {
        color: "#adb5bd",
        series: series,
        labels: ["Paid", "Unpaid"],
        chart: {
            width: 180,
            type: "donut",
            fontFamily: "Plus Jakarta Sans', sans-serif",
            foreColor: "#adb0bb",
        },
        plotOptions: {
            pie: {
                startAngle: 0,
                endAngle: 360,
                donut: {
                    size: '75%',
                },
            },
        },
        stroke: {
            show: false,
        },

        dataLabels: {
            enabled: false,
        },

        legend: {
            show: false,
        },
        colors: ["#17153B", "#C8ACD6"],

        responsive: [{
            breakpoint: 991,
            options: {
                chart: {
                    width: 150,
                },
            },
        }, ],
        tooltip: {
            theme: "dark",
            fillSeriesColor: false,
            y: {
                formatter: function (value) {
                    return `&#8377;${value}`;
                }
            }
        },
    };

    let chart = new ApexCharts(document.querySelector("#monthly"), breakup);
    chart.render();
};

const fetchRecentData = async () => {

    let cookie = checkAuth();
    const apiUrl = `${baseUrl}/api/dashboard/recent`;

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + cookie,
        },
    };

    let response = await fetch(apiUrl, requestOptions);
    let responseData = await response.json();
    if (!response.ok) {} else {
        // console.log(responseData.data);
    }
};

const fetchRenewalData = async () => {

    let responseData = {
        "message": "data fetched successfully",
        "data": [{
                "id": 8,
                "student_id": 6,
                "shift_date_start": "16/07/2024",
                "shift_date_end": "24/07/2024",
                "shift_time_start": "12:00 PM",
                "shift_time_end": "02:06 PM",
                "hours": 2,
                "discount": null,
                "fees": 499,
                "seat_number": 49,
                "payment_status": true,
                "created_at": "2024-07-16 00:07:05",
                "updated_at": "2024-07-16 00:07:05",
                "student": {
                    "email": "test123@mail.com",
                    "name": "Test 1",
                    "membership_id": "test123",
                    "mobile_no": "2345687633"
                }
            },
            {
                "id": 7,
                "student_id": 6,
                "shift_date_start": "15/07/2024",
                "shift_date_end": "20/07/2024",
                "shift_time_start": "10:00 AM",
                "shift_time_end": "12:00 PM",
                "hours": 2,
                "discount": null,
                "fees": 499,
                "seat_number": 7,
                "payment_status": true,
                "created_at": "2024-07-15 21:21:04",
                "updated_at": "2024-07-15 21:21:04",
                "student": {
                    "email": "test234@mail.com",
                    "name": "Test 2",
                    "membership_id": "test234",
                    "mobile_no": "2345687633"
                }
            }
        ]
    }

    // // console.log(responseData.data);
    responseData = responseData.data;
    let tbody = document.getElementById("upcomingRenewal");
    tbody.innerHTML = '';
    for (const data of responseData) {

        let duration = getMonthAndDays(data.shift_date_start, data.shift_date_end);
        var newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td class="border-bottom-0">${data.id}</td>
            <td class="border-bottom-0"><p class="mb-1 text-dark">${data.student.name}</p></td>
            <td class="border-bottom-0"><p class="mb-1 text-dark">${data.student.membership_id}</p></td>
            <td class="border-bottom-0"><p class="mb-1 text-dark">${data.student.mobile_no}</p></td>
            <td class="border-bottom-0"><p class="mb-0 text-dark">${duration}</p></td>
            <td class="border-bottom-0"><div class="d-flex align-items-center gap-2"><span class="badge rounded-3 fw-semibold" style="background-color: #B31312;">${data.shift_date_end}</span></div></td>
            <td class="border-bottom-0"><p class="mb-0 fw-normal"><span class="badge rounded-3 fw-semibold" style="background-color: #EA906C;">${data.shift_time_start} - ${data.shift_time_end}</span></p></td>
            <td class="border-bottom-0"><p class="fw-semibold text-dark mb-0 fs-4">&#8377;${data.fees}</p></td>`;

        tbody.appendChild(newRow);
    }

};

function getMonthAndDays(startDate, endDate) {

    const start = new Date(startDate);
    const end = new Date(endDate);

    // console.log(start, end);

    const difference = end - start;

    const daysDifference = difference / (1000 * 3600 * 24);

    const months = Math.floor(daysDifference / 30); // Assuming 30 days in a month
    const remainingDays = Math.floor(daysDifference % 30);

    // console.log(months, remainingDays);
    let res = '';
    if (months) res += `${months} Month`;
    if (remainingDays) res += ` ${remainingDays} Days`;
    return res;
}


fetchYearlyBreakup();
fetchMonthlyBreakup();
// fetchRecentData();
fetchRenewalData();