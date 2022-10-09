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
var user = JSON.parse(document.getElementById("user").value);
var userName = user.name;
var userZone = user.zone;
var defaultProfile = {
      monthPower: 'show',
      detail: "show"
    };
var userProfile;
if(profileObj[userName]) {
  userProfile = profileObj[userName];
} else {
  userProfile = defaultProfile;
}
var zone1Name, sensor1, sensor_name;

//For get current selected zone name on 2018.08.29
console.log('userName : ' + userName + ' , userZone : ' + userZone);
var zoneList = [];
if(allZoneList.length > 0  && (userName == 'sysAdmin' || userName == 'ndhuAdmin')) {
    zoneList = allZoneList;
    zone1Name = zoneList[0].name;
} else if(userName == 'sysAdmin' || userName == 'ndhuAdmin') {
    zoneList = [];
    zone1Name = 'active_all';
} else {
      for(let n in allZoneList) {
        let zone = allZoneList[n];
        if(zone.name === userZone) {
          zoneList.push(zone);
        }
      }
      zone1Name = userZone;
}
console.log('zone1Name: ' + zone1Name + '\ncurrent zoneList : ' + zoneList.length);
var zoneSensors = getSensorList(zone1Name);
if (zoneSensors.length > 0) {
  sensor1 = zoneSensors[0].device_mac;
}
//Slider
var min = 0;
var max = 1;
var value = 0;
//For chart
var colorNames = Object.keys(window.chartColors);
var imgArr = ['2018071500.jpg'];
var msgArr = ['2018071500.jpg'];

var dataset = ['Test'];
var datasetIndex = 0;
var chartData = [];
//Transfet
var t;
var allDataSet = [];
var selectedSet = '';
//Datatables
var table, buttons;
//Socket
// var socket = io.connect('http://localhost:8080');


var app = new Vue({
  el: '#app',
  data: {
    user: user,
    zoneList: zoneList,
    selectedZone: zone1Name,
    allSensors: allSensors,
    sensorList: zoneSensors,
    selectedSensor: sensor1,
    selectedSensorName: sensor_name,
    isIndex: false,
    isSetting: false,
    isChart: false,
    isShowCSV: false,
    hasTab: false,
    showUpdate: false,
    pageTimer: {},
    result: '',
    alertMsg: '',
    items: [],
    profile: JSON.parse(JSON.stringify(userProfile))
  },
  methods: {
    selectMac: function (mac) {
      // alert(mac);
      this.selectedSensor = mac;
      toQuery();
    },
    pressQuery: function () {
      toQuery();
    },
    selectSensor: function(ele) {
      // alert(ele.target.value);
      this.selectedSensor = ele.target.value;
      this.selectedSensorName = getSensorNameByMac(ele.target.value);
      toQuery();
    },
    enableSetting: function() {
      // this.isSetting = true;
      // setChosen(this.selectedCam);
      this.isSetting = true;
    },
    cancelSetting: function() {
      this.isSetting = false;
      this.profile = JSON.parse(JSON.stringify(userProfile));
    },
    saveSetting: function() {
      // alert('setting');
      toSetting(this.profile);
    },
    changeZone: function(zName) {
      // alert('setting');
      this.selectedZone = zName;
      this.sensorList = getSensorList(zName);
      this.selectedSensor = this.sensorList[0].device_mac;
    }
  }
})

function getSensorList (zone1Name) {
  //alert(zone1Name);
  if(zone1Name !== 'active_all') {
      var list=[];
      var arr = [];
      for (let i in zoneList) {
        let zone = zoneList[i];
        if(zone.name == zone1Name) {
          list = zone.deviceList;
        }
      }
      //alert(JSON.stringify(list));
      if(list.length > 0) {
        for (let j in allSensors) {
          let sensor = allSensors[j];
          if(list.includes(sensor.device_mac) == true) {
            arr.push(sensor);
          }
        }
      }
      return arr;
  } else {
    return allSensors;
  }
}


var opt2={
   "oLanguage":{"sProcessing":"處理中...",
         "sLengthMenu":"顯示 _MENU_ 項結果",
         "sZeroRecords":"沒有匹配結果",
         "sInfo":"顯示第 _START_ 至 _END_ 項結果，共 _TOTAL_ 項",
         "sInfoEmpty":"顯示第 0 至 0 項結果，共 0 項",
         "sInfoFiltered":"(從 _MAX_ 項結果過濾)",
         "sSearch":"搜索:",
         "oPaginate":{"sFirst":"首頁",
                    "sPrevious":"上頁",
                    "sNext":"下頁",
                    "sLast":"尾頁"}
         },
   dom: 'Blrtip',
   //"order": [[ 2, "desc" ]],
   "iDisplayLength": 100,
    scrollY: 400,
    buttons: [
        //'copyHtml5',
        //'excelHtml5',
        {
          extend: 'csv',
          text: 'CSV',
          bom : true}
        //'pdfHtml5'
    ]
 };

function getSensorNameByMac(mymac) {
  // alert('getSensorNameByMac : ' + mymac);
  let name = '';
  if (sensorList && sensorList.length > 0) {
    for (let m =0 ; m < sensorList.length; ++m) {
      let sensor = sensorList[m];
      // alert('sensor.device_ma : ' + sensor.device_ma);
      if (sensor.device_mac == mymac) {
        name = sensor.device_name;
      }
    }
  }
  return 'Sensor : ' + name;
}

function search(){
  // $('#myModal').modal('show');
  app.isIndex = true;
}


function getMac(item){
  //console.log('getMac :\n'+JSON.stringify(item));
  var tmp = item.mac +' - '+item.name;
  return tmp;
}

$(document).ready(function(){
   
    app.isIndex = true;
    
});

var timeFormat = 'YYYY-MM-DD HH:mm';

function getMonthData() {
  var now = new Date();
}


function newDate(days) {
	return moment().add(days, 'hours').toDate();
}

function newDateString(days) {
	return moment().add(days, 'hours').format(timeFormat);
}


