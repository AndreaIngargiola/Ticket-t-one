function stampaMessaggi(messaggio){
    let result="";
    let articolo =  `
    <div class="divAcqBetw spacer5">
        <h4>I tuoi messaggi </h4> `;
    result += articolo;

    for(let i=0; i < messaggio.length; i++){ 
        let classe ="nonLetto";
        if(messaggio[i]['isRead']== 1){
            classe ="letto";
        }
        
        articolo =  `
        <div class="${classe}">
        <h4>[${messaggio[i]["timestamp"]}]</h4>
        <p>
        ${messaggio[i]["testo"]}
        </p>
       </div>
        `;
        result += articolo;
    }

      return result;

}

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

function getMessaggi(){
    $.getJSON("function.php", 
    {allMessages: "allMessages"}, 
    function(data){

        if(data != "errore"){
            console.log("ok");
            let articoli = stampaMessaggi(data);
            const main = $("#messaggi");
            main.append(articoli);
           
            $.getJSON("function.php", 
            {readMessages: "readMessages"}, 
            function(data){
                console.log("aaaaaa");
                
                console.log("aaaaaa");
            
            });


        }  else{
            console.log("error");
            let articoli = "<p> Non hai ancora nessun messaggio</p>"
            const main = $("#messaggi");
            main.empty();
            main.append(articoli);
        }
    });
}



function logOut(){
    $.ajax({
                       
        url: "function.php",
        type: "POST",
        data: {
            action: "save",
            type:3						
        },
        
        cache: false,
        success: function(dataResult){
            
            var dataResult = JSON.parse(dataResult);
            console.log("%d", dataResult.statusCode);

            if(dataResult.statusCode==200){
                
                location.href = "home.php";						
            }
           
        }
    });
}
$(document).ready(function(){
    let messaggi = getMessaggi();
    notification();
   
});