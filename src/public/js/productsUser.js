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
    try {
        const response = await fetch(`/api/carts/${product}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!response.ok) {
            const responseData = await response.json();
            return alert(responseData.message);
        }
        return await response.json()
    }
    catch(e) {
        console.log(error)
    }
}
