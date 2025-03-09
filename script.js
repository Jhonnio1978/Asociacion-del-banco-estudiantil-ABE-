// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDIqEWXCwG379BHrLog-VSvxImB3hT5TRg",
    authDomain: "banco-estudiantil-ljpd.firebaseapp.com",
    projectId: "banco-estudiantil-ljpd",
    storageBucket: "banco-estudiantil-ljpd.firebasestorage.app",
    messagingSenderId: "539522973722",
    appId: "1:539522973722:web:fe27d31b6df43dfbd411a3"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Recuperar los usuarios almacenados o inicializar la lista
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Genera un número de cuenta único
function generarNumeroCuenta() {
    return Math.floor(1000000000 + Math.random() * 9000000000);
}

// Genera 30 IDs de cuentas únicos y los almacena en localStorage
function generarCuentas() {
    let cuentas = [];
    for (let i = 0; i < 30; i++) {
        cuentas.push(generarNumeroCuenta());
    }
    localStorage.setItem("cuentas", JSON.stringify(cuentas));
}

// Llama a esta función una vez para generar las cuentas
if (!localStorage.getItem("cuentas")) {
    generarCuentas();
}

// Función para guardar registros en localStorage
function guardarRegistro(usuario) {
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    console.log("Registro guardado:", usuario);
}

// Función para registrar un usuario
function registrarUsuario() {
    let nombre = document.getElementById("nombre").value;
    let telefono = document.getElementById("telefono").value;
    let correo = document.getElementById("correo").value;
    let contrasena = document.getElementById("contrasena").value;
    let escuela = document.getElementById("escuela").value;

    if (!nombre || !telefono || !correo || !contrasena || !escuela) {
        document.getElementById("mensajeRegistro").innerHTML = "⚠️ Todos los campos son obligatorios.";
        return;
    }

    // Obtener una cuenta disponible
    let cuentas = JSON.parse(localStorage.getItem("cuentas"));
    if (cuentas.length === 0) {
        document.getElementById("mensajeRegistro").innerHTML = "⚠️ No hay cuentas disponibles.";
        return;
    }
    let numeroCuenta = cuentas.pop();
    localStorage.setItem("cuentas", JSON.stringify(cuentas));

    let usuario = { nombre, telefono, correo, contrasena, escuela, numeroCuenta, saldo: 0 };
    console.log("Registrando usuario:", usuario);
    guardarRegistro(usuario);

    // Mostrar el número de cuenta al usuario
    document.getElementById("mensajeRegistro").innerHTML = 
        `✅ Registro exitoso. Tu número de cuenta es: ${numeroCuenta}`;
}

// Base de datos ficticia
const cuentas = {
    "9087674523": { nombre: "Jhonnio Saint Fort", tipoCuenta: "Cuenta de Ahorro", saldo: 900, contrasena: "1234" },
    "1234567890": { nombre: "Norvis Ramirez", tipoCuenta: "Cuenta de Ahorro", saldo: 900, contrasena: "1234" },
    "2345678901": { nombre: "Maria Robles", tipoCuenta: "Cuenta de Ahorro", saldo: 900, contrasena: "1234" },
    "3456789012": { nombre: "Sherlin Alexandra", tipoCuenta: "Cuenta de Ahorro", saldo: 900, contrasena: "1234" },
    "4567890123": { nombre: "Orquidea Mieses", tipoCuenta: "Cuenta de Ahorro", saldo: 900, contrasena: "1234" },
    "5678901234": { nombre: "Ashley Nachali", tipoCuenta: "Cuenta de Ahorro", saldo: 900, contrasena: "1234" },
    "6789012345": { nombre: "Mirianlly Elizabeth", tipoCuenta: "Cuenta de Ahorro", saldo: 900, contrasena: "1234" },
    "7890123456": { nombre: "Bianny Lisbette", tipoCuenta: "Cuenta de Ahorro", saldo: 900, contrasena: "1234" },
    "8901234567": { nombre: "Carlos David", tipoCuenta: "Cuenta de Ahorro", saldo: 900, contrasena: "1234" },
    "9012345678": { nombre: "Freily Antonio", tipoCuenta: "Cuenta de Ahorro", saldo: 900, contrasena: "1234" },
    "1234509876": { nombre: "Luisanna Yamilex", tipoCuenta: "Cuenta de Ahorro", saldo: 900, contrasena: "1234" },
    "2345609876": { nombre: "Patricia de la Cruz", tipoCuenta: "Cuenta de Ahorro", saldo: 900, contrasena: "1234" },
    "3456709876": { nombre: "Luis Miguel", tipoCuenta: "Cuenta de Ahorro", saldo: 900, contrasena: "1234" },
    "4567809876": { nombre: "Candy Ironelis", tipoCuenta: "Cuenta de Ahorro", saldo: 900, contrasena: "1234" },
    "5678909876": { nombre: "Ismael Tavarez", tipoCuenta: "Cuenta de Ahorro", saldo: 900, contrasena: "1234" },
    "6789009876": { nombre: "Javier Torres", tipoCuenta: "Cuenta de Ahorro", saldo: 900, contrasena: "1234" }
};

// Función para buscar cuenta
function buscarCuenta() {
    let numeroCuenta = document.getElementById("accountNumber").value;
    let resultado = document.getElementById("resultado");

    if (cuentas[numeroCuenta]) {
        resultado.innerHTML = `<strong>Nombre:</strong> ${cuentas[numeroCuenta].nombre}<br>
                               <strong>Tipo de Cuenta:</strong> ${cuentas[numeroCuenta].tipoCuenta}<br>
                               <strong>Saldo:</strong> RD$${cuentas[numeroCuenta].saldo}`;
    } else {
        resultado.innerHTML = "Cuenta no encontrada.";
    }
}

// Función para iniciar sesión
function iniciarSesion() {
    let id = document.getElementById("id").value;
    let contrasena = document.getElementById("contrasenaLogin").value;

    if (!id || !contrasena) {
        document.getElementById("mensajeBienvenida").innerHTML = "⚠️ El ID y la contraseña son obligatorios.";
        return;
    }

    // Buscar el usuario en la base de datos ficticia
    let usuarioActivo = cuentas[id];
    if (!usuarioActivo || usuarioActivo.contrasena !== contrasena) {
        document.getElementById("mensajeBienvenida").innerHTML = "⚠️ Usuario no encontrado o contraseña incorrecta.";
        return;
    }

    // Guardar el usuario activo en localStorage
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));

    // Mostrar mensaje de bienvenida
    document.getElementById("mensajeBienvenida").innerHTML = 
        `Bienvenido ${usuarioActivo.nombre}, tu cuenta tiene RD$${usuarioActivo.saldo} pesos dominicanos.`;
}

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
    document.getElementById("mensajeBienvenida").innerHTML = "";
}

// Función para verificar saldo
function verificarSaldo() {
    let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (!usuarioActivo) {
        alert("Completa este campo");
        return;
    }

    if (usuarioActivo) {
        document.getElementById("saldoCuenta").innerHTML = 
            `💰 Tu saldo actual es: <b>RD$${usuarioActivo.saldo} pesos dominicanos</b>`;
    } else {
        document.getElementById("saldoCuenta").innerHTML = "⚠️ Debes iniciar sesión primero.";
    }
}

// Función para transferir dinero
function transferirDinero() {
    let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    let cuentaDestino = document.getElementById("cuentaDestino").value;
    let monto = parseFloat(document.getElementById("montoTransferencia").value);

    if (cuentaDestino === "" || isNaN(monto)) {
        alert("Completa este campo");
        return;
    }

    if (!usuarioActivo) {
        document.getElementById("resultadoTransferencia").innerHTML = "⚠️ Debes iniciar sesión.";
        return;
    }

    let destinatario = cuentas[cuentaDestino];

    if (!destinatario) {
        document.getElementById("resultadoTransferencia").innerHTML = "⚠️ La cuenta destino no existe.";
        return;
    }

    if (usuarioActivo.saldo < monto) {
        document.getElementById("resultadoTransferencia").innerHTML = "⚠️ Saldo insuficiente.";
        return;
    }

    usuarioActivo.saldo -= monto;
    destinatario.saldo += monto;

    // Guardar cambios en localStorage
    cuentas[usuarioActivo.numeroCuenta] = usuarioActivo;
    cuentas[cuentaDestino] = destinatario;
    localStorage.setItem("cuentas", JSON.stringify(cuentas));
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));

    document.getElementById("resultadoTransferencia").innerHTML = 
        `✅ Transferencia de RD$${monto} pesos dominicanos realizada a la cuenta ${cuentaDestino}`;
}

// Función para depositar dinero
function depositarDinero() {
    let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    let monto = parseFloat(document.getElementById("montoDeposito").value);

    if (isNaN(monto) || monto <= 0) {
        alert("Completa este campo");
        return;
    }

    if (!usuarioActivo) {
        alert("Debes iniciar sesión primero.");
        return;
    }

    usuarioActivo.saldo += monto;

    // Guardar cambios en localStorage
    cuentas[usuarioActivo.numeroCuenta] = usuarioActivo;
    localStorage.setItem("cuentas", JSON.stringify(cuentas));
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));

    document.getElementById("resultadoDeposito").innerHTML = 
        `✅ Depósito de RD$${monto} pesos dominicanos realizado correctamente.`;
}

// Función para retirar dinero
function retirarDinero() {
    let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    let monto = parseFloat(document.getElementById("montoRetiro").value);

    if (isNaN(monto) || monto <= 0) {
        alert("Completa este campo");
        return;
    }

    if (!usuarioActivo) {
        alert("Debes iniciar sesión primero.");
        return;
    }

    if (usuarioActivo.saldo < monto) {
        alert("Saldo insuficiente.");
        return;
    }

    usuarioActivo.saldo -= monto;

    // Guardar cambios en localStorage
    cuentas[usuarioActivo.numeroCuenta] = usuarioActivo;
    localStorage.setItem("cuentas", JSON.stringify(cuentas));
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));

    document.getElementById("resultadoRetiro").innerHTML = 
        `✅ Retiro de RD$${monto} pesos dominicanos realizado correctamente.`;
}

// Función para solicitar tarjeta de crédito
function solicitarTarjetaCredito() {
    let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (!usuarioActivo) {
        alert("Debes iniciar sesión primero.");
        return;
    }

    // Simulación de solicitud con temporizador de 48 horas
    setTimeout(() => {
        alert("¡Tu solicitud de tarjeta de crédito ha sido procesada!");
    }, 48 * 60 * 60 * 1000); // 48 horas en milisegundos

    document.getElementById("resultadoSolicitud").innerHTML = 
        `✅ Solicitud de tarjeta de crédito realizada correctamente.`;
}
