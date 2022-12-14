var devices = JSON.parse(document.getElementById("devices").value);
var deviceMacName = {};

devices.forEach(element => {
  deviceMacName[element.device_mac] = element.device_name;
});
var zones = JSON.parse(document.getElementById("zones").value);

function getNameList(macList) {
  let list = [];
  macList.forEach(mac => {
    list.push(deviceMacName[mac]);
  });
  return list;
}

zones.forEach(element => {
  let list = getNameList(element.deviceList);
  element.nameList = JSON.parse(JSON.stringify(list));
});
var userName = document.getElementById("userName").value;
var host ,port;
var empty = {
          name: '',
          deviceList: [],
          nameList:[]
        };

var app = new Vue({
  el: '#app',
  data: {
    isTrue: true,
    isFalse: false,
    editPoint: -1,
    delPoint: -1,
    isTest: false,
    deviceList: devices,
    zoneList: zones,
    isNew: false,
    newTarget: empty,
    alertMsg: '',
    selected: null,
    data: getMockData(),
    targetKeys: [],
    modal1: false,
    editMode: 'edit'
  },
  methods: {
    switchCreatDevice: function () {
        this.isNew = true;
        this.editPoint =  -1;
        this.newTarget = JSON.parse(JSON.stringify(empty)) ;
    },
    switchEditDevice: function () {
        this.isNew = false;
    },
    editCheck: function (index) {
        this.editPoint = index;
    },
    delCheck: function (index, name) {
        console.log('delCheck : ' + name);
        this.delPoint = index;
        $('#myModal').modal('show');
    },
    saveEdit: function(index) {
        toUpdate(index);
    },
    checkDevice: function () {
        this.alertMsg = '';
        toCheckDevicve(this.newTarget);
    },
    render: function(item) {
        return item.label;
    },
    handleChange: function (newTargetKeys) {
        this.targetKeys = newTargetKeys;
    },
    ok: function() {
        this.$Message.info('Clicked ok');
        if(this.editMode == 'new') {
          this.newTarget.deviceList = JSON.parse(JSON.stringify(this.targetKeys));
          let list = getNameList(this.newTarget.deviceList);
          this.newTarget.nameList = JSON.parse(JSON.stringify(list));
        } else {
          this.zoneList[this.editPoint].deviceList = JSON.parse(JSON.stringify(this.targetKeys));
          let list = getNameList(this.zoneList[this.editPoint].deviceList);
          this.zoneList[this.editPoint].nameList =  JSON.parse(JSON.stringify(list));
        }
    },
    cancel: function() {
      this.$Message.info('Clicked cancel');
    },
    addDevice(mode) {
      this.editMode = mode;
      if(this.editMode == 'new') {
          this.targetKeys = [];
      } else {
        let zone = this.zoneList[this.editPoint];
        console.log('addDevice : ' + mode + ', editPoint :' + this.editPoint);
        console.log('zone : ' + JSON.stringify(zone));
        this.targetKeys = JSON.parse(JSON.stringify(zone.deviceList));
      }
      this.modal1 = true;
    }
  }
})

function getMockData() {
let mockData = [];
  for (let i = 0; i < devices.length; i++) {
    mockData.push({
      key: devices[i].device_mac,
      label: devices[i].device_name,
      description: '',
      disabled: false
    });
  }
  return mockData;
}

function getTargetKeys () {
    return getMockData()
       .filter(() => Math.random() * 2 > 1)
       .map(item => item.key);
}

$(document).ready(function () {
    host = window.location.hostname;
    port = window.location.port;
});

function toCheckDevicve(target) {
  console.log('toCheckTarget : ' + JSON.stringify(target));
  if(target.name.length == 0) {
    app.alertMsg = '????????????????????????';
  } else if(target.deviceList.length == 0) {
    app.alertMsg = '??????????????????';
  }
  if(app.alertMsg.length > 0) {
    setTimeout(function () {
          app.alertMsg = '';
        }, 3000);
    return;
  }
  toModifyTarget('addZone', target);
}

function toDelete() {
    $('#myModal').modal('hide');
    var mTarget = app.zoneList[app.delPoint];
    toModifyTarget('delZone', mTarget);
}


function toUpdate() {
    $('#myModal').modal('hide');
    var mTarget = app.zoneList[app.editPoint];
    toModifyTarget('updateZone', mTarget)
}

function toModifyTarget(type, target){
  // alert(gid + ' : ' + mac);
  //alert($("#startDate").val());
  $.LoadingOverlay("show");
  app.isSetting = false;
  // console.log(selectMac.toString());
  var url = 'http://'+host+":"+port+'/todos/zone?target=' + JSON.stringify(target) + '&userName=' + userName;
  url = url + '&queryType=' + type;
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

       var type = this.getResponseHeader("Content-Type");   // ??????????????????
       console.log('type  : '+type);
       console.log('responseText : '+ this.responseText);
       setTimeout(function () {
          app.alertMsg = '';
        }, 3000);

        // ????????????????????????????????? JSON
        if (type.indexOf("application/json") === 0) {
            var json = JSON.parse(this.responseText);
            var queryType = json.queryType;
            console.log(queryType + ' response ' + this.responseText);
            if(queryType === 'addZone'){
                console.log('json.responseCode : ' + json.responseCode);
                if(json.responseCode == '999'){
                    app.alertMsg = json.responseMsg;
                } if (json.responseCode == '000') {
                  // alert('reload');
                  window.location.reload();
                }
            } else if(queryType === 'delZone'){
              if(json.responseCode == '999'){
                    app.alertMsg = json.responseMsg;
                } if (json.responseCode == '000') {
                  if(app.zoneList && app.zoneList.length > 0) {
                    app.zoneList.splice(app.delPoint, 1);
                  }
                  app.delPoint = -1;
                }
            } else if(queryType === 'updateZone'){
              app.editPoint = -1;
              if(json.responseCode == '999'){
                  app.alertMsg = json.responseMsg;
              } if (json.responseCode == '000') {
                  app.editPoint = -1;
                  app.alertMsg = '????????????!!!';
              }
            }
        }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}