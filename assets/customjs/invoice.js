
const fetchStudents = async (event) => {
    if (event && event.preventDefault) event.preventDefault();
    let responseData = {
        "message": "data fetched successfully",
        "data": [
            {
                "id": 6,
                "name": "Test 1",
                "mobile_no": "2345687633",
                "membership_name": "Ayush test 1",
                "membership_id": "Test 123",
                "father_name": "",
                "father_occupation": "",
                "mother_name": "",
                "mother_occupation": null,
                "email": "test123@mail.com",
                "state": "Andhra Pradesh",
                "present_address": "",
                "permanent_address": "",
                "school_name": "",
                "location": "",
                "class": null,
                "coaching_name": "",
                "coaching_location": "",
                "coaching_batch_timing": "",
                "reference_name": "",
                "reference_contact": "",
                "image": null,
                "created_at": "2024-07-13 16:12:27",
                "updated_at": "2024-07-14 02:31:01",
                "student_seat_allotment": [
                    {
                        "id": 6,
                        "student_id": 6,
                        "shift_date_start": "15/07/2024",
                        "shift_date_end": "15/07/2024",
                        "shift_time_start": "10:00 AM",
                        "shift_time_end": "01:00 PM",
                        "hours": 3,
                        "discount": null,
                        "fees": 599,
                        "seat_number": 3,
                        "payment_status": false,
                        "created_at": "2024-07-15 20:24:52",
                        "updated_at": "2024-07-15 20:24:52"
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
                        "updated_at": "2024-07-15 21:21:04"
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
                        "updated_at": "2024-07-16 00:07:05"
                    }
                ]
            },
            {
                "id": 2,
                "name": "Test 2",
                "mobile_no": "1234567898",
                "membership_name": "Test 234",
                "membership_id": "12345765",
                "father_name": "",
                "father_occupation": "",
                "mother_name": "",
                "mother_occupation": null,
                "email": "test234@mail.com",
                "state": "Andhra Pradesh",
                "present_address": "",
                "permanent_address": "",
                "school_name": "",
                "location": "",
                "class": null,
                "coaching_name": "",
                "coaching_location": "",
                "coaching_batch_timing": "",
                "reference_name": "",
                "reference_contact": "",
                "image": null,
                "created_at": "2024-07-12 18:49:33",
                "updated_at": "2024-07-14 02:31:49",
                "student_seat_allotment": [
                    {
                        "id": 1,
                        "student_id": 2,
                        "shift_date_start": "01/01/2024",
                        "shift_date_end": "01/01/2024",
                        "shift_time_start": "10:00 AM",
                        "shift_time_end": "12:00 PM",
                        "hours": 2,
                        "discount": null,
                        "fees": 600,
                        "seat_number": 3,
                        "payment_status": true,
                        "created_at": "2024-07-12 18:49:33",
                        "updated_at": "2024-07-12 18:49:33"
                    }
                ]
            }
        ]
    };
    document.getElementById('seatTable').classList.remove('d-none');

        // console.log(responseData);
        responseData = responseData.data;
        document.getElementById('seatTable').classList.remove('d-none');
        var tbody = document.getElementById("seatTableBody");
        tbody.innerHTML = '';

        let userSeatMap = {};
        for (const data of responseData) {
            if (!userSeatMap[data.email]) userSeatMap[data.email] = [];
        }
        let isFirst = true;
        for (const data of responseData) {
            const tbody = document.getElementById('seatTableBody');

            const tr = document.createElement('tr');

            const tdName = document.createElement('td');
            tdName.textContent = data.name;
            tr.appendChild(tdName);

            const tdEmail = document.createElement('td');
            tdEmail.textContent = data.email;
            tr.appendChild(tdEmail);

            const tdSeatAllotments = document.createElement('td');

            const seatTable = document.createElement('table');
            seatTable.classList.add('table', 'table-hover', 'table-striped', 'mb-0');

            const thead = document.createElement('thead');
            thead.innerHTML = `
  <tr>
    <th>Alloted Date</th>
    <th>Fees</th>
    <th>Seat No</th>
    <th>Print/Delete</th>
  </tr>
`;
            seatTable.appendChild(thead);

            const tbodySeatAllotments = document.createElement('tbody');

            data.student_seat_allotment.forEach(seat => {
                const trSeat = document.createElement('tr');
                trSeat.innerHTML = `
                <td>${seat.shift_date_start} - ${seat.shift_date_end}</td>
                <td>${seat.fees}</td>
                <td>${seat.seat_number}</td>`
                let user_role = sessionStorage.getItem('cookie-role');
                trSeat.innerHTML += `<td><a href="#" class="print-link h5 text-primary"  data-toggle="tooltip" data-placement="bottom" title="Print Invoice"><i class="ti ti-printer"></i></a><a href="#" style="pointer-events: none;" class="delete-link disabled m-4 h5 text-dark"  data-toggle="tooltip" data-placement="bottom" title="Delete Invoice/Allotment"><i class="ti ti-trash"></i></a></td>`;
                const printLink = trSeat.querySelector('.print-link');
                printLink.addEventListener('click', function (event) {
                    event.preventDefault();
                    printInvoice({
                        name: data.name,
                        email: data.email,
                        mobile_number: data.mobile_no,
                        shift_date_start: seat.shift_date_start,
                        shift_date_end: seat.shift_date_end,
                        shift_time_start: seat.shift_time_start,
                        shift_time_end: seat.shift_time_end,
                        hours: seat.hours,
                        fees: seat.fees,
                        seat_number: seat.seat_number
                    });
                });
                tbodySeatAllotments.appendChild(trSeat);
            });

            seatTable.appendChild(tbodySeatAllotments);
            tdSeatAllotments.appendChild(seatTable);
            tr.appendChild(tdSeatAllotments);

            tbody.appendChild(tr);

        }

    return false;
};

function printInvoice(data) {
    // console.log("Printing invoice for row:", data);
    let invoiceDate = new Date();

    // Get the date components
    let year = invoiceDate.getFullYear();
    let month = ('0' + (invoiceDate.getMonth() + 1)).slice(-2); // Months are zero-based
    let day = ('0' + invoiceDate.getDate()).slice(-2);
    let hours = ('0' + invoiceDate.getHours()).slice(-2);
    let minutes = ('0' + invoiceDate.getMinutes()).slice(-2);
    let seconds = ('0' + invoiceDate.getSeconds()).slice(-2);

    invoiceDate = `${day}/${month}/${year}`;

    // console.log(invoiceDate);

    console.log(data.shift_date_start, data.shift_date_end);
    let fees = `&#8377;${data.fees}`;
    let time = `${data.shift_time_start} - ${data.shift_time_end}`;
    let formattedDate = data.shift_date_end.split('-');

    localStorage.setItem('invoiceDate', invoiceDate);
    localStorage.setItem('totalFees', fees);
    localStorage.setItem('name', data.name);
    localStorage.setItem('shiftTime', time);
    localStorage.setItem('shiftEndDate', formattedDate);
    localStorage.setItem('hours', data.hours);
    localStorage.setItem('seatNumber', data.seat_number);
    localStorage.setItem('fees', fees);
    localStorage.setItem('amountFees', fees);
    window.location.href = './invoice-print.html'
}

const deleteSeatAllotment = async (id) => {
    let cookie = checkAuth();
    let apiUrl = `${baseUrl}/api/seat/${id}`;
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + cookie,
        },
    };

    let response = await fetch(apiUrl, requestOptions);
    let responseData = await response.json();
    if (!response.ok) {
        var tbody = document.getElementById("seatTableBody");
        tbody.innerHTML = '';
        alert(responseData.message);
    }
    else {
        location.reload();
    }
    return false;
};

fetchStudents();