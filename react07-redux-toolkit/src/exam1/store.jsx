// 리덕스 툴킷에서 제공하는 스토어 생성하는 함수를 임포트 한다.
// 스토어 생성을 위한 함수 임포트
import { configureStore } from "@reduxjs/toolkit";
// 슬라이스 임포트
import counterReducer from "./counterSlice";

// 스토어 생성 및 익스포트
export const store = configureStore({
    // 상태변경을 위한 리듀서 함수를 등록해준다.
    // 슬라이스 이름을 키로 사용하고, 슬라이스 임포트한 리듀서 함수를 값으로 사용한다.
    reducer: {
        myCounter: counterReducer,  
    }
});

