const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');

const diplayTempo = document.querySelector('#timer');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
/*const frase_contexto_negrito = document.querySelector('.app__title-strong');*/

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPause =new Audio('/sons/pause.mp3');
const audioBeep = new Audio('/sons/beep.mp3');

const startPauseBt = document.querySelector('#start-pause');
const mudarTextoBt = document.querySelector('#start-pause span');
let intervaloId = null;
let tempoDecorridoEmSegundos = 1500;

const tempoFoco = 1500;
const tempoCurto = 300;
const tempoLongo = 900;

const imagemDoBotao = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.getElementById('timer');

let pausado = false;

musica.loop = true;
musicaFocoInput.addEventListener('change', () => {
    if (musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
})

focoBt.addEventListener('click', ()=>{
/*    html.setAttribute('data-contexto', 'foco');
    banner.setAttribute('src', '/imagens/foco.png');
*/
    alterarContexto('foco')    
    focoBt.classList.add('active');
    curtoBt.classList.remove('active');
    longoBt.classList.remove('active');  
});

curtoBt.addEventListener('click', ()=>{
    alterarContexto('descanso-curto');    
    curtoBt.classList.add('active');
    longoBt.classList.remove('active');
    focoBt.classList.remove('active');
    
    /*html.setAttribute('data-contexto', 'descanso-curto');
    banner.setAttribute('src', '/imagens/descanso-curto.png');*/
})

longoBt.addEventListener('click', ()=>{
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
    curtoBt.classList.remove('active');
    focoBt.classList.remove('active');
    
    /*html.setAttribute('data-contexto', 'descanso-longo');
    banner.setAttribute('src', '/imagens/descanso-longo.png');*/
});

function alterarContexto(contexto){
    html.setAttribute('data-contexto',contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            tempoDecorridoEmSegundos = tempoFoco;
            if(pausado){
                iniciarOuPausar();
            }
            mostrarTempo();
            titulo.innerHTML = 'Otimize sua produtividade,<br> <strong class="app__title-strong">mergulhe no que importa.</strong>';            
            break;
        case 'descanso-curto':
            tempoDecorridoEmSegundos = tempoCurto;
            if(pausado){
                iniciarOuPausar();
            }
            mostrarTempo();
            titulo.innerHTML = 'Que tal dar uma respirada?<br> <strong class="app__title-strong">Faça uma pausa curta.</strong>';
            break;
        case 'descanso-longo':
            tempoDecorridoEmSegundos = tempoLongo;
            if(pausado){
                iniciarOuPausar();
            }
            mostrarTempo()
            titulo.innerHTML = 'Hora de voltar à superfície<br> <strong class="app__title-strong">Faça uma pausa longa.</strong>';
            break;
        default:
            break;
    }
}



const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        //audioBeep.play();
        alert('Tempo Finalizado');
        zerar();
        mudarTextoBt.textContent = 'Começar';
        imagemDoBotao.setAttribute('src', '/imagens/play_arrow.png');
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
    //console.log('Temporizador: ' + tempoDecorridoEmSegundos);
}

/* startPauseBt.addEventListener('click', contagemRegressiva);*/
startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    if(pausado){
        mudarTextoBt.textContent = 'Começar';
        imagemDoBotao.setAttribute('src', '/imagens/play_arrow.png');
        pausado = false;
        audioPause.play();
    } else{
        mudarTextoBt.textContent = 'Pausar';
        imagemDoBotao.setAttribute('src', '/imagens/pause.png')
        pausado = true;
        audioPlay.play();
    }

    if(intervaloId){
        zerar();
        return;
    }
    intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar(){
    clearInterval(intervaloId);
    intervaloId = null;
   // tempoDecorridoEmSegundos = 5;
}

function mostrarTempo(){
    const tempo = new Date( tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}


mostrarTempo(); // escopo global e a função fica aparecendo o tempo inteiro