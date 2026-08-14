
// v파이어베이스 서비스 초기화를 위한 함수 임포트
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// 파이어베이스 콘솔에서 App 생성 후 발급받은 SDK 정보
const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId,
    measurementId: import.meta.env.VITE_measurementId,
};


// 파이어베이스에 연결 후 앱 초기화
const app = initializeApp(firebaseConfig);
// 파이어 스토어 사용을 위한 객체 생성 및 내보내귀
const firestore = getFirestore(app);
export { firestore };