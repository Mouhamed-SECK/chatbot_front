import  React, {useState, useEffect} from 'react'
import axios from 'axios'
import validator from 'validator'

import './chat.css'
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';



const Chat = () =>{


    const [name, setName] = useState('user');
    const [adminMessages, setAdminMessages] = useState([]);
    const [adminResponseNumber , setAdminResponseNumber] = useState(1);
    const [gender , setGender] = useState('');
    const [firstName, setFirstName] = useState('')
    const [isMajor, setIsMajor] = useState(false)
    
   
    const [messages, setMessages] = useState([]);

    const [message, setMessage] = useState();

    const ENDPOINT = 'https://chatbotapi-pf.herokuapp.com';

    useEffect(() => {
        axios.get(ENDPOINT+'/message'  ).then((response) => {
            setAdminMessages(response.data);
       
            setMessages(messages => [ ...messages, response.data[0]]);
        });
      }, []);

      const sendMessage = (event) => {
        event.preventDefault();

        if (adminResponseNumber == 3) {

            if (validator.isDate(message)) {

                let age = new Date(new Date() - new Date(message)).getFullYear() - 1970;
          
                setIsMajor(age >= 18);
               

                const genderText =  gender === 'Homme' ? ' Monsieur ' : ' Madame ';
             
                const category = age >= 18 ?  'Majeur' : ' Mineur';


       
                const admin = 'Merci' + genderText + firstName+ ' Vous êtes ' + category;
                setMessages(messages => [ ...messages, {'id' : messages.length+1, 'text' : admin, 'user' : 'user'}]);
                setMessage('')

               
            } else {
                const adminMessage = adminMessages[adminResponseNumber];
                adminMessage['text'] = 'Incorect : Saisir sous le forma YYYY-MM-DD'
                setMessages(messages => [ ...messages, adminMessage]);
    
            }

        } else if (adminResponseNumber == 2)  {
            setFirstName(message);
            setAdminResponseNumber(adminResponseNumber +1);
            const adminMessage = adminMessages[adminResponseNumber];
            setMessages(messages => [ ...messages, {'id' : messages.length+1, 'text' : message, 'user' : 'user'}, adminMessage]);
        
            setMessage('');

        } else {
            setFirstName(message);
            setMessages(messages => [ ...messages, {'id' : messages.length+1, 'text' : message, 'user' : 'user'}]);
            setAdminResponseNumber(adminResponseNumber +1);
            setMessage('');
        }
           


     
      }

      const sendGenderResponse = (response) =>{
         setMessages(messages => [ ...messages, {'id' : messages.length+1, 'text' : response, 'user' : 'user'}]);
         setGender(response);
         console.log(response)
         setAdminResponseNumber(adminResponseNumber +1);
         const adminMessage = adminMessages[adminResponseNumber];

         setTimeout(() => {
            setMessages(messages => [ ...messages, adminMessage]);
         }, 500)
      }

    
    return (
      <div className='outerContainer'>
          <div className="container">

              <InfoBar ></InfoBar>
               <Messages sendGenderResponse={sendGenderResponse} messages={messages} name={name}></Messages> 
              <Input  message={message}   setMessage={setMessage} sendMessage={sendMessage}> </Input>
              
            
          </div>
      </div>
    )
}

export default Chat;
