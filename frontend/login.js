const error = document.querySelector('.error')
const loginForm = document.getElementById('loginForm')

const storedToken = localStorage.getItem('token')
console.log(storedToken)


loginForm.addEventListener('submit', (e) => {

    e.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    if (email == '' || password == '') {
        error.textContent = 'Field cannot be empty'
        setTimeout(() => {
            error.textContent = ''
        }, 5000)
        return
     
    }
    if (email == '' && password == '') {
        error.textContent = 'Fields cannot be empty'
        setTimeout(() => {
            error.textContent = ''
        }, 5000)
        return
    }

    fetch('/api/users/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        
        body: JSON.stringify({ email: email, password: password})
    })
    .then( res => {
        if(res.ok){
            return res.json()
        } else {
            throw new Error(res.statusText)
        }
    })
    .then(data => {
        const token = data.token
        localStorage.setItem('token', token)
        window.location.href = 'express.html'
    })
    .catch(error =>{
        document.querySelector('.error').textContent = 'Invalid email or password'
        setTimeout(() => {
            document.querySelector('.error').textContent = ''
        }, 5000)
    })

})