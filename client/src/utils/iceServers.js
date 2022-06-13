export const iceServers = {
    'iceServers': [
        // Test some STUN server
        {
            urls: 'stun:178.128.192.242?transport=udp',
        },
        // Test some TURN server
        {
            urls: 'turn:178.128.192.242?transport=udp',
            username: 'webrtc',
            credential: 'webrtc',
        }
    ]
};

// urls: 'http://172.31.27.238',

