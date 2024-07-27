const updateStudent = async (event) => {
    if (event && event.preventDefault) event.preventDefault();

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
    const formData = {};
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

    let apiUrl = `${baseUrl}/api/student/update`;

    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + cookie
        },
        body: JSON.stringify(formData),
    };

    let response = await fetch(apiUrl, requestOptions);
    let responseData = await response.json();
    // document.getElementById('seatTable').classList.remove('d-none');
    // var tbody = document.getElementById("seatTableBody");
    if (!response.ok) {
        // console.log(responseData);
        alert(responseData.message);
    }
    else {
        // await addStudentSchedule();
        window.location.href = "./studentdata.html";
    }

}

const fetchStudentById = async () => {
  
    let responseData = {
        "message": "fetched student successfully",
        "data": {
            "name": "Test 1",
            "mobile_no": "2345687633",
            "membership_name": "Test 1",
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
            "updated_at": "2024-07-14 02:31:01"
        }
    };
    responseData = responseData.data;

        document.getElementById('membershipId').value = responseData.membership_id ;
        document.getElementById('membershipName').value = responseData.membership_name ;
        document.getElementById('studentName').value = responseData.name ;
        document.getElementById('mobileNumber').value = responseData.mobile_no ;
        document.getElementById('email').value = responseData.email ;
        document.getElementById('fatherName').value = responseData.father_name ;
        document.getElementById('fatherOccupation').value = responseData.father_occupation ;
        document.getElementById('motherName').value = responseData.mother_name ;
        document.getElementById('motherOccupation').value = responseData.mother_occupation ;
        document.getElementById('state').value = responseData.state ;
        document.getElementById('permanentAddress').value = responseData.permanent_address ;
        document.getElementById('presentAddress').value = responseData.present_address ;
        document.getElementById('schoolName').value = responseData.school_name ;
        document.getElementById('location').value = responseData.location ;
        document.getElementById('class').value = responseData.class;
        document.getElementById('coachingName').value = responseData.coaching_name ;
        document.getElementById('coachingLocation').value = responseData.coaching_location ;
        document.getElementById('batchTiming').value = responseData.coaching_batch_timing;
        document.getElementById('referenceName').value = responseData.reference_name ;
        document.getElementById('referenceContact').value = responseData.reference_contact ;
    
}
fetchStudentById();