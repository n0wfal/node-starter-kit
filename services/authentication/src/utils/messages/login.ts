const TESTS = {
    API: "/auth/login",
    SUCCESS: {
        LOGIN_SUCCESS : "Should pass when valid data is provided."
    },
    FAILURE: {
        INVALID_EMAIL: "Should faild when email is invalid.",
        EMAIL_REQUIRED: "Should fail when email is not provided.",
        PASSWORD_REQUIRED: "Should fail when password is not provided.",
        USER_NOT_FOUND: "Should fail when user does not exist.",
        WRONG_CREDENTIALS: "Should fail when invalid credentials are provided."
    }
};  

const RESPONSE_MESSAGES = {
    INVALID_EMAIL: "Email is not valid.",
    EMAIL_REQUIRED: "Email is required",
    PASSWORD_REQUIRED: "Password is required",
    LOGIN_SUCCESS: "Login success",
    USER_NOT_FOUND: "User not found"
};
const MODULE_NAME = "Login";

export {
    TESTS,
    RESPONSE_MESSAGES,
    MODULE_NAME
}