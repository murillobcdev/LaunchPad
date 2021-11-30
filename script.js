// Função que "ouve" todas as teclas sendo pressionadas no corpo inteiro da página, e executa uma função baseada na tecla
document.body.addEventListener('keypress', (event) => {
    playSound(event.code.toLowerCase()); //toLowerCase transforma o codigo das teclas em minusculo para bater com o nome dos arquivos
});

// Função chamada pelo pressionar das teclas, responsável por converter o event.code recebido pela variável que identifica os sons.
function playSound(sound) {
    //Variáveis de Som
    let audioElement = document.querySelector(`#s_${sound}`);
    let keyElement = document.querySelector(`div[data-key="${sound}"]`);
    //Variavel para criação de um valor aleatorio de 6 digitos
    let randomColor = Math.floor(Math.random() * (100000 - 999999 + 1)) + 999999;


    if (audioElement) { //Verifica se o audioElement (arquivo na pasta relacionada) foi encontrada, e da play.
        audioElement.currentTime = 0; //Reduz o intervalo de play do audio, podendo ser tocado varias vezes em seguida
        audioElement.play();

    }
    if (keyElement) { //Verifica se audio foi encontrado e a determina como active pelo css. responsável por mudar a cor da tecla.
        keyElement.classList.add('active');
        keyElement.style.backgroundColor = `#${randomColor}`; //os 6 digitos sendo usado para adicionar um background aleatorio
        setTimeout(() => { //Depois de 100ms, retira a classe para dar efeito de animação.
            keyElement.classList.remove('active');
            keyElement.style.backgroundColor = 'black'; //retorna o background para preto
        }, 100);
    }
}

///////////////////////////////////Funções para Composição ////////////////////////////////////////////

document.querySelector('.composer button').addEventListener('click', () => { //Adiciona uma função ao botão de tocar composição
    let song = document.querySelector('#input').value; //Insere na variavel song as teclas digitadas do campo de texto composição
    if (song !== "") { // Verifica se o valor é diferente de vazio, SE sim
        let songArray = song.split(''); // a função .split é chamada para dividir as teclas uma das outras
        playComposition(songArray); //chamada a função playcomposition com o valor do campo, ja dividido em array
    }
});

function playComposition(songArray) { //função responsável por tocar a composição
    let wait = 0; //variavel wait (espera) determinada pelo valor do slide para ter intervalos durante a execução da composição
    for (let songKey of songArray) { //função for para cada ITEM/TECLA dentro da songArray
        setTimeout(() => {
            playSound(`key${songKey}`);
        }, wait);
        wait += 250;
        //a cada EXECUÇÃO de tecla, é adicionado o valor da variável WAIT que se inicia em 0, 
        // e vai contando de 250 a 250 por padrao, escalando para 500.. 750.. 1000.. para poder dar um intervalo entre o som de cada tecla.
    }
}

//Função extra: adicionar som de cliques nas teclas!
document.querySelectorAll(".key").forEach(element => { //seleciono todos os elementos com a classe .key e aplico uma função forEach em cada um deles
    element.addEventListener('click', () => {
        playSound(element.getAttribute('data-key'))
    })
})


