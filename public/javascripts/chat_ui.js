(function(root){
  App = root.App = (root.App ||{})
  
  
  ChatUI = App.ChatUI = function(chat){
    chat.socket = io.connect();
    // this.nickname =
    this.chat = chat;
    var that = this;
    $('form').on('submit', function (event) {
      event.preventDefault();
      that.register(event);
    });
    
  };

  ChatUI.prototype.register = function(event){
  var message = this.getMessage();  
    if (message.slice(0,6) === "/nick ") {
      // request  from server if nick name is good
      //this.nickname = message.slice(6)
      this.nickNameRequest(message);
    } else {
      this.sendMessage(message);
    }
    

    // this.display(receivedMessage)
  };

  ChatUI.prototype.nickNameRequest = function(message){
    this.chat.socket.emit('nicknameChangeRequest', {nickname: message.slice(6)})
  };

  ChatUI.prototype.getMessage = function() {
    var message = $('textarea').val();    
    return message
  };

  ChatUI.prototype.sendMessage = function(message) {
    return this.chat.sendMessage(message)
  };

  ChatUI.prototype.display = function(message) {
    var $li = $('<li>');
    $li.text(message);

    $('#log').append($li);
  };


})(this);
