
      

                    /*MODEL*/
                       //Функция рандома
                       function getRandomIntInclusive(min, max) {
                        min = Math.ceil(min);
                        max = Math.floor(max);
                        return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
                        }
                        //Рандом с исключением
            function randIntExcep(min, max, exp1, exp2, exp3, exp4) {                            
                    var num = Math.floor(Math.random() * (max - min + 1)) + min;
                    return (num === exp1 || num === exp2 || num === exp3 || num === exp4) ? randIntExcep(min, max, exp1, exp2, exp3, exp4) : num;
            }    
    
                                    /*Функция по созданию матрицы */
            function matrix(rows, cols, valStart, valEnd){
                var valStart; //Начало интервала значений
                var valEnd; // Конец интервала значений
                var arr = [];            
                // Creates all lines:
                for(var i=0; i < rows; i++){
                // Creates an empty line
                    arr.push([]);
                // Adds cols to the empty line:
                    arr[i].push( new Array(cols));
                for(var j=0; j < cols; j++){
                // Initializes:
                        //function to random            
                    arr[i][j] = getRandomIntInclusive(valStart, valEnd);
                   }
                }         
                return arr;         
            }                        
                            /*Функция по замене всех значний внутри матрицы на несовпадающие*/                                   
            function boardRandom(board,valStart, valEnd){                       
                for (var i=0; i<board.length;i++) {
                    for (var j=0; j<board.length; j++){
                       if (i == 0){ board[i][j] = randIntExcep(valStart, valEnd, board[i+1][j],board[i+1][j], board[i][j+1], board[i][j-1])}
                       else if (i == board.length-1){board[i][j] = randIntExcep(valStart, valEnd, board[i-1][j],board[i-1][j], board[i][j+1], board[i][j-1])}
                       else if (j == 0){board[i][j] = randIntExcep(valStart, valEnd, board[i-1][j],board[i-1][j], board[i+1][j], board[i][j+1])}
                       else if (j == board.length-1){board[i][j] = randIntExcep(valStart, valEnd, board[i-1][j], board[i-1][j], board[i+1][j], board[i][j-1])}
                       else 
                       {
                       board[i][j] = randIntExcep(valStart, valEnd, board[i-1][j], board[i+1][j], board[i][j+1], board[i][j-1]); //как назначить начало и конец рандома (0 и 8) в соответствии с матрицей?
                       } 
                    }
            }};
    
    
                        /*VIEW*/
                    
                        /*Функция для рисования строки таблицы*/
    
            function addTableTD(board){                                                         
                for (i=board.length-1; i>=0 ; i--){
                    if (j=board.length-1){document.getElementById('table').insertAdjacentHTML('afterbegin', '<div class ="td" id = "td_'+[i]+'"></div>');  /*РАБОТАЕТ ДЛЯ ТАБЛИЦЫ ДО 11*/
              }}}     
                      /*Функция для рисования ячеек таблицы*/
    
            function addTableTR(board){
                for (var i=board.length-1; i>=0 ; i--) {
                    for (var j=board.length-1; j>=0; j--){                                                                  
                            document.getElementById('td_'+[i]).insertAdjacentHTML('afterbegin', '<div id="jelly-'+[i]+[j]+'"><div class ="tr" id="'+[i]+[j]+'"><figure class="ball bubble"></figure></div></div>');
                            
              }
            }}
                        /*Функция для присваивания цвета каждой ячейке*/
            function addColorToMatrix(board){
            for (var i=0; i<board.length;i++) {
                    for (var j=0; j<board.length; j++){
            document.getElementById([i]+[j]).classList.add('color_'+board[i][j]);
            document.getElementById('jelly-'+[i]+[j]).classList.add('jelly'); //прикручиваем id jelly
            document.getElementById('jelly-'+[i]+[j]).addEventListener('click', jelly); // присваиваем функцию jelly при клике
            document.getElementById([i]+[j]).addEventListener('click', onClick);    //Присваиваем функцию при клике
                }}
            };
    
                    /*устанавливаем середну пустой*/
           function removeColorCenter(board){
            var lengthHalf = Math.floor(board.length/2);
            document.getElementById([lengthHalf]+[lengthHalf]).classList.remove('color_'+board[lengthHalf][lengthHalf]);
            document.getElementById([lengthHalf]+[lengthHalf]).classList.add('color_-1');
           }
    
                 /*Функция jelly чтобы тряслись наши кружки*/        
                    function jelly(){                
                    var  abox = document.getElementById(this.id);
                    var aboxClass = abox.firstElementChild.classList;
                    if (aboxClass.contains('color_-1') != true){          //проверка, какой цвет внутри. Если color_-1 - то эффект джелли не работает (чтобы не дрожжали прозрачные)                
                    abox.classList.remove("jelly");
                    function addFunc(){abox.classList.add("jelly")};
                    setTimeout(addFunc, 1);}
    }
    
         
                            /*Функция конца игры*/
    
        function endGame(){                
            var colorMeter = [0,0,0,0,0];  //счётчик цветов   
            var wpToEnd = 0;
            for (var i=0; i<playBoard.length;i++) {
            for (var j=0; j<playBoard.length; j++){
                for(var c=0; c<=4; c++){
                    if (document.getElementById([i]+[j]).classList.contains('color_'+c) == true) {colorMeter[c]=colorMeter[c]+1;};                
                    }}}             
                        /*считаем сколько осталось парных шариков*/
            for (var i=0;i<colorMeter.length; i++) {
                if (colorMeter[i]<=1){ wpToEnd=wpToEnd+1;}
            }
                   //Когда нет парных шариков - делаем сравнение очков                                      
            if (wpToEnd == 5 ) { 
                if (comparisonSumm[0] > comparisonSumm[1]){winner_0.classList.remove('hide'); winner_0.classList.add('winner')}
                else if (comparisonSumm[0] < comparisonSumm[1]) {winner_1.classList.remove('hide'); winner_1.classList.add('winner')}
                else {winner_draw.classList.remove('hide'); winner_draw.classList.add('winner')};            
                document.getElementById('table').classList.add('disable');   //Делаем неактивной таблицу с шариками
        }}
    
    
            
    
            function onClick() {
                
    
                    if(selectedTd == 1  || (selectedTd == 1 && this.id != selectedCell && this.classList.contains('color_-1') == false)) {   
                                           
                        selectedClassList = this.classList[1];
    
                        selectedCell = this.id;
                       
                        if (this.classList.contains('color_-1') == true){selectedTD =0} else { selectedTd = -1;};  //строка чтобы не выделялся цвет -1
    
                    } else if(selectedTd = -1 && 
                    //this.classList[1] != selectedClassList &&
                    this.classList[1] == 'color_-1' &&                
                    (Number(this.id) == Number(selectedCell) + 10 ||
                    Number(this.id) == Number(selectedCell) - 10 ||
                    Number(this.id) == Number(selectedCell) - 1 ||
                    Number(this.id) == Number(selectedCell) +1 )
                    ) {
                        //console.log(this.id);
                        document.getElementById(this.id).classList.remove(this.classList[1]);         //Ячейка, в которую мы передвинули лишилась своего цвета
                        document.getElementById(this.id).classList.add(selectedClassList);           //Ячейка, в которую мы передвинули стала цвета, как та ячейка, из которой двигали
                        document.getElementById(selectedCell).classList.remove(selectedClassList);   //Ячейка, которую мы перевинули лишилась цвета
                        document.getElementById(selectedCell).classList.add('color_-1');             //В Ячейке которую мы передвинули назначили белого цвета
                        selectedTd = 1;
    
                        //comparison(playBoard);   //считает совпадения
                        
                       /*Считает совпадения и присваивает значения -1 для ячейки с тем же цветом*/
                       
                        var cellUp = Number(this.id)-10;
                        var cellDown = Number(this.id)+10;
                        var cellLeft = Number(this.id)-1;
                        var cellRight = Number(this.id)+1;
                        var trueComparisonNear=1;   //Присвоили значение 1. Далее +1 за каждое совпадение. Итого будет 2 очка за 2 одинаковые ячейки и 3 очка за 3 одинаковые
                        
                            //Добавляем 0 к классу, чтобы в 1 строке получалось 01, 02 и т.д.
    
                        //var cellCelect = this.id ;
                        if (cellUp.toString().length <2){cellUp = '0'+cellUp};
                        if (cellDown.toString().length <2){cellDown = '0'+cellDown};
                        if (cellRight.toString().length <2){cellRight = '0'+cellRight};
                        if (cellLeft.toString().length <2){cellLeft = '0'+cellLeft};
                      
                     
                          //Далее я заменяю цвет каждой ячейки рядом совпадающей по цвету на -1 цвет                                       
                          var massBlowAround = function(cell){                          
                             function blow(){
                                document.getElementById(cell).classList.remove(classList); 
                                document.getElementById(cell).classList.add('blow')};    
                              setTimeout(blow, 100);
                               function removeColors(){
                                document.getElementById(cell).classList.remove('blow');
                                document.getElementById(cell).classList.add('color_-1');
                                };
                                
                            setTimeout(removeColors, 300);
                       }
    
                        if ((this.id.charAt(1) !=playBoard.length-1) && document.getElementById(this.id).classList[1] == document.getElementById(cellRight).classList[1] && document.getElementById(this.id).classList[1] != 'color_-1') {                        
                            classList = this.classList[1];         
                            massBlowAround(cellRight);    
                            trueComparisonNear++;                    
                        }
    
                            /*функция для взрыва вокруг*/
                       
    
                        if ((this.id.charAt() != 0) /*Если первый символ выделенной ячейки не равен нулю*/ && document.getElementById(this.id).classList[1] == document.getElementById(cellUp).classList[1] && document.getElementById(this.id).classList[1] != 'color_-1') {
                            
                            classList = this.classList[1];
                            massBlowAround(cellUp);           
                            trueComparisonNear++;             
                        }
                     
                        if ((this.id.charAt() != playBoard.length-1) && document.getElementById(this.id).classList[1] == document.getElementById(cellDown).classList[1] && document.getElementById(this.id).classList[1] != 'color_-1') {
                            classList = this.classList[1];
                            massBlowAround(cellDown);     
                            trueComparisonNear++;
                        }
    
                        if ((this.id.charAt(1) !=0) && document.getElementById(this.id).classList[1] == document.getElementById(cellLeft).classList[1] && document.getElementById(this.id).classList[1] != 'color_-1') {
                           
                            classList = this.classList[1];           
                            massBlowAround(cellLeft);          
                            trueComparisonNear++;              
                        }
    
                        if(trueComparisonNear >1 ){   //Если хотя бы одно совпадение найдено, то присваивает ячейке центральной цвет -1.
    
                            classList = this.classList[1];
                            var thisCell = this.id;
                            massBlowAround(thisCell); 
                            
                        comparisonSumm[p] = comparisonSumm[p]+trueComparisonNear;
                        document.getElementById('score-'+p).textContent = '';
                        document.getElementById('score-'+p).insertAdjacentText("beforeend", comparisonSumm[p]);
                                
                                changePlayer();
    
                        }  else {     changePlayer()};
                        
                        //console.log(comparisonSumm);
    
                        trueComparisonNear = 0;
                                  
                        if ((comparisonSumm[0]+comparisonSumm[1]+5) >= Math.pow(playBoard.length, 2)){setTimeout(endGame, 300);}                      
                    } else {                     
                       selectedTd = 1;                                                        
                    }            
                
                
    
        }

        //*Функция смены игрока

    function changePlayer(){
        if(p==0){p=1; 
        player_0.classList.toggle('active');
        player_1.classList.toggle('active');
        score_0.classList.toggle('active');
        score_1.classList.toggle('active'); } 
        else if(p==1){p=0;
         player_0.classList.toggle('active');
         player_1.classList.toggle('active');
         score_0.classList.toggle('active');
        score_1.classList.toggle('active'); }
    };
    
    
    var playBoard;
    var selectedTd  
    var selectedCell;
    var selectedClassList;
    var comparisonSumm; 
    var p; 
    var classList;
    
    /*UI*/
    var score_0 = document.getElementById('score-0');
    var score_1 = document.getElementById('score-1');
    var winner_0 = document.getElementById('winner-0');
    var winner_1 = document.getElementById('winner-1');
    var winner_draw = document.getElementById('winner-draw');
    var player_0 = document.getElementById('player-0');
    var player_1 = document.getElementById('player-1');
    var rules = document.getElementById('rules');
    var upMenu = document.getElementById('upMenu');
    
    function start(){   
            document.getElementById('table').innerHTML = '';
            document.getElementById('table').classList.remove('disable');
            upMenu.classList.remove('hide');
            score_0.textContent = '0';
            score_1.textContent = '0';
            winner_0.classList.add('hide');
            winner_1.classList.add('hide');
            winner_draw.classList.add('hide');
            winner_0.classList.remove('winner');
            winner_1.classList.remove('winner');
            winner_draw.classList.remove('winner');
            player_0.classList.add('active');
            player_1.classList.remove('active');
            score_0.classList.add('active');
            score_1.classList.remove('active');
            rules.classList.remove('hide');
    
            playBoard = matrix(7,7,0,4);
            boardRandom(playBoard, 0,4); 
            addTableTD(playBoard);
            addTableTR(playBoard);
            addColorToMatrix(playBoard);
            removeColorCenter(playBoard);
            selectedTd = 1;//переменная, если она = 1 , то будет считаться, что мы ждём первый клик, когда он произойдёт, функция onClick присвоит ей значение -1
            //и функция будет действовать по второму сценарию, после выполнения которого переменной вновь будет назначенино значение 1
            selectedCell ='';
            comparisonSumm = [0,0];// Счёт устанавливаем = 0
            p=0;//начинает 1 player
}
    
    
    
        