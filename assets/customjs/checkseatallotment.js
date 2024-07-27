const checkAvailability = async (event) => {
    if (event && event.preventDefault) event.preventDefault();

    let responseData = {
        "message": "data fetched successfully",
        "data": [{
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
            "updated_at": "2024-07-15 21:21:04"
        }]
    };

    document.getElementById('seatTable').classList.remove('d-none');
    var tbody = document.getElementById("seatTableBody");
    tbody.innerHTML = '';
    responseData = responseData.data;
    for (const data of responseData) {
        var newRow = document.createElement("tr");
        newRow.innerHTML = `<th scope='row'>${data.id}</th><td>${data.seat_number}</td><td>${data.shift_date_start}</td><td>${data.shift_date_end}</td><td>${data.shift_time_start}</td><td>${data.shift_time_end}</td><td>${data.payment_status}</td>`;
        tbody.appendChild(newRow);
    }
    return false;
};

const populateSeats = () => {
    let selectElem = document.getElementById('seatNumber');
    for (let i = 1; i <= 100; i++) {

        var el = document.createElement("option");
        el.value = i;
        el.textContent = i;
        selectElem.appendChild(el);
    }
}


populateSeats();