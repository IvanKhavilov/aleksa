// const wrapper = document.querySelector('.page__video')
// const playButton = document.querySelector('.play-button')
// const previewImage = wrapper.querySelector('img')

// // Добавление клика на кнопку
// playButton.addEventListener('click', () => {
//   // Заменяем содержимое div'а на iframe с видео
//   wrapper.innerHTML = `
//             <iframe width="560" height="315"
//               src="https://www.youtube.com/embed/42ilIgXhbjE?si=T82dTFe7y2IOPvG4"
//               title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
//             </iframe>
//         `
// })

function showModal() {
  const modal = document.getElementById('successModal')
  modal.style.display = 'flex'
  setTimeout(() => {
    modal.style.display = 'none'
  }, 4000)
}

function submitForm(selector) {
  let form = document.querySelector(selector)
  if (!form) return // Если форма не найдена, выходим

  form.addEventListener('submit', function (event) {
    event.preventDefault() // Останавливаем стандартную отправку

    let formData = new FormData(form)
    let submitBtn = form.querySelector('[type="submit"]')

    fetch(form.action, { method: form.method, body: formData })
      .then((response) => response.json()) // Ожидаем JSON-ответ
      .then((data) => {
        if (data.success === true) {
          form.reset() // Очищаем форму
          showModal()
        } else {
          alert(data.error || 'Ошибка при отправке формы. Попробуйте ещё раз.')
        }
      })
      .catch((error) => console.error('Ошибка запроса:', error))
  })
}

// Вызываем функцию для каждой формы
submitForm('.page__form')
