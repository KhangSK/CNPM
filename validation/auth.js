const isEmpty = require('../utils/isEmpty')

const registerValidation = value => {
  let errors = {}
  const name = value.name ? value.name : ''
  const email = value.email ? value.email : ''
  const password = value.password ? value.password : ''
  const password2 = value.password2 ? value.password2 : ''

  const reEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const rePassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/

  if (name === '') {
    errors.name = 'Name field is required'
  } else {
    if (name.length < 6) {
      errors.name = 'Name must be than 6 chracters'
    }
  }
  if (email === '') {
    errors.email = 'Email field is required'
  }
  if (password === '') {
    errors.password = 'Password field is required'
  }
  if (password2 === '') {
    errors.password2 = 'Password confirm field is required'
  }
  if (!reEmail.test(email)) {
    errors.email = 'Email is not valid'
  }
  if (!rePassword.test(password)) {
    errors.password = 'Password is not valid'
  } else {
    if (password !== password2) {
      errors.password2 = 'Password confirm is not match'
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

const loginValidation = value => {
  let errors = {}
  const email = value.email ? value.email : ''
  const password = value.password ? value.password : ''

  const reEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const rePassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/

  if (email === '') {
    errors.email = 'Email field is required'
  }
  if (password === '') {
    errors.password = 'Password field is required'
  }
  // if (!reEmail.test(email)) {
  //   errors.email = 'Email is not valid'
  // }
  if (!rePassword.test(password)) {
    errors.password = 'Password is not valid'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = {
  registerValidation,
  loginValidation
}