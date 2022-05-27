var $start = document.querySelector('#start')//кнрпка у меня под id=start
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $result = document.querySelector('#result')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $gameTime = document.querySelector('#game-time')
var colors = ['#090979', '#794c09', '#00d4ff', '#ff0038', '#00ff0c']
var score = 0 //переменная для подсчета,  по умолчанию 0 
var isGameStartred = false


$start.addEventListener('click', startGame)
$game.addEventListener('click', handelBoxClick)
$gameTime.addEventListener('input', setGameTime)//слушаем событие input и вызываем функцию

function show ($el){
   $el.classList.remove('hide')
}

function hide ($el){
   $el.classList.add('hide')
}

function startGame (){ 
   score = 0
   //равноценнозаписаному ниже, но через фунлцию
   // $timeHeader.classList.remove('hide')//чтобы у нас при начале новой игры все приходило в изночальное положение
   // $resultHeader.classList.add('hide')
   setGameTime ()
   $gameTime.setAttribute('disabled', 'true')
   isGameStartred = true
   $game.style.backgroundColor = '#fff'
   hide($start)
   // $start.classList.add('hide') //обращаемся косписку стилей и добавляем событие из этого мписка(они прописаны с styles)
   var interval = setInterval (function(){
   var time = parseFloat($time.textContent)

   if (time<=0) {
      clearInterval(interval)//чтобы очещать интервал когла конц игрв
      endGame ()
   }else {
      $time.textContent = (time - 0.1).toFixed(1)
   }
   }, 100)
   renderBox()//присрабатывание  функции startGame будет вызыватся функция renderBox
}

function setGameScore () {
   $result.textContent = score.toString()
}

function setGameTime () {
   var time = +$gameTime.value//приведем к числу через + или функцию parseInt
   $time.textContent = time.toFixed (1)
   show($timeHeader)
   hide($resultHeader)
}

function endGame (){
   isGameStartred = false
   setGameScore ()
   $gameTime.removeAttribute('disabled',)
   show($start)
   // $start.classList.remove('hide')//обратиллись к спискуклассов  и отменили класс hide чтобы кнопка появилась
   $game.innerHTML = '' //пустая строка чтобыпропали квадраты
   $game.style.backgroundColor = '#ccc'//по окончанию игры вернуть  цвет
   //    $timeHeader.classList.add('hide')//при концу игры этот ID прячим
   //    $resultHeader.classList.remove('hide') //этот становится виден
   hide($timeHeader)
   show($resultHeader)
}

function handelBoxClick (event){
   if (!isGameStartred) {
      return
   }

   if (event.target.dataset.box) {
      renderBox ()  
      score++ //когда  будет происходитьвызов этой функции, будет ++ увеличивать на 1
   }

}


function renderBox (){
   
   $game.innerHTML = ''//чтобы очищалось  
   var box = document.createElement('div')
   var boxSize = getRandom(100, 30)
   var gameSize = $game.getBoundingClientRect()
   var maxTop = gameSize.height - boxSize
   var maxLeft = gameSize.width - boxSize
   var colorsRandIndex = getRandom(0, colors.length)
   

   box.style.height = box.style.width = boxSize + 'px'
   box.style.position = 'absolute'// положение в пределах этого квадрата
   box.style.background = colors[colorsRandIndex]
   box.style.top = getRandom(0, maxTop) + 'px'
   box.style.left = getRandom(0, maxLeft) + 'px'
   box.style.cursor = 'pointer '
   box.setAttribute('data-box', 'true') //так будемопределять чтопроизошел клик по квадрату. этим атребутом мы добавили div в блок game
   $game.insertAdjacentElement('afterbegin', box)// box будетсоздаватся и ложится в div $game  

}

function getRandom (min, max) {
   return Math.floor(Math.random()*(max - min)+min)//округляем в меньшуюсторону
}
 
