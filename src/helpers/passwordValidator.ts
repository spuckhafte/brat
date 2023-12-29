import PasswordValidator from "password-validator";

const passwordValidtor = new PasswordValidator();

passwordValidtor
    .is().min(8, "Password should be of atleast 8 characters")
    .is().max(128, "Password can be of max 128 characters")
    .has().digits(1, "Password should have atleast one digit")
    .has().symbols(1, "Password should have atleast one symbol");

export default passwordValidtor;