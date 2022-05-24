import React, {useRef, useState} from 'react';
import classnames from 'classnames'

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user, responseType }, name, sendGenderResponse}) => {
  let isSentByCurrentUser = false;
  let isMessageWithButton = false;

  const trimmedName = name.trim().toLowerCase();

  const women = useRef();
  const man = useRef();

  const [genderButtonState, setGenderButtonState] = useState(false);

  


  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  if (responseType === 'BUTTON') {
    isMessageWithButton = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}

              {isMessageWithButton ? (
              <div className='btn-container'>

                <div disabled={genderButtonState} onClick={() => {setGenderButtonState(true); sendGenderResponse(man.current.innerText)}}  className={classnames("btn", {
          "content-pointer-event-none": genderButtonState
        })} ref={man}>Homme</div>
                <div disabled={genderButtonState} onClick={() => {setGenderButtonState(true);sendGenderResponse(women.current.innerText)}}  className={classnames("btn", {
          "content-pointer-event-none": genderButtonState
        })} ref={women}>Femme</div>
              
              </div>
            ) : ('')
           }
              
              </p>

             
            </div>
            <p className="sentText pl-10 ">{user}</p>

           
          </div>
        )
  );
}

export default Message;