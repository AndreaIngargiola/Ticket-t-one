
function stampaInfo(){

    let  articolo =  `
    <h3>Informazioni carta di credito</h3>
    <div class="spacer5"></div>

        <form class="form-horizontal" id="formody"  onsubmit="return false" method="POST">

            <div class="form-group row">
                <label class="control-label col-sm-4" for="email">Nome titolare:</label>
                <div class="col-sm-5">
                    <input type="text" class="form-control" id="nome" placeholder="Inserire nome titolare" name="nome">
                </div>
            </div>
            <div class="form-group row">
                <label class="control-label col-sm-4" for="email">Cognome titolare:</label>
                <div class="col-sm-5">
                    <input type="text" class="form-control" id="cognome" placeholder="Inserire cognome titolare" name="cognome">
                </div>
            </div>
            <div class="form-group row">
                <label class="control-label col-sm-4" for="pwd">Numero carta:</label>
                <div class="col-sm-5">
                    <input type="password" onKeyPress="if(this.value.length==12) return false"class="form-control" id="cartaDiCredito" placeholder="Inserire numero carta di credito" name="cartaDiCredito">
                </div>
            </div>
            <div class="form-group row">
                <label class="control-label col-sm-4" for="pwd">Scadenza:</label>
                <div class="col-sm-5">
                    <input type="month" min="2020" class="form-control" id="scadenza" name="scadenza">
                </div>
            </div>
            <div class="form-group row">
                <label class="control-label col-sm-4" for="pwd">Codice di controllo:</label>
                <div class="col-sm-5">
                    <input type="password" onKeyPress="if(this.value.length==3) return false"class="form-control" id="numeroControllo" placeholder="Inserire codice di controllo" name="numeroControllo">
                </div>
            </div>
            <div class="form-group row">
                <div class="col-sm-offset-2 col-sm-4">
                    <input type="submit" name="acquista" class="btn btn-default buttonCart" value="Acquista" id="butAcquisto">
                </div>
            </div>
        </form>
        
        <div class="col-sm-offset-2 col-sm-5">
            <p>Torna al <a href="cart.php">carrello</a></p>
        </div>
</div>

    `;
    return articolo;

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

function stampaCart( ticket){

    let result = "";
    let articolo ="";
   let prezzo =0;
  for(let i=0; i < ticket.length; i++){ 
    articolo =  `
    <div class="divAcqBetw">
        <h5>Biglietto ${[i+1]}: </h5>
        <p>${ticket[i]['nome']}<br/>
        Città: ${ticket[i]['citta']} <br/>
        Data: ${ticket[i]['data']}<br/>
        Posizione: ${ticket[i]['posizione']}<br/>
        Quantità: ${ticket[i]['quantita']}<br/>
        Prezzo per biglietto: ${ticket[i]['prezzo']}€</p>
    </div>
    
    `;
    result += articolo;
  
   prezzo += (Number(ticket[i]['prezzo'])*Number(ticket[i]['quantita']));
  }
  
  articolo =  `
  <div class="spacer5"> Totale prezzo: ${prezzo} € </div>
 
  `;
  
  result += articolo;
      return result;
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

function svuota(){
    $.getJSON( "function.php",
          
    {
        svuota: "svuota"	
    },
    
    
    function(dataResult){
        updateCart();
        const main = $("#page");
        main.empty();
        $("#success").show();
        $('#success').html('Il tuo acquisto è andato a buon fine. Puoi visualizzare tutti i biglietti acquistati nella tua pagina Account');
        
        
    }
)};

function getCart(){
    $.getJSON( "function.php",
            
      {
                 getCookies : "cookies"
      },
      
      
      function(dataResult){

        
       let articoli =  stampaCart(dataResult);
          
       const main = $("#riepilogo");
       main.append(articoli);
      });
  }

  function insert(ticket){
    console.log("tcket n %d", ticket.length);
    for(let i=0; i < ticket.length; i++){
        console.log(" n biglietti %d", ticket[i]['quantita']);
        $.ajax({
        
            url: "function.php",
            type: "POST",
            data: {
                acquista: "acquista",
                posizione : ticket[i]['posizione'],
                prezzo : ticket[i]['prezzo'],
                quantita : ticket[i]['quantita'],
                evento : ticket[i]['idEvento']		
            },
            
            cache: false,
            success: function(dataResult){
                updateCart();
                svuota();
                console.log("%d", dataResult);
            }
        });
    }
  }
 
  $(document).ready(function(){
     
  getCart();
  let articoli = stampaInfo();
  const main = $("#acquisto");
  main.append(articoli);

  $('#butAcquisto').on('click', function() {
                
    let nome = $('#nome').val();
    let cognome = $('#cognome').val();
    let carta = $('#cartaDiCredito').val();
    let scadenza = $('#scadenza').val();
    let codice = $('#numeroControllo').val();
    console.log("%d", carta.length);
    if(nome!="" && cognome!="" && carta!="" && scadenza!="" && codice!=""&& carta.length==12 && codice.length==3 && $.isNumeric(carta) && $.isNumeric(codice) ){
    
        $.getJSON( "function.php",
            
        {
            getCookies : "cookies"
        },
     
        function(ticket){
            console.log("tcket n %d", ticket.length);
            insert(ticket);
            console.log("finito");
        });
       
    } else{
        alert('Riempi tutti i campi in modo corretto!');
    }
          
});
});
    
       


    