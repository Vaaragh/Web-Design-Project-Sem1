const firebaseURL = 'https://courseproject-73f30-default-rtdb.europe-west1.firebasedatabase.app/'

const request = new XMLHttpRequest()
const cartBody = document.querySelector('.js-cart-inventory')
const totalPrice = document.querySelector('.total-price-value')
const clearCart = document.querySelector('.clear-all-cart')
const confirmPop = document.querySelector('#deactivation-confirm-float')
const emptyCart = document.querySelector('.js-confirm-empty')


export function shopCart() {
    shopCart = 'Shopping cart active'
    return shopCart
}

export function shoppingJS() {
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                let courseInfoFull = JSON.parse(request.responseText);
                function generateCart() {
                    cartBody.innerHTML = ''
                    let inventory = readLocalStorage()
                    for (let key in inventory) {
                        let item = generateCartItem(inventory[key], courseInfoFull[key])
                        cartBody.appendChild(item)
                    }
                }
                clearCart.addEventListener('click', () => {
                    confirmPop.style.display = 'flex'
                    emptyCart.addEventListener('click', () => {
                        localStorage.clear()
                        generateCart()
                        setTotalPrice()
                        confirmPop.style.display = 'none'
                    })
                })
                generateCart()
                setTotalPrice()

            }
        }
    }

    request.open("GET", firebaseURL + '/kursevi.json')
    request.send()

    function readLocalStorage() {
        let localInventory = localStorage.getItem('id')
        if (localInventory != null) {
            let tempInventory = localInventory.split(',').slice(1)
            let inventory = tempInventory.reduce((fullInventory, item) => {
                if (item in fullInventory) {
                    fullInventory[item]++
                } else {
                    fullInventory[item] = 1
                } return fullInventory
            }, {});
            return inventory
        } else {
            let inventory = []
            return inventory
        }
    }


    function generateCartItem(inventory, info) {
        let fullPrice = parseInt(inventory) * parseInt(info.cena)
        let itemRow = document.createElement('tr')
        itemRow.className = 'table-row course-selector'
        itemRow.id = info.id
        itemRow.innerHTML = `<td class="table-cell image-cell">
    <img src="${info.slika}" alt="${info.naziv}-Course" class="shop-image">
</td>
<td class="table-cell">${info.naziv}</td>
<td class="table-cell centered-cell">${inventory}</td>
<td class="table-cell centered-cell price-cell">$${info.cena}</span></td>
<td class="table-cell centered-cell price-col">$${fullPrice}</td>`
        itemRow.addEventListener('click', () => {
            window.location.href = `/html/course-page.html?id=${info.id}`;
        })
        return itemRow
    }

    function setTotalPrice() {
        let prices = document.querySelectorAll('.price-col')
        let totalPriceValue = 0
        prices.forEach(row => {
            totalPriceValue += parseInt(row.innerHTML.split('$')[1])
        })
        totalPrice.innerText = "$" + totalPriceValue
    }

}

