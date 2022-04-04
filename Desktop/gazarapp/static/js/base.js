
function next(t){
    var element = t.parentElement.parentElement.children[0].children[0];
    var item = element.getElementsByClassName("item")
    element.append(item[0])
    if (item.length <= 4){
        t.parentElement.style.display = 'none'
    }
}

function prev(t){
     var element = t.parentElement.parentElement.children[0].children[0];
     var item = element.getElementsByClassName("item")
     element.prepend(item[item.length - 1]);
     if (item.length <= 4){
        t.parentElement.style.display = 'none'
    }
}
// -----------------xx End of navbar functionality xx------------------ //

document.addEventListener('DOMContentLoaded', () =>{
    var element = document.querySelector(".shoppingCart");
    var cart = JSON.parse(localStorage.getItem("shoppingCart"));
    if (cart == null){
        renderEmptyCart();
    } else {
        var items = cart["items"];
        var total_price = cart["total_price"];
        document.querySelectorAll(".total-price").forEach(el=>{
            el.innerHTML = `<b>$${total_price}</b>`
        });
        if(items.length === 0){
           renderEmptyCart();
        } else {
            for(let i = 0; i < items.length; i++){
                const item_raw = items[i];
                const item = {
                    "name": (JSON.parse(item_raw["item"]))["name"],
                    "id": (JSON.parse(item_raw["item"]))["id"],
                    "price_basic": (JSON.parse(item_raw["price"])),
                    "tot_price": item_raw["total price"],
                    "notice": item_raw["notice"],
                    "quantity": item_raw["quantity"]
                }
                var markups = renderItem(item, item_raw);
                element.insertAdjacentHTML("beforeend", markups);
            }
        }
    }
    $(".shoppingCart").on("click", ".remove-item", function(){
         console.log(this)
         const parent = this.parentElement.parentElement;
         const data_element = parent.querySelector(".data-item");
         var item = JSON.parse(data_element.getAttribute("data-item"));
         cart = JSON.parse(localStorage.getItem("shoppingCart"));
         items = cart["items"];
         updateLocalStorage("remove", element, cart, items, item);
         parent.parentElement.removeChild(parent);
         if(document.querySelector(".item-field") == null){
            renderEmptyCart()
         }
    });
    $(".shoppingCart-footer").on("click", "#empty-cart", function(){
        const confirmation = confirm("Are you sure to make empty your cart?");
        if (confirmation){
            element.innerHTML = '';
            renderEmptyCart();
            localStorage.removeItem("shoppingCart");
            cart = null;
        }
    });

    $(".shoppingCart").on("click", ".quantity_click", function(){
        var parent = this.parentElement;
        var item_field = parent.parentElement;
        var quantity_el = parent.querySelector(".quantity");
        var current_quantity = parseInt(quantity_el.value);
        var data_element = item_field.querySelector(".data-item");
        var item = JSON.parse(data_element.getAttribute("data-item"));
        cart = JSON.parse(localStorage.getItem("shoppingCart"));
        items = cart["items"];

        if(this.getAttribute("data-type") === "plus"){
            quantity_el.value = current_quantity + 1;
            cart, items, item, total_price = updateLocalStorage("quantity_plus", element, cart, items, item);
            data_element.setAttribute("data-item", JSON.stringify(item));
            document.querySelectorAll(".total-price").forEach(el=>{
                el.innerHTML = `<b>$${total_price}</b>`
            });
            item_field.querySelector(".item-price").innerHTML = `<b>$${item["total price"]}</b>`;
        }
        else if(this.getAttribute("data-type") === "minus"){
            if(current_quantity > 1){
                quantity_el.value = current_quantity - 1;
                cart, items, item, total_price = updateLocalStorage("quantity_minus", element, cart, items, item);
                data_element.setAttribute("data-item", JSON.stringify(item));
                document.querySelectorAll(".total-price").forEach(el=> {
                    el.innerHTML = `<b>$${total_price}</b>`;
                });
                item_field.querySelector(".item-price").innerHTML = `<b>$${item["total price"]}</b>`;
            }
            else {
                updateLocalStorage("remove", element, cart, items, item);
                item_field.parentElement.removeChild(item_field);
                if (document.querySelector(".item-field") == null){
                    renderEmptyCart();
                }
            }
        }
    });
});
function renderEmptyCart(){
    const markup = `
        <div class="text-center pt-3 pb-3" id="empty">
            <img style="width: 100px; height: 100px;" src="https://cdn.pixabay.com/photo/2014/04/02/17/03/shopping-cart-307772_960_720.png">
            <h5 class="pt-2"> Your card is empty </h5>
        </div>
    `;
    const el = document.querySelector(".shoppingCart");
    el.insertAdjacentHTML('beforeend', markup);
    document.querySelectorAll(".total-price").forEach(el=>{
        el.innerHTML = `$0.00`;
    });
    document.getElementById("empty-cart").style.display = 'none';
    document.getElementById("PCheckout").style.display = 'none';
};
function updateLocalStorage(type, element, cart, items, item){
    for (let i=0; i<items.length; i++){
        if(JSON.stringify(items[i]) === JSON.stringify(item)){
            var price_basic = (JSON.parse(item["item"]))["price"];
            if(type === "remove"){
                items.splice(i,1);
                cart["total_price"] -= item["total price"];
                document.querySelectorAll(".total-price").forEach(el=>{
                    el.innerHTML = `<b>$${cart["total_price"]}</b>`;
                });
            } else if(type === "quantity_plus"){
            item["quantity"] = parseInt(item["quantity"]);
            item["quantity"] += 1;
            item["total price"] += price_basic;
            cart["total_price"] += price_basic;
            items[i] = item;
            } else if (type === "quantity_minus") {
                item["quantity"] = parseInt(item["quantity"]);
                item["quantity"] -= 1;
                item["total price"] -= price_basic;
                cart["total_price"] -= price_basic;
                items[i] = item;
            }

            cart["items"] = items;
            let total_price = cart["total_price"];
            localStorage.setItem("shoppingCart", JSON.stringify(cart));
            return cart, items, item, total_price;
        }
    }
};

function renderItem(item, item_raw){
    const markup = `
        <div class="item-field w-100 border-bottom border-success">
            <div class="d-flex align-items-center mt-3 mb-1">
                <div class="flex-grow-1 ml-1 pl-0">
                    <a href="/item/${item['id']}"><h5 class="m-0"><b>${item["name"]}</b></a>
                </div>
                <div class="ml-1 pl-3 item-price">
                    <p class="m-0"><b>$${item["tot_price"]}</b></p>
                </div>
                <div class="ml-1 pl-3 mr-2 remove-item">
                    <button class="btn btn-sm btn-danger"><i class="fa fa-trash"></i></button>
                </div>
            </div>
            <div class="ml-3 d-flex align-items-center">
                <h6 class="pr-3"><b>Quantity:</b></h6>
                <button class="quantity_click quantity-left btn btn-outline-dark" data-type="minus">-</button>
                <input class="quantity quantity_middle btn-outline-dark" type="number" value="${item['quantity']}" style="width: 40px;" min=1>
                <button class="quantity_click quantity-right btn btn-outline-dark" data-type="plus">+</button>
            </div>
            <div class="ml-3 d-flex mt-1 align-items-center">
                <h6 class="pr-2"><b>Customer needs:</b></h6>
                <div>
                    <p class="mb-2">${item["notice"]}</p>
                </div>
                <div class="invisible data-item" data-item='${JSON.stringify(item_raw)}'>
            </div>
        </div>
    `;
    return markup;
}

