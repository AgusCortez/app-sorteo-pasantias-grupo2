document.addEventListener('DOMContentLoaded', function() {
    // Variables globales para almacenar premios y patrocinadores dinámicos
    var premiosInputs = [];
    var patrocinadoresInputs = [];

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
            var premioLabel = document.createElement('label');
            premioLabel.textContent = i + "° Premio";
            var premioInput = document.createElement('input');
            premioInput.setAttribute('type', 'text');
            premiosInputs.push(premioInput);
            premiosContainer.appendChild(premioLabel);
            premiosContainer.appendChild(premioInput);

            var patrocinadorLabel = document.createElement('label');
            patrocinadorLabel.textContent = "Patrocinador " + i + "°";
            var patrocinadorInput = document.createElement('input');
            patrocinadorInput.setAttribute('type', 'text');
            patrocinadoresInputs.push(patrocinadorInput);
            patrocinadoresContainer.appendChild(patrocinadorLabel);
            patrocinadoresContainer.appendChild(patrocinadorInput);

            patrocinadoresContainer.appendChild(document.createElement('br'));
            patrocinadoresContainer.appendChild(document.createElement('br'));
        }
    }

    // Función para agregar participante manualmente
    function agregarParticipanteManual() {
        var nombre = document.getElementById('nombre-participante').value.trim();
        var dni = document.getElementById('dni').value.trim();

        // Validar que el DNI no esté repetido
        var participantes = document.getElementById('lista-participantes').getElementsByTagName('li');
        var dniRepetido = false;

        for (var i = 0; i < participantes.length; i++) {
            var dniExistente = participantes[i].textContent.split(' ').pop(); // Obtiene el último elemento (DNI)
            if (dniExistente === dni) {
                dniRepetido = true;
                break;
            }
        }

        if (dniRepetido) {
            alert('El DNI ingresado ya está registrado. Intente nuevamente.');
            return;
        }

        // Crear nuevo elemento de lista con el nombre y DNI del participante
        var nuevoParticipante = document.createElement('li');
        nuevoParticipante.textContent = nombre + ' ' + dni;

        // Crear el botón de eliminar
        var botonEliminar = document.createElement('button');
        botonEliminar.textContent = '❌';
        botonEliminar.addEventListener('click', function() {
            eliminarParticipante(nuevoParticipante);
        });

        // Añadir el botón al nuevo participante
        nuevoParticipante.appendChild(botonEliminar);
        document.getElementById('lista-participantes').appendChild(nuevoParticipante);

        // Limpiar campos después de agregar participante
        document.getElementById('nombre-participante').value = '';
        document.getElementById('dni').value = '';
    }

    // Función para eliminar un participante
    function eliminarParticipante(participante) {
        participante.remove(); // Elimina el elemento de la lista
    }





    $(document).ready(function() {
        // Manejar el botón de abrir QR
        $('#abrir-qr').on('click', function() {
            $('#overlay-qr').css('display', 'flex'); // Mostrar el overlay
    
            // Limpiar el QR previo
            $('#qr-code').empty();
            var qrcode = new QRCode(document.getElementById("qr-code"), {
                text: 'URL', // URL 
                width: 150,
                height: 150,
            });
        });
    
        // Manejar el botón de cerrar QR
        $('#cerrar-qr').on('click', function() {
            $('#overlay-qr').css('display', 'none'); // Ocultar el overlay
        });
    });
    







});
