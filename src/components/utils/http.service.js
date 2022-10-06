const baseURL = `http://192.168.1.107:4000/`;

const HttpService = {
    login: baseURL + 'get/user/login',
    verifyuser:baseURL + 'auth/verify/user/',
    forgetpassword: baseURL+ 'forgetpassword',
    confirmPassword: baseURL + 'changepassword',
    Register :baseURL + 'create/user',
    cutomerService:baseURL + 'fetch/alluser',
    deleteUser : baseURL + 'delete/user',
    updateUser: baseURL + 'update/user',
    accesiblepage : baseURL + 'accessible/page'
};

export default HttpService;