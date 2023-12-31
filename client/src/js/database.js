import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

//adds content to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  //create a connection to the database database and version
  const jateDb = await openDB('jate', 1);

  //create a new transaction
  const tx = jateDb.transaction('jate', 'readwrite');
  
  //open up the desired object store
  const store = tx.objectStore('jate');

  //update the data in the database
  const request = store.put({ id: 1, value: content });
  
  //get confirmation of the request
  const result = await request;
  console.log('Data saved to the database', result);
};

//get all content from the database
export const getDb = async () => {
  console.log('GET from the database');

  //create a connection to the database database and version
  const jateDb = await openDB('jate', 1);

  //create a new transaction
  const tx = jateDb.transaction('jate', 'readonly');

  //open up the desired object store
  const store = tx.objectStore('jate');

  //get all data in the database
  const request = store.getAll();

  //get confirmation of the request
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
