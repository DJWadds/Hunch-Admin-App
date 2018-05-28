exports.authenticateAdmin = (email, password) => {
    if (email === 'djw@gmail.com' && password === 'pass') {
        return true;
    } else if (email === 'djw@gmail.com') {
        return 'Incorrect password';
    } else {
        return 'Wrong email';
    }
}