var fechaSorteo, horaSorteo, numeroGanadores, titulo, premios, patrocinadores, selectGanadores, nombreParticipante, dniParticipante, listaParticipantes, botonCrearEvento, botonEliminarEvento, botonCrearQR, botonAgregarParticipante, botonRealizarSorteo, listaPremios;
var arrayPremios = [];
var arrayParticipantes = [];
var arrayPatrocinadores = [];
var arrayGanadores = [];
var nombreEvento;
var eventoCreado = false;
var urlFormulario = "http://127.0.0.1:5500/Client/formulario.html";
const now = new Date();


window.onload = function() {
    document.getElementById("fecha").textContent = now.toLocaleDateString('es-ES');
    
        if(JSON.parse(localStorage.getItem("eventoCreado")) === true){  //Si existe un evento creado
            habilitarInput(botonEliminarEvento);
            titulo = document.getElementById("titulo");
            
            nombreEvento = localStorage.getItem("nombreEvento");
            titulo.textContent = nombreEvento;
            titulo.style.color = "Black";
            localStorage.getItem("numeroGanadores");
            localStorage.setItem("urlFormulario", urlFormulario);
            
            listaPremios = document.getElementById("listaPremios");
            listaPremios.hidden = false;
            arrayPremios = JSON.parse(localStorage.getItem("arrayPremios"));
            arrayPremios.forEach((premio, index) => {
                let nuevoPremio = document.createElement("li");
                nuevoPremio.textContent = `${index + 1}° Premio: ${premio.Premio}  Patrocinador: ${premio.Patrocinador}`;
                listaPremios.appendChild(nuevoPremio);
            });
            
            document.getElementById("botonEliminarEvento").disabled = false;
            document.getElementById("nombre-evento").disabled = true;
           
            document.getElementById("botonCrearEvento").disabled = true;
            document.getElementById("cantidadGanadores").disabled = true;
            document.getElementById("nombreParticipante").disabled = false;
            document.getElementById("dniParticipante").disabled = false;
            document.getElementById("botonCrearQR").disabled = false;
            document.getElementById("botonAgregarParticipante").disabled = false;
            document.getElementById("botonRealizarSorteo").disabled = false;
            document.getElementById("cantidadGanadores").hidden = true;
            document.getElementById("busqueda").disabled = false;
            document.getElementById("botonBorrarBusqueda").disabled = false;
            
            let participantesGuardados = localStorage.getItem("arrayParticipantes");
            if (participantesGuardados) {
                arrayParticipantes = JSON.parse(participantesGuardados);
                mostrarListaParticipantes();
            }
        }else{                                                          //Si no existe un evento creado
            
            titulo.textContent = "Crear sorteo";
            titulo.style.color = "Gray";
            document.getElementById("botonEliminarEvento").disabled = true;
            document.getElementById("nombre-evento").disabled = false;
            


        }
        

    }
    


function menuPremios() {
    const contenedorPremios = document.getElementById("contenedorPremios");
    numeroGanadores = document.getElementById("cantidadGanadores").value;
    
    
    contenedorPremios.innerHTML = ("");
    
    
    for(let i = 1; i <= numeroGanadores; i++){
        const inputPremios = document.createElement("div");
        inputPremios.style.display = "flex";
        inputPremios.style.margin = "10px"
        inputPremios.id = `premio${i}`;
        
        
    
        inputPremios.innerHTML = `
        <div>
            <label>Premio ${i}</label>
            <input class="premios" style="font-family: 'Courier New', Courier, monospace"  id="premioLista">           
        </div>
        <div>
            <label>Patrocinador: </label>
            <input class="patrocinadores" style="font-family: 'Courier New', Courier, monospace"  type="text" id="patrocinadorLista">      
            <br><br>
        </div>
        `;
        contenedorPremios.appendChild(inputPremios);
       
    }
}




function guardarPremios(){

}




function agregarParticipanteManual(){
nombreParticipante = document.getElementById("nombreParticipante");
dniParticipante = document.getElementById("dniParticipante");

    if(nombreParticipante.value !== "" && dniParticipante.value !== ""){
       
        arrayParticipantes = JSON.parse(localStorage.getItem("arrayParticipantes"))|| [];
        let existeDni = arrayParticipantes.some(function(arrayParticipante){
            return arrayParticipante.dni === dniParticipante.value;
        });
        if(existeDni){
            alert("El dni ya se encuentra registrado");
            return;
        }else{
        arrayParticipantes.push({nombre: nombreParticipante.value, dni: dniParticipante.value});
        localStorage.setItem("arrayParticipantes", JSON.stringify(arrayParticipantes));
        nombreParticipante.value = "";
        dniParticipante.value = "";
        mostrarListaParticipantes();
    }

}else{
    alert("Nombre o Dni no válido");
}
}

function mostrarListaParticipantes(){
    listaParticipantes  = document.getElementById("listaParticipantes");
    listaParticipantes.innerHTML = "";
    let arrayParticipantesGuardados = JSON.parse(localStorage.getItem("arrayParticipantes")) || [];
    arrayParticipantesGuardados.forEach(function(participante){
        let nuevoParticipante = document.createElement("li");
        nuevoParticipante.innerHTML = `${participante.nombre}  ${participante.dni}  <button class="botonEliminarParticipante" onClick="eliminarParticipanteManual('${participante.dni}', this)"> x </button>`;
        listaParticipantes.appendChild(nuevoParticipante);
    });
   
}





function eliminarParticipanteManual(dni, cruz){
    const participante = cruz.parentNode;
    participante.remove();
    let arrayParticipantesGuardados = JSON.parse(localStorage.getItem("arrayParticipantes")) || [];
    const indice = arrayParticipantesGuardados.findIndex(partic => partic.dni === dni);
    if(indice !== -1){
        arrayParticipantesGuardados.splice(indice, 1);
        localStorage.setItem("arrayParticipantes", JSON.stringify(arrayParticipantesGuardados));
    }
}



function deshabilitarInput(input){
    if(input)
    input.disabled = true;
}
function habilitarInput(input){
    if(input)
    input.disabled = false;
}




function crearEvento(){
    
    location.reload();
    premios = document.getElementsByClassName("premios");
    patrocinadores = document.getElementsByClassName("patrocinadores");
    selectGanadores = document.getElementById("cantidadGanadores");
    nombreEvento = document.getElementById("nombre-evento").value;
    
    
    
    if(selectGanadores.value === "0"){
        alert("Agrege al menos 1 premio");
    }

    if(nombreEvento === ""){
        alert("El nombre del evento no es válido");
    }

    for(let i = 0; i < (numeroGanadores); i++){
    if(premios[i].value === ""){
         alert("Premio " + (i+1) + " vacío");
          return;
    }
}
       
    

    if(selectGanadores !== "0" && nombreEvento !== "" && premios.length !== 0){
        localStorage.setItem("cantidadGanadores", selectGanadores.value);
        deshabilitarInput(selectGanadores);

        
        
        deshabilitarInput(nombreEvento);
        titulo = document.getElementById("titulo");
        titulo.textContent = nombreEvento;
        titulo.style.color = "Black";
        localStorage.setItem("nombreEvento", nombreEvento);

        for(let i = 0; i < (numeroGanadores); i++){
            arrayPremios.push({Premio: premios[i].value, Patrocinador: patrocinadores[i].value});
            listaPremios = document.getElementById("listaPremios");
            listaPremios.hidden = false;
            let nuevoPremio = document.createElement("li");
            nuevoPremio.innerHTML = `${i+1}° Premio: ${premios[i].value}  Patrocinador:  ${patrocinadores[i].value}\n`;
            listaPremios.appendChild(nuevoPremio);
            deshabilitarInput(premios[i]);
            deshabilitarInput(patrocinadores[i]);
            localStorage.setItem("numeroGanadores", numeroGanadores);
        }
    localStorage.setItem("arrayPremios", JSON.stringify(arrayPremios));

    
    habilitarInput(document.getElementById("botonEliminarEvento"));
    

    botonCrearEvento = document.getElementById("botonCrearEvento");
    deshabilitarInput(botonCrearEvento);
    deshabilitarInput(document.getElementById("nombre-evento"));
    

    botonCrearQR = document.getElementById("botonCrearQR"); // Habilitar inputs y botones luego de crear sorteo
    habilitarInput(botonCrearQR);
    
    botonAgregarParticipante = document.getElementById("botonAgregarParticipante");
    habilitarInput(botonAgregarParticipante);

    botonRealizarSorteo = document.getElementById("botonRealizarSorteo");
    habilitarInput(botonRealizarSorteo);

    nombreParticipante = document.getElementById("nombreParticipante");
    dniParticipante = document.getElementById("dniParticipante");
    habilitarInput(nombreParticipante);
    habilitarInput(dniParticipante);
     
    
    eventoCreado = true;
    localStorage.setItem("eventoCreado", JSON.stringify(eventoCreado));
    }
}
 



function mostrarQR(){
    QRCode.toDataURL(localStorage.getItem("urlFormulario"), {
        errorCorrectionLevel: 'H',
        type: "image/png",
        width: 256
    }, function (err, url) {
        if (err) {
            console.error("Error al generar el QR:", err);
            return;
        }
        document.getElementById("qrCode").innerHTML = '<img src="' + url + '" alt= "qrCode">';
        document.getElementById('botonesQr').innerHTML = '<button class= "botonEliminar" onclick= "cerrarQr()"> Cerrar</button> <button class= "boton" id= "botonMostrarLink" onclick= "mostrarLink()"> Mostrar link</button> <button class="boton" onclick="descargarQr()"><img src="./Img/iconoDescarga.png" alt= "Descargar" class= "botonDescargarQr"></button>';
        localStorage.setItem("urlQR", url);
        habilitarInput(botonCrearQR);
    });
}

function cerrarQr(){
    document.getElementById("qrCode").innerHTML = "";
    document.getElementById("botonesQr").innerHTML = "";
    habilitarInput(botonCrearQR);
}

function mostrarLink(){
   
    const url = document.createElement('p');
    url.textContent = localStorage.getItem("urlFormulario");
    url.style.alignSelf = "center";
    deshabilitarInput(document.getElementById("botonMostrarLink"));
    document.getElementById("qrCode").appendChild(url);
}

function descargarQr(){
const linkImagen = document.createElement('a');
linkImagen.href = localStorage.getItem("urlQR");
let nombreImagen = localStorage.getItem("nombreEvento");
linkImagen.download = 'codigoQr-' + nombreImagen + '.jpeg';
linkImagen.click();
}


function eliminarEvento(){
    location.reload();
    localStorage.clear();
    eventoCreado = false;
    localStorage.setItem("eventoCreado", JSON.stringify(eventoCreado));
    listaPremios.innerHTML = "";
    listaPremios.hidden = true;
    deshabilitarInput(botonEliminarEvento);
    habilitarInput(nombre-evento);
nombreEvento.value = "";
titulo.textContent = "Crear sorteo";
titulo.style.color = "gray";
numeroGanadores.value = "";
localStorage.setItem("numeroGanadores", numeroGanadores);
habilitarInput(selectGanadores);
for(let i = 0; i < (numeroGanadores); i++){
    premios[i].value = "";
    premios[i].disabled = false;
    patrocinadores[i].value = "";
    patrocinadores[i].disabled = false;
}
habilitarInput(botonCrearEvento);
document.getElementById("botonBorrarBusqueda");
document.getElementById("busqueda");
deshabilitarInput(botonAgregarParticipante);
deshabilitarInput(botonCrearQR);
deshabilitarInput(botonRealizarSorteo);
deshabilitarInput(nombreParticipante);
deshabilitarInput(dniParticipante);

cerrarQr();
deshabilitarInput(botonCrearQR);
document.getElementById("listaParticipantes").innerHTML = ("");
cerrarQr();
ocultarCuadroConfirmacionEliminarEvento();

}

function cuadroConfirmacionEliminarEvento(){

    var cuadroConfirmacion = document.getElementById("cuadroConfirmacion");
     cuadroConfirmacion.style.display = "block";
 }
 function ocultarCuadroConfirmacionEliminarEvento(){
     var cuadroConfirmacion = document.getElementById("cuadroConfirmacion");
     cuadroConfirmacion.style.display = "none";
 }

function guardarTodosLosParticipantes() {
    var arrayParticipantes = JSON.parse(localStorage.getItem("arrayParticipantes")) || [];
    
    arrayParticipantes.forEach(participante => {
        fetch('http://localhost:3001/guardar-participante', { // Cambia el puerto si es necesario
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dni: participante.dni,
                nombreyapellido: participante.nombre
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al guardar participante');
            }
            console.log(`Participante ${participante.nombre} guardado en la base de datos.`);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
}

function cuadroRealizarSorteo(){
    guardarTodosLosParticipantes();
    var arrayPremios = JSON.parse(localStorage.getItem("arrayPremios"))|| [];
    var arrayParticipantes = JSON.parse(localStorage.getItem("arrayParticipantes"))|| [];
    
    if(arrayParticipantes.length < arrayPremios.length){
 
        alert("No hay suficientes participantes");
    }else{


        document.getElementById("cuadroGanadores").style.display = "block";
    var contenedorGanadores = document.getElementById("contenedorGanadores");
    
    arrayPremios.forEach((premio, index) => {
    let contenedor = document.createElement("div");
    contenedor.className = "contenedorGanador";
    contenedor.id = `contenedorGanador${index+1}`
    contenedor.textContent = `Premio ${index+1}: ${premio.Premio} `;
    if(premio.Patrocinador){
        contenedor.append( `patrocinado por ${premio.Patrocinador}`);
    }
    contenedorGanadores.appendChild(contenedor);
    });

    }
   
}

function cerrarCuadroRealizarSorteo(){
    document.getElementById("cuadroGanadores").style.display = "none";
    document.getElementById("contenedorGanadores").innerHTML = "";
}

function elegirGanador(){
    var arrayPremios = JSON.parse(localStorage.getItem("arrayPremios"))|| [];
    var arrayParticipantes = JSON.parse(localStorage.getItem("arrayParticipantes"))|| [];

    for(let index = 0; index < arrayPremios.length; index++){
        
        let numeroAleatorio = Math.floor(Math.random() * arrayParticipantes.length);
        console.log(numeroAleatorio);
        

        if(!arrayGanadores.some(ganador => ganador.dni === arrayParticipantes[numeroAleatorio].dni)){

        arrayGanadores.push({premio: arrayPremios[index].premio, nombre: arrayParticipantes[numeroAleatorio].nombre, dni: arrayParticipantes[numeroAleatorio].dni});
        
        let contenedor = document.createElement("p");
        contenedor.textContent = `Ganador/a: ${arrayGanadores[index].nombre} ${arrayGanadores[index].dni} `;
        contenedor.style.fontWeight = "bold";
    document.getElementById(`contenedorGanador${index+1}`).appendChild(contenedor);
    
    }else{
        index--;
    }
    }
    localStorage.setItem("arrayGanadores", JSON.stringify(arrayGanadores));
    fechaYHora();
    document.getElementById("botonSortear").hidden = true;
    document.getElementById("botonCancelar").hidden = true;
    document.getElementById("botonDescargarResultados").hidden = false;
    document.getElementById("botonFinalizarEvento").hidden = false;

}

function descargarResultados(){
    var nombreEvento = localStorage.getItem("nombreEvento");
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(`${nombreEvento}`, 10, 10);
    doc.text(`____________________________________`, 10, 12);
    doc.setFontSize(12);
    var ganadores = JSON.parse(localStorage.getItem("arrayGanadores"));
    var premios = JSON.parse(localStorage.getItem("arrayPremios"));
    arrayPremios.forEach((premio, index) => {
    doc.text(` ${index + 1}° Premio: ${premio.Premio} | Patrocinador: ${premio.Patrocinador} | Ganador: ${ganadores[index].nombre} | DNI: ${ganadores[index].dni}`, 10, (20+(index*10)));
    });

    doc.save(`Ganadores-${nombreEvento}.pdf`);
}

const inputBusqueda = document.getElementById("busqueda");

inputBusqueda.addEventListener('input', () => {
    var arrayParticipantes = JSON.parse(localStorage.getItem("arrayParticipantes"))|| [];
    var busqueda = document.getElementById("busqueda").value;
    listaParticipantes  = document.getElementById("listaParticipantes");
    mostrarListaParticipantes();
    listaParticipantes.innerHTML = "";
    arrayParticipantes.forEach((arrayParticipantes) => {
        let nombre = arrayParticipantes.nombre.toLowerCase();
        let dni = arrayParticipantes.dni;
        if(nombre.includes(busqueda.toLowerCase()) || dni.includes(busqueda)){
            let nuevoParticipante = document.createElement("li");

        nuevoParticipante.innerHTML = `${nombre}  ${dni}  <button class="botonEliminarParticipante" onClick="eliminarParticipanteManual('${dni}', this)"> x </button>`;
        listaParticipantes.appendChild(nuevoParticipante);
        }else if(busqueda == ""){
            mostrarListaParticipantes();
        }
    })
    });

    function borrarBusqueda(){
        var busqueda = document.getElementById("busqueda")
        busqueda.value = "";
        mostrarListaParticipantes();
    }

    function abrirHistorial(){
        window.open('./historial.html', '_blank');
    }

    function fechaYHora(){
       
        fechaSorteo = now.toLocaleDateString('es-ES');
        horaSorteo = now.toLocaleTimeString('es-ES');
        localStorage.setItem("fechaSorteo", fechaSorteo);
        localStorage.setItem("horaSorteo", horaSorteo);
        
    }
    
