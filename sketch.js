//Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro /2;

//Velocidade da bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

//Player
let xPlayer = 5;
let yPlayer = 150;
let comprimentoPlayer = 10;
let alturaPlayer = 90;
let rounded = 10

//Oponente
let xOponente = 583;
let yOponente =150;
let comprimentoOponente = 10;
let alturaOponente = 90;
let velocidadeOponente;
let chanceDeErrar = 5;

//Pontos
let meusPontos = 0;
let pontosOponente = 0;

//sons
let padrao;
let ponto;
let trilha;


let colidiu = false


function setup() {
  createCanvas(600, 400);
  tilha.loop(0,1,0.2);
  
}
function bordas (){
  fill(255)
  rect (0,0,600,10)
}
function bottom(){
  fill(255)
  rect (0,390,600,10)
}

//Fonte
let myFont;


function draw() {
  background(0);
  mostraBolinha();
  movimentos();
  colisaobordas();
  mostraPlayer();
  movimentoPlayer();
  //colisaoPlayer();
  colisaoPlayerLib();
  mostraOponente();
  colisaoOponente();
  movimentaOponente();
  placar();
  marcaPonto();
  bordas();
  bottom();
  calculaChanceDeErrar();
}


function mostraBolinha(){
  circle (xBolinha,yBolinha, diametro);
}

function movimentos(){
  xBolinha += velocidadeXBolinha 
  yBolinha += velocidadeYBolinha
}

function colisaobordas(){
    if (xBolinha + raio> width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraPlayer(){
  rect(xPlayer, yPlayer, comprimentoPlayer, alturaPlayer, rounded);
}

function movimentoPlayer(){
  if (keyIsDown(87)) {
    yPlayer -= 5
  }
  if (keyIsDown(83)){
    yPlayer += 5
  }
  
  
yPlayer = constrain(yPlayer, 10, 298);
yOponente = constrain(yOponente, 10, 298);
}

function colisaoPlayer(){
  if (xBolinha - raio < xPlayer + comprimentoPlayer && yBolinha - raio < yPlayer + alturaPlayer && yBolinha + raio > yPlayer){
    velocidadeXBolinha *= -1
  }
}

function colisaoPlayerLib(){
colidiu = collideRectCircle(xPlayer, yPlayer, comprimentoPlayer, alturaPlayer, xBolinha, yBolinha, raio);
  if (colidiu){velocidadeXBolinha *= -1 
         padrao.play(0,1,0.1);}
 
}


function mostraOponente (){
    rect(xOponente, yOponente, comprimentoOponente, alturaOponente, rounded);

}

function colisaoOponente(){
  colidiu = collideRectCircle(xOponente, yOponente, comprimentoOponente, alturaOponente, xBolinha, yBolinha, raio);
  if (colidiu){velocidadeXBolinha *= -1
               padrao.play(0,1,0.1);}
  //padrao.play()
}

function movimentaOponente(){
   //if (keyIsDown(UP_ARROW)) {
   // yOponente -= 5
 // }
  //if (keyIsDown(DOWN_ARROW)){
  //  yOponente += 5
 // }
  
  
  velocidadeOponente = yBolinha - yOponente - comprimentoOponente /2 - 30;
 yOponente += velocidadeOponente+ chanceDeErrar
  calculaChanceDeErrar();
}

function placar(){
  textFont(myFont)
  textSize(40);
  textAlign(CENTER)
  fill(255)
  text(meusPontos,150,40)
  text(pontosOponente,450,40)
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos +=1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
}

function preload(){
  myFont = loadFont('Font/bit5x3.ttf')
  tilha = loadSound ('sounds/trilha.mp3')
  padrao = loadSound ('sounds/padrao.mp3')
  ponto = loadSound ('sounds/ponto.mp3')
}


function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}



function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}

