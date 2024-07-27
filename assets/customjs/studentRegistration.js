const populateSeats = (response) => {

    let seatListContainer = document.getElementById('seatList');
    seatListContainer.innerHTML = '';

    let row;
    for (let i = 1; i <= 100; i++) {

        if (i % 10 === 1) {
            row = document.createElement('div');
            row.className = 'row';
            seatListContainer.appendChild(row);
        }

        let seat = document.createElement('div');
        seat.className = 'seat';
        if (i in response) seat.className = 'seat sold';
        seat.textContent = i;
        seat.setAttribute('id', 'seat_' + i);
        seat.onclick = function () {
            updateSeatSelected(i);
        };

        function updateSeatSelected(seatNumber) {
            document.getElementById('selectedSeatNumber').value = seatNumber;
            var modal = document.getElementById("modal-close");
            modal.click();
        }
        row.appendChild(seat);
    }
};



const checkSeatAvailability = async (event) => {

    if (event && event.preventDefault) event.preventDefault();
    
    let responseData = {
        "message": "data fetched successfully",
        "data": [
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
                    "email": "av123456@mail.com",
                    "name": "Ayush test 1"
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
                    "email": "av123456@mail.com",
                    "name": "Ayush test 1"
                }
            }
        ],
        "rate": 1099
    };

        let rate = responseData.rate;
        responseData = responseData.data;
        let occupiedSeatMap = {};
        for (const data of responseData) {
            let sNum = data.seat_number;
            occupiedSeatMap[sNum] = true;
        }
        populateSeats(occupiedSeatMap);
        document.getElementById('seat-list-btn').classList.remove('d-none');
        document.getElementById('fee').value = rate;
        fetchHoursFees(updateFee = false);
    
    return false;
};

const checkAvailability = async (event) => {
    if (event && event.preventDefault) event.preventDefault();
    let cookie = checkAuth();
    let seatNumber = document.getElementById('seatNumber').value;
    // console.log(seatNumber);
    const apiUrl = `${baseUrl}/api/seat/fetch/${seatNumber}`;
    // console.log(apiUrl);
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + cookie,
        },
    };

    let response = await fetch(apiUrl, requestOptions);
    let responseData = await response.json();
    document.getElementById('seatTable').classList.remove('d-none');
    var tbody = document.getElementById("seatTableBody");
    tbody.innerHTML = '';
    if (!response.ok) {
        alert(responseData.message);

        var newRow = document.createElement("tr");
        newRow.innerHTML = "<th scope='row'>1</th><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td>";
        tbody.appendChild(newRow);

    }
    else {
        // console.log(responseData);
        responseData = responseData.data;
        for (const data of responseData) {
            var newRow = document.createElement("tr");
            newRow.innerHTML = `<th scope='row'>${data.id}</th><td>${data.seat_number}</td><td>${data.shift_date_start}</td><td>${data.shift_date_end}</td><td>${data.shift_time_start}</td><td>${data.shift_time_end}</td><td>${data.payment_status}</td>`;
            tbody.appendChild(newRow);
        }
    }
    return false;
};


const showElem = (id, show = 1) => {
    if (show) document.getElementById(id).classList.remove('d-none');
    else document.getElementById(id).classList.add('d-none');
}

const convertHours = (time) => {
    const isPM = time.includes("PM");
    let [hour, minute] = time.split(':').map(part => part.trim());
    minute = minute.split(' ')[0];

    let hours = parseInt(hour);
    
    // Convert to 24-hour format
    if (isPM && hours < 12) {
        hours += 12;
    } else if (!isPM && hours === 12) {
        hours = 0;
    }
    return `${hours}:${minute}`;
};

const fetchHoursFees = (updateFee = true) => {
    let shiftTimeStart = document.getElementById('startTime').value;
    let shiftTimeEnd = document.getElementById('endTime').value;

    let shiftDateStart = document.getElementById('startDate').value;
    let shiftDateEnd = document.getElementById('endDate').value;
    let discount = document.getElementById('discount').value || 0;
    // console.log(shiftTimeEnd)

    // Convert time strings to Date objects
    shiftTimeStart = convertHours(shiftTimeStart);
    shiftTimeEnd = convertHours(shiftTimeEnd);
    let shiftTimeStartNew = new Date('1970-01-01T' + shiftTimeStart);
    let shiftTimeEndNew = new Date('1970-01-01T' + shiftTimeEnd);
    // Convert date strings to Date objects
    let startDate = new Date(shiftDateStart);
    let endDate = new Date(shiftDateEnd);

    let days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    // console.log(days);

    let hours = (shiftTimeEndNew.getHours() - shiftTimeStartNew.getHours()) + (shiftTimeEndNew.getMinutes() - shiftTimeStartNew.getMinutes()) / 60;
    // console.log(hours);

    let fees = days * hours * 300;
    fees = parseInt(((100-discount)/100)*fees);

    document.getElementById('hours').value = hours;
    if(updateFee) document.getElementById('fee').value = fees;

}


const addStudent = async (event) => {
    // console.log('Called');
    let cookie = checkAuth();
    if (event && event.preventDefault) event.preventDefault();

    await addStudentData();


}

const addStudentData = async () => {
    let cookie = checkAuth();
    let membershipId = document.getElementById('membershipId').value;
    let membershipName = document.getElementById('membershipName').value;
    let studentName = document.getElementById('studentName').value;
    let mobileNumber = document.getElementById('mobileNumber').value;
    let email = document.getElementById('email').value;
    let fatherName = document.getElementById('fatherName').value;
    let fatherOccupation = document.getElementById('fatherOccupation').value;
    let motherName = document.getElementById('motherName').value;
    let motherOccupation = document.getElementById('motherOccupation').value;
    let state = document.getElementById('state').value;
    let permanentAddress = document.getElementById('permanentAddress').value;
    let presentAddress = document.getElementById('presentAddress').value;
    let schoolName = document.getElementById('schoolName').value;
    let location = document.getElementById('location').value;
    let coachingClass = document.getElementById('class').value;
    let coachingName = document.getElementById('coachingName').value;
    let coachingLocation = document.getElementById('coachingLocation').value;
    let batchTiming = document.getElementById('batchTiming').value;
    let referenceName = document.getElementById('referenceName').value;
    let referenceContact = document.getElementById('referenceContact').value;
    // const image = document.querySelector('input[type="file"]');

    // console.log(image.files);
    const formData = {};
    // if (image && image.files && image.files.length) formData.append('image', image.files[0]);
    formData['email'] = email;
    formData['name'] = studentName;
    formData['mobileNumber'] = mobileNumber;
    formData['membershipName'] = membershipName;
    formData['membershipId'] = membershipId;
    formData['fatherName'] = fatherName;
    formData['fatherOccupation'] = fatherOccupation;
    formData['motherName'] = motherName;
    formData['motherOccupation'] = motherOccupation;
    formData['state'] = state;
    formData['presentAddress'] = presentAddress;
    formData['permanentAddress'] = permanentAddress;
    formData['schoolName'] = schoolName;
    formData['location'] = location;
    formData['coachnigClass'] = coachingClass;
    formData['coachingName'] = coachingName;
    formData['coachingLocation'] = coachingLocation;
    formData['coachingBatchTiming'] = batchTiming;
    formData['referenceName'] = referenceName;
    formData['referenceContact'] = referenceContact;

    // Log the formData entries
    // for (const entry of formData.entries()) {
    //     console.log(entry[0], entry[1]); // Key and value pair
    // }
    // return false;
    // console.log(formData);
    let apiUrl = `${baseUrl}/api/student/create`;
    // console.log(apiUrl);
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + cookie
        },
        body: JSON.stringify(formData),
    };

    let response = await fetch(apiUrl, requestOptions);
    let responseData = await response.json();
    // console.log(responseData);
    // document.getElementById('seatTable').classList.remove('d-none');
    // var tbody = document.getElementById("seatTableBody");
    if (!response.ok) {
        // console.log(responseData);
        alert(responseData.message);
    }
    else {
        await addStudentSchedule();
    }
}

const addStudentSchedule = async () => {
    let cookie = checkAuth();
    let email = document.getElementById('email').value;
    let startTime = document.getElementById('startTime').value;
    let endTime = document.getElementById('endTime').value;
    let startDate = document.getElementById('startDate').value;
    let endDate = document.getElementById('endDate').value;
    let hours = document.getElementById('hours').value;
    let discount = document.getElementById('discount').value;
    let fee = document.getElementById('fee').value;
    let selectedSeatNumber = document.getElementById('selectedSeatNumber').value;
    let paymentStatus = document.getElementById('paymentStatus').value;

    let apiUrl = `${baseUrl}/api/seat/create`;
    const data = {
        "email": email,
        "shiftDateStart": startDate,
        "shiftDateEnd": endDate,
        "shiftTimeStart": startTime,
        "shiftTimeEnd": endTime,
        "seatNumber": parseInt(selectedSeatNumber),
        "discount": parseInt(discount),
        "fee": parseInt(fee),
        "paymentStatus": paymentStatus == 'Paid'
    };

    // console.log(apiUrl);
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + cookie,
        },
        body: JSON.stringify(data),
    };

    let response = await fetch(apiUrl, requestOptions);
    let responseData = await response.json();
    if (!response.ok) {
        alert(responseData.message);
    }
    else {
        alert(responseData.message);
        window.location.reload();
    }
}

const discountFn = (input)=> {
    let discount = input;
    let fees = document.getElementById('fee').value;
    if(fees && fees > 0) fees = parseInt(((100-discount)/100)*fees); 
    document.getElementById('fee').value = fees;
}

const populateStartAndEndDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

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

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const textFormat = dd + '/' + mm + '/' + yyyy;
    document.getElementById('startDate').value = textFormat;
    document.getElementById('endDate').value = textFormat;
};

populateStartAndEndDate();