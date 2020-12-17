const params = {
  server: {
    host: 'red-tetris-malg.herokuapp.com',
    port: '',
    get url(){ return ('http://' + this.host + (this.port ? ':' + this.port : '/')); }
  },
};

export default params;
