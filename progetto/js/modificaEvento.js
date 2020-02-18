function stampaEvento(evento){

    let  articolo =  `

    <div class="spacer5"></div>
        <h2>[${evento[0]}] ${evento[1]}, ${evento[2]}, ${evento[3]}</h2>
        <form class="form-horizontal" id="formody"  onsubmit="return false" method="POST">
            <h5>Modifica la data dell'evento. Un messaggio verrà inviato automaticamente agli acquirenti </h5>
            <div class="form-group row">
                <label class="control-label col-sm-2" for="email">Data:</label>
                <div class="col-sm-4">
                    <input type="date" class="form-control" id="date" placeholder="Inserire la nuova data dell'evento" name="date">
                </div>
            </div>

            <div class="form-group row">
                <div class="col-sm-offset-2 col-sm-4">
                    <input type="submit" name="crea" class="btn btn-default buttonCart" value="Modifica Evento" id="butModifica">
                </div>
            </div>
        </form>
        <form class="form-horizontal" id="formody"  onsubmit="return false" method="POST">
        <h5>Inserisci un messaggio da inviare agli acquirenti dei biglietti dell'evento</h5>
            <div class="form-group row">
                <label class="control-label col-sm-2" for="email">Messaggio:</label>
                <div class="col-sm-4">
                    <textarea name="descrizione" id="messaggio" rows="3"  placeholder="Inserire messaggio"></textarea>                
                </div>
            </div>
            <div class="form-group row">
                <div class="col-sm-offset-2 col-sm-4">
                    <input type="submit" name="crea" class="btn btn-default buttonCart" value="Invia Messaggio" id="inviaMess">
                </div>
            </div>
        </form>

</div>

    `;
    return articolo;

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
  }

  function getEvento(){
    
    let idEvento = getUrlParameter('idEvento');
    let citta = getUrlParameter('citta');
    let data = getUrlParameter('data');
    let indirizzo = getUrlParameter('indirizzo');
    indirizzo = indirizzo.split("+").join(" ");
    return Array(idEvento, citta, data, indirizzo);
   }
 
  $(document).ready(function(){
  
    let evento = getEvento();
  let articoli = stampaEvento(evento);
  const main = $("#evento");
  main.append(articoli);

  $('#butModifica').on('click', function() {
    console.log("fg");
    
    let date = $('#date').val();
    if(date!=""){
        console.log("%s", evento[0]);
        
        $.ajax({
        
            url: "function.php",
            type: "POST",
            data: {
                modificaEvento: "modificaEvento",
                idEvento : evento[0],
                date: date
            },
            
            cache: false,
            success: function(dataResult){
              console.log("%s", dataResult);
                const main = $("#evento");
                main.empty();
                $("#success").show();
                $('#success').html("Hai modificato l'evento!");
            
            }
        });
    }else{
        alert('Riempi il campo in modo corretto!');
    }
    });

    $('#inviaMess').on('click', function() {
           
        $.ajax({
            
            url: "function.php",
            type: "POST",
            data: {
                getTourByEvent: "info",
                idEvento : evento[0],
              
            },
            
            cache: false,
            success: function(dataResult){
                
                let data= dataResult.data;
                let citta= dataResult.citta;
                let nomeTour = dataResult.nomeTour;

                let messaggio = $("#messaggio").val();
                $.ajax({
                
                    url: "function.php",
                    type: "POST",
                    data: {
                        inviaMess: "invia",
                        idEvento : evento[0],
                        messaggio: messaggio,
                        data :data,
                        citta : citta,
                        nomeTour : nomeTour
                    },
                    
                    cache: false,
                    success: function(dataResult){
                        const main = $("#evento");
                        main.empty();
                        $("#success").show();
                        $('#success').html("Hai inviato il messaggio!");
                    }
                });

        }
    });



});


});
    
       


    