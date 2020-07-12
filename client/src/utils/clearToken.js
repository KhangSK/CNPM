const clearToken = () => {
  window.location.href = '/'
  localStorage.removeItem('token')
}

export default clearToken