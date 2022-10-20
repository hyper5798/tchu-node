var zoneObj =  JSON.parse(document.getElementById("zoneObj").value);
var zoneName =  JSON.parse(document.getElementById("zoneName").value);
var set =  JSON.parse(document.getElementById("set").value);
var defaultOption =  JSON.parse(document.getElementById("defaultOption").value);
var colors =  JSON.parse(document.getElementById("colors").value);
var host_url = document.getElementById("host_url").value;
var api_url = document.getElementById("api_url").value;
var user = JSON.parse(document.getElementById("user").value);
var host_url = document.getElementById("host_url").value;
var userName = user.name;
var userZone = user.zone;
var devices =  JSON.parse(document.getElementById("devices").value);
//console.log('set:');
//console.log(JSON.stringify(set));



//key:zone id
var keys = Object.keys(zoneObj);
var macVoltageObject = {};
for(let i=0; i<keys.length;i++) {
  let key = keys[i];
  let zone = zoneObj[key];
  //console.log('zone:');
  //console.log(JSON.stringify(zone));
  var mKeys = Object.keys(zone);
  
  for(let j=0;j<mKeys.length;j++) {
    let mKey = mKeys[j];
    let item = zone[mKey];
    macVoltageObject[mKey] = {"image": "/icons/battery/b1.png", "value": '5V'};
  }
}
//console.log(JSON.stringify(macVoltageObject));

function updateGaugeValue(id, value) {
    //$(id)[0].contentWindow.changeValue(value);
    var element = $(id);
    if(element !== undefined) {
      element[0].contentWindow.postMessage(value,'*');
    }
  
}

function updateLineChartWithValue(id, message) {
  //$(id)[0].contentWindow.refreshLoraLineData(message);
  $(id)[0].contentWindow.postMessage(message,'*')
}

function updateLineChartWithList(id, list) {
  //$(id)[0].contentWindow.refreshLoraLineData(message);
  $(id)[0].contentWindow.postMessage(list,'*')
}

function updateVoltage(mac, value) {
  //alert('mac:'+mac + ' , value: '+value);
  var check = (value+1)*3.3/4096;
  if(check>=2.31) {
    app.macVoltageObject[mac] =  {"image": "/icons/battery/b4.png", "value": '8V'};
  } else if(check>=2.02) {
    app.macVoltageObject[mac] =  {"image": "/icons/battery/b3.png", "value": '7V'};
  } else if(check>=1.73) {
    app.macVoltageObject[mac] =  {"image": "/icons/battery/b2.png", "value": '6V'};
  }  else if(check>=1.66) {
    app.macVoltageObject[mac] =  {"image": "/icons/battery/b1.png", "value": '5V'};
  } else {
    app.macVoltageObject[mac] =  {"image": "/icons/battery/b0.png", "value": '低於5V'};
  }

  app.macVoltageObject[mac]['value'] =  app.macVoltageObject[mac]['value'] + ':'+value;
}

function test() {
  socket.emit('mqtt_sub','**** web socket test');
}

function updateData(msg) {
  var mac = msg.macAddr;
  var info = msg.information;
  let keys = Object.keys(info);
  let id2 =  "#"+mac;
  updateLineChartWithValue(id2, msg);
  
  keys.forEach(field => {
    
    let id =  "#"+mac+"_"+field;

    if(field !== 'voltage') {
      updateGaugeValue(id, info[field]);
    } else {
      updateVoltage(mac, info[field]);
    }
  });


}

function editGuage() {
  $('#myModal').modal('hide');
  $('#myModal2').modal('show');
}

var app = new Vue({
  el: '#app',
  data: {
    tab:1,
    mode:1,
    gaugeIndex:1,
    areaIndex: 1,
    isGaugeSet: false,
    colorKey: 'red',
    zoneKey: 1,
    fieldKey: 'temperature',
    option: defaultOption['temperature'],
    zoneObj: zoneObj,
    set:set,
    setString: '',
    zoneName:zoneName,
    macVoltageObject:macVoltageObject,
    colors:colors,
    color: colors['red'],
    optionImage: '/icons/gauge/1.png',
    selectImage: '/icons/gauge/1.png',
    url11: host_url+"/chart?gauge=7",
  },
  methods: {
    getId(mac, field) {
      return mac+"_"+field;
    },
    getUrl(zoneId, field) {
      return host_url+"/gauge?zoneId="+zoneId+"&field="+field;
    },
    getLineId(mac) {
      return mac;
    },
    getLineChartUrl(mac) {
      return host_url+"/chart?mac="+mac+'&zoom=0';
    },
    change() {
      var value = document.getElementById('input2').value;
      if(value && typeof(value)==='string') {
        value = parseInt(value);
      }
      this.url = host_url+"/gauge?gauge"+value;;

    },
    reset() {
      this.option = defaultOption[this.option.field];
    },
    editSet(zoneId, field) {
      this.zoneKey = zoneId;
      this.fieldKey = field;
      //alert(zoneId+ '-> '+ field);
      this.option = set[zoneId][field];
      this.optionImage = '/icons/gauge/'+this.option.gauge+'.png';
      //alert(JSON.stringify(this.option));
      this.tab=2;
    },
    selectGauge(inx) {
      this.gaugeIndex = inx;
      this.selectImage = '/icons/gauge/'+inx+'.png';
    },
    changeGauge() {
      
      this.optionImage= '/icons/gauge/'+this.gaugeIndex+'.png';
      this.option.gauge = this.gaugeIndex;
      this.mode = 1;
    }, 
    editColorArea(inx) {
      this.areaIndex = inx;
      if(inx===1) {
        this.color = this.colors[this.option.color1];
      } else if(inx===2) {
        this.color = this.colors[this.option.color2];
      } else if(inx===3) {
        this.color = this.colors[this.option.color3];
      }
      this.mode = 3;
    },
    selectColor(key) {

      this.colorKey = key;
      this.color = this.colors[key];
      
    } ,
    changeColor() {
      if(this.areaIndex === 1) {
        this.option.color1 = this.colorKey;
      } else  if(this.areaIndex === 2) {
        this.option.color2 = this.colorKey;
      }  else  if(this.areaIndex === 3) {
        this.option.color3 = this.colorKey;
      }
      this.mode = 1;
    },
    toSubmit() {//Update set
      this.set[this.zoneKey][this.fieldKey] = this.option;
      this.setString = JSON.stringify(this.set);
      setTimeout(function () {
        document.getElementById("updateOptions").submit();
      }, 50);
    }
  }
})

$(document).ready(function(){
  setTimeout(function () {
    devices.forEach(function(device){
      toQuery(device.device_mac);
    });
  }, 3000);
  
});


function toQuery(mac){
 
  // alert('mac : ' + mac);
  // removeDataset();
  //$.LoadingOverlay("show");
  var now = new Date();
  var to = (now.getFullYear() + '/' + (now.getMonth() + 31) + '/' + now.getDate() );
	var fromMoment = moment(to,"YYYY/MM/DD").subtract(1,'days');;
	var from =  fromMoment.format("YYYY/MM/DD");
  var url = host_url+'/todos/query?mac='+mac+'&from='+from+'&to='+to;
  url = url + '&queryType=queryEvent&userName=' + userName;
  console.log(url);
  loadDoc(url);
}

function loadDoc(url) {
  
  console.log('loadDoc()');
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       //document.getElementById("alert").innerHTML = this.responseText;
       $.LoadingOverlay("hide");

       var type = this.getResponseHeader("Content-Type");   // 取得回應類型
       // console.log('type  : '+type);

       // 判斷回應類型，這裡使用 JSON
        var json = JSON.parse(this.responseText);
        if(json.data && json.data.length>0){
          console.log('queryYeaEvent : ' + JSON.stringify(json.data.length));
          toUpdateQueryData(json.data);
        }
        
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function toUpdateQueryData(datas) {
  var data = datas[datas.length-1];
  var mac = data.macAddr;
  var fiels = Object.keys(data.information);
  fiels.forEach(function(field){
    var id =  "#"+mac+"_"+field;
    if(field !== 'voltage') {
      updateGaugeValue(id, data.information[field]);
    } else {
      updateVoltage(mac, data.information[field]);
    }
  });
  let id2 =  "#"+mac;
  updateLineChartWithList(id2, datas)
}


let wsUrl = api_url;
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




    