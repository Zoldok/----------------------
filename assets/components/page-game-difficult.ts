import cards from './cards'
import { renderSelectionLevelGame } from './difficult-level-game-pages'

export function renderPageFirstLevelDifficulty(difficulty: any) {
    let memoryTimeoutId: any // добавляем переменную для идентификатора таймера
    let formattedTime: any
    const shuffledCards = shuffle([...cards, ...cards]) // удваиваем массив, чтобы получить пары карточек
    const app = document.querySelector('#app') as HTMLInputElement
    const appHtml = `
    <div class="contentGame center">
      <div class="content__game_game">
        <div class="timer">
          <span class="timer__label"></span>
          <span class="timer__value">00:00</span>
        </div>
        </div>
          <button id="restart-button" class="button button__restart">Начать заново</button>
        </div>
        <div class="content__box">
          <div class="cards">
            ${renderCards(difficulty, shuffledCards)}
          </div>
    </div>
  `
    app.innerHTML = appHtml

    const cardElements = document.querySelectorAll('.card')

    // cardElements.forEach((card) => {
    //     card.addEventListener('click', flipCard)
    // })
    cardElements.forEach((card) => {
        card.addEventListener('click', (event) =>
            flipCard(event, gameResult, timerInterval, formattedTime),
        )
    })

    const memoryTime = 5000

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

    const timerValue = document.querySelector(
        '.timer__value',
    ) as HTMLInputElement
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

    const restartButton = document.querySelector(
        '#restart-button',
    ) as HTMLInputElement
    restartButton.addEventListener('click', () => {
        clearInterval(timerInterval)
        clearTimeout(memoryTimeoutId)
        cardElements.forEach((card) => {
            card.classList.remove('flipped')
        })
        renderPageFirstLevelDifficulty(difficulty)
    })

    function renderCards(difficulty: any, cards: any) {
        const numCards = getNumCards(difficulty) * 2
        const selectedCards = cards.slice(0, Math.floor(numCards / 2))
        const duplicatedCards = [...selectedCards, ...selectedCards]
        const shuffledCards = shuffle(duplicatedCards)
        let cardsHtml = ''
        for (let i = 0; i < shuffledCards.length; i++) {
            const card = shuffledCards[i]
            const cardHtml = `
                <div class="card" data-card-name="${card.name}">
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

function shuffle(array: any) {
    let currentIndex = array.length,
        randomIndex

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        ;[array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ]
    }

    return array
}

function getNumCards(difficulty: any) {
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

let gameResult: any

function flipCard(
    event: any,
    timerInterval: any,
    formattedTime: any,
    gameResult: any,
) {
    const currentCard = event.currentTarget

    // Если карточка уже перевернута лицевой стороной вверх или уже перевернуто две карточки, ничего не делаем
    if (
        currentCard.classList.contains('flipped') ||
        document.querySelectorAll('.flipped').length === 2
    ) {
        return
    }

    currentCard.classList.toggle('flipped')

    const flippedCards = document.querySelectorAll('.flipped')

    if (flippedCards.length === 2) {
        const flippedCard1 = flippedCards[0]
        const flippedCard2 = flippedCards[1]

        if (
            (flippedCard1 as HTMLElement)?.dataset.cardName ===
            (flippedCard2 as HTMLElement)?.dataset.cardName
        ) {
            // Если карточки совпали, выводим сообщение о победе
            // alert('Вы победили!')
            gameResult = true
            let formattedTime =
                document.querySelector('.timer__value')?.textContent
            // alert(`Ваше время: ${formattedTime}`)
            // console.log(`${formattedTime}`)
            clearInterval(timerInterval)
            renderWinPage(gameResult, formattedTime)
        } else {
            // Если карточки не совпали, переворачиваем их рубашкой вверх через некоторое время
            gameResult = false
            let formattedTime =
                document.querySelector('.timer__value')?.textContent
            // alert(`Ваше время: ${formattedTime}`)
            // console.log(`${formattedTime}`)
            clearInterval(timerInterval)
            renderWinPage(gameResult, formattedTime)
            setTimeout(() => {
                flippedCards.forEach((card) => {
                    card.classList.toggle('flipped', false)
                })
            }, 1000)
        }
    }
}

function renderWinPage(gameResult: any, formattedTime: any) {
    const app = document.querySelector('#app') as HTMLInputElement
    const winPageHtml = `
    <div class="fin__page">
        <div class="window__fin_game">
            <div class="window__fin_game2">
                ${
                    gameResult
                        ? '<span class="window__fin_imgwin"></span>'
                        : '<span class="window__fin_imgconq"></span>'
                }
                <div class="window__fin_"> 
                    <p class="window__fin_text">${
                        gameResult ? 'Вы выиграли!' : 'Вы проиграли!'
                    }</p>
                </div> 
                <div class="window__fin_tex"> 
                    <p class="window__fin_text2">Затраченное время</p>
                    <div>
                    <p class="window__fin_time">${formattedTime}</p>  
                </div>          
                    <button id="restart-button2" class="button button__again ">Играть снова</button>
                </div>
            </div>
        </div>
    </div>
  `
    app.innerHTML = winPageHtml

    const reStartGame2 = document.querySelector(
        '#restart-button2',
    ) as HTMLInputElement

    reStartGame2.addEventListener('click', () => {
        reStartGameButton2()
    })

    function reStartGameButton2() {
        console.log(`Игра перезапущена`)
        renderSelectionLevelGame()
    }
}
