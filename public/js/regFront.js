const regForm = document.querySelector('.login__form.registration')
const links = document.querySelectorAll('.social-list__item')

regForm.addEventListener('submit', e => {
  e.preventDefault()
  const dataFront = Object.fromEntries(new FormData(regForm))
  console.log(dataFront);
  fetch('/auth/reg', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(dataFront)
  })
    .then(dataBack => dataBack.json())
    .then(({ userId }) => window.location = `/profile/${userId}`)
    .catch(() => alert('Пользователь уже существует!'))

  regForm.reset()
})



links.forEach(item => item.addEventListener('click', () => alert('Фича в разработке')))
