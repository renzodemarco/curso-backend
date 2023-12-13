const form = document.getElementById('createProductForm')
const title = document.getElementById('title')
const description = document.getElementById('description')
const year = document.getElementById('year')
const price = document.getElementById('price')
const stock = document.getElementById('stock')
const category = document.getElementById('category')
const submit = document.getElementById('submit')

form.addEventListener("submit", async event => {
    event.preventDefault()
    const data = {
        title: title.value,
        description: description.value,
        year: year.value,
        price: price.value,
        stock: stock.value,
        category: category.value.toLowerCase()
    }
    try {
        const response = await fetch('/api/products/', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!response.ok) {
            const data = await response.json();
            return alert(data.message)
        }

        alert("Producto creado exitosamente")
        return window.location.href = '/products'
    }
    catch (error) {
        console.log(error);
    }
})