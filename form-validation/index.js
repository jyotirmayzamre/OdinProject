const email = document.getElementById('email');
const emailError = document.querySelector('.email.error');

const password = document.getElementById('password');
const passwordError = document.querySelector('.error.password');

email.addEventListener('blur', (e)=>{
    if (!email.validity.valid){
        showError('email');
        e.preventDefault();
    }
});

password.addEventListener('blur', (e)=>{
    if (!password.validity.valid){
        showError('password');
        e.preventDefault();
    }
})



function showError(type){
    switch(type){
        case 'email':
            if (email.validity.valueMissing) {
                emailError.textContent = 'You need to enter an email address'
            } else if (email.validity.typeMismatch) {
                emailError.textContent = 'Entered value needs to be an email address.';
            } else if (email.validity.tooShort) {
                emailError.textContent = `Email should be at least ${email.minLength} characters`
            }

            emailError.className = 'error email active';
            break;

        case 'password':
            if (password.validity.valueMissing) {
                passwordError.textContent = 'You need to enter a password';
            } else if (password.validity.patternMismatch) {
                passwordError.textContent = 'Password should have at least 8 characters, 1 upper case character, 1 number, and 1 special character';
            }

            passwordError.className = 'error password active';
            break;
    }
}