var express = require('express');
var router = express.Router();
var myapi =  require('../models/myapi.js');
var settings = require('../settings');
var JsonFileTools =  require('../models/jsonFileTools.js');
var util =  require('../models/util.js');
var sessionPath = './public/data/session.json';
var mysessionPath = './public/data/mysession.json';
var profilePath = './public/data/profile.json';
var zonePath = './public/data/zone.json';
var deviceListPath = './public/data/deviceList.json';
var mapPath = './public/data/map.json';
var userPath = './public/data/user.json';
var setPath = './public/data/set.json';
var dataPath = './public/data/data.json';
var finalPath = './public/data/final.json';
var async = require('async');
var axios = require('axios');
var moment = require('moment');

module.exports = function(app) {

	app.get('/gauge', function (req, res) {
		var set = JsonFileTools.getJsonFromFile(setPath);
		var colors = getColors();
		var query = require('url').parse(req.url,true).query;
		var zoneId = query.zoneId;
		var field = query.field;
        var optionSet = set[zoneId][field];


		var target = 'gauge';
		if(optionSet.gauge === 1) {
			target = 'gauge_google';
		} else {
			target = 'gauge';
		}

		res.render(target, { title: 'Gauge',
			gauge: optionSet.gauge,
			optionSet: optionSet,
			colors:colors,
			field: field
		});
	});

	app.get('/chart', function (req, res) {
		var query = require('url').parse(req.url,true).query;
		var mac = query.mac;
		var zoom = query.zoom;
		var gauge = 'gauge';
		var maps, devices, type , title, fieldName;
		try {
			maps = JsonFileTools.getJsonFromFile(mapPath);
		} catch (error) {
			return res.redirect('/map');
		}
		try {
			devices = JsonFileTools.getJsonFromFile(deviceListPath);
		} catch (error) {
			return res.redirect('/device');
		}
		devices.forEach(device => {
			if(device.device_mac===mac) {
				type = device.fport;
				title = device.device_name;
			}
		});

        maps.forEach(map => {
			if(map.deviceType === type) {
				fieldName = map.fieldName;
			}
		});

		res.render('chart', { title: 'Chart',
			fieldName: fieldName,
			title:title,
			zoom:zoom
		});
	});

	app.get('/barchart', function (req, res) {
		var query = require('url').parse(req.url,true).query;
		var mac = query.mac;
		var gauge = 'gauge';
		var maps, devices, type , title, fieldName;
		try {
			maps = JsonFileTools.getJsonFromFile(mapPath);
		} catch (error) {
			return res.redirect('/map');
		}
		try {
			devices = JsonFileTools.getJsonFromFile(deviceListPath);
		} catch (error) {
			return res.redirect('/device');
		}
		devices.forEach(device => {
			if(device.device_mac===mac) {
				type = device.fport;
				title = device.device_name;
			}
		});

        maps.forEach(map => {
			if(map.deviceType === type) {
				fieldName = map.fieldName;
			}
		});

		res.render('barchart', { title: 'Chart',
			fieldName: fieldName,
			title:title
		});
	});

app.get('/', checkLogin);
  app.get('/', function (req, res) {
    
	var profileOb, users, maps, sensorList,zoneList;
	var os = require("os");

	try {
		maps = JsonFileTools.getJsonFromFile(mapPath);
		if (maps == null) {
			return res.redirect('/map');
		}
		
	} catch (error) {
		return res.redirect('/map');
	}
	try {
		users = JsonFileTools.getJsonFromFile(userPath);
		if (users == null) {
			return res.redirect('/account');
		}
		
	} catch (error) {
		return res.redirect('/account');
	}
	try {
		users = JsonFileTools.getJsonFromFile(mapPath);
		if (maps == null) {
			return res.redirect('/map');
		}
		
	} catch (error) {
		return res.redirect('/map');
	}
	try {
		profileObj = JsonFileTools.getJsonFromFile(profilePath);
		if (profileObj == null) {
			profileObj = {};
			JsonFileTools.saveJsonToFile(profilePath, profileObj);
		}
	} catch (error) {
		profileObj = {};
		JsonFileTools.saveJsonToFile(profilePath, profileObj);
	}
	try {
		sensorList = JsonFileTools.getJsonFromFile(deviceListPath);
		if (sensorList == null) {
			return res.redirect('/device');
		}
		
	} catch (error) {
		return res.redirect('/device');
	}
	try {
		zoneList = JsonFileTools.getJsonFromFile(zonePath);
		if (zoneList == null) {
			return res.redirect('/zone');
		}
		
	} catch (error) {
		return res.redirect('/zone');
	}
	var zoneObj = {}, zoneName = {},macObj={},mapObj={};
	sensorList.forEach(device => {
		macObj[device.device_mac] = device;
	});

	function getDeviceField(list) {
		let myObj = {};
		
		list.forEach( mac => {
			let device =  macObj[mac];
			if(device) {
				let type_field = mapObj[device.fport];
				let name = device.device_name;
				myObj[mac] = {"name": name,"field": type_field};
			}
		});
		return myObj;
	}

	zoneList.forEach(zone => {
		zoneObj[zone._id] = getDeviceField(zone.deviceList);
		zoneName[zone._id] = zone.name;
	});

    getAverageData(req.session.user.name, function(err, data){
		if(err) {
			console.log(err);
		}
		var macDataObj = {};
        for(let i=0; i<data.length;i++) {
			let tmp = data[i];
			//console.log(tmp);
			if(macDataObj[tmp._id.macAddr] === undefined) {
				macDataObj[tmp._id.macAddr] = {};
			}
			macDataObj[tmp._id.macAddr][tmp._id.month] = tmp;
		}
		
		console.log(macDataObj);
		res.render('index', { title: 'Index',
		user:req.session.user,
		users:users,
		sensorList: sensorList,
		zoneList: zoneList,
		profile: profileObj,
		maps:maps,
		macDataObj:macDataObj,
		zoneObj:zoneObj,
		zoneName:zoneName,
		host_url:settings.host_url,
		os:os
	})
		
	});


	
  });

  

  app.get('/dashboard', checkLogin);
  app.get('/dashboard', function (req, res) {
	var user = req.session.user;

	var maps,defaultOption={},zoneName={};
	try {
		maps = JsonFileTools.getJsonFromFile(mapPath);
		set = JsonFileTools.getJsonFromFile(setPath);

		colors = getColors();
        
		maps.forEach(map => {
			let keys = Object.keys(map.fieldName);
			for(let i=0;i<keys.length;i++) {
				let key = keys[i];
				defaultOption[key] = getFieldOption(key);
			}
		});
		if (maps === null) {
			return res.redirect('/map');
		}
		
	} catch (error) {
		return res.redirect('/map');
	}
	var devices = null;
	var zones = null;
	try {
		devices = JsonFileTools.getJsonFromFile(deviceListPath);
		if (devices === null) {
			return res.redirect('/device');
		}
		
	} catch (error) {
		return res.redirect('/device');
	}
	try {
		zones = JsonFileTools.getJsonFromFile(zonePath);
		if (zones === null) {
			return res.redirect('/zone');
		}
		
	} catch (error) {
		return res.redirect('/zone');
	}

	var mapObj={}, macObj={},zoneObj = {};
	var target;	

	function getDeviceField(list) {
		let myObj = {};
		
		list.forEach( mac => {
			let device =  macObj[mac];
			let type_field = mapObj[device.fport];
			let name = device.device_name;
			myObj[mac] = {"name": name,"field": type_field};
			target = mac;
		});
		return myObj;
	}

	//mapObj['18'] = {"voltage": "電壓", "temperture": "溫度", "o2": "溶解氧"}
	maps.forEach(map => {
		mapObj[map.deviceType] = map.fieldName;
	});
	//macObj['mac'] = device;
	devices.forEach(device => {
		macObj[device.device_mac] = device;
	});

	let defauOption = {};
	let check = true;
	//zoneName[id] = zone_name;
	zones.forEach(zone => {
		zoneObj[zone._id] = getDeviceField(zone.deviceList);
		zoneName[zone._id] = zone.name;
	});

	if(set===null) {
		set={};
		zones.forEach(zone => {
			set[zone._id] = JSON.parse(JSON.stringify(defaultOption));
		});
		JsonFileTools.saveJsonToFile(setPath, set);
	}

	res.render('dashboard', { title: 'Dashboard',
		user:req.session.user,
		zoneObj : zoneObj,
		set: set, 
		zoneName:zoneName,
		defaultOption: defaultOption,
		colors:colors,
		host_url:settings.host_url,
		api_url:settings.api_server,
		devices:devices,
		host_url:settings.host_url
	});
	
  });

  app.post('/dashboard', function (req, res) {
	var setString = req.body.setString;
	console.log(setString);
	var set = JSON.parse(setString);
	JsonFileTools.saveJsonToFile(setPath, set);
	res.redirect('/dashboard');
  });

  app.get('/report', checkLogin);
  app.get('/report', function (req, res) {
	var query = require('url').parse(req.url,true).query;
	var mac = query.mac;
	var zoneId = query.zoneId;
	var startDate = query.startDate;
	var endDate = query.endDate;

	var profileObj, data;
	if(endDate === undefined){
		var now = new Date();
        endDate = (now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() );
	}
	if(startDate === undefined){
        var fromMoment = moment(endDate,"YYYY/MM/DD").subtract(30,'days');;
        startDate =  fromMoment.format("YYYY/MM/DD");
    }
	try {
		maps = JsonFileTools.getJsonFromFile(mapPath);
        
		if (maps == null) {
			return res.redirect('/map');
		}
		
	} catch (error) {
		return res.redirect('/map');
	}
	try {
		profileObj = JsonFileTools.getJsonFromFile(profilePath);
		if (profileObj == null) {
			profileObj = {};
			JsonFileTools.saveJsonToFile(profilePath, profileObj);
		}
	} catch (error) {
		profileObj = {};
		JsonFileTools.saveJsonToFile(profilePath, profileObj);
	}
	

	try {
		zoneList = JsonFileTools.getJsonFromFile(zonePath);
		if (zoneList == null) {
			return res.redirect('/zone');
		}
		
	} catch (error) {
		return res.redirect('/zone');
	}


	if(mac === undefined) {
		mac = zoneList[0]['deviceList'][0];
	}

	if(zoneId === undefined) {
		zoneId = zoneList[0]['_id'];
	}

	var macType = {};
	var devices = JsonFileTools.getJsonFromFile(deviceListPath);
	for(let i=0;i<devices.length;i++) {
		let device = devices[i];
		macType[device.device_mac] = device.fport;
	}


	var fieldName = null;
	var type = null;

	var type = macType[mac];
	
	for(let i=0;i<maps.length;i++) {
		let map = maps[i];
		if(map.deviceType === type) {
			fieldName = map.fieldName;
			break;
		}
	}


	res.render('report', { title: 'Report',
		user:req.session.user,
		sensorList: devices,
		zoneList: zoneList,
		profile: profileObj,
		maps:maps,
		fieldName:fieldName,
		macType:macType,
		mac: mac,
		type:type,
		zoneId: zoneId,
		startDate:startDate,
		endDate:endDate,
		host_url:settings.host_url
	});
  });

  app.get('/login', checkNotLogin);
  app.get('/login', function (req, res) {
	//Reset data to empty
	try {
		JsonFileTools.saveJsonToFile(dataPath, {});
	} catch (error) {
		JsonFileTools.saveJsonToFile(dataPath, {});
	}
	req.session.user = null;
  	// var name = req.flash('post_name').toString();
	res.render('user/login', { title: 'Login',
		error: ''
	});
  });

  app.post('/login', checkNotLogin);
  app.post('/login', function (req, res) {
  	var post_name = req.body.account;
	var	post_password = req.body.password;
	var successMessae,errorMessae;
  	console.log('Debug login post -> name:'+post_name);
	console.log('Debug login post -> password:'+post_password);
	//背景取資料
	
	myapi.toLogin(post_name, post_password, function(err, result) {
		
		if(err) {
			res.render('user/login', { title: 'Login',
				error: err
			});
		} else {
			
			var sessionObj;
			try {
				sessionObj = JsonFileTools.getJsonFromFile(mysessionPath);
			} catch (error) {
				sessionObj = {};
			}
			if(sessionObj === null) {
				sessionObj = {};
			}
            sessionObj[result.name] = result;
			JsonFileTools.saveJsonToFile(mysessionPath, sessionObj);
			req.session.user = result;
			return res.redirect('/');
		}
	})
  });

  app.get('/logout', function (req, res) {
	var name = '', sessionObj = {};
	try {
		if(req.session.user) {
			name = req.session.user.name;
		}
		sessionObj = JsonFileTools.getJsonFromFile(mysessionPath);
		if(name.length > 0) {
			delete obj[name];
		}
	} catch (error) {
		sessionObj = {};
	}
	JsonFileTools.saveJsonToFile(mysessionPath, sessionObj);
    req.session.user = null;
    req.flash('success', '');
    res.redirect('/login');
  });

    app.get('/account', checkLogin);
    app.get('/account', function (req, res) {

		console.log(util.getCurrentTime() + ' render to account.ejs');
		var myuser = req.session.user;
		var successMessae,errorMessae;
		
		async.series([
			function(next){
				myapi.getUserList(myuser.name, function(err2, result2){
					next(err2, result2);
				});
			},
			function(next){
				myapi.getZoneList(myuser.name, function(err3, result3){
					next(err3, result3);
				});
			}
		], function(errs, results){
			if(errs) {
				return callback(errs, null);
			} else {
				// console.log(results);   // results = [result1, result2, result3]
				var users = results[0];
				JsonFileTools.saveJsonToFile(userPath, users );
				var zoneList = results[1];//map list
				var newUsers = [];
				for(var i=0;i<  users.length;i++){
					//console.log('name : '+users[i]['name']);
					if( users[i]['userName'] == 'sysAdmin' || users[i]['userName'] == 'ndhuAdmin'){
						continue;
					}
					newUsers.push(users[i]);
				}
				res.render('user/account', { title: 'Account', // user/account
					user: myuser,//current user : administrator
					users: newUsers,//All users
					zones: zoneList,
					error: errorMessae,
					success: successMessae
				});
			}
		});
	});

	app.post('/account', checkNotLogin);
    app.post('/account', function (req, res) {
		res.redirect('/account');
	});
	
	app.get('/changeSelfPwd', checkLogin);
    app.get('/changeSelfPwd', function (req, res) {

		console.log(util.getCurrentTime() + ' render to account.ejs');
		var successMessae,errorMessae;
		
		res.render('user/changeSelfPwd', { title: 'ChangeSelfPwd', // user/account
			user: req.session.user,
			error: errorMessae,
			success: successMessae
		});
	});

	app.post('/changeSelfPwd', checkNotLogin);
    app.post('/changeSelfPwd', function (req, res) {
		res.redirect('/changeSelfPwd');
    });


	app.get('/map', checkLogin);
	app.get('/map', function (req, res) {
		var postType = req.flash('type').toString();
		var successMessae,errorMessae;
		errorMessae = req.flash('error').toString();
		var name = req.session.user.name;
		myapi.getMapList(name, function(err, result){
			if(err) {
                return res.redirect('/login');//返回登入頁
			}
			JsonFileTools.saveJsonToFile(mapPath, result);
            return res.render('map', { title: 'Map',
				user:req.session.user,
				target:null,//current map
				maps: result,//All maps
				error: errorMessae,
				success: successMessae
			});
		});
	});

	app.post('/map', checkLogin);
  	app.post('/map', function (req, res) {
  		var	postType = req.body.postType;
		var postSelect = req.body.postSelect;
		var user = req.session.user;
	    var token = encodeURI(user.token);
		var error = '';
		var mapObj = {};
		var fieldNameObj = {};
		if (postSelect == 'new' || postSelect == 'edit') {
			try {
				var field = req.body.field;
				var start = req.body.start;
				var	end = req.body.end;
				var method = req.body.method;
				var fieldName = req.body.fieldName;

				if (field) {
					if (field && typeof(field) === 'string') {
						mapObj[field] = [Number(start), Number(end), method];
						fieldNameObj[field] = fieldName;
					} else {
						for (let i=0; i<field.length; ++i) {
							//New map if exist has same data
							if(mapObj[field]) {
								req.flash('error', '輸入感測類型重複');
								return res.redirect('/map');
							}
							mapObj[field[i]] = [Number(start[i]), Number(end[i]), method[i]];
							fieldNameObj[field[i]] = fieldName[i];
						}
					}
				}
			} catch (error) {
				console.log(error);
				req.flash('error', error);
				return res.redirect('/map');
				return;
			}

		}

		console.log('postType:' + postType);
		console.log('postSelect:' + postSelect);
		var url = settings.api_server + settings.api_get_map_list;

		if(postSelect == "del"){//Delete mode
			//Del map
			axios.delete(url, {
				data: {
					token:token,
					deviceType: postType
				  }
				})
			.then(function (response) {
				console.log(response.data);
				if (response.data.responseCode === '000') {
					return res.redirect('/map');
				} else {
					req.flash('error', response.data.responseMsg);
					return res.redirect('/map');
				}
			})
			.catch(function (error) {
				req.flash('error', error);
				return res.redirect('/map');
			});

		}else if(postSelect == "new"){//New account
			//new map
			axios.post(url, {
				    token: token,
					deviceType: postType,
					typeName: req.body.typeName,
					fieldName: fieldNameObj,
					map: mapObj,
					createUser: user.name
				})
			.then(function (response) {
				console.log(response.data);
				if (response.data.responseCode === '000') {
					req.flash('error', '');
					return res.redirect('/map');
				} else {
					req.flash('error', response.data.responseMsg);
					return res.redirect('/map');
				}
			})
			.catch(function (error) {
				req.flash('error', error);
				return res.redirect('/map');
			});

	    }else if(postSelect == "edit"){
			//Edit
			axios.put(url, {
					token:token,
					deviceType: postType,
					typeName: req.body.typeName,
					fieldName: fieldNameObj,
					map: mapObj,
					updateUser: user.name
				})
			.then(function (response) {
				console.log(response.data);
				if (response.data.responseCode === '000') {
					return res.redirect('/map');
				} else {
					req.flash('error', response.data.responseMsg);
					return res.redirect('/map');
				}
			})
			.catch(function (error) {
				req.flash('error', error);
				return res.redirect('/map');
			});
		} else {
			//Select map
			req.flash('error', '');
			return res.redirect('/map');
		}
	  });

	app.get('/device', checkLogin);
	app.get('/device', function (req, res) {
        var maps;
		try {
			maps = JsonFileTools.getJsonFromFile(mapPath);
			if (maps == null) {
				return res.redirect('/map');
			}
		} catch (error) {
			return res.redirect('/map');
		}

		console.log('render to account.ejs');
		var refresh = req.flash('refresh').toString();
		var myuser = req.session.user;
		var successMessae,errorMessae;

		myapi.getDeviceList(myuser.name, function(err, devices){
			
			if(err){
				errorMessae = err;
			} else {
				JsonFileTools.saveJsonToFile(deviceListPath, devices);
			}
			

			res.render('device', { title: 'Device', // user/account
				user:myuser,//current user : administrator
				devices: devices,//All users
				maps:maps,
				error: errorMessae,
				success: successMessae
			});
		});
	});

	app.post('/device', checkNotLogin);
	app.post('/device', function (req, res) {
		res.redirect('/device');
	});

	app.get('/zone', checkLogin);
	app.get('/zone', function (req, res) {

		console.log('render to account.ejs');
		var refresh = req.flash('refresh').toString();
		var myuser = req.session.user;
		var successMessae,errorMessae;
		async.series([
			function(next){
				myapi.getDeviceList(myuser.name, function(err2, result2){
					next(err2, result2);
				});
			},
			function(next){
				myapi.getZoneList(myuser.name, function(err3, result3){
					next(err3, result3);
				});
			}
		], function(errs, results){
			if(errs) {
				console.log('???? get zone errors ----');
				console.log(errs);
				res.render('zone', { title: 'Zone', // user/account
					user:myuser,//current user : administrator
					devices: [],//All devices
					zones: [],
					error: errs,
					success: successMessae
				});
			} else {
				// console.log(results);   // results = [result1, result2, result3]
				var sensorList = results[0];
				var zoneList = results[1];//map list
				JsonFileTools.saveJsonToFile(zonePath, zoneList);
				res.render('zone', { title: 'Zone', // user/account
					user:myuser,//current user : administrator
					devices: sensorList,//All devices
					zones: zoneList,
					error: errorMessae,
					success: successMessae
				});
			}
		});
	});

	app.post('/zone', checkNotLogin);
	app.post('/zone', function (req, res) {
		res.redirect('/device');
	});
};

function checkLogin(req, res, next) {
	if(myapi.isExpired(req.session.user)) {
		//Expired is true
		res.redirect('/logout');//返回登入頁
	} else {
		next();
	}
}

function checkNotLogin(req, res, next) {
  if (req.session.user) {
    req.flash('error', 'Have login!');
    res.redirect('back');//返回之前的页面
  } else {
	  next();
  }
}

function getData(username, callback) {
	var data;
	try {
		getCloudData(username, function(err, result){
			if(err){
				return callback(err, {});
			}
			return callback(null, result);
		})
	} catch (error) {
		JsonFileTools.saveJsonToFile(dataPath, {});
		return callback(error, {});
	}
}

function getCloudData(name, callback) {
    async.series([
		function(next){
			myapi.getDeviceList(name, function(err1, result1){
				next(err1, result1);
			});
		},
		function(next){
			myapi.getMapList(name, function(err2, result2){
				next(err2, result2);
			});
		},
		function(next){
			myapi.getZoneList(name, function(err3, result3){
				next(err3, result3);
			});
		}
	], function(errs, results){
		if(errs) {
			return callback(errs, null);
		} else {
			// console.log(results);   // results = [result1, result2, result3]
			var sensorList = results[0];
			for (let m in sensorList) {
				let sensor = sensorList[m];
				sensor.monthPower = 0;
				sensor.startPower = 0;
			}
			var mapList = results[1];//map list
			var mapObj = {};
			if(mapList) {
				for (let i=0; i < mapList.length; ++i) {
					mapObj[mapList[i]['deviceType']] = mapList[i]['typeName'];
				}
			}
			if (sensorList) {
				for (let j=0; j < sensorList.length; ++j) {
					let sensor = sensorList[j];
					sensor['device_mac'] = sensor['device_mac'].toLowerCase();
					sensor['typeName'] = mapObj[sensor['fport']];
				}
			}
			var zoneList = results[2];//zone list
			var data = {sensorList: sensorList,
						mapList: mapList, 
						zoneList: zoneList
					};
			try {
				JsonFileTools.saveJsonToFile(dataPath, data);
			} catch (error) {
				JsonFileTools.saveJsonToFile(dataPath, {});
			}
			return callback(null, data);
		}
	});
}

function getAverageData(name, callback) {
    async.series([
		function(next){
			myapi.getAverage(name, function(err2, result2){
				next(err2, result2);
			});
		}
	], function(errs, results){
		if(errs) {
			return callback(errs, null);
		} else {
			// console.log(results);   // results = [result1, result2, result3]
			var data = results[0];
			
			return callback(null, data);
		}
	});
}

function getMacEvents(name,deviceList, callback) {
	var now = new Date();
    
	var endDate = (now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() );
	var fromMoment = moment(endDate,"YYYY/MM/DD").subtract(100,'days');;
	var startDate =  fromMoment.format("YYYY/MM/DD");
    let promises = [];
	deviceList.forEach(function(device){
		try {
			let mac = device.device_mac;
			console.log('mac : ' + mac);
			
			let url = settings.api_server +'/device/v1/event/';
			promises.push(axios.get(url, {headers : { 'test' : true }}));
		} catch (error) {
			console.log('???? getMacEvents err: ' + error);
		}

	});

	axios.all(promises)
    .then(axios.spread((acct, perms) => {
      // axios 回傳的資料在 data 屬性
      console.table('FuncA 回傳結果', acct.data)
      // fetch 資料可以先在 function 內作 json()
	  console.table('FuncB 回傳結果', perms)
	  return callback(null, acct.data.data);
    }))
    .catch((err) => { console.error(err) })
    
    /*myapi.getEventList(name, mac, startDate, endDate, function(err,result){
        if(err) {
            return callback(err, null);
        }
        return callback(null, result);
    })*/
}


function getFieldOption(field) {
	
	var options;

	if(field === "temperature") {
		options = {
			gauge:1,unit:'℃',
			field:field,
			min:0,max:40,
			area1:0,color1: 'blue',
			area2:50,color2: 'green',
			area3:70,color3: 'red',
	};
	} else if(field === "o2") {
		options = {
			gauge:1,unit:'mg/L',
			field:field,
			min:0,max:20,
			area1:0,color1: 'blue',
			area2:25,color2: 'green',
			area3:50,color3: 'red',
		};
	} else if(field === "nh") {
		options = {
			gauge:5,unit:'mg/L',
			field:field,
			min:0,max:1,
			area1:0,color1: 'green',
			area2:20,color2: 'orange',
			area3:50,color3: 'red',
			width: 240, height: 180,
		};
	}  else if(field === "ec") {
		options = {
			gauge:4,unit:'μS/cm',
			field:field,
			min:0,max:4000,
			area1:0,color1: 'gray',
			area2:75,color2: 'orange',
			area3:85,color3: 'red',
		};
	}  else if(field === "ph") {
		options = {
			gauge:6,unit:'PH值',
			field:field,
			min:0,max:14,
			area1:0,color1: 'orange',
			area2:25,color2: 'green',
			area3:75,color3: 'red',
		};
	} 
	return options
}

function getColors(field) {
	return {
		"red": {"color":"#E62E00", "style": {"background-color":"#E62E00"}},
		"orange": {"color":"#F39C12", "style":{"background-color":"#F39C12"}},
		"yellow": {"color":"#E6E600", "style": {"background-color":"#E6E600"}},
		"green": {"color":"#2ECC71","style":  {"background-color":"#2ECC71"}},
		"blue": {"color":"#18F0E0","style": {"background-color":"#18F0E0"}},
		"indigo": {"color":"#3333CC","style": {"background-color":"#3333CC"}},
		"purple": {"color":"#9900CC","style": {"background-color":"#9900CC"}},
		"black": {"color":"#000000","style": {"background-color":"#000000"}},
		"purple": {"color":"#9900CC","style": {"background-color":"#9900CC"}},
		"gray": {"color":"#A6A6A6","style": {"background-color":"#A6A6A6"}},
		"light": {"color":"#F2F2F2","style": {"background-color":"#F2F2F2"}},
	}
}