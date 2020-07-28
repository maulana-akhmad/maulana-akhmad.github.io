class GetData {
    constructor(url, token){
        this.url = url;
        this.token = token;
    }

    getPSG(){

        if ("caches" in window) {
         caches.match(this.url + 'v2/teams/524')
        .then(resp => resp.json())
        .then(resp => {
            const {activeCompetitions, address, area, clubColors, crestUrl, email, founded, id, lastUpdated, name, phone, shortName, squad, tla, venue, website} = resp;
            document.getElementById('psg').innerHTML = `
                <p style='text-align: center'>
                <img src='${crestUrl}' alt='psg' style='width: 15rem'/> <br><br>
                <b> ${name} </b> </p>
            `;
            
            document.getElementById('info').innerHTML = `
                <b>Club Name :</b> ${name} <br>
                <b>Short Name :</b> ${shortName} <br>
                <b>Founded :</b> ${founded} <br>
                <b>Club Colors :</b> ${clubColors} <br>
                <b>Total Squad :</b> ${squad.length} <br>
                <b>Phone :</b> ${phone} <br>
                <b>Email :</b> ${email} <br>
                <b>Website :</b> ${website} <br>
                <b>Competition :</b> ${activeCompetitions[0].name}
            `;
            
        })
        .catch(err => console.log(err))
        }

        fetch(this.url + 'v2/teams/524', {
        headers : {
            'X-Auth-Token' : this.token
        },
        })
        .then(resp => resp.json())
        .then(resp => {
            const {activeCompetitions, address, area, clubColors, crestUrl, email, founded, id, lastUpdated, name, phone, shortName, squad, tla, venue, website} = resp;
            document.getElementById('psg').innerHTML = `
                <p style='text-align: center'>
                <img src='${crestUrl}' alt='psg' style='width: 15rem'/> <br><br>
                <b> ${name} </b> </p>
            `
            document.getElementById('info').innerHTML = `
                <b>Club Name :</b> ${name} <br>
                <b>Short Name :</b> ${shortName} <br>
                <b>Founded :</b> ${founded} <br>
                <b>Club Colors :</b> ${clubColors} <br>
                <b>Total Squad :</b> ${squad.length} <br>
                <b>Phone :</b> ${phone} <br>
                <b>Email :</b> ${email} <br>
                <b>Website :</b> ${website} <br>
                <b>Competition :</b> ${activeCompetitions[0].name}
            `;
        })
        .catch(err => console.log(err))
    }
    
    getSquad(){
        
        if(navigator.onLine) {
            
            fetch(this.url + 'v2/teams/524', {
                headers : {
                    'X-Auth-Token' : this.token
                },
                })
                .then(resp => resp.json())
                .then(resp => {
                    
                    const {activeCompetitions, address, area, clubColors, crestUrl, email, founded, id, lastUpdated, name, phone, shortName, squad, tla, venue, website} = resp;
                    squad.forEach(s =>{
                        
                        const one = document.getElementById('squad');
                        const two = document.createElement('div');
                        two.innerHTML =`                     
                        <div class="col s12 m6">
                            <div class="card">
                            <a href="./squad.html?id=${s.id}">
                                <div class="card-content content-squad">
                                    <b>Name :</b> ${s.name} <br>
                                    <b>Nationality :</b> ${s.nationality} <br>
                                    <b>Position :</b> ${s.position}<br>
                                    <b>Role :</b> ${s.role}                                 
                                </div>
                            </a>
                            </div>    
                        </div>                
                        `;
                        one.appendChild(two);
                        document.getElementById('loader').style.display = 'none';
                    });
                })
                .catch( () => this.getSquadCache());
        } else {            
            this.getSquadCache();
        } 

    };

    getSquadCache() {
        
        if ("caches" in window) {
            caches.match(this.url + 'v2/teams/524')
            .then(resp => resp.json())
            .then(resp => {
                const {activeCompetitions, address, area, clubColors, crestUrl, email, founded, id, lastUpdated, name, phone, shortName, squad, tla, venue, website} = resp;
                squad.forEach(s =>{
                    
                    const one = document.getElementById('squad');
                    const two = document.createElement('div');
                    two.innerHTML =`                    
                    <div class="col s12 m6">
                        <div class="card">
                        <a href="./squad.html?id=${s.id}">
                            <div class="card-content content-squad">
                                <b>Name :</b> ${s.name} <br>
                                <b>Nationality :</b> ${s.nationality} <br>
                                <b>Position :</b> ${s.position} <br>
                                <b>Role :</b> ${s.role}       
                            </div>
                        </a>
                        </div>    
                    </div>                    
                    `;
                    one.appendChild(two);                    
                    document.getElementById('loader').style.display = 'none';
                });
            })
            .catch(err => console.log(err));
        }
    }

    getSquadId(){    

        return new Promise(function(resolve, reject){

        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");

        if(navigator.onLine){
            fetch(url + 'v2/players/' + idParam + '/matches', {
                headers : {
                    'X-Auth-Token' : token
                }
            })
            .then(resp => resp.json())
            .then(resp => {
                const {count, filters, matches, player} = resp;
                        matches.forEach(m =>{
                            const one = document.getElementById('match-content');
                            const two = document.createElement('div');
                            two.innerHTML= `                        
                            <div class="col s12 m6">
                                <div class="card">
                                    <div class="card-content">
                            <p style="text-align:center">
                            <b>${m.competition.name}</b> <br>${m.utcDate}<br><br>
                            ${m.awayTeam.name} : <b> ${m.score.fullTime.awayTeam}</b><br><i>VS</i><br> ${m.homeTeam.name} : <b> ${m.score.fullTime.homeTeam}</b>
                            <br>
                            </p>
                                    </div>
                                </div>
                            </div>
                            `;                            
                            
                            one.appendChild(two);                            
                        })            
                console.log(resp);
                document.getElementById('body-content').innerHTML = `
                <b>Name :</b> ${resp.player.name} <br>
                <b>Nationality :</b> ${resp.player.nationality} <br>
                <b>Date of Birth :</b> ${resp.player.dateOfBirth} <br>
                <b>Position :</b> ${resp.player.position}<br> 
                `;
                resolve(resp);
                document.getElementById('loader').style.display = 'none';
            })
            .catch();
        } else {
            
            if ("caches" in window) {
                caches.match(url + 'v2/players/' + idParam + '/matches') 
                .then(resp => resp.json())
                .then(resp => {     
                    const {count, filters, matches, player} = resp;
                        matches.forEach(m =>{
                            const one = document.getElementById('match-content');
                            const two = document.createElement('div');
                            two.innerHTML= `                        
                            <div class="col s12 m6">
                                <div class="card">
                                    <div class="card-content">
                            <p style="text-align:center">
                            <b>${m.competition.name}</b> <br>${m.utcDate}<br><br>
                            ${m.awayTeam.name} : <b> ${m.score.fullTime.awayTeam}</b><br><i>VS</i><br> ${m.homeTeam.name} : <b> ${m.score.fullTime.homeTeam}</b>
                            <br>
                            </p>
                                    </div>
                                </div>
                            </div>
    
                            `;
                            
                            one.appendChild(two);
                        })        
                    document.getElementById('body-content').innerHTML = `
                    <b>Name :</b> ${resp.player.name} <br>
                    <b>Nationality :</b> ${resp.player.nationality} <br>
                    <b>Date of Birth :</b> ${resp.player.dateOfBirth} <br>
                    <b>Position :</b> ${resp.player.position}<br> 
                    `;
                    
                    resolve(resp);
                    document.getElementById('loader').style.display = 'none';
                    })                
                
            .catch(err => console.log(err));
            }
        }
        
    })
    };   
};

const token = 'ed19c6f76bf64e8aa5dcec611e725f4f';
const url = 'https://api.football-data.org/';

const url_token = new GetData(url, token);

//PSG Info
function getPSGInfo() {
    url_token.getPSG();   
};

//List Squad
function getSquadInfo() {
    url_token.getSquad();
};

