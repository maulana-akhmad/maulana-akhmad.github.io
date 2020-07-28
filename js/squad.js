document.addEventListener("DOMContentLoaded", function() {

    const urlParams = new URLSearchParams(window.location.search);
    const isFromSaved = urlParams.get('saved');
    const save = document.getElementById('save');
    
    if (isFromSaved) {
        save.style.display = 'none';
        getSavedSquadById();
        clear();
        btnDelete();
        
    }    
    
    const item = url_token.getSquadId();
    save.onclick = function(){
        item.then(squad => {
            saveSquad(squad);        
        });   
    };
    
    function clear() {

        const dlt = document.createElement('div');
        dlt.innerHTML = 
        `        
        <div class="fixed-action-btn direction-top">
        <a class="btn-floating btn-large red" id="delete">
        <i class="large material-icons">delete</i>
        </a>
        </div>
        `;
        document.body.appendChild(dlt);
    }
    
    function btnDelete (){
        const del = document.getElementById('delete');
        del.onclick = function(){
            let conf = confirm('Are you want to delete this squad?');
            if (conf == true){
                deleteSquadById();
            }        
        };
    }
}); 

