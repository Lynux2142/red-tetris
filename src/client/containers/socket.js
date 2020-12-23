import io from 'socket.io-client';
import params from '../../../params.js';

const herokuServer = 'https://red-tetris-malg.herokuapp.com/';

const socket = io((process.env.NODE_ENV === 'production') ? herokuServer : params.server.url);

export default socket;
