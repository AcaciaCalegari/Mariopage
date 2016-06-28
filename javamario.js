var myGamePiece; //essa variavel tem a ver com o personagem

function component(width, height, color, x, y, type) { // essa eh uma funcao com seis parametros diferentes e logo abaixo tem a definicao de cada um
    this.type = type;
    if (type == "image") { // se for do tipo img vai ser img.src, o q for escrito em color vai entrar em src
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.5;
    this.gravitySpeed = 0;
    this.bounce = 0.6; //eh o q faz o personagem quicar
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX; //velocidade do personagem
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom(); //define até onde o personagem pode cair,tipo um limite
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height; //aqui ta definindo a altura do canvas, reduzindo do tamanho do personagem
        if (this.y > rockbottom) {
            this.y = rockbottom;
           this.gravitySpeed = -(this.gravitySpeed * this.bounce);//isso tem a ver com o pulo e o limite do chao, o bounce e o pulo
        }
    }
}

function startGame() {
    myGamePiece = new component(16, 28, "mario3.jpg", 25, 200, "image");//pega o mygamepiece e iguala a um novo componente com os parametros dados
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 228;
        this.context = this.canvas.getContext("2d"); // aqui e o contexto pra saber se eh 2d ou 3d
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);//introduzindo antes do fechamento do body,logo apos a abertura do body entra isso aqui
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() { //evita deixar rastro qnd o persona anda
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}



function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
}

function accelerate(n) { //aqui define aceleracao do movimento e o (n)eh o parametro a ser estabelecido, da pra colocar direto no html o numero de aceleracao q o persona vai ter
    myGamePiece.gravity = n;
}

function movedown() {
    myGamePiece.speedY = 12; //velocidade q puxa o persona pro chao
}

function moveleft() { //move pra esquerda
    myGamePiece.speedX = -1; // vai dar -1 de velocidade pro x
}

function moveright() { //move pra direita
    myGamePiece.speedX = 1; // vai dar +1 de velocidade pro x
}

function clearmove() { //ta definindo q td vez q rolar movimento aquele ponto vai ser o ponto zero
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}
