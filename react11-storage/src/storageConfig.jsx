import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId,
    databaseURL: import.meta.env.VITE_databaseURL,
};

const app = initializeApp(firebaseConfig);
/*
스토리지 연결정보를 가진 객체를 얻어올때, StorageURL 이 두번째
인수로 전달되어야한다.
*/
const storage = getStorage(app, import.meta.env.VITE_storageURL);
export { storage };