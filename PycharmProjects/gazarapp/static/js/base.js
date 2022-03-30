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
                    "price_basic": (JSON.parse(item_raw["item"]))["price"],
                    "price": item_raw["total price"],
                    "notice": item_raw["notice"],
                    "quantity": item_raw["quantity"]
                }
                var markups = renderItem(item, item_raw);
                element.insertAdjacentHTML("beforeend", markups);
            }
        }
    }

    $(".shoppingCart").on("click", ".remove-item", function(){
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



})
function renderEmptyCart(){
    console.log("cart is empty");
}
function updateLocalStorage(type, element, cart, items, item){
    for (let i=0; i<items.length; i++){
        if(JSON.stringify(items[i]) === JSON.stringify(item)){
            var price_basic = (JSON.parse(item["item"]))["total price"];
            if(type === "remove"){
                items.splice(i,1);
                cart["total_price"] -= item["total price"];
                document.querySelectorAll(".total-price").forEach(el=>{
                    el.innerHTML = `<b>$${cart["total_price"]}</b>`;
                });
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
                    <p class="m-0"><b>${item["price"]}</b></p>
                </div>
                <div class="ml-1 pl-3 mr-2 remove-item">
                    <button class="btn btn-sm btn-danger"><i class="fa fa-trash"></i></button>
                </div>
            </div>
            <div class="ml-3 d-flex align-items-center">
                <h6 class="pr-3"><b>Quantity:</b></h6>
                <button class="quantity_click quantity-left btn btn-outline-dark" data-type="minus">-</button>
                <input class="quantity quantity_middle btn-outline-dark" type="number" value="${item['quantity']}" style="width: 30px;" min=1>
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

