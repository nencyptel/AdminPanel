const baseURL = `http://localhost:4000/`;

const HttpService = {
    login: baseURL + 'get/user/login',
    verifyuser:baseURL + 'auth/verify/user/',
    forgetpassword: baseURL+ 'forgetpassword',
    confirmPassword: baseURL + 'changepassword'
};

export default HttpService;