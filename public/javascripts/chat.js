(function(root){
  App = root.App = (root.App ||{})
  Chat = App.Chat = function (socket) {
    this.socket = socket;
    //watch for server comments to add them to our page
    socket.on('from_node_message', function (data) {
      var $li = $('<li>');
      $li.text(data.nickname + " : " + data.message);

      $('#log').append($li);
    });
    var that = this;
    socket.on('new_connection', function(data){
      that.changeNickName(data);
    })
    
    socket.on('nicknameChangeResult', this.changeNickName);
    
    socket.on('from_node_event', function(data) {
      var $li = $('<li>');
      $li.text(data.message);

      $('#log').append($li);
    })
  }
  
  
  Chat.prototype.changeNickName = function(data){
    if(data.success){
      var $li = $('<li>');
      $li.text(data.message);

      $('#log').append($li);
      this.nickname = data.nickname;
    } else{
      var $li = $('<li>');
      $li.text(data.message);

      $('#log').append($li);
    }
  }



  Chat.prototype.sendMessage = function(message) {
    this.socket.emit('message_event', {message: message, 
      nickname: this.nickname})
  };
  
})(this);