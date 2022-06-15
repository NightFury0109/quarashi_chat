export const iceServers = {
    'iceServers': [
        // Test some TURN server
        {
            urls: 'turn:178.128.192.242?transport=udp',
            username: 'jovan',
            credential: '123456',
        },
        // Test some STUN server
        {
            urls: 'stun:178.128.192.242?transport=udp',
        },
    ]
};

// urls: 'http://172.31.27.238',

