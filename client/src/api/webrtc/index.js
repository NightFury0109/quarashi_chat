import { coturnConnect, connectSocket_coturn, sendMessage_coturn } from './coturnConnect'

export const connectSocket = () => {
    connectSocket_coturn()
}

export const connectRTC = () => {
    coturnConnect()
}

export const send_message_content = (message_content) => {
    sendMessage_coturn(message_content)
}



