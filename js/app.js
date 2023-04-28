// ! CREAR VARIABLES
const formulario = document.querySelector('#agregar-gasto');
const listaGastos = document.querySelector('#list-group');

// ! CREAR EVENTOS

eventListeners();
function eventListeners() {
  document.addEventListener('DOMContentLoaded', preguntarPesupuesto);

  formulario.addEventListener('submit', agregarGasto);
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

  alertMessage(mensaje, tipo) {
    const divAlert = document.createElement('DIV');
    if (tipo === 'error') {
      divAlert.classList.add('errorAlert');
    } else {
      divAlert.classList.add('succesAlert');
    }

    divAlert.textContent = mensaje;

    //* AÑADIR AL HTML
    const buttonSubmit = document.querySelector('.btnSubmit');
    formulario.insertBefore(divAlert, buttonSubmit);

    //* QUITAR ALERT LUEGO DE 3 SEGUNDOS

    setTimeout(() => {
      divAlert.remove();
    }, 3000);
  }
}

// * INSTANCIAR CLASES

const ui = new UI();

let presupuesto;

// ! CREAR FUNCIONES

function preguntarPesupuesto() {
  //* CREAR VENTANA EMERGENTE PARA PEDIR PRESUPUESTO
  const presupuestoUsuario = prompt('Cuál es tú presupuesto?');

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

  //* PASAR CANTIDAD
  ui.definirPresupuesto(presupuesto);
}

function agregarGasto(e) {
  e.preventDefault();

  const gasto = document.querySelector('#gasto').value;
  const valor = document.querySelector('#cantidad').value;

  //* VALIDAR QUE NINGUN CAMPO ESTE VACIO
  if (gasto === '' || valor === '') {
    ui.alertMessage('Ambos campos son obligatorios', 'error');

    return;
  } else if (valor === null || isNaN(valor)) {
    ui.alertMessage('Valor Invalido', 'error');

    return;
  }
  ui.alertMessage('Añadiendo gasto..', 'succes');
}
