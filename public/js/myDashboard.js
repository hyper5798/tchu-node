function updateValue(value) {
    $("#iframe1")[0].contentWindow.changeValue(value);
    $("#iframe2")[0].contentWindow.changeValue(value);
    $("#iframe3")[0].contentWindow.changeValue(value);
    $("#iframe4")[0].contentWindow.changeValue(value);
    $("#iframe5")[0].contentWindow.changeValue(value);

}


function updateData(msg) {
  let mac = msg.macAddr;
  let info = msg.information;
  
  if(info.hasOwnProperty('temperature')) {
      let temperature = info.temperature;
      updateValue(temperature);
  }
}

var app = new Vue({
  el: '#app',
  data: {
    url1: "http://localhost:8080/gauge?tag=1",
    url2: "http://localhost:8080/gauge?tag=2",
    url3: "http://localhost:8080/gauge?tag=6",
    url4: "http://localhost:8080/gauge?tag=5",
    url5: "http://localhost:8080/gauge?tag=7",
    url11: "http://localhost:8080/chart?tag=7",
  },
  methods: {
    change() {
      var value = document.getElementById('input2').value;
      if(value && typeof(value)==='string') {
        value = parseInt(value);
      }
      this.url = "http://localhost:8080/gauge?tag="+value;;

    }
  }
})





let wsUrl ='http://localhost:8000';
const socket = io.connect(wsUrl,{reconnect: true,rejectUnauthorized: false});

socket.on('connect',function(){
	socket.emit('mqtt_sub','**** web socket cient is ready');
  });
  
  socket.on('disconnect',function(){
	console.log('mqtt handller websocket disconnct');
	if (socket.connected === false ) {
	  //socket.close()
	  socket.open();
	}
  });
  
  socket.on('news',function(m){
	console.log('mqtt handller receve connection :');
	console.log(JSON.stringify(m));
  });

  socket.on('mqtt_report_data',function(m){
	console.log('From server mqtt_report_data :');
    console.log(JSON.stringify(m));
    updateData(m);
  });




    