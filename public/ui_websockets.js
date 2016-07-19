function update() {
  for(var key in store)
  {
    console.log(key);
    document.getElementById(key).innerHTML = store[key];
  }
}
var ws = new WebSocket('ws://localhost:3000');
ws.onmessage = function(msg) {
  console.log("got msg");
  realData = JSON.parse(msg.data)
  for(let key in realData) {
    store[key] = realData[key];
  }
  console.log(store);
  update();
};

document.getElementById('detect').addEventListener('click', function(event) {
  var obj = {
    'active_user' : 'Matti'
  };
  ws.send(JSON.stringify(obj));
});
