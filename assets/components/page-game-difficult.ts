import cards from './cards'
import { renderSelectionLevelGame } from './difficult-level-game-pages'

export let formattedTime: string

export function renderPageFirstLevelDifficulty(
    difficulty: string,
    formattedTime: string,
) {
    const shuffledCards = shuffle([...cards, ...cards]) 
    const app = document.querySelector('#app') as HTMLInputElement
    const appHtml = `
    <div class="content__game_display">
        <div class="content__game_header center">
        <div class="content__game_head">
            <div class="content__game_timer">
                <span class="timer__label"></span>
                <span class="timer__value">00:00</span>
            </div>

            <div id="myModal2" class="window__fin center modal">
                <div class="window__fin_game">
                    <div class="window__fin_game2">
                        <span id="myModal3"                     class="window__fin_img">
                        </span>

                        <div class="window__fin_"> 
                            <p class="window__fin_text">текст победы</p>
                        </div> 
                        <div class="window__fin_"> 
                            <p class="window__fin_text2">Затраченное время</p>
                        </div> 
                        <div class="window__fin_"> 
                            <p class="window__fin_time">formattedTime</p>
                        </div> 
                        
                        <button id="restart-button2" class="button button__again ">Играть снова</button>
                    </div>
                </div>
            </div>

            <div>
             <button id="restart-button" class="button button__restart">Начать заново</button>
             </div>
             </div>
            <div class="content__box">
            <div class="cards">
                ${renderCards(difficulty, shuffledCards)}
            </div>
            </div>
        </div>
    </div> 
  `
    app.innerHTML = appHtml

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

    const cardElements = document.querySelectorAll('.card')

    cardElements.forEach((card) => {
        card.addEventListener('click', (event) =>
            flipCard(event, timerInterval, formattedTime),
        )
    })

    const memoryTime = 5000

    cardElements.forEach((card) => {
        card.classList.add('flipped')
    })

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
        renderPageFirstLevelDifficulty(difficulty, formattedTime)
    })

    interface Card {
        name: string;
        front: string;
        back: string;
      }

    function renderCards(difficulty: string, cards: Card[]) {
        const numCards = getNumCards(difficulty) * 2
        const selectedCards = cards.slice(0, Math.floor(numCards / 2))
        const duplicatedCards = [...selectedCards, ...selectedCards]
        const shuffledCards: Card[] = shuffle(duplicatedCards)
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

function shuffle<T>(array: Array<T>): Array<T>{
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

interface CardElement extends HTMLElement {
    isMatched: boolean
}
let currentCard: CardElement | null = null
let previousCard: CardElement | null = null

function flipCard(
    event: Event,
    timerInterval: ReturnType<typeof setTimeout>,
    formattedTime: string,
) {
    const card = event.currentTarget as CardElement

    if (card.classList.contains('flipped')) {
        return
    }
    if (currentCard === null) {
        currentCard = card
        card.classList.toggle('flipped')
    } else if (previousCard === null && currentCard !== card) {
        previousCard = card
        card.classList.toggle('flipped')
        // isFlippingCards = true
        const currentCardFront = currentCard
            .querySelector('.card__front img')
            ?.getAttribute('src')
        const previousCardFront = previousCard
            .querySelector('.card__front img')
            ?.getAttribute('src')
        if (currentCardFront === previousCardFront) {
            currentCard.isMatched = true
            previousCard.isMatched = true

            const allCards = document.querySelectorAll('.card')
            const allMatched = Array.prototype.slice
                .call(allCards)
                .every((card) => card.isMatched)
            if (allMatched) {
                let formattedTime =
                    document.querySelector('.timer__value')?.textContent
                clearInterval(timerInterval)
                if (formattedTime) {
                    showModal(formattedTime, true)
                }
            }

            currentCard = null
            previousCard = null
        } else {
            let formattedTime =
                document.querySelector('.timer__value')?.textContent
            clearInterval(timerInterval)
            if (formattedTime) {
                showModal(formattedTime, false)
            }
            setTimeout(() => {
                currentCard = null
                previousCard = null
            }, 1000)
        }
    }
}

function showModal(formattedTime: string, gameResult: boolean) {
    const modal = document.getElementById('myModal2') as HTMLElement
    modal.style.display = 'block'

    const modalTimeElement = modal.querySelector(
        '.window__fin_time',
    ) as HTMLElement
    modalTimeElement.textContent = formattedTime

    const modalTextElement = modal.querySelector(
        '.window__fin_text',
    ) as HTMLElement
    modalTextElement.textContent = gameResult ? 'Вы выиграли!' : 'Вы проиграли!'

    const modalElement = document.getElementById('myModal3') as HTMLElement
    modalElement.classList.toggle('window__fin_imgwin', gameResult)
    modalElement.classList.toggle('window__fin_imgconq', !gameResult)
}
