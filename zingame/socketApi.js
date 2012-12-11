goog.provide('zingame.SocketApi');
zingame.SocketApi.connect = function() {

  var host = "ws://localhost:12345";

  try {
    // Firefox accept only MozWebSocket
    socket = ("MozWebSocket" in window ? new MozWebSocket(host): new WebSocket(host));

    socket.onopen = function(msg) {
      var data = {"header":"getMyInfo", "data":{"pid": $("#uid").val()}};
      zingame.SocketApi.send(data);
    };

    socket.onmessage = function(msg) {
      zingame.SocketApi.receive(msg.data);
    };

    socket.onclose = function(msg) {
    };
  } catch (ex) {
  }
};

zingame.SocketApi.receive = function(result){
  
  
  result = JSON.parse(result);
  console.log(result);
  switch (result.header) {
  case "myInfo":
    zingame.createMySelf(result.data);
    break;
  case "newPlayerInServer":
    zingame.Waitingroom.prototype.addPlayer(result.data);
    break;  
  case "newBoardInServer":
    zingame.Waitingroom.prototype.addBoard(result.data);
    break;  
  case "infoServer":
    zingame.Waitingroom.prototype.bindData(result.data);
    break;
  case "newBoard":
    zingame.mySelf.order = 1;
    zingame.mySelf.master = true;
    zingame.newBoard(result.data.bid);
    break;
  case "playerJoin":
    zingame.Board.prototype.addPlayer(result.data);
    break; 
  case "joinBoard":
    zingame.newBoard(result.data.bid);
    zingame.Board.prototype.setOrderPlayer(result.data);
    break; 
  case "deal":
    zingame.Board.prototype.showCards(result.data);
    break; 
  default:
    break;
  }
 
};


zingame.SocketApi.send = function(data){
  //console.log(data);
  data = JSON.stringify(data);
  try {
    socket.send (data);
  }
  catch (ex) {
  }
};

