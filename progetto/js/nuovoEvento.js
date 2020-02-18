let i =0;
let idEvento =0;
let f=0;

function stampaEvento(tour){

    let  articolo =  `
    <h2>${tour}</h2>
    <h3>Inserisci le informazioni sul nuovo evento</h3>
    <div class="spacer5"></div>
    <div class="nuovTProva">
            <div class="form-group row">
                <label class="control-label col-sm-2" for="email">Regione:</label>
                <div class="col-sm-4">
                    <input type="text" class="form-control" id="regione" placeholder="Inserire regione evento" name="regione">
                </div>
            </div>
            <div class="form-group row">
                <label class="control-label col-sm-2" for="email">Città:</label>
                <div class="col-sm-4">
                    <input type="text" class="form-control" id="citta" placeholder="Inserire città evento" name="citta">
                </div>
            </div>
            <div class="form-group row">
                <label class="control-label col-sm-2" for="pwd">Indirizzo:</label>
                <div class="col-sm-4">
                    <input type="text" class="form-control" id="indirizzo" placeholder="Inserire indirizzo evento" name="indirizzo">
                </div>
            </div>
            <div class="form-group row">
                <label class="control-label col-sm-2" for="pwd">Nome locale:</label>
                <div class="col-sm-4">
                    <input type="text" class="form-control" id="nomeLuogo" placeholder="Inserire nome del locale dell'evento" name="nomeLuogo">
                </div>
            </div>
            <div class="form-group row">
                <label class="control-label col-sm-2" for="pwd">Data evento:</label>
                <div class="col-sm-4">
                    <input type="date" min="2020" class="form-control" id="date" name="date">
                </div>
            </div>
            <div class="form-group row">
                <label class="control-label col-sm-2" for="pwd">Data inizio prenotazione:</label>
                <div class="col-sm-4">
                    <input type="date" min="2020" class="form-control" id="dataPrenotazione" name="dataPrenotazione">
                </div>
            </div>
            <div class="form-group row">
                <label class="control-label col-sm-2" for="pwd">Descrizione:</label>
                <div class="col-sm-4">
                    <textarea name="descrizione" id="descrizione" rows="3"  placeholder="Inserire descrizione Tour"></textarea>                
                </div>
            </div>
            <div class="feature form-group row">
                <label class="control-label col-sm-2" for="email">Feature 1:</label></br></br>
                <div class="col-sm-4">
                    <input type="text" class="form-control" id="feature${0}" placeholder="Inserire artista secondario dell'evento" name="feature${0}">
                </div>
            </div>
            <div class="form-group row">
                <div class="col-sm-offset-2 col-sm-2">
                    <button class="addF" type="button" id = "addF" onclick="addF()">Aggiungi un altro featuring</button></br>
                </div>
                <div class="col-sm-offset-2 col-sm-1">
                    <input type="submit" name="crea" value="Crea Evento" id="butCreazione">
                </div>
                
            </div>
</div>

    `;
    return articolo;

}


function addF() {

    f++;
    let  articolo =  `
    
        <label class="control-label col-sm-2" for="email">Feature ${f+ 1}:</label></br></br>
            <div class="col-sm-4">
                <input type="text" class="form-control" id="feature${f}" placeholder="Inserire artista secondario dell'evento" name="feature${f}"></br>
            </div>
  
    `;

    $(".feature").append(articolo);
};
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
  };

  function getTour(){
    
    let nome = getUrlParameter('tourNome');
    nome= nome.split("+").join(" ");

    return nome;
   }
 
   function addT() {

    i++;
    let  articolo =  `
    <tr>
    <td><input type="text" class="posizione form-control" id="posizione${i}" placeholder="Inserire posizione biglietto" name="posizione${i}">
    </td>
    <td><input type="number" class="prezzo form-control" id="prezzo${i}"  placeholder="Inserire prezzo biglietto"name=" prezzo${i}">
    </td>
    <td><input type="number" class="numero form-control" id="numero${i}"  placeholder="Inserire numero biglietti"name=" numero${i}">
    </td>
</tr>

    `;

    $("#biglietti").append(articolo);
};

function end() {
                
    let posArray= [];
    let prezzoArray =[];
    let numArray = [];
    let flag = false;

   

    for(let j=0; j<=i; j++){

        let posizione = $("#posizione"+j).val();
        let prezzo = $("#prezzo" + j).val();
        let numero = $("#numero" + j).val();
        
        if(posizione == "" || prezzo =="" || numero == "" ){
           flag = true;
           break;
            
        }
        posArray.push(posizione);
        prezzoArray.push(prezzo);
        numArray.push(numero);
    }

    if(flag == true){
        alert('Riempi tutti i campi in modo corretto!');
    } else {
 

        
        $.ajax({
        
            url: "function.php",
            type: "POST",
            data: {
                inserisci: "inserisciBiglietto",
                posizione: posArray,
                prezzo: prezzoArray,
                numero : numArray,
                id : idEvento
            },
            
            cache: false,
            success: function(dataResult){
                const main = $("#evento");
                main.empty();
                $("#success").show();
                $('#success').html('Hai creato un nuovo evento!');

            }
        });
    }

};


function insertEvent(callback){
    let regione = $('#regione').val();
    let citta = $('#citta').val();
    let indirizzo = $('#indirizzo').val();
    let date = $('#date').val();
    let dataPrenotazione = $('#dataPrenotazione').val();
    let nomeLuogo = $('#nomeLuogo').val();
    let descrizione = $('#descrizione').val();
    let feature0 = $('#feature0').val();
   
    if(regione!="" && citta!="" && indirizzo!="" && date!="" && dataPrenotazione!="" && feature0 !="" ){

        let arrayFeature = [];
        let flag = false;
        for(let j = 0; j<=f; j++){
            if($("#feature"+ j).val() != "")
             {
                arrayFeature.push($("#feature"+ j).val());
             }
        }
        let tour = getTour();
 
        let today = new Date().toLocaleDateString()


       let  main = $("#evento");
        main.empty();


    let  articolo =  `
    <div class="spacer5"></div>

            <h3>Inserisci le informazioni sulla tipologia Biglietto</h3>
            <div class="nuovTProva">
            <table id="biglietti">
                    <tr>
                        <th>Posizione</th>
                        <th>Prezzo</th>
                        <th>Numero</th>
                    </tr>
                    <tr>
                        <td><input type="text" class="posizione form-control" id="posizione${0}" placeholder="Inserire posizione biglietto" name="posizione${0}">
                        </td>
                        <td><input type="number" class="prezzo form-control" id="prezzo${0}"  placeholder="Inserire prezzo biglietto" name="prezzo${0}">
                        </td>
                        <td><input type="number" class="numero form-control" id="numero${0}"  placeholder="Inserire numero biglietti" name="numero${0}">
                        </td>
                    </tr>
            </table>
            <div class="spacer2"></div>
            <div class="form-group row">
                <div class="col-sm-offset-2 col-sm-4">
                    <button class="addT" type="button" id = "addT" onclick="addT()">Aggiungi altra tipologia biglietti</button>
                </div>
                <div class="col-sm-offset-2 col-sm-1">
                    <input class="termina" type="button" name="termina" class="btn btn-default" id="butTermina" onclick="end()" value="Termina" />
                </div>
            </div>
            </div>
        
`;
        main = $("#evento");
        main.append(articolo);

       
        $.ajax({
        
            url: "function.php",
            type: "POST",
            data: {
                inserisciEvento: "inserisci",
                nomeTour : tour,
                regione : regione,
                citta : citta,
                indirizzo : indirizzo,
                date : date,
                dataPrenotazione : dataPrenotazione,
                descrizione : descrizione,
                today : today,
                nomeLuogo : nomeLuogo,
                feature : arrayFeature
            },
            
            cache: false,
            success: callback
        });
       
    } else{
        alert('Riempi tutti i campi in modo corretto!');
    }
}


  $(document).ready(function(){
  
   
    let tour = getTour();
  let articoli = stampaEvento(tour);
  let main = $("#evento");
  main.append(articoli);

  $('#butCreazione').on('click', function() {
                insertEvent(function(result){
                    idEvento= result;
                    console.log("%s", idEvento);
                });
               
   
});

          
});

    
       


    