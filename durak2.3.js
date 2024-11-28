window.addEventListener('load', main, false);

var image_urls = [];
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/09.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/10.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/11.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/12.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/13.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/14.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/15.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/16.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/17.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/18.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/19.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/20.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/21.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/22.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/23.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/24.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/25.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/26.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/27.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/28.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/29.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/30.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/31.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/32.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/33.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/34.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/35.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/00.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/01.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/02.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/03.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/04.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/05.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/06.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/07.gif');
image_urls.push('https://magiachisel.ru/Pictures/Karty/k04/08.gif');

card_shirt = new Image();
card_shirt.src = 'https://magiachisel.ru/Pictures/Karty/k04/37.gif';

images = [];
for (const url of image_urls) {
    var image = new Image();
    image.src = url;
    images.push(image);
}

var win = new Image();
win.src = 'https://i.ibb.co/G7YypnJ/a98a8cf8-73e8-4e3a-98a5-ae2a46e90567.jpg';

var lose = new Image();
lose.src = 'https://i.ibb.co/brmjFpD/480bb478-3983-4934-9c99-afc3a8e8e10d.jpg';

var background = new Image();  

background.src = 'https://img.freepik.com/premium-photo/green-poker-table_190083-11.jpg?w=900';
//background.src = 'https://catherineasquithgallery.com/uploads/posts/2023-02/1676568561_catherineasquithgallery-com-p-bogatii-zelenii-fon-103.jpg';  // Источник изображения, позаимствовано на хабре

function main() {

    var w= canvas_example.width;
    var h= canvas_example.height;
    var ctx = canvas_example.getContext('2d');

    var fps = 60;//кол-во кадров в секунду       
    var deltaTime = 100/fps;//задержка между кадрами в мс

    w_card = 100;
    h_card = 150;

    var w_nots = notification.width;
    var h_nots = notification.height;
    var nots = notification.getContext('2d');

    class Cards {
        constructor(suit, value, trump, image){
            this.suit = suit;
            this.value = value;
            this.trump = trump;

            this.image = image;
            this.cover = card_shirt;
            this.x=0;
            this.y=0;
        }

        draw(x, y, k) {
            this.x = x;
            this.y = y;
            if (k==1) {
                ctx.drawImage(this.image, x, y, w_card, h_card);
            } else {
                ctx.drawImage(this.cover, x, y, w_card, h_card);
            }
        }

        move(a, b, k=1) {
            var dx = a-this.x;
            var dy = b-this.y;
            var n = dx>=0 ? 0 : 1;
            var m = dy>0 ? 0 : 1;
            if (a != this.x || b != this.y) {
                ctx.clearRect(this.x, this.y, w_card, h_card);
                this.x += Math.abs(dx/dy)*Math.pow(-1, n);
                this.y += Math.pow(-1, m);
                this.draw(this.x, this.y, k);
            }
        }
    }

    //@@!!!БАЗОВЫЕ ФУНКЦИИ!!!@@

    var suits = ['heart','diamonds','spades', 'clubs'];
    var deck = []; //колода
    var hand_playable = []; //рука игрока
    var hand_npc = []; //рука бота
    var max_cards = 6;
    var max_value = 14;
    var min_value = 6;
    var table = []; //игральный стол
    var table2 = []; //второй стол для тех карт которыми отбиваются, то есть те которые лежат поверх
    var table_r = []; //стол-третий стакан
    var slot = 600; //место отведенное для расположения карт

    //отрисовка фона
    basedDraw = function() {
        ctx.clearRect(0, 0, w, h);  
        ctx.drawImage(background, 0, 0, w, h); 
    }
    basedDraw();

    //создание колоды
    function fill_deck(deck) {
        for (var j=0; j<suits.length; j++) {
            for (var i=0; i<9; i++) {
                deck.push(new Cards(suits[j], i+max_cards, 0, images[i+j*9]));
            }
        }
        for (var k=100; k>0; k--) {
            var t;
            b = Math.floor(Math.random()*35);
            c = Math.floor(Math.random()*35);
            t = deck[b];
            deck[b] = deck[c];
            deck[c] = t;
        }
        return deck;
        console.log('колода заполнена', deck);        
    }
    
    //отрисовка колоды
    function draw_deck() {
        if (deck.length)
            deck[0].draw(w-w_card*1.5, h/2-h_card/2-20, 1);
        if (deck.length>1) {
            for (var i=1; i<deck.length; i++){
                deck[i].draw(w-w_card, h/2-h_card/2, 0);
            }
        }
    }    

    //задание козырных карт
    function trumps(){
        main_trump = deck[0];
        for (var i = 0; i<deck.length; i++) {
            if (deck[i].suit == main_trump.suit) {
                deck[i].trump = 1;
            }
        }
        console.log('козырь', main_trump);
    }
    
    //заполнение руки
    function handful(hand) {
        if (deck.length > 0) {
            while (hand.length < max_cards) {
                if (deck.length > 0) 
                    hand.push(deck.pop());
                else
                    break;
            }
        }
        sorting(hand);
        console.log('рука', hand);
        console.log('длина оставшейся колоды', deck.length);
        return hand;
    }

    //сортировка карт в руке
    function sorting(hand) {
        var local_suits = [main_trump.suit];
        for (var i=0; i<suits.length; i++) {
            if (suits[i] != main_trump.suit) {
                local_suits.unshift(suits[i]);
            }
        }
        for (var j=0; j<local_suits.length; j++) {
            var third_glass = [];
            for (var i=0; i<hand.length; i++) {
                if (hand[i].suit == local_suits[j]) {
                    third_glass.push(hand[i]);
                }
            }
            var count_sorted = 0;
            while (count_sorted < third_glass.length-1){
                for (var i=0; i<third_glass.length-1; i++) {
                    if(third_glass[i].value>third_glass[i+1].value) {
                        var tmp = third_glass[i];
                        third_glass[i] = third_glass[i+1];
                        third_glass[i+1] = tmp;
                    }
                }
                count_sorted++;
            }
            for (var i=0; i<third_glass.length; i++) {
                hand.unshift(third_glass[i]);
            }
            third_glass = [];
        }
        var l = hand.length/2; 
        for (var i=0; i<l; i++) {
            hand.pop();
        }
        return hand;       
    }

    //отрисовка карт в руках
    function draw_hand(hand) {
        var y = 0;
        var k = 0;
        if (hand == hand_playable) {
            y = h-h_card;
            k = 1;
        }
        for (i=0; i<hand.length; i++)
            hand[i].draw(100+(slot/hand.length-w_card)/2+i*slot/hand.length, y, k);
    }

    //движение карты
    function movement(card, x, y, k=1) {
        var timer = setInterval(() => { 
            recovery_light();
            card.move(x, y);
            if ((card.x == x) && (card.y==y)) {
                clearInterval(timer);
                ctx.clearRect(0, 0, w, h);
                if (k) {
                    recovery();
                } else {
                    recovery_light();
                }
            }
        }, deltaTime);
    }

    //отрисовка всех карт на тех местах на которых они находятся в данный момент
    function recovery_light() {
        ctx.clearRect(0, 0, w, h);
        basedDraw();
        draw_deck();
        for(var i=0; i<table.length; i++){
            table[i].draw(table[i].x, table[i].y, 1);
        }
        for(var i=0; i<table2.length; i++){
            if (table2[i])
                table2[i].draw(table2[i].x, table2[i].y, 1);
        }
        for(var i=0; i<hand_npc.length; i++){
            hand_npc[i].draw(hand_npc[i].x, hand_npc[i].y, 0);
        } 
        for(var i=0; i<hand_playable.length; i++){
            hand_playable[i].draw(hand_playable[i].x, hand_playable[i].y, 1);
        }
    }

    //отрисовка всех карт на тех местах на которых они должны находиться в данный момент
    function recovery() {
        ctx.clearRect(0, 0, w, h);
        basedDraw();
        draw_hand(hand_playable);
        draw_hand(hand_npc);
        draw_deck();
        for(var i=0; i<table.length; i++){
            table[i].draw(i*(w_card+50)+100, (h-h_card)/2, 1);
        }
        for(var i=0; i<table2.length; i++){
            if (table2[i])
                table2[i].draw(i*(w_card+50)+100+20, (h-h_card)/2+20, 1);
        }
    }

    //определение кто ходит первым
    function firstmove(){
        var game_on = 0;
        for (var i=max_cards; i<max_value+1; i++) {
            for (var j=0; j<max_cards; j++) {
                if (hand_playable[j].trump == 1 && hand_playable[j].value == i) {
                    console.log(hand_playable[j], 'первым ходит игрок');
                    drawNots("ходите >:3");
                    first = 'player';
                    game_on = 1;
                }
                else if (hand_npc[j].trump == 1 && hand_npc[j].value == i) {
                    console.log(hand_npc[j], 'первым ходит npc');
                    drawNots("первым ходит противник >:(");
                    game_on = 1;
                    first = 'npc';
                }
            }
            if (game_on == 1)
                break;
        }
        if (game_on == 0) {
            console.log('первым ходит игрок');
            drawNots("ходите >:3");
            first = 'player';
        }
        return first; 
    }

    //сравнение карт
    function compare (card1, card2) {
        if (card1.suit == card2.suit && card1.value > card2.value) {
            canbeat = 1;
        } 
        else if (card1.trump == 1 && card2.trump == 0) {
            canbeat = 1;
        } 
        else {
            canbeat = 0;
        }
        return(canbeat);
    }

    //удаление карт которыми сходили
    function deletecard(hand, table){
        for (var i=0; i<hand.length; i++){
            for (var j=0; j<table.length; j++){
                if (hand[i] == table[j]){
                    if (i != hand.length-1){
                        for (var k=i; k<hand.length-1; k++){
                            hand[k]=hand[k+1];
                        }
                        hand.pop();
                        i=i-1;
                    }
                    else if (i == hand.length-1){
                        hand.pop();
                    }
                }
            }
        }
        return(hand);
    }

    //поднять все карты
    function takeall(hand){
        for (i=0; i<table2.length; i++) {
            if (table2[i])
                hand.push(table2[i])
        }
        hand = hand.concat(table);
        sorting(hand);
        console.log('берем все', ...hand);
        table = [];
        table2 = [];
        return hand;
    }

    //@!!!!ФУНКЦИИ ДЛЯ БОТА!!!!@

    //определение значения наименьшей карты у нпс   
    function mincard(){
        mincard_value = max_value+1;
        for (var i=0; i<hand_npc.length; i++){
            if (hand_npc[i].trump == 0){
                if (hand_npc[i].value < mincard_value){
                    mincard_value = hand_npc[i].value;
                }
            }
            else {
                mincard_value = hand_npc[hand_npc.length-1].value;
            }
        }
        return(mincard_value);
    }    

    //ход нпс
    function npc_move(){
        mincard();
        var have_non_trump = 0; //есть ли не козырная карта
        for (var i=0; i<hand_npc.length; i++){
            if(hand_npc[i].value == mincard_value && hand_npc[i].trump == 0 && table.length-table2.length<hand_playable.length){
                movement(hand_npc[i], table.length*(w_card+50)+100, (h-h_card)/2);
                table.push(hand_npc[i]);
                console.log('ход npc', hand_npc[i]);
                drawNots("противник ходит >:(");
                have_non_trump+=1;
            }
        }
        if (have_non_trump == 0){
            movement(hand_npc[hand_npc.length-1], table.length*(w_card+50)+100, (h-h_card)/2);
            table.push(hand_npc[hand_npc.length-1]);
            console.log('ход npc', hand_npc[hand_npc.length-1]);
            drawNots("противник ходит >:(");
        }
        deletecard(hand_npc, table);
        drawNots("отбивайтесь >:|");
        player_go = true;
        what_player_doing = 2; // игрок отбивается
    }
    
    //подкидывание нпс
    function npc_toss(){
        var npc_will_toss = 0;
        for (var i=hand_npc.length-1; i>-1; i--){
            for (var k=0; k<table2.length; k++){
                if(table2[k] && hand_npc[i].value == table2[k].value && hand_npc[i].trump == 0 && table.length<max_cards && hand_playable.length>table.length-table2.length) {
                    movement(hand_npc[i], table.length*(w_card+50)+100, (h-h_card)/2);
                    table.push(hand_npc[i]);
                    console.log('npc подкидывает', table[table.length-1]);
                    drawNots("противник подкидывает >:(");
                    npc_will_toss+=1;
                }
            }            
        }
        deletecard(hand_npc, table);
        table_r = [];

        if (beru == 1) {
            hand_playable = takeall(hand_playable);
            for (i=0; i<hand_playable.length; i++) 
                movement(hand_playable[i], 100+(slot/hand_playable.length-w_card)/2+i*slot/hand_playable.length, h-h_card, 0);
            console.log('была нажата кнопка беру, игрок забирает все, ход переходит npc');
            drawNots("вы забираете карты, ход переходит противнику :(");
            set2();
        } else if(npc_will_toss==0){
            table = [];
            table2 = [];
            console.log('игрок отбился, npc не подкинул, ход переходит игроку');
            set1();
        } else {
            what_player_doing = 2; // игрок отбивается
            player_go = true;
            console.log('игрок отбился, npc подкинул, игрок снова отбивается');
            drawNots("отбивайтесь >:|");
        }
        beru=0; 
    }

    //отбивание нпс
    var beat = 0;
    var hand_npc_copy = [];
    function npc_beatoff(){
        var have_necessary_card = 0;
        var gonna_beat = true;
        hand_npc_copy = [];
        for (i=0; i<hand_npc.length; i++) {
            hand_npc_copy.push(hand_npc[i])
        }
        for (var j=table2.length; j<table.length; j++){
            have_necessary_card = 0;
            for (var i=hand_npc.length-1; i>-1; i--){
                compare(hand_npc[i],table[j]);
                if (canbeat){
                    have_necessary_card+=1;
                    table_r.push(hand_npc[i]);
                    deletecard(hand_npc, table_r);
                    i=-1;
                }
            }
            if (have_necessary_card==0) {
                gonna_beat = false;
            }
        }
        if (gonna_beat) {
            console.log('npc отбивается', table_r);
            drawNots("противник может отбиться :(");
            beat = 1;
            for (i=0; i<hand_npc_copy.length; i++) {
                for (j=0; j<table_r.length; j++) {
                    if (hand_npc_copy[i] == table_r[j]) {
                        movement(hand_npc_copy[i], (j+table2.length)*(w_card+50)+100+20, (h-h_card)/2+20);
                    }
                }
            }
            for (var i=0; i<table_r.length; i++){
                table2.push(table_r[i]); 
            }
            drawNots("подкидывайте >:3");
        } else {
            console.log('npc берет');
            drawNots("противник берёт, подкидывайте ещё карт >:3");
            beat = 0;
        }
        table_r = [];
        console.log('игрок может подкидывать');
        player_go = true;
        what_player_doing = 1; // игрок подкидывает
    }

    //@!!!!НАДПИСИ!!!!@

    drawNots = function(phrase){
        nots.clearRect(0, 0, w_nots, h_nots);
        nots.drawImage(background, 0, 0, w, h);
        nots.textAlign = "center"
        nots.font = "40px Tahoma";
        nots.fillStyle = "white";
        nots.textBaseline = "middle";
        nots.fillText(phrase, w_nots/2, h_nots/2);
        nots.strokeStyle="black";
        nots.strokeText(phrase, w_nots/2, h_nots/2);
    }

    drawNots("для начала нажмите кнопку новая игра :)");

    //@!!!!КНОПКИ!!!!@

    but_pustbyot.onclick = function(){
        console.log('кнопка пусть бьет нажата');
        if ((table.length != table2.length) && ((what_player_doing==1 && beat==1)||(what_player_doing==0))){
            player_go = false;
            npc_beatoff();
        }
    }

    but_pas.onclick = function(){
        console.log('кнопка пас нажата');
        if (what_player_doing==1 && beat==0){
            console.log('npc забирает все, ход игрока');
            player_go = false;
            hand_npc = [];
            for (i=0; i<hand_npc_copy.length; i++) {
                hand_npc.push(hand_npc_copy[i]);
            }
            hand_npc_copy = [];
            hand_npc = takeall(hand_npc);
            for (i=0; i<hand_npc.length; i++) 
                movement(hand_npc[i], 100+(slot/hand_npc.length-w_card)/2+i*slot/hand_npc.length, 0);
            set1();
        }
        if (what_player_doing==1 && beat==1 && table.length==table2.length){
            console.log('игрок не подкинул, ход npc');
            player_go = false;
            table = [];
            table2 = [];
            set2();
        }
    }

    var beru = 0;
    but_beru.onclick = function(){
        console.log('кнопка беру нажата');
        if(what_player_doing==2) {
            beru = 1;
            player_go = false;
            npc_toss();
        }
    }

    but_newgame.onclick = function(){
        game_end();
        game_start();
    }

    //@@!!!ХОДЫ ИГРОКА!!!@@
    
    player_go = false;
    isPulling = false;

    var offsetX_old = 0;
    var offsetY_old = 0;
    var chosen_card; //номер карты которую игрок двигает в данный момент
    var bitten_card; //номер карты которую игрок хочет побить

    //what_player_doing, 0-ходит, 1-подкидывает, 2-отбивается
    var what_player_doing = 0;

    canvas_example.onmousedown = (e) => {
        if (player_go) {
            var click_x = event.offsetX;
            var click_y = event.offsetY;
            for (var i=0; i<hand_playable.length; i++) {
                if (click_x >= hand_playable[i].x && click_x <= hand_playable[i].x+w_card && click_y >= hand_playable[i].y && click_x <= hand_playable[i].x+h_card) {
                    isPulling = true;
                    chosen_card = i;
                    console.log('карта летит', hand_playable[i], isPulling);
                }
            }
        }
    }

    canvas_example.onmouseup = (e) => {
        console.log('карта прилетела', hand_playable[chosen_card]);
        isPulling = false;

        if (what_player_doing==0){
            console.log('ход игрока');
            if ((table.length<max_cards) && (hand_npc.length>table.length-table2.length) && (table.length==0 || hand_playable[chosen_card].value==table[0].value)) {
                movement(hand_playable[chosen_card], table.length*(w_card+50)+100, (h-h_card)/2);
                table.push(hand_playable[chosen_card]);
                deletecard(hand_playable, table);
                console.log('ходить можно');
            } else {
                movement(hand_playable[chosen_card], (100+(slot/hand_playable.length-w_card)/2+chosen_card*slot/hand_playable.length), h-h_card);
                console.log('ходить нельзя');
                drawNots("выберите карту получше >:(");
                setTimeout(() => {
                    drawNots("ходите >:3");
                }, "2000");
            }
        }

        else if (what_player_doing==1){
            console.log('подкидывание игрока');
            var can_toss = 0;
            for (i=0; i<table.length; i++) {
                if (table[i].value == hand_playable[chosen_card].value){
                    can_toss=1;
                }
            }
            for (i=0; i<table2.length; i++) {
                if (table2[i].value == hand_playable[chosen_card].value){
                    can_toss=1;
                }
            }
            if ((can_toss==1) && (table.length<max_cards) && (hand_npc.length>table.length-table2.length)) {
                movement(hand_playable[chosen_card], table.length*(w_card+50)+100, (h-h_card)/2);
                table.push(hand_playable[chosen_card]);
                deletecard(hand_playable, table);
                console.log('подкинуть можно');
            } else {
                movement(hand_playable[chosen_card], (100+(slot/hand_playable.length-w_card)/2+chosen_card*slot/hand_playable.length), h-h_card, 0);
                console.log('подкинуть нельзя');
                drawNots("выберите карту получше >:(");
                setTimeout(() => {
                    drawNots("подкидывайте >:3");
                }, "2000");
            }
        }

        else{
            console.log('отбивание игрока');
            for (var i=0; i<table.length; i++) {
                if (e.offsetX >= table[i].x && e.offsetX <= table[i].x+w_card && e.offsetY >= table[i].y && e.offsetY <= table[i].y+h_card) {
                    bitten_card = i;
                }
            }
            compare(hand_playable[chosen_card], table[bitten_card]);
            if(canbeat){
                movement(hand_playable[chosen_card], table[bitten_card].x+20, table[bitten_card].y+20);
                table2[bitten_card] = hand_playable[chosen_card];
                deletecard(hand_playable, table2);
                console.log('отбиться можно');
            } else {
                movement(hand_playable[chosen_card], (100+(slot/hand_playable.length-w_card)/2+chosen_card*slot/hand_playable.length), h-h_card, 0);
                console.log('отбиться нельзя');
                drawNots("выберите карту получше >:(");
                setTimeout(() => {
                    drawNots("отбивайтесь >:|");
                }, "2000");
            }
            for (i=0; i<table2.length; i++) {
                if (!table2[i])
                    return;
            }
            if (table2.length==table.length){
                npc_toss();
            }
        }
        chosen_card = NaN;
        bitten_card = NaN;
    }

    canvas_example.onmousemove = (e) => {
        if (player_go) {
            if (! isPulling) {
                for (i=0; i<hand_playable.length; i++) {
                    if (((hand_playable[i].x<=e.offsetX && e.offsetX<=hand_playable[i].x+w_card) && (hand_playable[i].y<=e.offsetY && e.offsetY<=hand_playable[i].y+h_card)) && ((hand_playable[i].x>offsetX_old || offsetX_old>hand_playable[i].x+w_card) || (hand_playable[i].y>offsetY_old || offsetY_old>hand_playable[i].y+h_card))){
                        movement(hand_playable[i], 100+(slot/hand_playable.length-w_card)/2+i*slot/hand_playable.length, h-h_card-20, 0);
                    }
                    if (((hand_playable[i].x<=offsetX_old && offsetX_old<=hand_playable[i].x+w_card) && (hand_playable[i].y<=offsetY_old && offsetY_old<=hand_playable[i].y+h_card)) && ((hand_playable[i].x>e.offsetX || e.offsetX>hand_playable[i].x+w_card) || (hand_playable[i].y>e.offsetY || e.offsetY>hand_playable[i].y+h_card))){
                        movement(hand_playable[i], 100+(slot/hand_playable.length-w_card)/2+i*slot/hand_playable.length, h-h_card, 0);
                    }
                }
                offsetX_old = e.offsetX;
                offsetY_old = e.offsetY;
            } else {
                hand_playable[chosen_card].draw(e.offsetX, e.offsetY, 1);
                recovery_light();
            }
        }
    }

    //@@!!!САМА ИГРА!!!@@

    function game_start(){
        basedDraw();
        fill_deck(deck);
        console.log('колода', deck);
        trumps();
        console.log('козырь', main_trump);
        handful(hand_playable);
        handful(hand_npc);
        console.log('рука1', hand_playable);
        console.log('рука2', hand_npc);        
        draw_deck();
        draw_hand(hand_npc);
        draw_hand(hand_playable);
        firstmove();
        console.log('первым ходит', first);
        if (first == 'player'){
            set1();
        } else {
            set2();
        }
    }

    function game_end(){
        ctx.clearRect(0, 0, w, h);
        basedDraw();
        deck = [];
        table = [];
        table2 = []; 
        table_r = [];
        hand_playable = [];
        hand_npc = [];
    }

    function set1(){
        console.log('игрок начинает ходить');
        drawNots("ходите >:3");
        if (deck.length) {
            handful(hand_npc);
            handful(hand_playable);
            recovery();
        }
        if (hand_npc.length == 0){
            console.log('выиграл бот');
            drawNots("вы проиграли :'(");
            game_end();
            setTimeout(() => {
                ctx.drawImage(lose, 0, 0, w, h);
            }, "4000");
            
        } else if (hand_playable.length == 0){
            console.log('выиграл игрок');
            drawNots("congratulations! <3");
            game_end();
            setTimeout(() => {
                ctx.drawImage(win, 0, 0, w, h);
            }, "4000");
            
        } else {
            player_go = true;
            what_player_doing = 0;
        }
    }

    function set2(){
        console.log('npc начинает ходить');
        drawNots("противник ходит >:(");
        if (deck.length) {
            handful(hand_playable);
            handful(hand_npc);
            recovery();
        }
        if (hand_playable.length == 0){
            console.log('выиграл игрок');
            drawNots("congratulations! <3");
            game_end();
            setTimeout(() => {
                ctx.drawImage(win, 0, 0, w, h);
            }, "4000");
        } else if (hand_npc.length == 0) {
            console.log('выиграл бот');
            drawNots("вы проиграли :'(");
            game_end();
            setTimeout(() => {
                ctx.drawImage(lose, 0, 0, w, h);
            }, "4000");
        } else {
            npc_move();
        }
    }
}