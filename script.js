document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('order-form');
    const singleOrderForm = document.getElementById('single-order-form');
    const ordersList = document.getElementById('orders-list');
    const totalKitsElement = document.getElementById('total-kits');
    const addSellerButton = document.getElementById('add-seller');

    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    let totalKits = JSON.parse(localStorage.getItem('totalKits')) || 0;

    const updateOrdersList = () => {
        ordersList.innerHTML = '';
        orders.sort((a, b) => a.name.localeCompare(b.name)).forEach((order, index) => {
            const orderElement = document.createElement('div');
            orderElement.innerHTML = `
                <strong>Nome:</strong> ${order.name}<br>
                <strong>Endereço:</strong> ${order.address}<br>
                <strong>Telefone:</strong> ${order.phone}<br>
                <strong>Quantidade de Kits:</strong> ${order.quantity}<br>
                <strong>Vendedor:</strong> ${order.seller}<br>
                <button onclick="deleteOrder(${index})">Excluir</button>
            `;
            ordersList.appendChild(orderElement);
        });
        totalKitsElement.textContent = totalKits;
    };

    const saveOrders = () => {
        localStorage.setItem('orders', JSON.stringify(orders));
        localStorage.setItem('totalKits', totalKits);
    };

    window.deleteOrder = (index) => {
        const order = orders[index];
        totalKits -= order.quantity;
        orders.splice(index, 1);
        saveOrders();
        updateOrdersList();
    };

    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value.toUpperCase();
        const address = document.getElementById('address').value.toUpperCase();
        const phone = document.getElementById('phone').value;
        const quantity = parseInt(document.getElementById('quantity').value);
        const seller = document.getElementById('seller').value;

        orders.push({ name, address, phone, quantity, seller });
        totalKits += quantity;
        saveOrders();
        updateOrdersList();
        orderForm.reset();
    });

    singleOrderForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('single-name').value.toUpperCase();
        const quantity = parseInt(document.getElementById('single-quantity').value);

        orders.push({ name, address: 'RETIRADA', phone: '', quantity, seller: 'Avulso' });
        totalKits += quantity;
        saveOrders();
        updateOrdersList();
        singleOrderForm.reset();
    });

    addSellerButton.addEventListener('click', () => {
        const newSeller = prompt('Digite o nome do novo vendedor:');
        if (newSeller) {
            const option = document.createElement('option');
            option.value = newSeller;
            option.textContent = newSeller;
            document.getElementById('seller').appendChild(option);
        }
    });

    updateOrdersList();
});
