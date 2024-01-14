import { useRef, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";

export default function useToast(...params) {
  const [timeoutid, setTimeOutId] = useState(()=>{});

  let toastConfig;
  // 훅 호출 시 넘기는 인자로 toast config 객체를 정의함
  if (typeof params[0] === 'object') { 
    // params이 객체 형태일때 - {text : '어쩌구', type: '어쩌구', durationSec:2}
    toastConfig = {
      text : params[0].text || '표시할 토스트 메시지',
      type : params[0].type || 'success',
      durationSec : params[0].durationSec || 2
    }
  } else { // params 3개를 순차적으로 넣을 경우 - ('텍스트', '타입', 2)
    toastConfig = {
      text : params[0] || '표시할 토스트 메시지',
      type : params[1] || 'success',
      durationSec : params[2] || 2
    }
  }

  const ref = useRef();

  const showToast = () => {
    try {
      clearTimeout(timeoutid);
      ref.current?.classList.remove('show')
      setTimeout(()=>{ref.current?.classList.add('show')},1);
      setTimeOutId(
        setTimeout(()=>{
        ref.current?.classList.remove('show')
      },
      toastConfig.durationSec*1000))
    } catch{
      clearTimeout(timeoutid)
      setTimeOutId(()=>{})
    }
  }

  const hideToast = () => {
    try {
      ref.current?.classList.remove('show')
    } catch{
      clearTimeout(timeoutid)
      setTimeOutId(()=>{})
    }
  }

  function Toast () {
    return (
      <div ref={ref} className={`toast_container`}>
        <div className={`toast_msg_wrapper ${toastConfig.type || 'success'}`} onClick={hideToast}>
          <span className="toast_msg">
            {toastConfig.type==='success' ? <IoMdCheckmarkCircleOutline className="toast_type_icon"/> : null}
            {toastConfig.type==='warning' ? <IoWarningOutline className="toast_type_icon"/> : null}
            <span className="toast_msg_text">
              {toastConfig.text}
            </span>
          </span>
        </div>
      </div>
    );
  }

  return [Toast, showToast, hideToast]
}