document.addEventListener('DOMContentLoaded', function() {
    // Variables globales para almacenar premios y patrocinadores dinámicos
    var premiosInputs = [];
    var patrocinadoresInputs = [];
    var participantes = [];

    // Llamar a la función para actualizar premios y patrocinadores al cargar la página
    actualizarPremiosYPatrocinadores();

    // Manejar el formulario de ingreso de evento
    document.getElementById('evento-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que se envíe el formulario
        agregarNombreEvento();
    });

    // Manejar el cambio de cantidad de ganadores
    document.getElementById('cantidad-ganadores').addEventListener('input', function() {
        actualizarPremiosYPatrocinadores();
    });

    // Agregar participante manualmente
    document.getElementById('btn-agregar-participante').addEventListener('click', function(event) {
        event.preventDefault();
        agregarParticipanteManual();
    });

    // Agregar el listener al botón con el id 'btn-realizar-sorteo'
    document.getElementById('btn-realizar-sorteo').addEventListener('click', function() {
        console.log("Botón de sorteo presionado");
        realizarSorteo();
    });

    // Cerrar el pop-up
    document.getElementById('cerrar-popup').addEventListener('click', function() {
        document.getElementById('resultado-sorteo').style.display = 'none';
    });

    // Manejar el botón de generación del código QR
    document.getElementById('abrir-qr').addEventListener('click', function() {
        var evento = document.getElementById('nombre-evento').value;  // Obtener nombre del evento
        if (evento) {
            // Usar la versión moderna para generar el QR
            QRCode.toDataURL('http://127.0.0.1:5500/Client/formulario.html', {
                errorCorrectionLevel: 'H',
                type: 'image/png',
                width: 256
            }, function (err, url) {
                if (err) {
                    console.error('Error al generar el QR:', err);
                    return;
                }
                // Insertar la imagen QR en el contenedor
                document.getElementById('qr-code').innerHTML = '<img src="' + url + '" alt="QR Code">';
            });

            // Mostrar el overlay
            document.getElementById('overlay-qr').style.display = 'flex';
        } else {
            alert('Por favor ingrese el nombre del evento');
        }
    });

    // Botón para cerrar el pop-up del QR
    document.getElementById('cerrar-popup-qr').addEventListener('click', function() {
        document.getElementById('overlay-qr').style.display = 'none'; // Cerrar el pop-up QR
    });

    // Función para agregar nombre del evento
    function agregarNombreEvento() {
        var nombreEvento = document.getElementById('nombre-evento').value;
        var eventoTitle = document.getElementById('evento-title');
        eventoTitle.textContent = "Evento: " + nombreEvento;
    }

    // Función para actualizar premios y patrocinadores según la cantidad de ganadores seleccionada
    function actualizarPremiosYPatrocinadores() {
        var cantidad = parseInt(document.getElementById('cantidad-ganadores').value);

        // Limpiar premios y patrocinadores existentes
        var premiosContainer = document.getElementById('premios-container');
        var patrocinadoresContainer = document.getElementById('patrocinadores-container');
        premiosContainer.innerHTML = '';
        patrocinadoresContainer.innerHTML = '';

        // Crear dinámicamente los campos de premios y patrocinadores según la cantidad seleccionada
        premiosInputs = [];
        patrocinadoresInputs = [];

        for (var i = 1; i <= cantidad; i++) {
            // Crear campo de premio
            var premioLabel = document.createElement('label');
            premioLabel.textContent = i + "° Premio";
            var premioInput = document.createElement('input');
            premioInput.setAttribute('type', 'text');
            premiosInputs.push(premioInput);
            premiosContainer.appendChild(premioLabel);
            premiosContainer.appendChild(premioInput);

            // Crear campo de patrocinador
            var patrocinadorLabel = document.createElement('label');
            patrocinadorLabel.textContent = "Patrocinador " + i + "°";
            var patrocinadorInput = document.createElement('input');
            patrocinadorInput.setAttribute('type', 'text');
            patrocinadoresInputs.push(patrocinadorInput);
            patrocinadoresContainer.appendChild(patrocinadorLabel);
            patrocinadoresContainer.appendChild(patrocinadorInput);
        }
    }

    // Función para agregar un participante manualmente
    function agregarParticipanteManual() {
        var nombre = document.getElementById('nombre-participante').value;
        var dni = document.getElementById('dni').value;

        if (nombre && dni) {
            participantes.push({ nombre: nombre, dni: dni });
            mostrarParticipantes();
            document.getElementById('nombre-participante').value = '';
            document.getElementById('dni').value = '';
        } else {
            alert("Por favor, ingrese nombre y DNI.");
        }
    }

    // Función para mostrar los participantes en la lista
    function mostrarParticipantes() {
        var lista = document.getElementById('lista-participantes');
        lista.innerHTML = '';

        participantes.forEach(function(participante, index) {
            var li = document.createElement('li');
            li.textContent = (index + 1) + ". " + participante.nombre + " (DNI: " + participante.dni + ")";
            lista.appendChild(li);
        });
    }

    // Función para realizar el sorteo
    function realizarSorteo() {
        if (participantes.length === 0) {
            alert("No hay participantes para realizar el sorteo.");
            return;
        }

        var cantidadGanadores = parseInt(document.getElementById('cantidad-ganadores').value);
        if (cantidadGanadores > participantes.length) {
            alert("No hay suficientes participantes.");
            return;
        }

        var ganadores = seleccionarGanadores(cantidadGanadores);
        mostrarGanadores(ganadores);
    }

    // Función para seleccionar ganadores aleatorios
    function seleccionarGanadores(cantidad) {
        var ganadores = [];
        var participantesCopy = [...participantes];

        for (var i = 0; i < cantidad; i++) {
            var ganadorIndex = Math.floor(Math.random() * participantesCopy.length);
            ganadores.push(participantesCopy[ganadorIndex]);
            participantesCopy.splice(ganadorIndex, 1);
        }

        return ganadores;
    }

    // Función para mostrar los resultados del sorteo en el pop-up
    function mostrarGanadores(ganadores) {
        var resultadosContainer = document.getElementById('resultados-container');
        resultadosContainer.innerHTML = '';

        var premios = [];
        var patrocinadores = [];

        premiosInputs.forEach(function(input, index) {
            premios.push(input.value);
        });

        patrocinadoresInputs.forEach(function(input, index) {
            patrocinadores.push(input.value);
        });

        ganadores.forEach(function(ganador, index) {
            var ganadorDiv = document.createElement('div');
            var premio = premios[index] || "Premio No Definido";
            var patrocinador = patrocinadores[index] || "Patrocinador No Definido";
            ganadorDiv.textContent = (index + 1) + ". " + ganador.nombre + " - " + premio + " (Patrocinado por: " + patrocinador + ")";
            resultadosContainer.appendChild(ganadorDiv);
        });

        // Mostrar el pop-up
        document.getElementById('resultado-sorteo').style.display = 'flex';
    }
});
