console.log("message manager");
var now = new Date();
var date = (now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() );
var connected = false;
var initBtnStr ="#pir";
var host ,port;
var cal1,cal2;
var index = 0;limit = 1000;
var isNeedTotal = true;
var date1 ,date2 , deviceList;
var range;
var allSensors = [];
if (document.getElementById("sensorList").value !== '') {
  allSensors =  JSON.parse(document.getElementById("sensorList").value);
}
var allZoneList = [];
if (document.getElementById("zoneList").value !== '') {
  allZoneList =  JSON.parse(document.getElementById("zoneList").value);
}
var profileObj = JSON.parse(document.getElementById("profile").value);
//var macDataObj = JSON.parse(document.getElementById("macDataObj").value);
var zoneObj = JSON.parse(document.getElementById("zoneObj").value);
var zoneName = JSON.parse(document.getElementById("zoneName").value);
var host_url = document.getElementById("host_url").value;
function updateBarChartValue(id, datas) {
  //$(id)[0].contentWindow.loadLoraBarDatas(datas);
  $(id)[0].contentWindow.postMessage(datas,'*')
}

var app = new Vue({
  el: '#app',
  data: {
    user: user,
    zoneList: allZoneList,
    zoneObj:zoneObj,
    zoneName:zoneName,
    //macDataObj:macDataObj,
    isIndex: false,
    isSetting: false,
    alertMsg: "",
    items: [],
    cpu: {
      "brand": "",
      "physicalCores": "",
      "cores": 6,
      "speed": 3
    },
    disk: {
      "vender":"",
      "type": "",
      "size": 512,
      "temperature": null
    }
  },
  mounted () {
    toQueryCPU();
    
  },
  methods: {
    getBarId(mac) {
      
        return mac;
      
    },
    getBarChartUrl(mac) {
      return host_url+"/barchart?mac="+mac;
    },
  }
})


function toQueryCPU(){
  var url = host_url+'/todos/queryHardway';
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
       console.log('type  : '+type);
       

       // 判斷回應類型，這裡使用 JSON
        var json = JSON.parse(this.responseText);
        console.log('json:'+ JSON.stringify(json));
        if(json.query='cpu') {
          app.cpu = json.cpu;
          app.disk = json.disk;
          app.disk.size = Math.floor(app.disk.size/1000000000);
        }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}