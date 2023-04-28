// ! CREAR VARIABLES
const formulario = document.querySelector('#agregar-gasto');
const listaGastos = document.querySelector('#list-group');

// ! CREAR EVENTOS

eventListeners();
function eventListeners() {
  document.addEventListener('DOMContentLoaded', preguntarPesupuesto);
}

// ! CREAR CLASES

class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
    this.gasto = [];
  }
}

class UI {
  definirPresupuesto(cantidad) {
    const { presupuesto, restante } = cantidad;

    document.querySelector('#total').textContent = presupuesto;
    document.querySelector('#restante').textContent = restante;
  }
}

// * INSTANCIAR CLASES

const ui = new UI();

let presupuesto;

// ! CREAR FUNCIONES

function preguntarPesupuesto() {
  //* CREAR VENTANA EMERGENTE PARA PEDIR PRESUPUESTO
  const presupuestoUsuario = prompt('Cuál es tú presupuesto?');

  console.log(Number(presupuestoUsuario));

  //* VALIDAR VALORES AGREGADOS
  if (
    presupuestoUsuario === '' ||
    presupuestoUsuario <= 0 ||
    isNaN(presupuestoUsuario) ||
    presupuestoUsuario === null
  ) {
    window.location.reload();
  }

  //* INSTANCIAR PRESUPUESTO
  presupuesto = new Presupuesto(presupuestoUsuario);
  console.log(presupuesto);

  //* PASAR CANTIDAD
  ui.definirPresupuesto(presupuesto);
}
