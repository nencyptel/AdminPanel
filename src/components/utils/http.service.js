const baseURL = `http://localhost:4000/`;

const HttpService = {
    login: baseURL + 'get/user/login',
    verifyuser:baseURL + 'auth/verify/user/',
    forgetpassword: baseURL+ 'forgetpassword',
    confirmPassword: baseURL + 'changepassword',
    Register :baseURL + 'create/user',
    cutomerService:baseURL + 'fetch/alluser',
    deleteUser : baseURL + 'delete/user',
    updateUser: baseURL + 'update/user',
    accesiblepage : baseURL + 'accessible/page',
    fetchUser: baseURL + 'get/userbyid'
};

export default HttpService;