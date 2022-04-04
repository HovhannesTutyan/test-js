document.addEventListener("DOMContentLoaded", () => {
    var cart_str = localStorage.getItem("shoppingCart")
    var cart = JSON.parse(cart_str);

    if (cart == null){
        window.location.href = "/";
    } else {
        var items = cart["items"];
        var total_price = cart["total_price"];
        var element = document.getElementById("items-abstract");
        document.getElementById("item-count").innerHTML = `${items.length}`;
        $(".shoppingCart").on("click", ".quantity-right", function(){
            var parent = this.parentElement;
            var item_field = parent.parentElement;
            var data_element = item_field.querySelector(".data-item");
            var item = JSON.parse(data_element.getAttribute("data-item"));
            var id=JSON.parse(item["item"])["id"]
            var el_quantity = document.querySelector(".checkout-quantity-" + id)
            var current_quantity = parseInt(el_quantity.value);
            el_quantity.value = current_quantity + 1;
            el_price = JSON.parse(item["item"])["price"]
            var text_price = document.querySelector(".text-muted-" + id)
            text_price.innerHTML = `$${el_price * el_quantity.value}`
            var total_text = document.querySelector(".total-price__all");
            var total = total_text.innerHTML;
            var total_sum = parseInt(total.slice(1));
            total_text.innerHTML = `$${total_sum + el_price}`
        })
        $(".shoppingCart").on("click", ".quantity-left", function(){
            var parent = this.parentElement;
            var item_field = parent.parentElement;
            var data_element = item_field.querySelector(".data-item");
            var item = JSON.parse(data_element.getAttribute("data-item"));
            var id=JSON.parse(item["item"])["id"];
            var el_quantity = document.querySelector(".checkout-quantity-" + id);
            var current_quantity = parseInt(el_quantity.value);
            el_quantity.value = current_quantity - 1;
            el_price = JSON.parse(item["item"])["price"];
            var text_price = document.querySelector(".text-muted-" + id);
            text_price.innerHTML = `$${el_price * el_quantity.value}`;
            if(el_quantity.value == 0){
                el_item = document.querySelector(".checkout-item-" + id)
                el_item.parentElement.removeChild(el_item)
            }
            var total_text = document.querySelector(".total-price__all");
            var total = total_text.innerHTML;
            var total_sum = parseInt(total.slice(1));
            total_text.innerHTML = `$${total_sum - el_price}`;
        })
        for(let i=0; i<items.length; i++){
            var item_info = JSON.parse((items[i])["item"]);
            element.insertAdjacentHTML('beforeend', renderItemCheckout(items[i], item_info));
        }
        element.insertAdjacentHTML('beforeend', renderTotalPrice(total_price));
    }
});
const renderItemCheckout = (item, item_info) =>{
    const markup = `
        <li class="list-group-item d-flex justify-content-between 1h-condensed checkout-item-${item_info["id"]}">
            <div class="items-wrapper">
                <h6 class="my-0"> ${item_info["name"]} </h6>
                <button class="quantity_click quantity-left btn btn-outline-dark" data-type="minus">-</button>
                <input class="checkout-quantity-${item_info["id"]}" style="width: 40px;" value=${item["quantity"]}>
                <button class="quantity_click quantity-right btn btn-outline-dark" data-type="plus">+</button>
                <span>${item_info["unit"]} </span>
            </div>
            <span class="text-muted__sum text-muted-${item_info["id"]}">$${item["total price"]}</span>
             <div class="ml-1 pl-3 mr-2 remove-item">
                <button class="btn btn-sm btn-danger"><i class="fa fa-trash"></i></button>
            </div>
        </li>
    `;
    return markup;
};
const renderTotalPrice = (total_price) =>{
    const markup = `
        <li class="list-group-item d-flex justify-content-between">
            <span>Total</span>
            <strong class="total-price__all">$${total_price}</strong>
        </li>
    `;
    return markup;
};
