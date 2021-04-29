const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const Ultimo_Nivel = 10

class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        this.siguienteNivel()
    }

    inicializar(){
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        this.toogleBtnEmpezar()
        this.nivel =1
        this.colores = {
          celeste,
          violeta,
          naranja,
          verde
        }
    }

    toogleBtnEmpezar() {
        if(btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide')
        } else {
            btnEmpezar.classList.add('hide')
        }
    }

    apagarColor(color) {
        this.colores[color].classList.remove('light')
    }

    generarSecuencia(){
      this.secuencia = new Array(Ultimo_Nivel).fill(0).map(n => Math.floor(Math.random() * 4))
    }
    
    siguienteNivel(){
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
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

    trasnformarColorANumero(color) {
        switch (color){
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }
    }

    iluminarSecuencia(){
        for(let i = 0; i < this.nivel; i++) {
            let color = this.trasnformarNumeroAColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), 1000 * i)
        }
    }

    iluminarColor(color) {
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color) , 350)
    }
    agregarEventosClick() {
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
    }

    eliminarEventosClick() {
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
    }

    elegirColor(ev){
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.trasnformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        if (numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++
            if (this.subnivel === this.nivel) {
                this.nivel++
                this.eliminarEventosClick()
                if (this.nivel ===(Ultimo_Nivel + 1)) {
                    this.ganoElJuego()
                }
                else{
                    setTimeout(this.siguienteNivel, 2000)
                    }
            }
        } else {
            this.perdioEljuego()
        }
    }

    ganoElJuego() {
        swal('Felicitaciones', '¡Ganaste!', 'success')
            .then(this.inicializar)
    }

    perdioEljuego() {
        swal('Lo lamento', '¡Has perdido!', 'error')
        .then(() => { 
            this.eliminarEventosClick()
            this.inicializar()
        })
    }
}

function empezarJuego () {
    window.juego = new Juego()
}