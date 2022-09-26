
module.exports = {
    validateJoin: ({
        id,
        password,
        confirmPassword,
        name,
        email
    }) => {

        if (password !== confirmPassword) {
            return "패스워드가 일치하지 않습니다.";
        }

        return null;
    }
};