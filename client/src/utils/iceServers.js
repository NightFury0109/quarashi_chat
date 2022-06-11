// export const iceServers = [
//     // Test some STUN server
//     {
//         urls: 'stun:178.128.192.242?transport=udp',
//     },
//     // Test some TURN server
//     {
//         urls: 'turn:178.128.192.242?transport=tcp',
//         username: 'webrtc',
//         credential: 'webrtc',
//     }
// ];

export const iceServers = [
    {
        urls: 'stun:stun.anyfirewall.com:443?transport=tcp'
    },
    {
        urls: 'turn:turn.anyfirewall.com:443?transport=tcp',
        username: 'webrtc',
        credential: 'webrtc',
    }
]

// urls: 'http://172.31.27.238',

