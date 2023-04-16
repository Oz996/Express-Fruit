const recover = document.getElementById('recoverForm')
const email = document.getElementById('email')
const error = document.querySelector('.error')


recover.addEventListener('submit', (e) => {
    
    e.preventDefault()
    if (email.value == ''){
        error.textContent = 'You need to enter your email adress'
        setTimeout(() => {
            error.textContent = ''
        }, 5000);
    } else {
        error.textContent = ''
    }

})


