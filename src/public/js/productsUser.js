const changeToPremium = document.getElementById("change-to-premium")
const addButtons = document.querySelectorAll('.add-product')

addButtons.forEach(button => {
    button.addEventListener("click", async event => {
        const productId = event.target.getAttribute("product-id");
        if (confirm(`¿Seguro que desea agregar el producto al carrito?`)) {
            const response = await addProduct(productId);
            if (response) return alert('Producto agregado al carrito')
        }
    })
})

changeToPremium.addEventListener('click', async () => {
    try {
        const response = await fetch('/api/auth/prem', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!response.ok) {
            const data = await response.json();
            return alert(data.message)
        }

        alert("Se ha cambiado el rol")
        return window.location.href = '/products'
    } 
    catch (error) {
        console.log(error);
    }
})

async function addProduct(product) {
    return fetch(`/api/carts/${product}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(response);
            }
            return response.json();
        })
        .then(data => {
            return data
        })
        .catch(error => {
            alert(error.message);
        });
}
