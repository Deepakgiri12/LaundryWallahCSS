let button=document.querySelectorAll(".btn");
let iconRemove= '<ion-icon name="remove-circle-outline"></ion-icon>';
let iconAdd='<ion-icon name="add-circle-outline"></ion-icon>';
let show=document.querySelector(".print-output");
let amount=document.querySelector("#total-amt")
let count=1;

function updateSerialNumbers() {
    let rows = document.querySelectorAll(".print-output tr:not(#empty-row):not(:first-child)");
    let num = 1;

    rows.forEach(row => {
        row.querySelector("td").textContent = num;
        num++;
    });
}


button.forEach(btn=>{
    let isRemoved=false;
    btn.addEventListener('click',()=>{
        if(isRemoved){
             btn.style.backgroundColor="#f1f1f8";
            btn.innerHTML=iconAdd+"Add Item"
             btn.style.color="black";

             let addedRow=document.getElementById("cart-row-"+btn.dataset.id);
             if(addedRow) addedRow.remove();
             updateSerialNumbers();
             

        }else{
            btn.innerHTML= iconRemove +"Remove";
            btn.style.backgroundColor="#ffe5e5";
            btn.style.color="#b00020";


            let emptyRow=document.getElementById("empty-row");
        if(emptyRow){
            emptyRow.remove();
        }
        let newRow=document.createElement("tr");
        newRow.id="cart-row-"+btn.dataset.id;
        newRow.innerHTML=`
        <td></td>
        <td>${btn.dataset.service}</td>
        <td>${btn.dataset.price}</td>
        `;
        show.appendChild(newRow);
        updateSerialNumbers();
        }
        isRemoved=!isRemoved;
        amount.innerHTML=sum();
        restoreDefaultRowIfEmpty();

        
        
});    
});
function sum(){
    let rows = document.querySelectorAll(".print-output tr:not(#empty-row):not(:first-child)");
    let total=0;
    rows.forEach(row => {
        let priceText=row.querySelector("td:nth-child(3)").textContent;
        let price = parseFloat(priceText.replace(/[₹,]/g, ""));
        total += price;
    });
    document.getElementById("total-amt").textContent = "₹" + total.toFixed(2);
    return total;
}
function restoreDefaultRowIfEmpty() {
    const rows = show.querySelectorAll("tr:not(#empty-row):not(:first-child)");

    if (rows.length === 0) {
        const emptyRow = document.createElement("tr");
        emptyRow.id = "empty-row";
        emptyRow.innerHTML = `
            <td colspan="3">
                <div class="empty">
                    <ion-icon class="not" name="alert-circle-outline"></ion-icon>
                    <h3>No items Added</h3>
                    <p>Add items to the cart from the service bar</p>
                </div>
            </td>
        `;
        show.appendChild(emptyRow);
    }
}



// EMAIL JS BOOKING FUNCTION
document.getElementById("booking-form").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();

    emailjs.send("service_0cdpy1g", "template_60mjuer", {
        user_name: name,
        user_email: email,
        user_phone: phone
    })
    .then(() => {
        let msg = document.getElementById("success-msg");
        msg.textContent = "Thank you for booking the service, we will get back to you soon.";
        msg.style.display = "block";

        document.getElementById("booking-form").reset();
    })
    .catch((error) => {
       console.error("Email failed:", error);
    let msg = document.getElementById("success-msg");
    msg.textContent = "Failed to send booking email. Try again.";
    msg.style.color = "red";
    msg.style.display = "block";
    });
});
