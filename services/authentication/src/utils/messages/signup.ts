const TESTS = {
    API: "/auth/signup",
    SUCCESS: {
        SIGNUP_SUCCESS : "Should pass when valid data is provided."
    },
    FAILURE: {
        EMAIL_REQUIRED: "Should fail when email is not provided.",
        PASSWORD_REQUIRED: "Should fail when password is not provided.",
        INVALID_EMAIL: "Should fail when invalid email is provided.",
        PASSWORD_LENGTH: "Should fail when password is too short.",
        EXISTING_USER: "Should fail when a user with the same email already exists.",
        PASSWORD_CONFIRMATION: "Should fail when password doesn't match the confirmation.",
        PASSWORD_CONFIRMATION_REQUIRED: "Should fail when password confirmation is not provided.",
    }
};  

const RESPONSE_MESSAGES = {
    EXISTING_USER: "Email already in use",
    INVALID_EMAIL: "Email is not valid.",
    PASSWORD_LENGTH: "Password should be alteast 8 characters.",
    PASSWORD_CONFIRMATION: "Password confirmation does not match password.",
    EMAIL_REQUIRED: "Email is required.",
    PASSWORD_REQUIRED: "Password is required.",
    PASSWORD_CONFIRMATION_REQUIRED: "Password confirmation is required.",
    PASSWORD_ALPHANUMERIC: "Password should be alpha-numeric",
    SIGNUP_SUCCESS: "Signup succesful"
};
const MODULE_NAME = "Signup";

export {
    TESTS,
    RESPONSE_MESSAGES,
    MODULE_NAME
}