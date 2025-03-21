const wrapper = document.querySelector('.page__video')
const playButton = document.querySelector('.play-button')
const previewImage = wrapper.querySelector('img')

// Добавление клика на кнопку
playButton.addEventListener('click', () => {
  // Заменяем содержимое div'а на iframe с видео
  wrapper.innerHTML = `
            <iframe width="630" height="337" 
                    src="https://www.youtube.com/embed/UtZFmfL4hts?autoplay=1" 
                    title="YouTube video player" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    style="width: 100%; border-radius: 10px;" allowfullscreen>
            </iframe>
        `
})

function showModal() {
  const modal = document.getElementById('successModal')
  modal.style.display = 'flex'
  setTimeout(() => {
    modal.style.display = 'none'
  }, 5000)
}

function enableSubmitBtn() {
  document.querySelectorAll('[type="submit"]').forEach((btn) => {
    btn.disabled = false // Разблокируем все кнопки отправки
  })
}
function onloadCallback() {
  renderRecaptchas()
}
function renderRecaptchas() {
  if (typeof grecaptcha !== 'undefined') {
    document.querySelectorAll('.g-recaptcha').forEach((recaptcha) => {
      if (!recaptcha.hasAttribute('data-widget-id')) {
        let widgetId = grecaptcha.render(recaptcha, {
          sitekey: recaptcha.getAttribute('data-sitekey'),
        })
        recaptcha.setAttribute('data-widget-id', widgetId)
      }
    })
  } else {
    console.warn('grecaptcha не определён.')
  }
}
document.addEventListener('DOMContentLoaded', renderRecaptchas)
function resetAllRecaptchas() {
  if (typeof grecaptcha !== 'undefined') {
    document.querySelectorAll('.g-recaptcha').forEach((recaptcha) => {
      let widgetId = recaptcha.getAttribute('data-widget-id')
      if (widgetId) {
        grecaptcha.reset(widgetId)
      }
    })
  } else {
    console.warn('grecaptcha не определён.')
  }
}
function submitForm(selector) {
  let form = document.querySelector(selector)
  if (!form) return // Если форма не найдена, выходим

  form.addEventListener('submit', function (event) {
    event.preventDefault()

    let formData = new FormData(form)
    let submitBtn = form.querySelector('[type="submit"]')
    submitBtn.disabled = true // Блокируем кнопку, чтобы избежать повторных кликов

    fetch(form.action, { method: form.method, body: formData })
      .then((response) => response.json()) // Ожидаем JSON-ответ
      .then((data) => {
        if (data.success === true) {
          form.reset() // Очищаем форму
          // Сбрасываем все капчи
          resetAllRecaptchas()
          showModal()
        } else {
          alert(data.error || 'Ошибка при отправке формы. Попробуйте ещё раз.')
        }
      })
      .catch((error) => console.error('Ошибка запроса:', error))
      .finally(() => {
        submitBtn.disabled = false // Разблокируем кнопку
      })
  })
}

submitForm('.page__form')
