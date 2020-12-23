import io from 'socket.io-client';
import params from '../../params';

const herokuAddress = 'https://red-tetris-malg.herokuapp.com/';

const socket = io(herokuAddress);

export default socket;
