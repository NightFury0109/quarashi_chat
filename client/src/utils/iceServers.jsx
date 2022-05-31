export const iceServers = [
    {
        urls: 'stun:stun.l.google.com:19302',
    },
    {
        urls: 'turn:turn.anyfirewall.com:443?transport=tcp',
        username: 'webrtc',
        credential: 'webrtc',
    },
];