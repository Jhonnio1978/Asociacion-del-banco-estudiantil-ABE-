// Función para registrar una cuenta
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const accountType = document.getElementById('accountType').value;

    if (name && phone) {
        const account = {
            name: name,
            phone: phone,
            balance: 0,
            accountType: accountType
        };
        localStorage.setItem(name, JSON.stringify(account));
        alert('Cuenta registrada con éxito');
        document.getElementById('registerForm').reset();
    } else {
        alert('Por favor, completa todos los campos');
    }
});

// Función para depositar dinero
document.getElementById('depositForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('depositName').value;
    const amount = parseFloat(document.getElementById('depositAmount').value);

    if (name && amount > 0) {
        const account = JSON.parse(localStorage.getItem(name));
        if (account) {
            account.balance += amount;
            localStorage.setItem(name, JSON.stringify(account));
            alert('Depósito realizado con éxito');
            document.getElementById('depositForm').reset();
        } else {
            alert('Cuenta no encontrada');
        }
    } else {
        alert('Por favor, ingresa una cantidad válida');
    }
});

// Función para transferir dinero
document.getElementById('transferForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const sender = document.getElementById('sender').value;
    const receiver = document.getElementById('receiver').value;
    const amount = parseFloat(document.getElementById('transferAmount').value);

    if (sender && receiver && amount > 0) {
        const senderAccount = JSON.parse(localStorage.getItem(sender));
        const receiverAccount = JSON.parse(localStorage.getItem(receiver));

        if (senderAccount && receiverAccount && senderAccount.balance >= amount) {
            senderAccount.balance -= amount;
            receiverAccount.balance += amount;

            localStorage.setItem(sender, JSON.stringify(senderAccount));
            localStorage.setItem(receiver, JSON.stringify(receiverAccount));

            alert('Transferencia realizada con éxito');
            document.getElementById('transferForm').reset();
        } else {
            alert('Saldo insuficiente o cuenta no encontrada');
        }
    } else {
        alert('Por favor, completa todos los campos');
    }
});
