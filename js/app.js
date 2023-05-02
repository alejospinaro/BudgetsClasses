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
    this.gastos = [];
  }

  arrayGastos(gasto) {
    this.gastos = [...this.gastos, gasto];

    this.calcularRestante();
  }

  calcularRestante() {
    const gastado = this.gastos.reduce(
      (total, gasto) => total + gasto.valor,
      0
    );
    this.restante = this.presupuesto - gastado;
  }

  eliminarGasto(id) {
    this.gastos = this.gastos.filter((gasto) => gasto.id !== id);
    this.calcularRestante();
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
    const spinner = document.querySelector('.spinner');
    if (tipo === 'error') {
      divAlert.classList.add('errorAlert');
    } else {
      spinner.classList.remove('hidden');
      spinner.style.display = 'block';
      divAlert.classList.add('succesAlert');
    }

    divAlert.textContent = mensaje;

    //* AÑADIR AL HTML
    const buttonSubmit = document.querySelector('.btnSubmit');
    formulario.insertBefore(divAlert, buttonSubmit);

    //* QUITAR ALERT LUEGO DE 3 SEGUNDOS

    setTimeout(() => {
      const { gastos } = presupuesto;

      spinner.style.display = 'none';
      divAlert.remove();

      ui.mostrarGastos(gastos);
    }, 2000);
  }

  mostrarGastos(gastos) {
    this.limpiarHTML();
    //* ITERAR SOBRE LOS GASTOS
    0;
    gastos.forEach((x) => {
      const { nombre, valor, id } = x;

      const gastoElement = document.createElement('LI');

      gastoElement.innerHTML = `<span class='nameGasto'>${nombre}</span> <span class='valorGasto'>$${valor}</span>`;
      gastoElement.classList.add('gastoElement');
      gastoElement.dataset.id = id;

      //* BOTON ELIMINAR

      const btnDelate = document.createElement('BUTTON');
      btnDelate.classList.add('btnDelate');
      btnDelate.textContent = 'Eliminar';
      btnDelate.onclick = () => {
        eliminarGasto(id);
      };

      gastoElement.appendChild(btnDelate);

      listaGastos.appendChild(gastoElement);
    });
  }

  limpiarHTML() {
    while (listaGastos.firstChild) {
      listaGastos.removeChild(listaGastos.firstChild);
    }
  }

  actualizarRestante(restante) {
    document.querySelector('#restante').textContent = restante;
  }

  comprobarpresupuesto(presupuestoObj) {
    const { restante, presupuesto } = presupuestoObj;
    const elementoRestante = document.querySelector('.restant');

    if (presupuesto / 4 > restante) {
      this.alertMessage('NO TIENES MÁS SALDO DISPONIBLE', 'error');
      elementoRestante.classList.remove('caution');
      elementoRestante.classList.remove('danger');
      elementoRestante.classList.add('dead');
    } else if (presupuesto / 4 >= restante) {
      elementoRestante.classList.remove('caution');
      elementoRestante.classList.add('danger');
    } else if (presupuesto / 2 >= restante) {
      elementoRestante.classList.add('caution');
    } else {
      elementoRestante.classList.remove('caution');
      elementoRestante.classList.remove('danger');
      elementoRestante.classList.remove('dead');
    }
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

  const nombre = document.querySelector('#gasto').value;
  const valor = Number(document.querySelector('#cantidad').value);

  //* VALIDAR QUE NINGUN CAMPO ESTE VACIO
  if (nombre === '' || valor === '') {
    ui.alertMessage('Ambos campos son obligatorios', 'error');

    return;
  } else if (valor === null || isNaN(valor)) {
    ui.alertMessage('Valor Invalido', 'error');

    return;
  }

  //* CREAR VARIABLE QUE GUARDE GASTO CREADO

  const gasto = { nombre, valor, id: Date.now() };
  presupuesto.arrayGastos(gasto);

  ui.alertMessage('Añadiendo gasto..', 'succes');

  //* DESTRUCTION GASTOS

  const { restante } = presupuesto;

  ui.actualizarRestante(restante);
  ui.comprobarpresupuesto(presupuesto);

  formulario.reset();
}

function eliminarGasto(id) {
  //* ELIMINA GASTOS DEL OBJETO
  presupuesto.eliminarGasto(id);

  //* ELIMINA GASTOS DEL HTML
  const { gastos, restante } = presupuesto;
  ui.mostrarGastos(gastos);
  ui.actualizarRestante(restante);
  ui.comprobarpresupuesto(presupuesto);
}
