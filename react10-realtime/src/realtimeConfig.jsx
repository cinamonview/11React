
// 파이어베이스 서비스 초기화 함수
import { initializeApp } from 'firebase/app';
// 리얼타임 데이터베이스 함수
import { getDatabase } from 'firebase/database';

// SDK정보. 리얼타임에서는 databaseURL 항목이 추가가 되고 필수 항목이다.
const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    databaseURL: import.meta.env.VITE_databaseURL,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId,
    measurementId: import.meta.env.VITE_measurementId,
}

//파이어베이스 서비스 초기화 및 리얼타임 데이터베이스 객체 생성.
const app = initializeApp(firebaseConfig);
const realtime = getDatabase(app);
export { realtime };