export default function ({ name, username, password, passwordConfirm }) {
    const regexes = {
        name: /^[a-zA-Z\u0600-\u06FF\s\-]{2,50}$/,
        username: /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
    };

    return {
        name: regexes.name.test(name),
        username: regexes.username.test(username),
        password: regexes.password.test(password),
        passwordConfirm: passwordConfirm === password
    }
}