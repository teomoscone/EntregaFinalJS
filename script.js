

let lista_alumnos = [];

function buscar_alumno(cedula){
    let alumno;
    for(let i = 0; i < lista_alumnos.length; i = i + 1){
        if (cedula == lista_alumnos[i].cedula) {
            alumno = lista_alumnos[i];
            break;
        }
    }

    return alumno;
}



function obtengo_alumnos(){
    fetch("alumnos.json")
    .then( response => response.json() )
    .then( data => console.log( data  ) )
}



class Alumno_fm{

    constructor( nombre, apellido, cedula, email, frecuencia, formaDePago ){
        this.nombre = nombre;
        this.apellido = apellido;
        this.cedula = cedula;
        this.email = email;
        this.cuota = 0;
        this.frecuencia = frecuencia;
        this.formaDePago = formaDePago;
        
    }

    calcularCuota(frecuencia){
        let cuota;
        if(frecuencia == 2){
            cuota = 1500;
        }else if(frecuencia == 3){
            cuota = 1800
        }else if(frecuencia > 3){
            cuota = 2000
        }
        return cuota;
    }

    calcularTotal(frecuencia, formaDePago){
        let total;
        let cuota = this.calcularCuota(frecuencia);
        if(formaDePago == "Anual"){
            total = cuota * 0.80
        }else{total = cuota;
        }
        this.cuota = total;
        return total;
    }

    saludar(){

        console.log("Bienvenidos a FM TRAINING: ", this.nombre, " ", this.apellido) ;
    }

    mostrarInformacion(){
        console.log("Informacion del alumno:");
        console.log("Nombre y apellido: ", this.nombre, " ", this.apellido);
        console.log("Frecuencia semanal: ", this.frecuencia);
        console.log("Valor cuota: ", this.cuota);
        console.log("Forma de pago: ", this.formaDePago);
    }

}

//para pruebas
// agregar_alumno("alumno1", "uno", "1111", "alumno1@gmail.com");
// lista_alumnos[0].calcularTotal(3, "anual");
// agregar_alumno("alumno2", "dos", "2222", "alumno2@gmail.com");
// lista_alumnos[1].calcularTotal(4, "anual");
// agregar_alumno("alumno3", "tres", "3333", "alumno3@gmail.com");
// lista_alumnos[2].calcularTotal(2, "mensual");


function ordernar_alumnos(alumno){
    return alumno.formaDePago == "anual";
}

let resultado_filter = lista_alumnos.filter(ordernar_alumnos);

for(let i = 0; i < resultado_filter.length; i = i + 1){
    console.log("Nombre: ", resultado_filter[i].nombre);
    console.log("Apellido: ", resultado_filter[i].apellido);
    console.log("Cedula: ", resultado_filter[i].cedula);
    console.log("Email: ", resultado_filter[i].email);
    console.log("Frecuencia: ", resultado_filter[i].frecuencia);
    console.log("Importe cuota: ", resultado_filter[i].cuota);
    console.log("-------------------");
}


console.log(" / / / / / *********** ")
let total = 0;
for(let i = 0; i < resultado_filter.length; i = i + 1){
    total = total + resultado_filter[i].cuota;
}

console.log("Total a cobrar:", total * 12)


//  ¡¡¡¡¡¡TERCER ENTREGAAAAAAAAA!


function ingresar(){
    obtengo_alumnos()
    let cedula = document.getElementById("cedula");
    let msj = document.getElementById("mensaje");
    let menuProfe = document.getElementById("profe");

    let alumno = buscar_alumno(cedula.value);
    if (alumno != null){
        console.log("encontre")
        // let parrafo = document.createElement("p");
        // parrafo.innerText = "Informacion de usuario " + alumno.nombre + " " + alumno.apellido;
        // msj.append(parrafo);
    }else{
        console.log("no")
    }
    //agregar mensaje de NO ENCUENTRA ALUMNO
}

function verPagosAnuales(){
    let msj = document.getElementById("mensaje");
    let parrafo = document.createElement("p");
    let recuperando_lista_alumnos = localStorage.getItem("alumnos");
    recuperando_lista_alumnos = JSON.parse( recuperando_lista_alumnos );
    let resultado_filter = recuperando_lista_alumnos.filter(ordernar_alumnos);
    console.log( resultado_filter );
    let totalAnual = 0
    for (let i = 0; i < resultado_filter.length; i++) {
        const element = resultado_filter[i];
        parrafo.innerText += `${element.nombre} ${element.apellido}`
        totalAnual += element.cuota
    }
    
    parrafo.innerText += `\n Total a cobrar anual: ${totalAnual * 12} \n`
    msj.append(parrafo)
}

//ENTREGA FINAL

function leerJSON(ruta) {
    // Crea una promesa para leer un archivo JSON de forma asíncrona
    return new Promise((resolve, reject) => {
        // Realiza una solicitud fetch a la ruta especificada
        fetch(ruta)
            .then(response => response.json()) // Convierte la respuesta en formato JSON
            .then(data => {
                resolve(data); // Resuelve la promesa con los datos obtenidos
            })
            .catch(error => {
                reject(error); // Rechaza la promesa en caso de error
            });
    });
}

async function obtenerAlumnos() {
    try {
        let jsonData;
        // Lee el archivo JSON de alumnos de forma asíncrona y espera la respuesta
        jsonData = await leerJSON("./alumnos.json");
        // Guarda los datos de alumnos en el local storage como una cadena JSON
        localStorage.setItem("alumnos2", JSON.stringify(jsonData.alumnos));
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
    }
}

obtenerAlumnos();
let listaAlumnos = localStorage.getItem("alumnos2");
listaAlumnos = JSON.parse(listaAlumnos);
console.log(listaAlumnos);

function agregar_alumno(nombre, apellido, cedula, email, frecuencia, formaDePago) {
    // Crea un nuevo objeto alumno
    let alumno = new Alumno_fm(nombre, apellido, cedula, email, frecuencia, formaDePago);
    // Obtiene la lista actual de alumnos del local storage
    lista_alumnos = localStorage.getItem("alumnos2");
    // Convierte la lista en formato JSON a un objeto JavaScript
    lista_alumnos = JSON.parse(lista_alumnos);
    // Agrega el nuevo alumno a la lista existente
    lista_alumnos.push(alumno);
    // Convierte la lista actualizada a JSON
    let alumnos_JSON = JSON.stringify(lista_alumnos);
    // Actualiza el local storage con la lista de alumnos actualizada
    localStorage.setItem("alumnos2", alumnos_JSON);
}

function registrar() {
    // Obtiene los valores ingresados por el usuario
    const formaDePagoSelect = document.getElementById("formaDePago");
    const frecuenciaSelect = document.getElementById("frecuencia");
    const cedula = document.getElementById("cedula").value;
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;
    const formaDePago = formaDePagoSelect.value;
    const frecuencia = frecuenciaSelect.value;
    // Verifico si ya existe
    let alumno = existeAlumno(cedula);
    if(alumno != null){
        if(alumno.cedula == 1111 || alumno.cedula == 2222){
            Swal.fire({
                title: 'Bienvendio profe! ' + alumno.nombre,
                text: '',
                icon: 'success',
                confirmButtonText: 'Ok'
              })
            listarInfoAlumnos();
        }else{
            Swal.fire({
                title: 'error ',
                text: 'Ya estas registrado como alumno, frecuencia semanal: ' + frecuencia,
                icon: 'warning',
                confirmButtonText: 'Ok'
              })
        }
    }else{
        // Agrega el nuevo alumno con los datos ingresados
        agregar_alumno(nombre, apellido, cedula, email, frecuencia, formaDePago);

        // Muestra los datos actualizados para verificar que se agregaron correctamente
        listaAlumnos = localStorage.getItem("alumnos2");
        listaAlumnos = JSON.parse(listaAlumnos);
        Swal.fire({
            title: 'Bienvenido ' + nombre,
            text: 'Frecuencia semanal: ' + frecuencia,
            icon: 'success',
            confirmButtonText: 'Ok'
          })
    }
}

function existeAlumno(cedula){
    listaAlumnos = localStorage.getItem("alumnos2");
    listaAlumnos = JSON.parse(listaAlumnos);
    let existe = false;
    let alumno = null;

    for (let index = 0; index < listaAlumnos.length; index++) {
        const element = listaAlumnos[index];
        alumno = Object.setPrototypeOf(element, Alumno_fm.prototype);
        if(alumno.cedula == cedula){
            return alumno;
        }
    }
    return null;
}

function listarInfoAlumnos() {
    listaAlumnos = localStorage.getItem("alumnos2");
    listaAlumnos = JSON.parse(listaAlumnos);
    let totalMensual = 0;
    let html = ""; // Variable para construir el contenido HTML

    // Construir encabezados de la tabla
    html += '<table class="table table-dark">';
    html += "<tr>";
    html += "<th>Cédula</th>";
    html += "<th>Nombre</th>";
    html += "<th>Apellido</th>";
    // Agrega los encabezados para las demás columnas
    html += "</tr>";

    for (let index = 0; index < listaAlumnos.length; index++) {
        const element = listaAlumnos[index];
        const alumno = Object.setPrototypeOf(element, Alumno_fm.prototype);
        alumno.calcularTotal(alumno.frecuencia, alumno.formaDePago);
        totalMensual += alumno.cuota;

        // Agregar una fila por cada alumno
        html += "<tr>";
        html += "<td>" + alumno.cedula + "</td>";
        html += "<td>" + alumno.nombre + "</td>";
        html += "<td>" + alumno.apellido + "</td>";
        // Agrega los datos para las demás columnas
        html += "</tr>";
    }
    let totalAnual = totalMensual * 12;

    html+= "<tr>";
    // Cerrar la tabla
    html += `<td colspan="3"> Total a cobrar anual = ${totalAnual} </td>`;

    html += "</tr></table>";

    // Mostrar el contenido HTML en el elemento con ID "tabla"
    document.getElementById("tabla").innerHTML = html;

    console.log("Total anual:");
    console.log(totalAnual);
    let alumnos_JSON = JSON.stringify(listaAlumnos);
    localStorage.setItem("alumnos2", alumnos_JSON);
    console.log(listaAlumnos);
}




