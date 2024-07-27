const baseUrl = 'https://test-library-management.vercel.app';
// const baseUrl = 'http://localhost:3001';

const loginUser = async (event) => {
    if (event && event.preventDefault) event.preventDefault();
    window.location.href = "./index.html";
    return false;
};