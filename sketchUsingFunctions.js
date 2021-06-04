function Terrain() {
    // Como construimos nuestro mapa
    
    let mapa = [];
    return {
        init: function () {
            // Crear Arreglo de arreglos
            for (let index = 0; index < 10; index++) {
                mapa.push(new Array(10));
            }
            // asignar valores iniciales
            for (let fil = 0; fil < 10; fil++) {
                for (let col = 0; col < 10; col++) {
                    mapa[fil][col] = 0;
                }
            }
            // seleccionamos algunos [fila][col] --> y, x
            mapa[2][0] = 1;
            mapa[7][2] = 1;
            mapa[0][3] = 1;
            mapa[0][4] = 1;
            mapa[4][5] = 1;
            mapa[2][8] = 1;
            mapa[3][8] = 1;
            mapa[4][8] = 1;
            console.log(mapa)
        },
        show: function () {
            // pintamos basados en los valores de la matriz
            for (let fil = 0; fil < 10; fil++) {
                for (let col = 0; col < 10; col++) {
                    if (mapa[fil][col] === 0) {
                        fill(255);
                    } else if (mapa[fil][col] === 1) {
                        fill(0);
                    }
                    stroke(0);
                    rect(col * 40, fil * 40, 40, 40);
                }
            }
            //image(bckimage,0,0);
        },
        getValueLocation: function (nfil, ncol) {
            return mapa[nfil][ncol];
        }
    }
}

function Player() {
    let xPos; // pixeles
    let yPos; // pixeles
    let pjCol; // validamos el mapa en la matriz
    let pjFil; // validamos el mapa en la matriz
    let vidas;
    return {
        init: function () {
            pjCol = 5; // pixeles
            pjFil = 0; // pixeles
            xPos = (pjCol * 40) + 20; // validamos el mapa en la matriz
            yPos = (pjFil * 40) + 20; // validamos el mapa en la matriz
            vidas = 3;
        },
        reset: function () {
            pjCol = 5; // pixeles
            pjFil = 0; // pixeles
            xPos = (pjCol * 40) + 20; // validamos el mapa en la matriz
            yPos = (pjFil * 40) + 20; // validamos el mapa en la matriz

        },
        show: function (img) {
           fill(255, 0, 0);
           ellipse(xPos, yPos, 30, 30);
           //console.log(ImgPlayer);
           imageMode(CENTER);
           image(img, xPos, yPos);
           imageMode(CORNER);
        },
        updateLocation: function () {
            xPos = (pjCol * 40) + 20; // validamos el mapa en la matriz
            yPos = (pjFil * 40) + 20; // validamos el mapa en la matriz
        },
        getCol: function () {
            return pjCol;
        },
        getFil: function () {
            return pjFil;
        },
        setCol: function (newCol) {
            pjCol = newCol;
        },
        setFil: function (newFil) {
            pjFil = newFil;
        },
        getX: function () {
            return xPos;
        },
        getY: function () {
            return yPos;
        },
        getVida: function () {
            return vidas;
        },
        setVida: function (newVidas) {
            vidas = newVidas;
        },
        pvida: function () {
            console.log("funciona")
            this.setVida(this.getVida() - 1);
        },



    }
}

function Enemy() {
    let enemyPosX; // pixeles
    let enemyPosY; // pixeles
    let enemyCol; // validamos el mapa en la matriz
    let enemyFil; // validamos el mapa en la matriz
    let enemyDir;
    return {
        init: function () {
            enemyCol = 8; // validamos el mapa en la matriz
            enemyFil = 8; // validamos el mapa en la matriz
            enemyPosX = (enemyCol * 40) + 20; // pixeles
            enemyPosY = (enemyFil * 40) + 20; // pixeles
            enemyDir = 0; // 0L | 1R | 2U | 3D
        },
        show: function () {
            fill(0, 255, 0);
            ellipse(enemyPosX, enemyPosY, 30, 30);
        },
        move: function (mapReference) {
            if (frameCount % 60 == 0) {
                this.moveEnemy(mapReference);
            }
        },
        updateLocation: function () {
            enemyPosX = (enemyCol * 40) + 20; // pixeles
            enemyPosY = (enemyFil * 40) + 20; // pixeles
        },
        moveEnemy: function (mapReference) {
            let moving = false;
            switch (enemyDir) {
                case 0: // L
                    if (enemyCol - 1 >= 0) {
                        if (mapReference.getValueLocation(enemyFil, enemyCol - 1) === 0) {
                            enemyCol--; // validamos el mapa en la matriz  
                            moving = true;
                        }
                    }
                    break;
                case 1: // R
                    if (enemyFil + 1 < 10) {
                        if (mapReference.getValueLocation(enemyFil, enemyCol + 1) === 0) {
                            enemyCol += 1;
                            moving = true;
                        }
                    }
                    break;
                case 2: // U
                    if (enemyFil - 1 >= 0) {
                        if (mapReference.getValueLocation(enemyFil - 1, enemyCol) === 0) {
                            enemyFil -= 1;
                            moving = true;
                        }
                    }
                    break;
                case 3: // D
                    if (enemyFil + 1 < 10) {
                        if (mapReference.getValueLocation(enemyFil + 1, enemyCol) === 0) {
                            enemyFil += 1;
                            moving = true;
                        }
                    }
                    break;
            }

            if (!moving) {
                enemyDir = int(random(0, 4));
            }
            // 0L | 1R | 2U | 3D
            this.updateLocation();
        },
        getX: function () {
            return enemyPosX;
        },
        getY: function () {
            return enemyPosY;
        }
    }
}

function Coin() {
    let coinX;
    let coinY;
    //let coinX2;
   // let coinY2;
    let coinCol;
    let coinFil;
  //  let coinCol2;
  //  let coinFil2;
    let coinTrapped;
   
    return {
        
        init: function (pfil, pcol) {
            coinCol = pcol;
            coinFil = pfil;
           // coinCol2 = 5;
           // coinFil2 = 5;
            coinX = (coinCol * 40) + 20;
            coinY = (coinFil * 40) + 20;
           // coinX2 = (coinCol2 * 40) + 60;
           // coinY2 = (coinFil2 * 40) + 20;
           /*for (let coinCol = 0; fil < 10; coinCol++) {
            coinTrapped = false;*/
        },
        show: function () {
            if (!coinTrapped) {
                fill(255, 255, 0);
                ellipse(coinX, coinY, 15, 15)
                //ellipse(coinX2, coinY2, 15, 15);
            }
        },
       /* show: function () {
            if (!coinTrapped2) {
                fill(255, 255, 0);
                ellipse(coinX2, coinY2, 15, 15);
            }
        },*/
        
        getX: function () {
            return coinX;
        },
        getY: function () {
            return coinY;
        },
        /*getX2: function () {
            return coinX2;
        },*/
       /* getY2: function () {
            return coinY2;
        },*/
        setTrapped: function (newTrappedState) {
            coinTrapped = newTrappedState;
        },
       /* setTrapped2: function (newTrappedState2) {
            coinTrapped2 = newTrappedState2;
        }*/
    }
}

let imgBackground;
let ImgPlayer;
function preload(){
    imgBackground = loadImage("./data/mapa_fondo.png");
    ImgPlayer = loadImage("./data/Player.png");    
}

// lets use the constructor functions
const map = new Terrain(imgBackground);
const pj = new Player();
const enemy = new Enemy();
const coin = new Coin();
const coin2 = new Coin();
let pant

function setup() {
    createCanvas(400, 500);
    // init all instances with generic values
    map.init();
    pj.init();
    enemy.init();
    coin.init(5,5);
    coin2.init(5,6);
    pant = 0;
}



function draw() {
    switch (pant) {
        case 0:
            background(0);
            
            //map.show();
            image(imgBackground,0,0)
            pj.show(ImgPlayer);
            enemy.show();
            enemy.move(map);
            coin.show();
            coin2.show();
            verifyEnemy();
            if (pj.getVida() == 0) {
                pant = 1;
            }
            fill(255);
            text("Vidas: " +pj.getVida(),50,450)
            break;
        case 1:
            background(0);
            fill(255)
            text("Perdiste", 150, 150);
            break;
        case 3:
            background(255);
            fill(255)
            text("Perdiste", 150, 150);


            break;
    }
}

function keyPressed() {
    switch (key) {
        case 'a': // izquierda
            if (pj.getCol() - 1 >= 0) {
                if (map.getValueLocation(pj.getFil(), pj.getCol() - 1) === 0) {
                    pj.setCol(pj.getCol() - 1);
                }
            }
            break;
        case 'd': // derecha
            if (pj.getCol() + 1 < 10) {
                if (map.getValueLocation(pj.getFil(), pj.getCol() + 1) === 0) {
                    pj.setCol(pj.getCol() + 1);
                }
            }
            break;
        case 'w': // arriba
            if (pj.getFil() - 1 >= 0) {
                if (map.getValueLocation(pj.getFil() - 1, pj.getCol()) === 0) {
                    pj.setFil(pj.getFil() - 1);
                }
            }
            break;
        case 's': // abajo
            if (pj.getFil() + 1 < 10) {
                if (map.getValueLocation(pj.getFil() + 1, pj.getCol()) === 0) {
                    pj.setFil(pj.getFil() + 1);
                }
            }
            break;
    }
    pj.updateLocation();
    verifyItem();
    console.log(pj.getVida());
}


function verifyItem() {
    if (dist(pj.getX(), pj.getY(), coin.getX(), coin.getY()) < 5) {
        coin.setTrapped(true);
    }
    if (dist(pj.getX(), pj.getY(), coin2.getX(), coin2.getY()) < 5) {
        coin2.setTrapped(true);
    }
}

function verifyEnemy() {
    if (dist(pj.getX(), pj.getY(), enemy.getX(), enemy.getY()) < 5) {
        pj.pvida();
        coin.init(5,5);
        coin2.init(5,6);
        pj.reset();
        enemy.init();
    }
}