function update() {
  for(var key in store)
  {
    console.log(key);
    if (["active_user", "kaljakpl"].indexOf(key) > -1)
      document.getElementById(key).innerHTML = JSON.stringify(store[key]);
    if (key == "weather")
    {
        let obj = store[key];
        let text = "Temperature: " + JSON.stringify(obj.temp);
        document.getElementById(key).innerHTML = text;
    }
    else if (key == "next_bus")
    {
      let obj = store[key];
      let date = new Date(0);
      date.setUTCSeconds(obj.time_of_departure);
      let text = "Next bus\nFrom: " + JSON.stringify(obj.stop_name) + "\nAt: " + obj.time_of_departure;
      document.getElementById(key).innerHTML = text;
    }
  }
}
var ws = new WebSocket('ws://83.136.250.27:80');
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
    'method' : 'set',
    'key' : 'active_user',
    'value' : 'Laged'
  };
  ws.send(JSON.stringify(obj));
});
