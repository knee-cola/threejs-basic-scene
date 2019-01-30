import {log} from './logger';

export const initWsClient = () => {
                
    const wsClient = new WebSocket('ws://localhost:8080');

    wsClient.onopen = function () {
        // connection is opened and ready to use
        log('on open');
    };

    wsClient.onerror = function (error) {
        // an error occurred when sending/receiving data
        log('on error');
    };
    
    // wsClient.onmessage = function (message) {
    //     log('received message: ' + message.data);
    // };

    return(wsClient);
};