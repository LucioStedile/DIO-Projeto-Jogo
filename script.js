const nave = document.querySelector('.nave');
const background = document.querySelector('.background');

const somUp = new Audio();
const somTema = new Audio();
somUp.src = './somPulo.wav';
somTema.src = './somTema.wav';
let isUp= false;
let position = 0;


function handleKeyUp(event){
    somTema.play();
    if(event.keyCode === 32){
        if(!isUp){
            up();
        }   
    }
}

function up(){
    isUp = true
    
    let upInterval = setInterval(() => {
        if(position >= 150){
            clearInterval(upInterval);
            //Desce
            let downInterval = setInterval(() => {
                if(position <= 10){
                    clearInterval(downInterval);
                    isUp = false;
                }else{
                    position -= 3;
                    nave.style.bottom = position + 'px';
                }
            }, 10);
        }else{
            //Sobe
            somUp.play();
            position += 40;
            nave.style.bottom = position + 'px';
        }   
    }, 40);
}

function createInimigo(){
    const inimigo = document.createElement('div');
    let inimigoPosition = 1000;
    let randomTime = Math.random() * 6000;

    inimigo.classList.add('inimigo');
    inimigo.style.left = 1000 + 'px';
    background.appendChild(inimigo);

    let leftInterval = setInterval(() => {
        if (inimigoPosition < -50) {
            clearInterval(leftInterval);
            background.removeChild(inimigo);
        }else if(inimigoPosition > 0 && inimigoPosition < 60 && position < 60){
            //Game-Over
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class ="game-over">Fim de Jogo</h1>'
        }else{
            inimigoPosition -= 10;
            inimigo.style.left = inimigoPosition + 'px';
        }
    },40)

    setTimeout(createInimigo, randomTime);
}

createInimigo();
document.addEventListener('keyup',  handleKeyUp);