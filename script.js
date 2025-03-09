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

// Función para guardar registros en Firestore
async function guardarRegistro(data) {
    try {
        console.log("Intentando guardar el registro en Firestore:", data);
        const docRef = await db.collection("usuarios").add(data);
        console.log("Registro guardado con ID: ", docRef.id);
    } catch (e) {
        console.error("Error al añadir el registro: ", e);
    }
}

// Función para registrar un usuario
async function registrarUsuario() {
    let nombre = document.getElementById("nombre").value;
    if (!nombre) {
        console.error("El nombre no puede estar vacío");
        return;
    }
    let numeroCuenta = generarNumeroCuenta();
    let usuario = { nombre, numeroCuenta };
    console.log("Registrando usuario:", usuario);
    await guardarRegistro(usuario);
}

// Función para iniciar sesión
function iniciarSesion() {
    let numeroCuenta = document.getElementById("loginCuenta").value;
    let contraseña = document.getElementById("loginContraseña").value;

    if (numeroCuenta === "" || contraseña === "") {
        alert("Completa este campo");
        return;
    }

    let usuario = usuarios.find(user => user.numeroCuenta == numeroCuenta && user.contraseña == contraseña);

    if (usuario) {
        localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
        document.getElementById("resultadoLogin").innerHTML = `✅ ¡Bienvenido, ${usuario.nombre}!`;
    } else {
        document.getElementById("resultadoLogin").innerHTML = "⚠️ Cuenta o contraseña incorrecta.";
    }
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
            `💰 Tu saldo actual es: <b>${usuarioActivo.saldo} USD</b>`;
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

    let destinatario = usuarios.find(user => user.numeroCuenta == cuentaDestino);

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
    usuarios = usuarios.map(user => 
        user.numeroCuenta == usuarioActivo.numeroCuenta ? usuarioActivo : 
        user.numeroCuenta == destinatario.numeroCuenta ? destinatario : user
    );

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));

    document.getElementById("resultadoTransferencia").innerHTML = 
        `✅ Transferencia de ${monto} USD realizada a la cuenta ${cuentaDestino}`;
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
    usuarios = usuarios.map(user => 
        user.numeroCuenta == usuarioActivo.numeroCuenta ? usuarioActivo : user
    );

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));

    document.getElementById("resultadoDeposito").innerHTML = 
        `✅ Depósito de ${monto} USD realizado correctamente.`;
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
    usuarios = usuarios.map(user => 
        user.numeroCuenta == usuarioActivo.numeroCuenta ? usuarioActivo : user
    );

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));

    document.getElementById("resultadoRetiro").innerHTML = 
        `✅ Retiro de ${monto} USD realizado correctamente.`;
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
