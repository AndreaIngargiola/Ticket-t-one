
function searchMessage(callback) {
   
    $.getJSON("function.php", 
    {notifiche: "notifiche"}, 
    function(data){
        if(data != "errore"){
            numero = data.length;
           
            callback(numero);

        }  else{
            numero = 0;
            callback(numero);
        }
    });

}


function searchCart(callback) {
   
    $.getJSON("function.php", 
    {getCookies: "getCookies"}, 
    function(dataResult){
        let numero = 0;
        if(dataResult!= "error" && dataResult.length != 0){
            numero = dataResult.length;
            totale =0;
            for(let i=0; i<numero; i++){
                quantità = Number(dataResult[i]['quantita']);
                totale += quantità;
            }
            console.log("%d", totale);
            callback(totale);

        }  else{
           
            callback(numero);
        }
    });

}

function notification(){
    searchMessage(function(result){
        console.log("1");
        i= result;
        classe = "p1";
        if(i==0){
            classe="p1no";
        }
        $("#notif").empty();
     let articolo = `
     <a class="nav-link" href="cartellaMessaggi.php">
     <span class="${classe} fa-stack fa-2x has-badge" data-count="${i}">
        <em class="p3 fa fa-envelope fa-stack-1x xfa-inverse"></em>
    </span>
    </a>
     `;
     $("#notif").append(articolo);
    });
}

function updateCart(){
    searchCart(function(result){
        console.log("%d", result);
        j= result;
        classe = "p1";
        if(j==0){
            classe="p1no";
        }
        $("#cartNav").empty();
     let articolo = `
     <a class="nav-link" href="cart.php">
        <span class="${classe} fa-stack fa-2x has-badge" data-count="${j}">
            <em class="p3 fa fa-shopping-cart fa-stack-1x xfa-inverse" data-count="4b"></em>
        </span>
    </a>
     `;
     $("#cartNav").append(articolo);
    });
}


  $(document).ready(function(){
    setInterval(notification, 5000);

   
    notification();
    updateCart();
  });