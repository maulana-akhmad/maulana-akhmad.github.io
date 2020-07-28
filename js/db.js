let dbPromised = idb.open("psg-squad", 1.2, function(upgradeDb) {
    let squadObjectStore = upgradeDb.createObjectStore("squad", {
      keyPath: "id"
    });
    squadObjectStore.createIndex("squad_save", "squad_save", { unique: false });
  });

  //save data
  function saveSquad(squad) {
      dbPromised
      .then(db => {
      let tx = db.transaction("squad","readwrite");
      let store = tx.objectStore("squad");
      console.log(squad);
      store.put(squad.player);
      return tx.complete;
      })
      .then(() => {
          alert("Squad Saved Successfully")
      });
  };

  //menampilkan data yang tersimpan
  function getAll() {
       return new Promise(function(resolve, reject){
         dbPromised
         .then(db => {
           let tx = db.transaction("squad", "readonly");
           let store = tx.objectStore("squad");
           return store.getAll();
         })
         .then(squad => {
           resolve(squad);
         })
       }) 
  }


  //menampilkan Id dari indexedDb
  function getById(id) {
    return new Promise(function(resolve, reject){
      dbPromised
      .then(db =>{
        const tx = db.transaction('squad','readonly');
        const store = tx.objectStore('squad');
        return store.get(parseInt(id))
      })
      .then(squad => {
        resolve(squad);
      })
    })
  }

  //delete id Db
  function deleteSquad(id){
    dbPromised
      .then(db => {
      let tx = db.transaction('squad','readwrite');
      let store = tx.objectStore('squad');
      store.delete(parseInt(id));
      return tx.complete;
      })
      .then(() => {
          alert("Deleted Squad Successfully")
      });
  }
