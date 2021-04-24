const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')

class Juego {
    constructor() {
        this.inicializar()
        this.generarSecuencia()
        this.siguienteNivel()
    }

    inicializar(){
        btnEmpezar.classList.add('hide')
        this.nivel = 1
        this.colores = {
          celeste,
          violeta,
          naranja,
          verde
        }
    }

    apagarColor(color) {
        this.colores[color].classList.remove('light')
    }

    generarSecuencia(){
      this.secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4))
    }
    
    siguienteNivel(){
        this.iluminarSecuencia()
    }
    
    trasnformarNumeroAColor(numero) {
        switch (numero){
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }

    iluminarSecuencia(){
        for(var i = 0; i < this.nivel; i++) {
            var color = this.trasnformarNumeroAColor(this.secuencia[i])
            this.iluminarColor(color)
        }
    }

    iluminarColor(color) {
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color) , 350)
    }
}

function empezarJuego () {
    window.juego = new Juego()
}