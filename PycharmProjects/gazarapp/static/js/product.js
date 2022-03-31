document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("quantity").value = 1;
    document.querySelector(".needs-other").value
    const data_item = document.getElementById("data-item").getAttribute("data-item")
    const price_basic = JSON.parse(data_item).price;

    document.getElementById("plus").onclick = () =>{
        var el_quantity = document.getElementById("quantity");
        var quantity = parseInt(el_quantity.value);
        el_quantity.value = quantity + 1
        document.getElementById("item_QPrice").innerHTML = "$" + ((quantity + 1)*price_basic).toFixed(2);
    };

    document.getElementById("minus").onclick = () =>{
        var el_quantity = document.getElementById("quantity");
        var quantity = el_quantity.value;
        if (quantity > 1) {
            el_quantity.value = quantity - 1;
            document.getElementById("item_QPrice").innerHTML = "$" + ((quantity - 1)*price_basic).toFixed(2);
        }
    };

    add_cart = document.getElementById('add-to-cart');
    add_cart.addEventListener("click", function(e) {
        const el_cart = document.querySelector(".cart-icon");
        el_cart.insertAdjacentHTML('beforeend', cartNotification)
        setTimeout(()=>{
            const notif = el_cart.querySelector(".popup-notification");
            notif.parentElement.removeChild(notif);
        },800);

        const quantity = document.getElementById("quantity").value;
        const price_quantity = price_basic * quantity;
        const request = document.querySelector(".customer-needs");
        var notice;
        const ice_type = request.querySelector(".ice-type").firstChild.selectedOptions[0].value;
        const ice_amount = request.querySelector(".ice-amount").firstChild.selectedOptions[0].value;
        const other_needs = request.querySelector(".needs-other").value;
        if (ice_type == "no ice"){
            notice = "The drink with no ice." + other_needs;
        } else {
            notice = ice_type + " (" + ice_amount + "). " + other_needs;
        }

        const data = {
            "item": data_item,
            "notice": notice,
            "quantity": quantity,
            "price": price_basic,
            "total price": price_quantity
        }

          // add to localStorage
        if (localStorage.getItem("shoppingCart") == null){
            localStorage.setItem("shoppingCart", JSON.stringify({
                "items": [data],
                "total_price": price_quantity,
            }));
        } else {
            var cart = JSON.parse(localStorage.getItem("shoppingCart"));
            cart["items"].push(data);
            cart["total_price"] += price_quantity;
            localStorage.setItem(("shoppingCart"), JSON.stringify(cart));
        }

        // remove this duplicated with base.js
        const item = {
            "name": JSON.parse(data_item).name,
            "id": JSON.parse(data_item).id,
            "price_basic": price_basic,
            "notice": data["notice"],
            "quantity": quantity,
            "tot_price": price_quantity
        }

        // update to the cart
//        var remove_empty = document.getElementById("empty");
//        if(remove_empty !== null){
//            remove_empty.parentElement.removeChild(remove_empty);
//        }

        // text renderItem from base.js
        var markups = renderItem(item, data);
        var element = document.querySelector(".shoppingCart");
        element.insertAdjacentHTML('beforeend', markups);
        empty_cart = document.getElementById("empty-cart").style.display = 'block';
        cart = JSON.parse(localStorage.getItem("shoppingCart"));
        document.querySelectorAll(".total-price").forEach(el=>{
            if(cart == undefined){
                el.innerHTML = `<b>$${price_quantity.toFixed(2)}</b>`;
                document.getElementById("PCheckout").style.display = 'none';
            } else {
                el.innerHTML = `<b>$${cart["total_price"]}</b>`;
                document.getElementById("PCheckout").style.display = 'block';
            }
        });
    });
});
//const no_ice = document.querySelector(".ice-type")
//console.log(no_ice.firstChild.selectedOptions[0].value)
//function ice(){
//    var el = document.querySelector(".ice-type");
//    if (el.firstChild.selectedOptions[0].value === "no ice"){
//        document.querySelector(".with-ice").style.display = 'none';
//    } else {
//        document.querySelector(".with-ice").style.display = 'block';
//    }
//};

const cartNotification = `
    <div class="popup-notification text-center bg-success text-white">
        <a class="btn-close"><i class="fas fa-times fa-lg"></i></a>
        <p class="text-center mb-1"><i class="far fa-check-circle checked_icon"></i> Item successfully added to cart</p>
        <button type="button" class="btn bg-warning" data-toggle="modal" data-target="#cartModal"><i class="fas fa-cart-plus fa-lg"></i> Your Cart</a></button>
    </div>
`;

