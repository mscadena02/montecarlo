const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const btnIniciar = document.getElementById('btnIniciar');
const btnReiniciar = document.getElementById('btnReiniciar');
const resultado = document.getElementById('resultado');
const numPuntos = document.getElementById('numPuntos'); 
const valorPuntos = document.getElementById('valorPuntos'); 
let count=0; // contador de puntos en el circulo
let intervalo = null;

// para dibujar circulo
ctx.beginPath();

// 2. Define el circulo: arc(centerX, centerY, radiusX, radiusY, startAngle, length)
ctx.arc(250, 250, 250, 0, Math.PI * 2);

// 3. borde y relleno
ctx.stroke(); 
ctx.fillStyle='Black';
ctx.fill(); 

numPuntos.addEventListener('input', function() {
  valorPuntos.textContent = numPuntos.value + ' puntos';
});

function generar_punto() {
  let x = Math.floor(Math.random() * canvas.width);
  let y = Math.floor(Math.random() * canvas.height);
  const distancia = Math.hypot(x - (canvas.width / 2), y - (canvas.height / 2));

  if (distancia <= 250) {
    // dibuja punto adentro
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2); // radio 2 para que sea un puntito pequeño
    ctx.fillStyle = 'cyan';  
    ctx.fill();
    return true;
  } else {
    // dibuja punto afuera
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2); 
    ctx.fillStyle = 'coral';   
    ctx.fill();
    return false;
  }
}

function calcularPi(dentros, total) {
  let piAprox = 4 * (dentros / total);
  resultado.textContent = 'π ≈ ' + piAprox.toFixed(5);
}

function simular() {
  let total = 0;
  let dentros = 0;
  const limite = parseInt(numPuntos.value); //parseInt para leer entrada de user de puntos

let intervalo = setInterval(function() {
    if (total >= limite) {
       clearInterval(intervalo); // para cuando llegó al límite
      return;
    }
    const adentro = generar_punto();
    total++;
    if (adentro) dentros++;
    calcularPi(dentros, total);
  }, 10);
}

function reiniciar() {
  clearInterval(intervalo);  // detiene la animación
  intervalo = null;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // redibujar el círculo porque clearRect borra todo
  ctx.beginPath();
  ctx.arc(250, 250, 250, 0, Math.PI * 2);
  ctx.stroke(); 
  ctx.fillStyle='Black';
  ctx.fill();
  // resetear el resultado
  resultado.textContent = 'π ≈ ?';
}

btnIniciar.addEventListener('click', simular);
btnReiniciar.addEventListener('click', reiniciar);

fetch('/guardar', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ puntos: total, pi: piAprox })
});




