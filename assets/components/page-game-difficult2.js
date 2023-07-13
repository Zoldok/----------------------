export function renderPageFirstLevelDifficulty(difficulty) {
    const appHtml = `
        <div class="content__game2 center">
          <div class="content__game2_game">
            <div class="content__game2_timer">
              <span class="timer__label"></span>
              <span class="timer__value">00:00</span>
          </div>
          </div>
            <button id="restart-button" class="button__level button__level2 button__level_text ">Начать заново</button>
          </div>
            <div class="content__box">
              <div class="cards">
                <div class="memory-card">
                  <img class="front-face" src="/assets/img/card/img1.jpg" alt="React">
                </div>
            
                <div class="memory-card">
                  <img class="front-face" src="/assets/img/card/img2.jpg" alt="React">
                </div>
  
                <div class="memory-card">
                  <img class="front-face" src="/assets/img/card/img3.jpg" alt="React">
               </div>
          
                <div class="memory-card">
                  <img class="front-face" src="/assets/img/card/img4.jpg" alt="React">
                </div>
              
               <div class="memory-card">
                <img class="front-face" src="/assets/img/card/img5.jpg" alt="React">
               </div>
          
              <div class="memory-card">
                <img class="front-face" src="/assets/img/card/img6.jpg" alt="React">
              </div>
  
              <div class="memory-card">
                <img class="front-face" src="/assets/img/card/img7.jpg" alt="React">
             </div>
        
              <div class="memory-card">
                <img class="front-face" src="/assets/img/card/img8.jpg" alt="React">
              </div>
            
              <div class="memory-card">
               <img class="front-face" src="/assets/img/card/img9.jpg" alt="React">
              </div>
          
              <div class="memory-card">
                <img class="front-face" src="/assets/img/card/img10.jpg" alt="React">
              </div>
  
              <div class="memory-card">
                <img class="front-face" src="/assets/img/card/img11.jpg" alt="React">
              </div>
        
              <div class="memory-card">
                <img class="front-face" src="/assets/img/card/img12.jpg" alt="React">
              </div>
  
              <div class="memory-card">
                <img class="front-face" src="/assets/img/card/img13.jpg" alt="React">
              </div>
      
              <div class="memory-card">
                <img class="front-face" src="/assets/img/card/img14.jpg" alt="React">
              </div>
  
              <div class="memory-card">
                <img class="front-face" src="/assets/img/card/img15.jpg" alt="React">
              </div>
        
              <div class="memory-card">
                <img class="front-face" src="/assets/img/card/img16.jpg" alt="React">
                <img class="back-face" src="/assets/img/card/img-back.jpg" alt="Memory Card">
              </div>
            
              <div class="memory-card">
                <img class="front-face" src="/assets/img/card/img17.jpg" alt="React">
                <img class="back-face" src="/assets/img/card/img-back.jpg" alt="Memory Card">
              </div>
    
              <div class="memory-card">
                <img class="front-face" src="/assets/img/card/img18.jpg" alt="React">
                <img class="back-face" src="/assets/img/card/img-back.jpg" alt="Memory Card">
              </div>
  
              <div class="memory-card">
                <img class="front-face" src="/assets/img/card/img19.jpg" alt="React">
                <img class="back-face" src="/assets/img/card/img-back.jpg" alt="Memory Card">
            </div>
  
              <div class="memory-card">
                <img class="front-face" src="/assets/img/card/img20.jpg" alt="React">
                <img class="back-face" src="/assets/img/card/img-back.jpg" alt="Memory Card">
              </div>
            
              <div class="memory-card">
                <img class="front-face" src="/assets/img/card/img21.jpg" alt="React">
                <img class="back-face" src="/assets/img/card/img-back.jpg" alt="Memory Card">
              </div>
  
              <div class="memory-card">
                <img class="front-face" src="/assets/img/card/img22.jpg" alt="React">
                <img class="back-face" src="/assets/img/card/img-back.jpg" alt="Memory Card">
              </div>
  
              <div class="memory-card">
                <img class="front-face" src="/assets/img/card/img23.jpg" alt="React">
                <img class="back-face" src="/assets/img/card/img-back.jpg" alt="Memory Card">
              </div>
  
              <div class="memory-card">
                <img class="front-face" src="/assets/img/card/img24.jpg" alt="React">
                <img class="back-face" src="/assets/img/card/img-back.jpg" alt="Memory Card">
              </div>
              
              <div class="memory-card">
                <img class="front-face" src="/assets/img/card/img25.jpg" alt="React">
                <img class="back-face" src="/assets/img/card/img-back.jpg" alt="Memory Card">
              </div>
  
              <div class="memory-card">
                <img class="front-face" src="/assets/img/card/img26.jpg" alt="React">
                <img class="back-face" src="/assets/img/card/img-back.jpg" alt="Memory Card">
              </div>
  
              <div class="memory-card">
                <img class="front-face" src="/assets/img/card/img27.jpg" alt="React">
                <img class="back-face" src="/assets/img/card/img-back.jpg" alt="Memory Card">
            </div>
  
              <div class="memory-card">
                <img class="front-face" src="/assets/img/card/img28.jpg" alt="React">
                <img class="back-face" src="/assets/img/card/img-back.jpg" alt="Memory Card">
              </div>
  
              <div class="memory-card">
                <img class="front-face" src="/assets/img/card/img29.jpg" alt="React">
                <img class="back-face" src="/assets/img/card/img-back.jpg" alt="Memory Card">
              </div>
  
              <div class="memory-card">
                <img class="front-face" src="/assets/img/card/img30.jpg" alt="React">
                <img class="back-face" src="/assets/img/card/img-back.jpg" alt="Memory Card">
              </div>
  
              <div class="memory-card">
                <img class="front-face" src="/assets/img/card/img31.jpg" alt="React">
                <img class="back-face" src="/assets/img/card/img-back.jpg" alt="Memory Card">
              </div>
  
              <div class="memory-card">
                <img class="front-face" src="/assets/img/card/img32.jpg" alt="React">
                <img class="back-face" src="/assets/img/card/img-back.jpg" alt="Memory Card">
              </div>
  
              <div class="memory-card">
              <img class="front-face" src="/assets/img/card/img33.jpg" alt="React">
                <img class="back-face" src="/assets/img/card/img-back.jpg" alt="Memory Card">
              </div>
  
              <div class="memory-card">
                <img class="front-face" src="/assets/img/card/img34.jpg" alt="React">
                <img class="back-face" src="/assets/img/card/img-back.jpg" alt="Memory Card">
              </div>
  
              <div class="memory-card">
                <img class="front-face" src="/assets/img/card/img35.jpg" alt="React">
                <img class="back-face" src="/assets/img/card/img-back.jpg" alt="Memory Card">
              </div>
  
              <div class="memory-card">
                <img class="front-face" src="/assets/img/card/img36.jpg" alt="React">
                <img class="back-face" src="/assets/img/card/img-back.jpg" alt="Memory Card">
              </div>
            </div>
        </div>
      `;
    app.innerHTML = appHtml;
  }