function updateButtonColor() {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const hour = now.getHours();
    const button = document.getElementById('time-button');

    // Verifica se é um dia útil (segunda a sexta) e se está entre 18h e 22h
    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 18 && hour < 22) {
        button.classList.remove('red');
        button.classList.add('green');
    } else {
        button.classList.remove('green');
        button.classList.add('red');
    }
}

// Atualiza a cor do botão ao carregar a página
window.onload = updateButtonColor;
setInterval(updateButtonColor, 60000);


document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.getElementById('cart-count');
    const cartButton = document.getElementById('cart-button');
    const overlay = document.getElementById('cart-overlay');
    const closeButton = document.getElementById('close-button');
    const cartItems = document.getElementById('cart-items');
    const checkoutButton = document.getElementById('checkout-button');
    const observationsInput = document.getElementById('cart-observations');
    let itemCount = 0;
    let cart = [];

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const item = event.target.closest('.container__card');
            const itemName = item.querySelector('.card__subtitulo').textContent;
            const itemPrice = item.querySelector('.card__compras span').textContent;

            itemCount++;
            cartCount.textContent = itemCount;

            cart.push({ name: itemName, price: itemPrice, observacoes: "" });
            updateCartOverlay();
        });
    });

    cartButton.addEventListener('click', () => {
        overlay.style.display = 'flex';
    });

    closeButton.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    checkoutButton.addEventListener('click', () => {
        const observations = observationsInput.value;
        const cartWithObservations = cart.map(item => ({
            item: item.name,
            preco: item.price,
            observacoes: observations
        }));

        console.log(cartWithObservations); // Adicionando log para inspecionar os dados

        fetch('https://sheetdb.io/api/v1/wijqv664fs3d0', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: cartWithObservations }),
        })
        .then(response => response.json())
        .then(data => {
            alert('Compra finalizada com sucesso!');
            cart = [];
            itemCount = 0;
            cartCount.textContent = itemCount;
            updateCartOverlay();
            overlay.style.display = 'none';
        })
        .catch(error => console.error('Erro:', error));
    });

    function updateCartOverlay() {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.price}`;
            cartItems.appendChild(li);
        });
    }
});
