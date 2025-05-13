class Depredador extends Persona {
  constructor(x, y, juego) {
    super(x, y, juego);

    this.container.name = "depredador_" + this.id;

    //la idea seria despues que cada enemigo extienda de Depredador por ahora, solo hay uno.
    this.velocidadMaxima = 2;
    this.accMax = 0.32;
    this.valorFriccion = 0.95;
    this.danio = 1

    //esto es solo por ahora, para no editar la imagen
    this.hayQueRotarSprite = true
  }

  update() {
    // console.log("update depredador", this.id);
    super.update();

    // this.asignarFuerzaQueMeLlevaAlMouse();

    //this.presaMasCercana = this.verCualEsLaPresaMasCercana();

    //this.moverHaciaLaPresa();

    this.siEstoyMuyCercaMeComoALaPresaMasCercana();
    this.acercarseAlJugdor()
  }

    acercarseAlJugdor(){
    const difX = this.juego.protagonista.x - this.x
    const difY = this.juego.protagonista.y - this.y

    const angulo = Math.atan2(difY, difX);

    const factor = 0.3;
    const x = Math.cos(angulo) * factor;
    const y = Math.sin(angulo) * factor;
    this.aplicarAceleracion(x, y);
  }

  siEstoyMuyCercaMeComoALaPresaMasCercana() {
    const difX = this.juego.protagonista.x - this.x;
    const difY = this.juego.protagonista.y - this.y;

    const dist = calcularDistancia(difX, difY);
    if (dist < 30) {
      this.hacerDanio(this.juego.protagonista)
    }
  }

  hacerDanio(presa){
    presa.recibirDanio(this.danio)
  }

  moverHaciaLaPresa() {
    // let dx = presa.x - depredador.x;
    // let dy = presa.y - depredador.y;
    // let angulo = Math.atan2(dy, dx); // da el ángulo en radianes

    const difX = this.presaMasCercana.x - this.x;
    const difY = this.presaMasCercana.y - this.y;

    const angulo = Math.atan2(difY, difX); // da el ángulo en radianes

    const factor = 0.3;
    const x = Math.cos(angulo) * factor;
    const y = Math.sin(angulo) * factor;
    this.aplicarAceleracion(x, y);
  }

  verCualEsLaPresaMasCercana() {
    //cada depredador "mira a su alrededor" y determina cual es la presa mas cercana.
    let distMinima = 999999999;
    let cual = -1;
    const cantidadDePresas = this.juego.presas.length;
    for (let i = 0; i < cantidadDePresas; i++) {
      const presa = this.juego.presas[i]; //esto es cada presa
      //distancia entre yo, depredador y esta presa
      const dist = calcularDistancia(this.x - presa.x, this.y - presa.y);

      if (dist < distMinima) {
        cual = i;
        distMinima = dist;
      }
    }

    return this.juego.presas[cual];
  }

  //obviamente hay que cambiar esto porque ta asi noma'
  cambiarDeSpriteSegunVelocidad() {
    const name = "enemigo1" // la idea seria que const seria this.name y despues modificar 
    //la logica de abajo para que cada entidad/persona sepa que animacion asignarse
    if (this.calcularVelocidadLineal() > 0) {
      this.cambiarSpriteAnimado(name+"/walk");
    } else {
      this.cambiarSpriteAnimado(name+"/walk");
    }
  }
}
