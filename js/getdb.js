//get indexeddb
function getSavedSquad() {

    getAll().then(squad => {
        console.log(squad);
        squad.forEach(squad =>{

            const one = document.getElementById('favorite');
            const two = document.createElement('div');

            two.innerHTML += `
            <div class="col s12 m6">
                <div class="card">
                    <a href="./squad.html?id=${squad.id}&saved=true">
                        <div class="card-content">
                            <b>Name :</b> ${squad.name} <br>
                            <b>Nationality :</b> ${squad.nationality} <br>
                            <b>Date of Birth :</b> ${squad.dateOfBirth} <br>
                            <b>Position :</b> ${squad.position}<br>
                        </div>
                    </a>
                </div>
            </div> 
            `;
            one.appendChild(two);

        });

    })
}


//delet id db
function deleteSquadById(){
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');
    deleteSquad(idParam);
}

//get url id squad in indexeddb
function getSavedSquadById(){
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');

    getById(idParam).then(squad => {
        console.log(squad);
        document.getElementById('body-content').innerHTML = `
            <b>Name :</b> ${squad.name} <br>
            <b>Nationality :</b> ${squad.nationality} <br>
            <b>Date of Birth :</b> ${squad.dateOfBirth} <br>
            <b>Position :</b> ${squad.position}<br> 
            `;

    })
}