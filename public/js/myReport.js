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

var allSensors =  JSON.parse(document.getElementById("sensorList").value);
var zoneList = JSON.parse(document.getElementById("zoneList").value);
var fieldName= JSON.parse(document.getElementById("fieldName").value);
var macType = JSON.parse(document.getElementById("macType").value);
var mac = document.getElementById("mac").value;
var type = document.getElementById("type").value;
var zoneId = document.getElementById("zoneId").value;
var startDate = document.getElementById("startDate").value;
var endDate = document.getElementById("endDate").value;
var names = Object.values(fieldName);
var profileObj = JSON.parse(document.getElementById("profile").value);
var user = JSON.parse(document.getElementById("user").value);
var host_url = document.getElementById("host_url").value;
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
var zoneId, sensor1, sensor_name;

//For get current selected zone name on 2018.08.29
console.log('userName : ' + userName + ' , userZone : ' + userZone);

var zoneSensors = getSensorList(zoneId);
if (zoneSensors.length > 0) {
  sensor1 = zoneSensors[0].device_mac;
}
//Slider
var min = 0;
var max = 1;
var value = 0;
//For chart
var colorNames = Object.keys(window.chartColors);
var dayOption = {
          format: "yyyy-mm-dd",
          autoclose: true,
          // startDate: "today",
          clearBtn: true,
          calendarWeeks: true,
          todayHighlight: true,
          language: 'zh-TW',
          startView: "days",
          minViewMode: "days"
      };

var dataset = ['Test'];
var datasetIndex = 0;
var chartData = [];
//Transfet
var t;
var allDataSet = [];
var selectedSet = '';
//Datatables
var table, buttons;

var app = new Vue({
  el: '#app',
  data: {
    nameList:names,
    user: user,
    zoneList: zoneList,
    selectedZone: zoneId,
    allSensors: allSensors,
    sensorList: zoneSensors,
    selectedSensor: mac,
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
    profile: JSON.parse(JSON.stringify(userProfile)),
    report : {
          type: 1,
          date: ''
    },
    startDate:startDate,
    endDate:endDate,
    countMessage: ''
  },
  computed: {
    url() {
      return host_url+"/chart?mac="+this.selectedSensor+'&zoom=1';
    },
  },
  methods: {
    
    pressQuery: function () {
      this.isChart = false;
      toQuery();
    },
    selectMac: function(ele) {
      //alert(ele.target.value);
      var selectType = macType[ele.target.value];
      //alert(selectType);
      if(selectType !== type) {
        let newUrl = host_url+"/report?mac="+ele.target.value+'&zoneId='+this.selectedZone;
        newUrl = newUrl + '&startDate='+startDate+'&endDate='+endDate;
        document.location.href = newUrl;
        return;
      }
      this.selectedSensor = ele.target.value;
      this.selectedSensorName = getSensorNameByMac(ele.target.value);
      
      //toQuery();
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
    changeZone(event) {
      console.log(event.target.value);
      this.selectedZone = event.target.value;
      this.sensorList = getSensorList(event.target.value);
      for(let i=0; i<this.sensorList.length;i++) {
        let device = this.sensorList[i];
        if(device.fport === type) {
          this.selectedSensor = device.device_mac;
        }
      }
      table.fnClearTable();
      $("#ifram1")[0].contentWindow.clearData();
    },
  }
})

function getSensorList (_id) {
  //alert(zone1Name);
  
      var list=[];
      var arr = [];
      for (let i in zoneList) {
        let zone = zoneList[i];
        if(zone._id == _id) {
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
  
}

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

function toQuery(){
  var mac = app.selectedSensor;
  // alert('mac : ' + mac);
  // removeDataset();
  app.isIndex = false;
  $.LoadingOverlay("show");
  $('#myModal').modal('hide');
  var from = $('#from').val();
  var to = $('#to').val();
  var url = 'http://'+host+":"+port+'/todos/query?mac='+mac+'&from='+from+'&to='+to;
  url = url + '&queryType=queryEvent&userName=' + userName;
  console.log(url);
  loadDoc(url);
}

function loadDoc(url) {
  app.countMessage = '';
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
        app.countMessage = '查詢範圍共: '+json.total+ ' 筆';
        table.fnClearTable();
        if(json.data && json.data.length>0){
          
          
          console.log('queryYeaEvent : ' + JSON.stringify(json.data.length));
          $("#ifram1")[0].contentWindow.loadLoraLineDatas(json.data);
          var data = getDataList(json.data);
          table.fnAddData(data);
        }
        
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function getDataList(list){
    var arr = [];
    for(var i = 0;i<list.length;i++){
        arr.push(getData(i+1, list[i]));
    }
    return arr;
}

function getData(mIndex, event){
    var arr = [];
    arr.push(mIndex);
    arr.push(event.date);
    var keys = Object.keys(event.information);
    // alert(JSON.stringify(keys));
    for (let i in keys) {
      let param = event.information[keys[i]];
      // alert(keys[i] + ' : ' + param);
      if(keys[i] && keys[i] != 'Cost')
      arr.push(param);
    }
    console.log(JSON.stringify(arr))
    return arr;
}

function getMac(item){
  //console.log('getMac :\n'+JSON.stringify(item));
  var tmp = item.mac +' - '+item.name;
  return tmp;
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
       'copyHtml5',
       'excelHtml5',
       {
         extend: 'csvHtml5',
         text: 'CSV',
         bom : true},
       /*{
         text: 'PDF',
         extend: 'pdfHtml5',
         bom : true,
         message: '',
         exportOptions: {
         columns: ':visible'}
        }*/

   ]
};

$(document).ready(function(){
  
    host = window.location.hostname;
    port = window.location.port;
    $('.input-daterange input').each(function() {
      $(this).datepicker(dayOption);
    });

    // app.isIndex = true;
    var opt = JSON.parse(JSON.stringify(opt2));
    table = $("#table1").dataTable(opt);

    buttons = new $.fn.dataTable.Buttons(table, {
         buttons: [
           //'copyHtml5',
           //'excelHtml5',
           {
              extend: 'csvHtml5',
              text: 'CSV',
              //title: $("#startDate").val()+'-'+$("#endDate").val(),
              filename: function(){
                    /*var d = $("#startDate").val();
                    var n = $("#endDate").val();
                    return 'file-'+d+'-' + n;*/
                    return 'test';
                },
              footer: true,
              bom : true
            },
           //'pdfHtml5'
        ]
    }).container().appendTo($('#buttons'));
});

function test() {
  socket.emit('mqtt_sub','**** web socket test');
}






