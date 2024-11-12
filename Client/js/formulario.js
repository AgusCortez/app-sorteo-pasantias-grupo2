document.addEventListener("DOMContentLoaded", function() {
    let nombreEvento = localStorage.getItem("nombreEvento");
    let eventoCreado = JSON.parse(localStorage.getItem("eventoCreado"));
    console.log(eventoCreado);
    if (nombreEvento && eventoCreado === true) {
        document.getElementById("nombreEvento").innerHTML = (`<h2> Evento: ${nombreEvento} </h2>`);
                document.getElementById("nombre-participante").disabled = false;
                document.getElementById("dni").disabled = false;
                document.getElementById("btn-agregar-participante").disabled = false;
    }else{
        document.getElementById("nombreEvento").innerHTML = (`<h2> No hay evento activo actualmente </h2>`);
        document.getElementById("nombreEvento").style.color = "Gray";
    }
    
    });
    
    function agregarParticipante() {
        let nombreParticipante = document.getElementById("nombre-participante");
        let dniParticipante = document.getElementById("dni");
        if (nombreParticipante.value === "") {
            alert("Ingrese un nombre válido");
        } else if (dniParticipante.value === "" || dniParticipante.value < 1 || dniParticipante.value > 99999999) {
            alert("Ingrese un dni válido");
        } else if(nombreEvento){
            
            let arrayParticipantes = JSON.parse(localStorage.getItem("arrayParticipantes")) || [];
            let existeDni = arrayParticipantes.some(function(arrayParticipante){
                return arrayParticipante.dni === dniParticipante.value;
            })
            if(existeDni){
                alert("El dni ya se encuentra registrado");
                return;
            }else{
                arrayParticipantes.push({
                    nombre: nombreParticipante.value,
                    dni: dniParticipante.value
                });
                nombreParticipante.disabled = true;
                dniParticipante.disabled = true;
                document.getElementById("btn-agregar-participante").disabled = true;
                document.getElementById("mensaje").innerHTML = (`<h3>¡Buena Suerte!</h3>`);
                localStorage.setItem("arrayParticipantes", JSON.stringify(arrayParticipantes));
            }
            
        }
        
    }
    