const populateSeats = () => {
    let seatListContainer = document.getElementById('seatList');

    let row;
    for (let i = 1; i <= 100; i++) {

        if (i % 10 === 1) {
            row = document.createElement('div');
            row.className = 'row';
            seatListContainer.appendChild(row);
        }

        let seat = document.createElement('div');
        seat.className = 'seat';
        seat.textContent = i;
        seat.setAttribute('id', 'seat_' + i);
        row.appendChild(seat);
    }
};

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
                "updated_at": "2024-07-15 21:21:04",
                "student": {
                    "email": "test123@mail.com",
                    "name": "Test 1"
                }
            },
            {
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
                    "email": "test234@mail.com",
                    "name": "Test 2"
                }
            }
        ],
        "rate": 999
    };
    document.getElementById('seatTable').classList.remove('d-none');
    let tbody = document.getElementById("seatTableBody");
    tbody.innerHTML = '';
    let seatCount = document.getElementById('seatCount');
    let seatListBtn = document.getElementById('seat-list-btn');

    responseData = responseData.data;
    let availableSeats = responseData.length;
    for (const data of responseData) {
        let newRow = document.createElement("tr");
        newRow.innerHTML = `<th scope='row'>${data.id}</th><td>${data.student.name}</td><td>${data.student.email}</td><td>${data.seat_number}</td><td>${data.shift_date_start}</td><td>${data.shift_date_end}</td><td>${data.shift_time_start}</td><td>${data.shift_time_end}</td><td>${data.payment_status}</td>`;
        tbody.appendChild(newRow);
        const seatElement = document.getElementById(`seat_${data.seat_number}`);
        seatElement.classList.add('sold');
    }
    // Get the container
    seatCount.innerHTML = `Total available seats: <b>${100 - availableSeats}</b>`;
    seatCount.classList.remove('d-none');
    seatListBtn.classList.remove('d-none');
    return false;
};

const populateStartAndEndDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;


    let hh = today.getHours();
    let mn = today.getMinutes();
    let format = 'AM';
    if (hh > 12) {
        hh -= 12;
        format = 'PM';
    } else if (hh === 0) {
        hh = 12;
    }

    let timeFormat = `${hh}:${mn} ${format}`;
    document.getElementById('startTime').value = timeFormat;
    document.getElementById('endTime').value = timeFormat;
    const textFormat = dd + '/' + mm + '/' + yyyy;
    document.getElementById('startDate').value = textFormat;
    document.getElementById('endDate').value = textFormat;
};

populateSeats();
populateStartAndEndDate();