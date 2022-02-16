const modalProduct = document.querySelector('.modalCategoryProduct')
const productList = document.querySelector('.products')
const btnProduct = document.querySelector('.btn__product')
const formProduct = document.querySelector('.modalCategoryProduct__form')

const showModalProduct = (modal, btn) => {
  btn.addEventListener('click', () => modal.classList.remove('hide'))
}

const closeModalProduct = (modal, modalClass) => {
  modal.addEventListener('mousedown', e => {
    if (e.target.className === modalClass) {
      modal.classList.add('hide')
    }
  })
}

const renderProduct = ({ id, name }) => (`
  <li class="products__item" data-id="${id}">
    <a href="/product/{{this.id}}">${name}</a>
    <em>Удалить</em>
  </li>
`)

showModalProduct(modalProduct, btnProduct)
closeModalProduct(modalProduct, 'modalCategoryProduct')


formProduct.addEventListener('submit', e => {
  e.preventDefault()
  const { id } = document.querySelector('[data-id]').dataset
  const dataFront = Object.fromEntries(new FormData(formProduct))
  modalProduct.classList.add('hide')
  fetch(`/products/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(dataFront)
  })
    .then(dataBack => dataBack.json())
    .then(data => productList.insertAdjacentHTML('beforeend', renderProduct(data)))
    .catch(() => alert('Произошла ошибка, данные не добавились'))

  formProduct.reset()
})

productList.addEventListener('click', e => {
  e.preventDefault()
  if (e.target.tagName === 'EM' && e.target.textContent === 'Удалить') {
    const parent = e.target.closest('[data-id]')
    const idProduct = parent.dataset.id
    fetch(`/products/${idProduct}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json;charset=utf-8' }
    })
      .then(() => parent.remove())
      .catch(() => alert('Ошибка удаления!'))
  }
})

// fetch(`/category/${id}`, {
//   method: 'DELETE',
//   headers: { 'Content-Type': 'application/json;charset=utf-8' }
// })
