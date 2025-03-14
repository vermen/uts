console.log(students);

/* 5. Selectores */

const selectorNombre = document.querySelector('#nombre');
const selectorExperto = document.querySelector('#experto');
const selectorSueldo = document.querySelector('#sueldo');
const selectorNivelIngles = document.querySelector('#nivelIngles');

/* 1.  Llenar dinamicamente select de nombres */

students.forEach((student)=>{
    const opcion = document.createElement('option');
    opcion.value = student.nombre;
    opcion.textContent = student.nombre;
    document.querySelector('#nombre').appendChild(opcion);
})

/* 2. llenar dinamicamente select con sueldos en dolaretes */

const max = 100;
const min = max - 90;

for (let i = min; i <= max; i++ ){
    const opcion = document.createElement('option');
    opcion.value = i;
    opcion.textContent = i;
    document.querySelector('#sueldo').appendChild(opcion);
} 

/* 4. guardar valores seleccionados en ub objeto literal */

const criteriosSeleccionados = {
  nombre : "",
  experto: "",
  sueldo: "",
  ingles: "",
}

/* 6. Event listeners filtros */
selectorNombre.addEventListener('input', (e)=>{
  criteriosSeleccionados.nombre = e.target.value
  /* 7. llamado a funcion alto nivel de filtros */
  filtrarUteista();
});
selectorExperto.addEventListener('input', (e)=>{
  criteriosSeleccionados.experto = e.target.value
  filtrarUteista();
});
selectorSueldo.addEventListener('input', (e)=>{
  criteriosSeleccionados.sueldo = e.target.value
});
selectorNivelIngles.addEventListener('input', (e)=>{
  criteriosSeleccionados.ingles = e.target.value
});



/* 3. event listeners DOM */

document.addEventListener('DOMContentLoaded', ()=>{
    showStudents(students);
    console.log(criteriosSeleccionados);
})

function showStudents(students){
    const cardContainer = document.querySelector('#tarjetas');
    limpiar();
    students.forEach((student)=>{
      const {imagen, nombre, experto, ingles, sueldo} = student
        const studentHtml = document.createElement('p');
        studentHtml.innerHTML = `
             <figure class="student">
            <img src="img/${imagen}" alt="Student" />
            <div class="student-box">
              <h3>${nombre}</h3>
              <ul class="student-details">
                <li>
                  <span>${experto}</span>
                </li>
                <br/>
                <li>
                <strong>${ingles}</strong>
                </li>
              </ul>
              <div class="student-price">
                <strong>$${sueldo}/hora</strong>
                <a href="#" class="btn btn--small boton">Contratar</a>
              </div>
            </div>
          </figure>
        `;
        cardContainer.appendChild(studentHtml);
    })
}


/* 7.1 Declaración de cunfion filter de alto nivel */

function filtrarUteista(){
  const resultado = students
  .filter(filtrarNombre)
  .filter(filtrarExperto)
  console.log(resultado);
  showStudents(resultado);
}

function filtrarNombre(student){
  if (criteriosSeleccionados.nombre){
      return student.nombre === criteriosSeleccionados.nombre
  } else{
    return student
  }
}

function filtrarExperto(student){
  if (criteriosSeleccionados.experto){
    return student.experto === criteriosSeleccionados.experto
  } else {
    return student
  }
}

function limpiar(){
  let z = document.querySelectorAll('p');
  for(let v = 0; v < z.length; v++){
    z[v].remove();
  }
}

/* HIRE */
/* array contenedor de estudiantes */
let arrayCards = [];
/* selectores */
const card = document.querySelector('#tarjetas');
const tbody = document.querySelector('tbody')
/* event listeners */
card.addEventListener('click', selectUteista);

/* Funcion para seleccionar card (tarjeta=uteista) */
function selectUteista(e){
  e.preventDefault();
  if (e.target.classList.contains('boton')){
    const electedUteista = e.target.parentElement.parentElement.parentElement
    /* console.log(electedUteista); */
    detailUteista(electedUteista);
  }
}

/* funcion para insertar en un objeto los atributos de cada elemento html 
para guardarlos en propiedas de un objeto */
function detailUteista(electedUteista){
  const objectUteista = {
    imagen: electedUteista.querySelector('img').src,
    nombre: electedUteista.querySelector('h3').textContent,
    experto: electedUteista.querySelector('span').textContent,
    ingles: electedUteista.querySelector('li strong').textContent,
    sueldo: electedUteista.querySelector('.student-price strong').textContent
  }
  arrayCards = [...arrayCards , objectUteista]
  console.log(arrayCards);
  HiredUteistasInjecting();
}

function HiredUteistasInjecting(){
  arrayCards.forEach((card)=>{
    const {imagen, nombre, experto, ingles, sueldo} = card;
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
      <img src="${imagen}">
    </td>
    <td>${nombre}</td>
    <td>${experto}</td>
    <td>${ingles}</td>
    <td>${sueldo}</td>
    `;
    tbody.appendChild(row)
  })
}