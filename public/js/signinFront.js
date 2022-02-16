const loginForm = document.querySelector('.login__form')
const links = document.querySelectorAll('.social-list__item')

loginForm.addEventListener('submit', e => {
  e.preventDefault()
  const dataFront = Object.fromEntries(new FormData(loginForm))
  fetch('/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(dataFront)
  })
    .then(dataBack => dataBack.json())
    .then(({ userId }) => window.location = `/profile/${userId}`)
})


links.forEach(item => item.addEventListener('click', () => alert('Фича в разработке')))
