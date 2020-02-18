let i = 0;

function stampaFine(nome){
    let  articolo =  `
    <h3>Voi inserire ora gli eventi di questo tour?</h3>
    <div class="spacer5"></div>
    <div class="nuovTProva">
       
            <div class="row">
                <div class="col-sm-offset-2 col-sm-2">
                    <button type="submit" class="btn btn-default" id="butCreazione" onclick="caricaNuovoEvento()">Aggiungi un evento </button>
                    <input type="hidden" name="tourNome" value="${nome}" id="tourNome">
                </div>
       
        <div class="col-sm-offset-2 col-sm-4">
            <button type="button" name="termina" class="btn btn-default" id="butTermina"  onclick="end()">Termina</button>
        </div>
        </div>
    </div>
       

    `;
    return articolo;

}

function caricaNuovoEvento() {
    tour= $("#tourNome").val();
    location.href=`nuovoEvento.php?tourNome=${tour}`;
}

function stampaTour(){

    let  articolo =  `
    <h3>Inserisci le informazioni sul nuovo tour</h3>
    <div class="spacer5"></div>
        <div class="nuovTProva">
            <div class="form-group row">
                <label class="control-label col-sm-2" for="email">Nome:</label>
                <div class="col-sm-4">
                    <input type="text" class="form-control" id="nome" placeholder="Inserire nome Tour" name="nome">
                </div>
            </div>
            <div class="form-group row">
                <label class="control-label col-sm-2">Tipologia:</label>
                <div class="col-sm-4">
                    <select name="cars" id="tipologia">
                        <option value="Concerto" checked >Concerto</option>
                        <option value="Manifestazione sportiva">Manifestazione sportiva</option>
                        <option value="Spettacolo teatrale">Spettacolo teatrale</option>
                        <option value="Proiezione cinematografica">Proiezione cinematografica</option>
                    </select>                
                </div>
            </div>
            <div class="form-group row">
                <label class="control-label col-sm-2" for="email">Descrizione:</label>
                <div class="col-sm-4">
                    <textarea name="descrizione" id="descrizione" rows="3"  placeholder="Inserire descrizione Tour"></textarea>                
                </div>
            </div>
            <div class="form-group row">
                <label class="control-label col-sm-2">Locandina tour 1:1 :</label>
                <div class="col-sm-4">
                <input type="file" name="quadrata" id="quadrata" accept="image/*">
                </div>
            </div>
            <div class="form-group row">
                <label class="control-label col-sm-2">Locandina tour 16:9 :</label>
                <div class="col-sm-4">
                    <input type="file" name="orizzontale" id="orizzontale" accept="image/*">
                </div>
            </div>
            <div class="form-group row">
                <label class="control-label col-sm-2">Locandina tour 2:3 :</label>
                <div class="col-sm-4">
                    <input type="file" name="verticale" id="verticale" accept="image/*">
                </div>
            </div>
            <div class="host form-group row">
                <label class="control-label col-sm-2" for="email">Host 1:</label></br></br>
                <div class="col-sm-4">
                    <input type="text" class="form-control" id="host${0}" placeholder="Inserire artista principale del Tour" name="host${0}">
                </div>
            </div>
            <div class="form-group row">
                <div class="col-sm-offset-2 col-sm-1">
                    <input type="submit" name="crea" value="Crea Tour" id="butCreazione">
                </div>
                <div class="col-sm-offset-2 col-sm-4">
                    <button class="add" type="button" id = "add" onclick="add()">Aggiungi un altro host</button>
                </div>
            </div>
            </div>
        
</div>

    `;
    return articolo;

}

function add() {

    i++;
    let  articolo =  `
    <label class="control-label col-sm-2" for="email">Host ${i+ 1}:</label></br></br>
                <div class="col-sm-4">
                    <input type="text" class="form-control" id="host${i}" placeholder="Inserire artista principale del Tour" name="host${i}">
                </div>

    `;

    $(".host").append(articolo);
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


function end() {
    console.log("ciaooooo");  
    const main = $("#tour");
    main.empty();
    $("#success").show();
    $('#success').html('Hai creato un nuovo tour!');
    
      
};
 
  $(document).ready(function(){
  

  let articoli = stampaTour();
  const main = $("#tour");
  main.append(articoli);



  $('#butCreazione').on('click', function() {
                
    let nome = $('#nome').val();
    let tipologia = $('#tipologia').val();
    let descrizione = $('#descrizione').val();
    let quadrata = $('#quadrata').val();
    let orizzontale = $('#orizzontale').val();
    let verticale = $('#verticale').val();
    let host0 = $("#host0").val();
   
    if(nome!="" && descrizione!="" && quadrata!="" && orizzontale!="" && verticale!="" && host0!="" ){
    
        let arrayHost = [];
        let flag = false;
        for(let j = 0; j<=i; j++){
            if($("#host"+ j).val() != "")
             {
                arrayHost.push($("#host"+ j).val());
             }
        }
        const main = $("#tour");
        main.empty();
        let articoli = stampaFine(nome);
        main.append(articoli);

        
        $.ajax({
        
            url: "function.php",
            type: "POST",
            data: {
                inserisciTour: "inserisciTour",
                nome : nome,
                tipologia : tipologia,
                descrizione : descrizione,
                quadrata : quadrata,
                orizzontale : orizzontale,
                verticale : verticale,
                host : arrayHost
                
            },
            
            cache: false,
            success: function(dataResult){
                console.log("%s", dataResult);
            }
        });
       
    } else{
        alert('Riempi tutti i campi in modo corretto!');
    }
});


});
    
       


    