const baseUrl = 'https://test-library-management.vercel.app';
// const baseUrl = 'http://localhost:3001';

const fetchStudents = async (event) => {
    if (event && event.preventDefault) event.preventDefault();
    let responseData = {
        "message": "data fetched successfully",
        "data": [{
                "id": 6,
                "name": "Test 123",
                "mobile_no": "2345687633",
                "membership_name": "Test 123",
                "membership_id": "test123",
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
                "student_seat_allotment": [{
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
            }
        ]
    };

    // console.log(responseData);
    responseData = responseData.data;
    document.getElementById('seatTable').classList.remove('d-none');
    var tbody = document.getElementById("seatTableBody");
    tbody.innerHTML = '';
    for (const data of responseData) {
        var newRow = document.createElement("tr");
        newRow.innerHTML = `<th scope='row'>${data.id}</th>
            <td>${data.name}</td>
            <td>${data.mobile_no}</td>
            <td>${data.email}</td>
            <td>${data.membership_id}</td>`;
        let user_role = sessionStorage.getItem('cookie-role');
        if (user_role == 3) {
            newRow.innerHTML += `<td><a href="#" style="pointer-events: none;" class="delete-link disabled h5 text-dark"><i class="ti ti-trash"></i></a><a href="./editStudent.html?id=${data.id}" class="edit-link m-4 h5 text-primary" data-toggle="tooltip" data-placement="bottom" title="Edit Student Details"><i class="ti ti-pencil"></i></a></td>`;
            const deleteLink = newRow.querySelector('.delete-link');
            deleteLink.addEventListener('click', function (event) {
                event.preventDefault();
                deleteStudent(data.id);
            });
        } else {
            newRow.innerHTML += `<td><a href="#" style="pointer-events: none;" class="delete-link disabled h5 text-dark"><i class="ti ti-trash"></i></a><a href="./editStudent.html?id=${data.id}" class="edit-link m-4 h5 text-primary" data-toggle="tooltip" data-placement="bottom" title="Edit Student Details"><i class="ti ti-pencil"></i></a></td>`;
        }
        newRow.innerHTML += `<td><a href="./allotSeat.html?id=${data.id}" class="add-link h5 text-primary" data-toggle="tooltip" data-placement="bottom" title="Allot Seat"><i class="ti ti-plus"></i></a><a href="./invoice.html" class="view-link m-3 h5 text-primary" data-toggle="tooltip" data-placement="bottom" title="View Seat Allotments"><i class="ti ti-eye"></i></a></td>`;
        const deleteLink = newRow.querySelector('.delete-link');
        deleteLink.addEventListener('click', function (event) {
            event.preventDefault();
            deleteStudent(data.id);
        });
        tbody.appendChild(newRow);
    }

    return false;
};

const deleteStudent = async (id) => {
    let cookie = checkAuth();
    let apiUrl = `${baseUrl}/api/student/${id}`;
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
    } else {
        location.reload();
    }
    return false;
};

fetchStudents();