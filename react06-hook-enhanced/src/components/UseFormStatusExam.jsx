import { useState } from "react";
import { useFormStatus } from "react-dom";

// 이름을 받은 후 1초 후 완료메세지를 반환해주는 비동기 함수    
async function submitForm(formData) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`"${formData.get("name")}" 님의 요청이 완료되었습니다.`);
        }, 1000);
    });
}

// 제출버튼 컴포넌트
const SubmitButton = () => {
    /*
    pending : 현재 폼이 제출중인지 확인하여 boolean 값을 반환한다.
    data : 폼 제출시 전송되는 formData 객체
    method : 제출 방식 . get or post (put 과 delete 도 있지만 특수한 경우에 사용하므로 수업중에는 사용하지 않는다.)
    action : 폼의 action 속성에 사용된 경로 혹은 함수.
    */
    const {pending, data,method,action} = useFormStatus();
    console.log('data',data);
    console.log('method',method);
    console.log('action',action);

    return(
        // pending의 상태에 따라 버튼을 비활성화 하거나 텍스트를 변경해준다.
        // 특히 버튼이 비활성화 되면 클릭도 되지 않는다.
        <button type="submit" disabled={pending}>
            {pending ? "제출중..." : "제출"}
        </button>
    );
}

const UseFormStatusExam = () => {
    // 메세지 관리를 위한 상태 변수
    const [message, setMessages] = useState("");

    //<form> 태그의 action  속성에 연결할 함수를 정의한다.
    const handleSubmit = async (formData) => {
        // 전송된 폼값이 저장된  formData  객체를 submitForm() 함수의 인수로 사용한다.
        const result = await submitForm(formData);
        // 1초 후에 반환된 값을 통해서 상태변수를 변경하고 리렌더링 해준다.
        setMessages(result);
    };

    return(
        <>
        <h2>useFormStatus 사용하기</h2>
        <form action={handleSubmit}>
            <label>
                {/* required : 
                    HTML5에서 제공하는 속성으로 폼값의 입력이 없는 경우
                    풍선 도움말을 띄워주고, 제출을 차단한다. */}
                이름 : <input type="text" name="name" required />
            </label>
            {/* 제출 버튼 UI를 컴포넌트 하위에 추가 */}
            <SubmitButton />
        </form>
        {/*  폼값 처리 메세지를 출력해준다. */}
        {message && <p>{message}</p>}
        </>);
    }

    export default UseFormStatusExam;