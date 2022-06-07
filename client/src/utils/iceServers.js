export const iceServers =
    [{
        urls: 'turn:turn.anyfirewall.com:443?transport=tcp',
        username: 'webrtc',
        credential: 'webrtc',
    }];

export const ownIceServer = [{
    urls: 'http://172.31.27.238',
    username: 'jovan',
    credential: '123456'
}]