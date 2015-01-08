var guestNumber = 1;
var nicknames = {};
//exports = {}
exports.createChat = function(io){
  io.on('connection', function(socket){
    console.log("Connected!");
    //give them a guest name

    socket.emit('from_node_event', {message: "Hi from Node"});
    console.log("emitting from_node_event Hi from Node");
    var newGuest = "guest" + guestNumber
    socket.emit('new_connection', {
      nickname: newGuest,
      message: newGuest,
      success: true
    });
    nicknames[socket] = newGuest;
    console.log("emitting new_connection with" + newGuest);
    guestNumber++;
    socket.on('message_event', function(data){
      console.log(data.message);
  
      io.sockets.emit('from_node_message', {message: data.message, 
        nickname: data.nickname})
        console.log("emitting from_node_message with " + data.message + "by" + data.nickname);
        
    });
    socket.on('nicknameChangeRequest', function(data) {

      var guestReg = /guest\d+/;

      if ( nicknames[this] === data.nickname ) {
          socket.emit('nicknameChangeResult',{
          success: false,
          message: 'Name is already taken.'
        });
        console.log("name change was already taken");
        } else if(guestReg.test(data.nickname)) {
          socket.emit('nicknameChangeResult', {
          success: false,
          message: 'Name cannot begin with guest.'

        });
                  console.log("name cannot begin with guest");
      } else {
        nicknames[this] = data.nickname;
        socket.emit('nicknameChangeResult', {
          success: true,
          message: "Hello " + data.nickname + '!',
          nickname: data.nickname          
        });
        console.log("nickname change success to " + data.nickname + "from" + nicknames[this]);
        
      }
    })
    
  });  
  io.on('disconnect', function(socket) {
    io.sockets.emit('from_node_event', {message: nicknames[socket] + " left"})
    console.log(nicknames[socket]  + "disconnected!")
    delete nicknames[socket]
  })
};
