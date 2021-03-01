const Dexie=require('Dexie');
const IDBExportImport =require('indexeddb-export-import');

const db=new Dexie('CharacterDB');
db.version(1).stores({
	characterDetails:'name,movie,id,actor',
});
db.open()
    .then(function (){
	    const idbDatabase=db.backendDB();
	    IDBExportImport.importFromObject(idbDatabase,"/characters.json");
	    console.log("imported data succesfully");
    }
);