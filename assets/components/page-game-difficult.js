export function renderPageFirstLevelDifficulty(difficulty) {
    const appHtml = `
      <div class="content center">
        <div class="content__game">
          <h1 class="content__game_h1">Уровень сложности: ${difficulty}</h1>
          <div class="content__box">
            <div class="cards">

            </div>
          </div>
          <button id="restart-button" class="button__level button__level_text ">Начать заново</button>
        </div>
      </div>
    `;
    app.innerHTML = appHtml;
}