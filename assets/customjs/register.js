const registerUser = async (event) => {
    if (event && event.preventDefault) event.preventDefault();
        window.location.href = "./authentication-login.html";
    return false;
};

let checkboxListener = document.getElementById("superadmin");

checkboxListener.addEventListener('change', () => {
    if(checkboxListener.checked) checkboxListener.value = 3;
    else checkboxListener.value = 1;
});

const populateStartAndEndDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const currentDate = dd + '-' + mm + '-' + yyyy;
    const textFormat = yyyy + '-' + mm + '-' + dd; 
    document.getElementById('startDate').value = textFormat;
    // document.getElementById('startDate').text = textFormat;
    document.getElementById('endDate').value = textFormat;
};

populateStartAndEndDate();