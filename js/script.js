const body = document.querySelector('body'); //ELEMENTOS DO DOM PARA SEREM MANIPULADOS NO JAVASCRIPT
const game = document.querySelector('.game'); //ELEMENTOS DO DOM PARA SEREM MANIPULADOS NO JAVASCRIPT
const count = document.querySelector("h1");   //ELEMENTOS DO DOM PARA SEREM MANIPULADOS NO JAVASCRIPT
const reset = document.querySelector("#reset"); //ELEMENTOS DO DOM PARA SEREM MANIPULADOS NO JAVASCRIPT
const ash = document.querySelector("#ash");      //ELEMENTOS DO DOM PARA SEREM MANIPULADOS NO JAVASCRIPT
const charmander = document.querySelector("#charmander");  //ELEMENTOS DO DOM PARA SEREM MANIPULADOS NO JAVASCRIPT
const pikachu = document.querySelector("#pikachu");   //ELEMENTOS DO DOM PARA SEREM MANIPULADOS NO JAVASCRIPT
const zubat = document.querySelector("#zubat"); //ELEMENTOS DO DOM PARA SEREM MANIPULADOS NO JAVASCRIPT

let findCharmander =false; //ELEMENTOS DO DOM PARA SEREM MANIPULADOS NO JAVASCRIPT
let findPikachu =false; //ELEMENTOS DO DOM PARA SEREM MANIPULADOS NO JAVASCRIPT
let findZubat =false; //ELEMENTOS DO DOM PARA SEREM MANIPULADOS NO JAVASCRIPT


//CRIANDO A CONSTANTE AUDIO, DANDO O VOLUME, PARA QUE POSSAM SER MANIPULADOS
const audio = document.querySelector("audio");
audio.volume = 0.1;
const musicControl = document.querySelector(".music-control");

// ATIVANDO E DESATIVANDO O SOM
musicControl.addEventListener('click', (event) => { //CRIANDO UM EVENTO DE ESCUTA QUANDO O USUÁRIO REALIZAR UM CLIQUE 
    event.stopPropagation(); // IMPEDE QUE O EVENTO SE PROPAGUE EM OUTROS ELEMENTOS DA DOM
    event.target.src = event.target.src.includes('on.png') ? './assets/icons/off.png' : './assets/icons/on.png';
    event.target.src.includes('on.png') ? audio.play() : audio.pause(); //configura um botão de controle de música que alterna entre ligar e desligar a música quando é clicado. 
    
    /*event.target :  se refere ao elemento que foi clicado
      SRC : Este é o atributo src do elemento que foi clicado. No contexto de um elemento de imagem, isso se refere ao caminho do arquivo de imagem.
     event.target.src.includes('on.png') : verifica se o caminho atual da imagem inclui o nome do arquivo 'on.png'. Se sim, significa que a música está ligada.
    event.target.src = ... : Esta linha reatribui o atributo src do elemento de imagem (musicControl) com um novo caminho de imagem. 
    Se a música estiver ligada (o nome do arquivo atual é 'on.png'), ele troca para o ícone de desligado ('./assets/icons/off.png').
    Se a música estiver desligada (o nome do arquivo atual não é 'on.png'), ele troca para o ícone de ligado ('./assets/icons/on.png').*/
});

//RESET

reset.addEventListener('click', () => {
    window.location.reload(); 
    reset.style.display-"none";
});
/*reset.addEventListener('click', ...) : Isso adiciona um ouvinte de evento de clique ao elemento referenciado por reset. 
 Quando esse elemento é clicado, a função especificada será executada.
 window.location.reload() : Isso atualiza a página atual. 
 reset.style.display = "none"; :  faz com que o elemento fique invisível na página após a recarga da página. */

//NÃO MOSTRAR OS POKEMONS QUANDO FINALIZADO O JOGO
function clearCharactersAndFinishGame () {
    ash.style.display = 'none' //faz com que os elementos fiquem ocultos na página, não sendo exibidos.
    pikachu.style.display = 'none' //faz com que os elementos fiquem ocultos na página, não sendo exibidos.
    charmander.style.display = 'none' //faz com que os elementos fiquem ocultos na página, não sendo exibidos.
    zubat.style.display = 'none'  //faz com que os elementos fiquem ocultos na página, não sendo exibidos.
    reset.style.display= "block"; //faz com que o botão de reset seja exibido na página
    count.textContent = " "; //limpa o texto exibido neste elemento.

}
//CONTAGEM DO TEMPO 
let currentCount = 60; //Esta variável será usada para armazenar o valor atual do contador regressivo.
const interval = setInterval (() =>{
    if(currentCount <= 0){
        game.style.backgroundImage = "url(./assets/game-over.jpg)";
        clearCharactersAndFinishGame();
        clearInterval(interval)
        return; //garante que nada mais seja executado dentro da função 

    }
    currentCount --;
    count.textContent = currentCount;



//setInterval() é uma função que executa uma determinada função a cada intervalo de tempo, Neste caso, a função será executada a cada 1000 milissegundos.
//o código verifica se o valor de currentCount é menor ou igual a zero. Se isso for verdadeiro, significa que o tempo acabou.
//Se o tempo tiver acabado, a imagem sera de game-over, os personagens sumirão da tela e o intervalo de tempo ira parar a contagem

}, 1000)

//FUNCIONALIDADE DE GANHAR O JOGO
function finishGame(){
if(findCharmander && findPikachu & findZubat) /* VERIFICA SE FORAM ENCONTRADO TODOS OS PERSONAGENS */ 
{
    clearCharactersAndFinishGame();
  const timeOut =  setTimeout(()=>{ //setTimeout é uma função JavaScript que é usada para executar um bloco de código após um determinado intervalo de tempo
     game.style.backgroundImage = "url(./assets/winner.jpg)"
     clearInterval(interval)
     clearTimeout(t)
     audio.pause(timeOut);

    },800)

   // CASO O USUÁRIO GANHE, OS PERSONAGENS SÃO APAGADOS DA TELA, A CONTAGEM E FINALIZADA E O AUDIO SERA PAUSADO 
}
}
// FUNÇÃO PARA MOVIMENTAÇÃO DO ASH
function getRightPosition() // OBTEM A POSIÇÃO HORIZONTAL DO ELEMENTO // 
{
    return parseInt(ash.style.right.split("px")) || 2; //PARSE INT= CONVERTE UMA STRING EM INT
    //Se o resultado da conversão para inteiro for NaN (não é um número), ele retorna 2 como valor padrão.
}

function getTopPosition() //OBTEM A POSIÇÃO VERTICAL DO ELEMENTO
  {
    return parseInt(ash.style.top.split("px")) || 2;
}

// ENCONTRANDO O POKEMON NA GRAMA E FAZENDO ELE SEGUIR O ASH
function verifyLookPokemon(to) {

finishGame(); 

 const pokemonRightPosition = to === 'ArrowLeft' ? `${getRightPosition() - 64} px ` : `${getRightPosition() +64} px`
 /* determina a nova posição horizontal do Pokémon com base na direção para onde o personagem está olhando (to). Se to for igual a 'ArrowLeft', 
 o Pokémon é movido para a esquerda, caso contrário, é movido para a direita.*/

 if(findCharmander){
    const newTopPosition = ( to ="ArrowUp"  ? `${getRightPosition() + 8 } px` : `${getRightPosition() - 8 } px`);
    charmander.style.right = pokemonRightPosition;
    charmander.style.top = newTopPosition;

 }

 if(findPikachu){
    const newTopPosition = ( to ="ArrowUp"  ? `${getRightPosition() + 8 } px` : `${getRightPosition() - 8 } px`);
    charmander.style.right = pokemonRightPosition;
    charmander.style.top = newTopPosition;


/*Estes blocos de código movem o Pokémon correspondente (Charmander ou Pikachu) para uma nova posição se ele já tiver sido encontrado 
(findCharmander ou findPikachu for verdadeiro).
 A nova posição é determinada pelas variáveis pokemonRightPosition e newTopPosition.*/
 }
    if (
        getTopPosition() >= 2 &&
        getTopPosition() <= 98 &&
        getRightPosition() >= 130 &&
        getRightPosition() <= 216
    ) {
        charmander.style.display = 'block';
        findCharmander=true;
        return;
    }

    if (
        getTopPosition() >= 474 &&
        getTopPosition() <= 594 &&
        getRightPosition() <= 138 &&
        getRightPosition() >= 42
    ) {
        zubat.style.display = 'block';
        findZubat=true;
        return;
    }
    if (
        getTopPosition() >= 266 &&
        getTopPosition() <= 394 &&
        getRightPosition() >=546 &&
        getRightPosition() <=650
    ) {
        pikachu.style.display = 'block';
        findPikachu=true;
        return;
    }

    //DEFININDO AS CONDIÇÕES PARA ENCONTRAR O PERSONAGEM, CASO ELE SEJA ENCONTRADO MUDARA SEU DISPLAY, PARA BLOCK
}

body.addEventListener('keydown', (event) => {
    event.stopPropagation(); /*KEYDOWN :  uma tecla for pressionada enquanto o foco estiver no corpo da página*/

    switch (event.code) {
        case 'ArrowLeft':
            if (getRightPosition() < 770) {
                ash.style.right = `${getRightPosition() + 8}px`;
                ash.src = './assets/left.png';
            }
            break;
        case 'ArrowRight':
            if (getRightPosition() > 2) {
                ash.style.right = `${getRightPosition() - 8}px`;
                ash.src = './assets/right.png';
            }
            break;
        case 'ArrowDown':
            if (getTopPosition() < 625) {
                ash.style.top = `${getTopPosition() + 8}px`;
                ash.src = './assets/front.png';
            }
            break;
        case 'ArrowUp':
            if (getTopPosition() > 2) {
                ash.style.top = `${getTopPosition() - 8}px`;
                ash.src = './assets/back.png';
            }
            break;
        default:
            break;

            //VERIFICA SE QUANDO APERTADO DETERMINADA TECLA, SE A CONDIÇÃO FOR VERDADEIRA 
             // A POSIÇÃO DO PERSONAGEM É AJUSTADA E A IMAGEM É ATUALIZADA PARA REFLETIR A DIREÇÃO DO MOVIMENTO. 
      
    }

    verifyLookPokemon(event.code); //event.code é usado para determinar qual ação deve ser executada com base na tecla pressionada. 
});
