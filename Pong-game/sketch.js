//sempre a primeira letra da variavel e minuscula
// não usa acento nas variaveis
//mudança de teste pra Git hub
//mudança na WEB


let chanceErrar = 0;
// sons do jogo
let raquetada;
let ponto;
let trilha;
//Variveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro/2;

//variaveis da raquete
let xRaquete = 10;
let yRaquete = 150;

//altura e comprimento raquete
let widthRaquete = 10 //comprimento = w = width
let heigthRaquete = 90 //altura = h = heigth

//variaveis da RaqueteJ2
let xJ2Raquete = 580;
let yJ2Raquete = 150;
let velocidadeRaqueteJ2;
//variavel de colidir
let colisao = false;

//Velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//placar jogo
let pontoJ1 = 0;
let pontoJ2 = 0;


function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentoBolinha();
  verificaColisaoBorda();
  criarRaquete(xRaquete,yRaquete);
  criarRaquete(xJ2Raquete,yJ2Raquete);
  //criarRaqueteJ2()
  movimentoJ1Raquete();
  //movimentoJ2Raquete();
  //movimentoJ2RaqueteIA();
  //colisaoBolinhaRaquete();
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  colisaoRaqueteBiblioteca(xJ2Raquete, yJ2Raquete);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  //circle(posição no eixo X, posição no eixo Y, tamanho do diamentro)
  circle(xBolinha,yBolinha,diametro);
}

function movimentoBolinha(){
  xBolinha += velocidadeXBolinha;
  // += para acrescenta valor no Xbolinha.
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  //se etiver tocando a borda
  if(xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  
  if(yBolinha + raio > height || yBolinha - raio < 0){
     velocidadeYBolinha *= -1;
     }
}

function criarRaquete(x,y){
  rect(x,y,widthRaquete,heigthRaquete);
}
//function criarRaqueteJ2(){
 // rect(xJ2Raquete,yJ2Raquete,widthRaquete,heigthRaquete);
//}

function movimentoJ1Raquete(){
  //palavra reservada, deve ser escrito da mesma forma que a documentação
  if(keyIsDown(UP_ARROW)){
    yRaquete -=10;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete +=10;
  }
}

function calculaChanceDeErrar(){
  if(pontoJ2 >= pontoJ1){
    chanceErrar += 1;
    if(chanceErrar >= 39){
      chanceErrar = 40
    }
  }else{
    chanceErrar -= 1;
    if(chanceErrar <= 35)
      chanceErrar = 35
  }
}

function movimentoJ2RaqueteIA(){
  velocidadeRaqueteJ2 = yBolinha - yJ2Raquete - widthRaquete/2 - 30;
  yJ2Raquete += velocidadeRaqueteJ2 + chanceErrar
  calculaChanceDeErrar()
}

function movimentoJ2Raquete(){
   if(keyIsDown(87)){
    yJ2Raquete -=10;
  }
  if(keyIsDown(83)){
    yJ2Raquete +=10;
  }
}

function colisaoBolinhaRaquete(){
  //necessita verificar a posição também (x e y da raquete) para funciona de forma correta o código, pois nesse caso sempre que essa condição for verdadeira vai acotnecer, n colidindo com a borda mais.
  if(xBolinha - raio < xRaquete + widthRaquete && yBolinha - raio < yRaquete + heigthRaquete && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
  }
}


function colisaoRaqueteBiblioteca(x,y){
  colisao = collideRectCircle(x, y, widthRaquete, heigthRaquete, xBolinha, yBolinha, raio)
  if (colisao){
    velocidadeXBolinha *= -1
    raquetada.play();
  }
}

function incluiPlacar(){
  stroke(255); //contorno
  textAlign(CENTER); // alinha texto
  textSize(18); // tamanho do texto
  fill('orange'); // pintar geral
  rect(150,10,40,20); 
  fill('white');
  text(pontoJ1,170,26); // texto
  fill('orange');
  rect(450,10,40,20);
  fill('white');
  text(pontoJ2,470,26);
}

function marcaPonto(){
  if(xBolinha>590){
    pontoJ1 += 1;
    ponto.play();
     }
  if(xBolinha < 10){
    pontoJ2 += 1;
    ponto.play();
  }
}

function preload(){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}
