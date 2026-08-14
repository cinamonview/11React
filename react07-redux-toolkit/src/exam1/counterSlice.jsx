
// 리덕스 툴킷에서 제공하는 슬라이스 생성하는 함수를 임포트 한다.
import { createSlice } from "@reduxjs/toolkit";

// 슬라이스를 생성한다.
const counterSlice = createSlice({
    // 슬라이스 이름
    name: 'mycounter',
    // 상태의 초기값
    initialState: { myValue: 0 },
    // 상태변경을 위한 리듀서 함수 정의(상태값을 변경하거나 리셋.)
    reducers: {
        increment: (state) => {
            state.myValue += 1;
        },
        decrement: (state) => {
            state.myValue -= 1;
        },
        reset: (state) => {
            state.myValue = 0;
        }
    }
});

// 액션 생성 함수들을 구조분해해서 추출한후 익스포트(내보내기)
export const { increment, decrement, reset } = counterSlice.actions;
// 리듀서 함수를 익스포트(내보내기)
export default counterSlice.reducer;