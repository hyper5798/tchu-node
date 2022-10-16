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
var macDataObj = JSON.parse(document.getElementById("macDataObj").value);
var zoneObj = JSON.parse(document.getElementById("zoneObj").value);
var zoneName = JSON.parse(document.getElementById("zoneName").value);

function updateBarChartValue(id, datas) {
  $(id)[0].contentWindow.loadLoraBarDatas(datas);
}

var app = new Vue({
  el: '#app',
  data: {
    user: user,
    zoneList: allZoneList,
    zoneObj:zoneObj,
    zoneName:zoneName,
    macDataObj:macDataObj,
    isIndex: false,
    isSetting: false,
    alertMsg: '',
    items: [],
  },
  mounted () {
    setTimeout(function () {
      loadData();
    }, 3000);
    
  },
  methods: {
    getBarId(mac) {
      
        return mac;
      
    },
    getBarChartUrl(mac) {
      return "http://localhost:8080/barchart?mac="+mac;
    },
  }
})


function loadData() {
  var keys = Object.keys(macDataObj);
    for(let i=0;i<keys.length;i++) {
      let mac = keys[i];
      let macData = macDataObj[mac];
      let id = '#'+mac;
      updateBarChartValue(id, macData);
    }
}




