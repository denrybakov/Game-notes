const modalCategory = document.querySelector('.modalCategory')
const btnShowModal = document.querySelector('.category__block-btn .btn')
const formCategory = document.querySelector('.modalCategory__form')
const categoryList = document.querySelector('.category__list')

const showModal = (modal, btn) => {
  btn.addEventListener('click', () => modal.classList.remove('hide'))
}

const closeModal = (modal, modalClass) => {
  modal.addEventListener('mousedown', e => {
    if (e.target.className === modalClass) {
      modal.classList.add('hide')
    }
  })
}

const parentBlock = eventTerget => ({
  parent: eventTerget.closest('[data-id]'),
  id: eventTerget.closest('[data-id]').dataset.id
})

const renderItem = ({ id, name }) => `
  <li class="profile__list-item" data-id="${id}">
    <a href="/category/${id}">${name}</a>
    <span class="category__edit">Изменить</span>
    <span class="category__delete">Удалить</span>
    <div class="modalCategoryEdit hide">
      <form action="/category" method="POST" class="modalCategoryEdit__form-edit">
      <input type="text" class="categoryEdit__name" name="name" value="${name}">
      <button class="btn">Изменить</button>
      </form>
    </div>
  </li>
`

showModal(modalCategory, btnShowModal)
closeModal(modalCategory, 'modalCategory')

formCategory.addEventListener('click', e => {
  e.preventDefault()
  if (e.target.tagName === 'BUTTON') {
    const dataFront = Object.fromEntries(new FormData(formCategory))
    fetch('/category', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(dataFront)
    })
      .then(dataBack => dataBack.json())
      .then(category => {
        console.log(category)
        categoryList.insertAdjacentHTML('beforeend', renderItem(category))
        modalCategory.classList.add('hide')
      })
      .catch(() => alert('Ошибка добавления категории'))
  }
  formCategory.reset()
})

categoryList.addEventListener('click', e => {
  if (e.target.tagName === 'SPAN' && e.target.textContent === 'Изменить') {
    const { parent, id } = parentBlock(e.target)
    const modalEdit = parent.querySelector('.modalCategoryEdit')
    modalEdit.classList.remove('hide')
    closeModal(modalEdit, 'modalCategoryEdit')
    parent.querySelector('.btn').addEventListener('click', (e) => {
      e.preventDefault()
      const formAdd = parent.querySelector('.modalCategoryEdit__form-edit')
      const dataFrontAdd = Object.fromEntries(new FormData(formAdd))
      fetch(`/category/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(dataFrontAdd)
      })
        .then(() => {
          modalEdit.classList.add('hide')
          window.location = '/category'
        })
        .catch(err => console.log(err))
    })
  }

  if (e.target.tagName === 'SPAN' && e.target.textContent === 'Удалить') {
    const { parent, id } = parentBlock(e.target)
    fetch(`/category/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json;charset=utf-8' }
    })
      .then(() => parent.remove())
      .catch(err => console.log(err))
  }
})
