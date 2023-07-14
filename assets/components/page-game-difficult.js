import cards from './cards.js'

export function renderPageFirstLevelDifficulty(difficulty) {
    let memoryTimeoutId // добавляем переменную для идентификатора таймера

    const shuffledCards = shuffle([...cards, ...cards]) // удваиваем массив, чтобы получить пары карточек
    const app = document.querySelector('#app')
    const appHtml = `
    <div class="contentGame center">
      <div class="content__game_game">
        <div class="timer">
          <span class="timer__label"></span>
          <span class="timer__value">00:00</span>
        </div>
        </div>
          <button id="restart-button" class="button__level2 button__level_text ">Начать заново</button>
        </div>
        <div class="content__box">
          <div class="cards">
            ${renderCards(difficulty, shuffledCards)}
          </div>
    </div>
  `
    app.innerHTML = appHtml

    const cardElements = document.querySelectorAll('.card')
    cardElements.forEach((card) => {
        card.addEventListener('click', flipCard)
    })

    const memoryTime = getMemoryTime(difficulty)

    // Переворачиваем карточки рубашкой вверх
    cardElements.forEach((card) => {
        card.classList.add('flipped')
    })

    // Убираем класс flipped через заданный промежуток времени
    memoryTimeoutId = setTimeout(() => {
        cardElements.forEach((card) => {
            card.classList.remove('flipped')
        })
    }, memoryTime)

    const startTime = new Date().getTime()

    const timerValue = document.querySelector('.timer__value')
    const timerInterval = setInterval(() => {
        const currentTime = new Date().getTime()
        const elapsedTime = currentTime - startTime
        const minutes = Math.floor(elapsedTime / 60000)
        const seconds = Math.floor((elapsedTime % 60000) / 1000)
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(
            seconds,
        ).padStart(2, '0')}`
        timerValue.textContent = formattedTime
    }, 1000)

    const restartButton = document.querySelector('#restart-button')
    restartButton.addEventListener('click', () => {
        clearInterval(timerInterval)
        clearTimeout(memoryTimeoutId)
        cardElements.forEach((card) => {
            card.classList.remove('flipped')
        })
        renderPageFirstLevelDifficulty(difficulty)
    })

    function renderCards(difficulty, cards) {
        const numCards = getNumCards(difficulty) * 2
        const selectedCards = cards.slice(0, Math.floor(numCards / 2))
        const duplicatedCards = [...selectedCards, ...selectedCards]
        const shuffledCards = shuffle(duplicatedCards)
        let cardsHtml = ''
        for (let i = 0; i < shuffledCards.length; i++) {
            const card = shuffledCards[i]
            const cardHtml = `
    <div class="card">
      <div class="card__front">
        <img src="${card.front}" alt="">
      </div>
      <div class="card__back">
        <img src="${card.back}" alt="">
      </div>
    </div>
  `
            console.log(`Rendered card ${i}: ${card.front}`)

            cardsHtml += cardHtml
        }
        return cardsHtml
    }
}

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        // And swap it with the current element.
        ;[array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ]
    }

    return array
}

function getNumCards(difficulty) {
    switch (difficulty) {
        case 'easy':
            return 6
        case 'medium':
            return 12
        case 'hard':
            return 18
        default:
            return 6
    }
}

function getMemoryTime(difficulty) {
    switch (difficulty) {
        case 'easy':
            return 3000
        case 'medium':
            return 5000
        case 'hard':
            return 8000
        default:
            return 3000
    }
}

function flipCard(event) {
    event.currentTarget.classList.toggle('flipped')
}

// renderPageFirstLevelDifficulty('easy');
