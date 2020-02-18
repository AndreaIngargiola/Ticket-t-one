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

function stampaEvento(evento, featuring, biglietti, hosts){
    let cartTickBut = "";
    let result = "";
     let articolo =  `
    <div class="row">
    <div class="col-sm-3 offset-sm-1">
    <aside>
        <img class="imgEventS" src="${evento[0]["pathVerticale"]}" alt="Locandina di ${evento[0]["nome"]}"
    </aside>
    </div>
    <div class="col-sm-7">
    <h2>${evento[0]["nome"]}</h2>
    <section>
       <p><h3>${evento[0]["città"]}, ${evento[0]["data"]} </h3> </p>
       <p>${evento[0]["indirizzo"]}, ${evento[0]["location"]} </p> 
       <p> ${hosts[0]["nicknameArtista"]}
       `;
        result += articolo;

    for(let i=1; i < hosts.length; i++){
        articolo =  `
       
        , ${hosts[i]["nicknameArtista"]}
        `;
        result += articolo;
    }
    
    if(featuring != "errore"){
        articolo =  `
        <p> Featuring: ${featuring[0]["nickname"]}
        `;
            result += articolo;

        for(let i=1; i < featuring.length; i++){
            articolo =  `
        
            , ${featuring[i]["nickname"]}
            `;
            result += articolo;
        }
    }
    articolo =  `
    </p>
        <p>${evento[0]["descTour"]}</p>
        
       <p>${evento[0]["descrizione"]}</p>
    </section>
    <section>
           <table class="tableEventS text-left">
                <tr>
                    <th>Sezione</th>
                    <th>Posti rimanenti</th>
                    <th>Prezzo</th>
                    <th>Quantità</th>
                    <th></th>
                </tr>
        `;
        result += articolo;
    for(let i=0; i < biglietti.length; i++){
        if(biglietti[i]["postiRimanenti"]  == 0) {
            cartTickBut = "disabled";
            value = 0;
        }else{
            cartTickBut="";
            value = 1;
        }
        articolo = `
        <form class="addCart" method="get">
            <input type="hidden" id='posizione${[i]}' value="${biglietti[i]["posizione"]}"></input>
            <input  type="hidden" id='prezzo${[i]}' value="${biglietti[i]["prezzo"]}"></input>
            <input  type="hidden" id='evento-id${[i]}' value="${evento[0]["idEvento"]}"></input>
            <input type="hidden" id='evento-img${[i]}' value="${evento[0]["pathQuadrata"]}"></input>
            <input  type="hidden" id='evento-nome${[i]}' value="${evento[0]["nomeTour"]}"></input>
            <input  type="hidden" id='disponibile${[i]}' value="${biglietti[i]["postiRimanenti"]}"></input>
            <input  type="hidden" id='citta${[i]}' value="${evento[0]["città"]}"></input>
            <input  type="hidden" id='data${[i]}' value="${evento[0]["data"]}"></input>
            <tr>
                <td>
                    ${biglietti[i]["posizione"]}             
                </td>
                <td>
                    ${biglietti[i]["postiRimanenti"]}             
                </td>
                <td>
                    ${biglietti[i]["prezzo"]}€      
                </td>
                <td>
                    <input type='number' size = "1" value='${value}' id='quantita${[i]}' name='quantita' min='1' max= "${biglietti[i]["postiRimanenti"]}"/>
                </td>
                <td>
                <button class="cartButton${cartTickBut}" id="buttonCarrello"  type="button" onclick="cart('${[i]}')" ${cartTickBut}) >Metti nel carrello</button>
               
                </td>
                
            </tr>
        `;
        result += articolo;
    }
    articolo = `
                </table>
            </section>
        </div>
        </div>
       
        `;
        result += articolo;
    return result;
  }
  
  
  function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
  
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
  
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
  };
  
  function getEvento(){
  
  
   var evento = getUrlParameter('event');
   
   console.log("CERCAA %s", evento);
  
  
  $.getJSON("function.php", {evento: evento}, function(data){
    console.log("CERCooo %s", data);
   
        let articoli = stampaEvento(data.event, data.featuring, data.biglietti, data.hosts);
        const main = $(".biglietti");
    main.append(articoli);           
    
    
  });
  
  
  
  }

function cart(n) {
    var session = document.getElementById('session').value;
    if(session == "true") {
        if( $("#quantita" + n).val()==0 || $("#quantita" + n).val() > $("#disponibile" + n).val() ){

            $("#nelCarrello").hide();
            $("#error").show();
            $('#error').html("Inserisci una quantità disponibile di biglietti");
            
        } else {
            $("#error").hide();
        
            let posizione = $("#posizione" + n).val();
            let prezzo =  $("#prezzo" + n).val();
            let idEvento =   $("#evento-id" + n).val();
            let quantita =   $("#quantita" + n).val();
            let img =   $("#evento-img" + n).val();
            let nome =   $("#evento-nome" + n).val();
            let rimanenti = $("#disponibile" + n).val();
            let citta = $("#citta" + n).val();
            let data = $("#data" + n).val();
            console.log("%s",  citta );
            
            $.getJSON( "function.php",
            
                {
                    carrello: "carrello",
                    posizione : posizione,
                    prezzo : prezzo,
                    idEvento :  idEvento,
                    quantita :  quantita,
                    img : img,
                    nome : nome,
                    rimanenti : rimanenti,
                    citta : citta,
                    data: data		
                },
                
                
                function(dataResult){
                    console.log("%s", dataResult.success);
                    if(dataResult.success == true){
                        $("#error").hide();
                        $("#nelCarrello").show();
                        $('#nelCarrello').html( dataResult.message);
                        updateCart();

                    } else {
                        $("#nelCarrello").hide();
                        $("#error").show();
                        $('#error').html( dataResult.message);
                    }
                }
            );
        } 
    } else {
        console.log("f");

        alert('Please login!');
    }
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
   
   
  getEvento();
  
  });