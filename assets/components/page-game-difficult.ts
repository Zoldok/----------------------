import cards from './cards'
import { renderSelectionLevelGame } from './difficult-level-game-pages'

export function renderPageFirstLevelDifficulty(difficulty: string) {
    // let memoryTimeoutId: ReturnType<typeof setTimeout> // добавляем переменную для идентификатора таймера
    let formattedTime: string
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
            flipCard(event, timerInterval, formattedTime),
        )
    })

    const memoryTime = 5000

    // Переворачиваем карточки рубашкой вверх
    cardElements.forEach((card) => {
        card.classList.add('flipped')
    })

    // Убираем класс flipped через заданный промежуток времени
   let memoryTimeoutId = setTimeout(() => {
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

    function renderCards(difficulty: string, cards: Array<string>) {
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

function shuffle(array: Array<any>) {
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

function getNumCards(difficulty: string) {
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

let currentCard: any = null
let previousCard: any = null
let isFlippingCards: boolean = false

function flipCard(
    event: any,
    timerInterval: any,
    formattedTime: string,
) {
    if (isFlippingCards) {
        // Игнорируем клики, если уже переворачиваем карты
        return
    }

    const card = event.currentTarget

    if (card.classList.contains('flipped')) {
        return
    }
    if (currentCard === null) {
        currentCard = card
        card.classList.toggle('flipped')
    } else if (previousCard === null && currentCard !== card) {
        previousCard = card
        card.classList.toggle('flipped')
        isFlippingCards = true
        const currentCardFront =
            currentCard.querySelector('.card__front img').src
        const previousCardFront =
            previousCard.querySelector('.card__front img').src
        if (currentCardFront === previousCardFront) {
            currentCard.isMatched = true
            previousCard.isMatched = true

            const allCards = document.querySelectorAll('.card')
            const allMatched = Array.prototype.slice
                .call(allCards)
                .every((card) => card.isMatched)
            if (allMatched) {
                // gameResult = true
                let formattedTime =
                    document.querySelector('.timer__value')?.textContent
                clearInterval(timerInterval)
                renderWinPage(formattedTime, true)
            }

            currentCard = null
            previousCard = null
            isFlippingCards = false
        } else {
            // gameResult = false
            let formattedTime =
                document.querySelector('.timer__value')?.textContent
            clearInterval(timerInterval)
            renderWinPage(formattedTime, false)
            setTimeout(() => {
                clearInterval(timerInterval)
                currentCard.classList.remove('flipped')
                previousCard.classList.remove('flipped')
                currentCard = null
                previousCard = null
                isFlippingCards = false
            }, 1000)
        }
    }
}

function renderWinPage(formattedTime: any, gameResult: boolean) {
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
