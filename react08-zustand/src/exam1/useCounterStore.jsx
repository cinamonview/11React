// 상태저장소 생성을 위해 create 함수 import해준다.

import { create } from "zustand";

// 상태저장소 생성해준다.
// set, get  함수는 zustand 라이브러리에서 제공하는 함수이다.
// set 함수는 상태를 업데이트하는 함수이다.
// get 함수는 상태를 가져오는 함수이다.
// 상태저장소 생성해준다.
// set, get  함수는 zustand 라이브러리에서 제공하는 함수이다.
// set 함수는 상태를 업데이트하는 함수이다.
// get 함수는 상태를 가져오는 함수이다.
// 상태저장소 생성해준다.
// set, get  함수는 zustand 라이브러리에서 제공하는 함수이다.
// set 함수는 상태를 업데이트하는 함수이다.
// get 함수는 상태를 가져오는 함수이다.

const useCounterStore = create((set,get)=>({
    // 상태변수 count 선언 및 초기화
    count: 0,
    // 증가 함수 increment 선언
    // 상태 변경을 위한 함수 정의 
    increment : () =>{
        // get() 함수를 통해 현재 상태값 가져오기
        const current = get().count;
        if (current >=10) {
            alert('최대값은 10원입니다.');
            return;
        }
        // set() 함수를 통해 상태를 변경한다.
        // 상태변수 count에 현재 상태값 + 1 값을 저장한다.
        set({ count: current + 1});
    },
    // 감소 함수 decrement 선언
    // 상태 변경을 위한 함수 정의 
    decrement : () =>{
        // get() 함수를 통해 현재 상태값 가져오기
        const current = get().count;
        if (current <=0){
            alert('최소값은 0입니다');
            return;
        }
        // set() 함수를 통해 상태를 변경한다.
        // 상태변수 count에 현재 상태값 - 1 값을 저장한다.
        set({ count: current - 1});
    },
    // 초기화 함수 reset 선언
   
    // 상태 변경을 위한 함수 정의 
    reset : () =>{
        // set() 함수를 통해 상태를 변경한다.
        // 상태변수 count에 0 값을 저장한다.
         // 카운트 리셋 0으로 초기화
        set({ count: 0});
    }
}));

export default useCounterStore;
