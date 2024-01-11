import { IoMdClose } from 'react-icons/io';

export default function AdminChat ({toggleShowContent}) {

  return (
  <>
    <div className="chat_content_header">
            {/* <div className={`connect_dot`}></div> */}
            <span className="header_title">1:1 문의 관리</span>
            <button className="close_btn" onClick={toggleShowContent}>
              <IoMdClose />
            </button>
      </div>
  </>
  );
}