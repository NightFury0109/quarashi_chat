import api from '../../utils/api'
// import { createPeerConnection } from 'p2p-chat';
// import iceServers from './../../utils/iceServers'

export const send_message = (message_content) => {
    console.log(message_content)
    // const onChannelOpen = () => console.log(`Connection ready!`);
    // const onMessageReceived = (message) => console.log(`New incomming message: ${message}`);

    // const { localDescription, setAnswerDescription, sendMessage } = await createPeerConnection({ iceServers, onMessageReceived, onChannelOpen });

    // // you will send localDescription to your SLAVE and he will give you his localDescription. You will set it as an answer to establish connection
    // const answerDescription = 'This is a string you will get from a SLAVE trying to connect with your localDescription';
    // setAnswerDescription(answerDescription);

    // // later on you can send a message to SLAVE
    // sendMessage('Hello SLAVE');
}