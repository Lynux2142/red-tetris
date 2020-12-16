const params = {
  server: {
    host: 'https://lynux-perudo.herokuapp.com',
    port: 80,
    get url(){ return ('http://' + this.host + ':' + this.port); }
  },
};

export default params;
