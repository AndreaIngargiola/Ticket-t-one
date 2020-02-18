function svuota(){
    $.getJSON( "function.php",
          
    {
        svuota: "svuota"	
    },
    
    
    function(dataResult){
        console.log("%s", dataResult);
        const main = $("#carrello");
        main.empty();
      main.append(dataResult);
        updateCart();
    }
);

}

function modifica(id, posizione, prezzo, rimanenti, citta, data, n){
  if( $("#quantita" + n).val() > rimanenti ){

    $("#error").show();
    $('#error').html('Sono disponibili solo '+ rimanenti + ' biglietti di quella categoria. Inserisci una quantità disponibile di biglietti');
    
  } else {
    $("#error").hide();
    let quantita =   $("#quantita" + n).val();
    $.getJSON( "function.php",
          
      {
          modifica : 'modifica',
          quantita : quantita,
          idEvento :id,
          posizione : posizione,
          prezzo, prezzo,
          citta : citta,
          data : data
      },
      
      
      function(dataResult){
        console.log("%s", dataResult);
        getCart();
        updateCart();
      }
    );
  }

}

function elimina(id, posizione, prezzo, citta, data){
  console.log("%s", prezzo);
  $.getJSON( "function.php",
          
  {
      rimuovi: "rimuovi",

          idEvento :id,
          posizione : posizione,
          prezzo, prezzo,
          citta : citta,
          data : data
  },
  
  function(dataResult){
    console.log("%s", dataResult);
    getCart();
    updateCart();
  }
);
}




function stampaCart( ticket){

  let result = "";
  let articolo =  `
  <div class="row">
  <div class="col-sm-8 offset-sm-2">
  <table>
  <tr>
      <th></th>
      <th>Evento</th>
      <th>Posizione</th>
      <th>Prezzo</th>
      <th>Quantità</th>
  </tr>
  `
;
result += articolo; 
 let prezzo =0;
for(let i=0; i < ticket.length; i++){ 
  articolo =  `
  <div>
  <tr>
      <td width="20%"><img class="cart-img" src=" ${ticket[i]['img']}  " alt=" 'Locandina di'${ticket[i]["nome"]}" ?></td>
      <td width="20%"> ${ticket[i]['nome']}<br/>${ticket[i]['citta']} <br/> ${ticket[i]['data']}</td>
      <td width="10%"> ${ticket[i]['posizione']}</td>
      <td width="10%">${ticket[i]['prezzo']}€</td>
      <td width="20%">
        <input type='number' size = "1" value='${ticket[i]['quantita']}' id='quantita${[i]}' name='quantita' min='1' max= "${ticket[i]["rimanenti"]}"/>
        <button class="buttonCart" type="button" onclick="modifica('${ticket[i]['idEvento']}', '${ticket[i]['posizione']}', '${ticket[i]['prezzo']}', '${ticket[i]["rimanenti"]}' , '${ticket[i]["citta"]}' , '${ticket[i]["data"]}', '${[i]}')">Modifica</button>
        <button class="buttonCart" type="button" onclick="getCart()">Annulla modifica</button>
      </td>
      <td width="20%"><button class="buttonCart" type="button" onclick="elimina('${ticket[i]['idEvento']}', '${ticket[i]['posizione']}','${ticket[i]['prezzo']}', '${ticket[i]['citta']}', '${ticket[i]['data']}' )">Rimuovi dal carrello</button></td>
  </tr>
  <div>
  `;
  result += articolo;

 prezzo += (Number(ticket[i]['prezzo'])*Number(ticket[i]['quantita']));
}

articolo =  `
</table>
</div>
</div>
<div class="spacer5"></div>
<div class="row">
<div class="colCart col-sm-2 offset-sm-2">
  <button class="buttonCart2" type="button" onclick="svuota()">Svuota il carrello</button>
</div>
<div class="col-sm-2">
<form class="acquista" method="get" action= "acquista.php">
    <button class="buttonCart2" type="submit">Acquista</button>
  </form>
 
</div>
<div class="col-sm-2 offset-sm-2">
Totale prezzo: ${prezzo} € 
</div>
</div>
`;

result += articolo;
    return result;
}


function getCart(){
  $("#error").hide();
  $.getJSON( "function.php",
          
    {
       		getCookies : "cookies"
    },
    
    
    function(dataResult){
      console.log("%s", dataResult);
      
    if(dataResult!= "error" && dataResult.length != 0){
        console.log("%s", dataResult);
        console.log("%d",  dataResult.length);
      
     let articoli =  stampaCart(dataResult);
        
        const main = $("#carrello");
        main.empty();
        main.append(articoli);
      }else{
        let articoli = "<p> Il carrello è vuoto</p>"
        const main = $("#carrello");
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
   
getCart();
  });
  