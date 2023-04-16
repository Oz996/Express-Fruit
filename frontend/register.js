const registerForm = document.getElementById('registerForm')

const email = document.getElementById('email').value
const emailInput = document.getElementById('email')
const password = document.getElementById('password').value

const error = document.querySelector('.error')




registerForm.addEventListener('submit', (e) => {

    e.preventDefault()
    const email = document.getElementById('email').value
    const emailInput = document.getElementById('email')
    const password = document.getElementById('password').value

    if (email == '' || password== '') {
        error.textContent = 'Field cannot be empty'
        setTimeout(() => {
            error.textContent = ''
        }, 5000)
     
    }
    if (email == '' && password == '') {
        error.textContent = 'Fields cannot be empty'
        setTimeout(() => {
            error.textContent = ''
        }, 5000)
        return
    }
    if(password.length < 8 && password.length > 0) {
        error.textContent = 'Password needs to be atleast 8 characters'
    
    setTimeout(() => {
        error.textContent = ''
    }, 5000)
    return
   }
   
   fetch('/api/users/register/', {
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
   .then( data => {
    console.log(data)
    const token = data.token
    const user = {email: data.email, token: token}
    localStorage.setItem('user', JSON.stringify(user))
    console.log(token)
    window.location.href = 'redirect.html'
   })
   .catch( error => {
    document.querySelector('.error').textContent = error.message
   })

})