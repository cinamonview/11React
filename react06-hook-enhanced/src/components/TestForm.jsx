import { useRef } from "react";



const TestForm = () => {
    const formRef = useRef();

    async function sendTest(formData){
        /*
        매개변수 formData의 get() 함수를 통해
        폼값을 받을 수 있다.
        */
        console.log('폼값',formData.get('message'));
        formRef.current.reset();
    }


    return ( <>
        <h2>formData.get() 함수로 폼값 처리하기</h2>
        {/* 퓨ㅗㅁ값을 submit 하면 action에 지정된 함수에서 폼값 처리 가능 */}
        <form action={sendTest} ref={formRef}>
            <input type="text" name="message"/>
            <input type="submit" value="전송하기" />
        </form>
    </>);
}


export default TestForm;