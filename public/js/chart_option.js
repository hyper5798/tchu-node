
var google_temperature_options = {
	min:0,max:20,
	width: 240, height: 180,
	redFrom: 28, redTo: 40,
	greenFrom:20,greenTo:28,
	greenColor:'#7AF018',
	yellowFrom:0, yellowTo: 20,
	yellowColor:'#18F0E0',
	minorTicks: 5
  };

  
/*var google_o2_options = {
	min:0,max:20,
	width: 240, height: 180,
	redFrom: 10, redTo: 20,
	greenFrom:4,greenTo:10,
	greenColor:'#7AF018',
	yellowFrom:0, yellowTo: 4,
	yellowColor:'#18F0E0',
	minorTicks: 5
  };*/


//溫度
var gauge_option2 = {
	series: [
	  {
		type: 'gauge',
		min:0,
		max:40,
		radius : '95%',
		splitNumber:5,
		axisLine: {
		  lineStyle: {
			width: 20,
			color: [
			  [0.5, '#67e0e3'],
			  [0.7, '#16BD25'],
			  [1, '#fd666d']
			]
		  }
		},
		pointer: {
		  itemStyle: {
			color: 'inherit'
		  }
		},
		axisTick: {
		  distance: -20,
		  length: 8,
		  lineStyle: {
			color: '#fff',
			width: 2
		  }
		},
		splitLine: {
		  distance: -20,
		  length: 20,
		  lineStyle: {
			color: '#fff',
			width: 4
		  }
		},
		axisLabel: {
		  color: 'inherit',
		  distance: 20,
		  fontSize: 20
		},
		title : {
			offsetCenter: [0, '60%'],       // x, y，单位px
			fontWeight: 'bolder',
			fontSize: 15,
			fontStyle: 'italic',
			color: 'inherit'
		},
		detail: {
		  offsetCenter: [0, '40%'],
		  valueAnimation: true,
		  formatter: '{value}',
		  color: 'inherit',
		  fontSize: 20
		},
		data: [
		  {
			value: 22
		  }
		]
	  }
	]
  };

  function get_option2(set, colors) {
	var set ={
		type: 'gauge',
		min: set.min,
		max: set.max,
		radius : '95%',
		splitNumber:5,
		axisLine: {
		  lineStyle: {
			width: 20,
			color: [[ set.area2/100, colors[optionSet.color1].color],[ set.area3/100, colors[optionSet.color2].color],[1, colors[optionSet.color3].color]]
		  }
		},
		pointer: {
		  itemStyle: {
			color: 'inherit'
		  }
		},
		axisTick: {
		  distance: -20,
		  length: 8,
		  lineStyle: {
			color: '#fff',
			width: 2
		  }
		},
		splitLine: {
		  distance: -20,
		  length: 20,
		  lineStyle: {
			color: '#fff',
			width: 4
		  }
		},
		axisLabel: {
		  color: 'inherit',
		  distance: 20,
		  fontSize: 20
		},
		title : {
			offsetCenter: [0, '60%'],       // x, y，单位px
			fontWeight: 'bolder',
			fontSize: 15,
			fontStyle: 'italic',
			color: 'inherit'
		},
		detail: {
		  offsetCenter: [0, '40%'],
		  valueAnimation: true,
		  formatter: '{value}',
		  color: 'inherit',
		  fontSize: 20
		},
		data:[{value: 0, name: set.unit}]
	  };
	return {
		series: [set]
	};
}

  var gauge_option3 = {
	series: [
	  {
		  name:'速度',
		  type:'gauge',
		  min:0,
		  max:4000,
		  radius : '90%',
		  splitNumber:5,
		  axisLine: {            // 坐标轴线
			  lineStyle: {       // 圓框寬度
				  width: 10,
				  color: [
					  [0.5, '#67e0e3'],
					  [0.7, '#16BD25'],
					  [1, '#fd666d']
					]
			  }
		  },
		  axisTick: {            // 坐标轴小标记
			  length :5,        // 属性length控制线长
			  lineStyle: {       // 属性lineStyle控制线条样式
				  color: 'blue'
			  }
		  },
		  splitLine: {           // 分隔线
			  length :10,         // 属性length控制线长
			  lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
				  color: 'blue'
			  }
		  },
		  axisLabel: {
			color: 'inherit',
			distance: 10,
			fontSize: 10
		  },
		  title : {
			offsetCenter: [0, '90%'],       // x, y，单位px
			fontWeight: 'bolder',
			fontSize: 15,
			fontStyle: 'italic',
			color: 'inherit'
		},
		detail : {
			offsetCenter: [0, '70%'],
			fontWeight: 'bolder',
			fontSize: 20,
			color: 'inherit'
		},
		  data:[{value: 0, name: 'mg/l'}]
	  }
	]
  };

  function get_option3(set, colors) {
	var set ={
		name:'速度',
		type:'gauge',
		min: set.min,
		max: set.max,
		radius : '90%',
		splitNumber:5,
		axisLine: {            // 坐标轴线
			lineStyle: {       // 圓框寬度
				width: 10,
				color: [[ set.area2/100, colors[optionSet.color1].color],[ set.area3/100, colors[optionSet.color2].color],[1, colors[optionSet.color3].color]]
			}
		},
		axisTick: {            // 坐标轴小标记
			length :5,        // 属性length控制线长
			lineStyle: {       // 属性lineStyle控制线条样式
				color: 'blue'
			}
		},
		splitLine: {           // 分隔线
			length :10,         // 属性length控制线长
			lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
				color: 'blue'
			}
		},
		axisLabel: {
		  color: 'inherit',
		  distance: 10,
		  fontSize: 10
		},
		title : {
		  offsetCenter: [0, '90%'],       // x, y，单位px
		  fontWeight: 'bolder',
		  fontSize: 15,
		  fontStyle: 'italic',
		  color: 'inherit'
	  },
	  detail : {
		  offsetCenter: [0, '70%'],
		  fontWeight: 'bolder',
		  fontSize: 20,
		  color: 'inherit'
	  },
		data:[{value: 0, name: set.unit}]
	};
	return {
		series: [set]
	};
}

  //電導率
  var gauge_option4 = {
	series: [
		{
		name:'電導率',
		type:'gauge',
		min:0,
		max:2000,
		radius : '95%',
		splitNumber:10,
		axisLine: {            // 坐标轴线
			lineStyle: {       // 圓框寬度
				width: 10
			}
		},
		axisTick: {            // 坐标轴小标记
			length :8,        // 属性length控制线长
			lineStyle: {       // 属性lineStyle控制线条样式
				color: 'blue'
			}
		},
		splitLine: {           // 分隔线
			length :15,         // 属性length控制线长
			lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
				color: 'gray'
			}
		},
		axisLabel: {
			color: 'inherit',
			distance: 10,
			fontSize: 10
		  },
		title : {
			offsetCenter: [0, '90%'],       // x, y，单位px
			fontWeight: 'bolder',
			fontSize: 15,
			fontStyle: 'italic',
			color: '#FFFFFF'
		},
		detail : {
			offsetCenter: [0, '70%'],
			fontWeight: 'bolder',
			fontSize: 25,
			color: '#FFFFFF'
		},
		data:[{value: 0, name: 'μS/cm'}]
	}]
};

function get_option4(set, colors) {
	var set ={
		name:'電導率',
		type:'gauge',
		min: set.min,
		max: set.max,
		radius : '95%',
		splitNumber:10,
		axisLine: {            // 坐标轴线
			lineStyle: {       // 属性lineStyle控制线条样式
				color: [[ set.area2/100, colors[optionSet.color1].color],[ set.area3/100, colors[optionSet.color2].color],[1, colors[optionSet.color3].color]], 
				width: 10
			}
		},
		axisTick: {            // 坐标轴小标记
			length :8,        // 属性length控制线长
			lineStyle: {       // 属性lineStyle控制线条样式
				color: 'blue'
			}
		},
		splitLine: {           // 分隔线
			length :15,         // 属性length控制线长
			lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
				color: 'gray'
			}
		},
		axisLabel: {
			color: 'inherit',
			distance: 10,
			fontSize: 10
		  },
		title : {
			offsetCenter: [0, '90%'],       // x, y，单位px
			fontWeight: 'bolder',
			fontSize: 15,
			fontStyle: 'italic',
			color: '#FFFFFF'
		},
		detail : {
			offsetCenter: [0, '70%'],
			fontWeight: 'bolder',
			fontSize: 25,
			color: '#FFFFFF'
		},
		data:[{value: 0, name: set.unit}]
	};
	return {
		series: [set]
	};
}

//左斜氨氮
var gauge_option5 = {
	series: [
	{
		name:'氨氮',
		type:'gauge',
		//center : ['25%', '55%'],    // 默认全局居中 第一參數:x軸，第二參數:Y軸
		radius : '90%',
		min:0,
		max:1,
		startAngle:225,
		endAngle:45,
		splitNumber:5,
		axisLine: {            // 坐标轴线
			lineStyle: {       // 属性lineStyle控制线条样式
			color: [[0.2, '#228b22'],[0.5, '#f06e1f'],[1, '#fa1603']], 
				width: 8
			}
		},
		axisTick: {            // 坐标轴小标记
			length :12,        // 属性length控制线长
			lineStyle: {       // 属性lineStyle控制线条样式
				color: 'inherit'
			},
			color: '#FFFFFF'
		},
		splitLine: {           // 分隔线
			length :15,         // 属性length控制线长
			lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
				color: 'inherit'
			}
		},
		pointer: {
			width:5
		},
		axisLabel: {
			color: 'inherit',
			distance: 10,
			fontSize: 10
		  },
		title : {
			fontSize: 10,
			offsetCenter: [20, '60%'],       // x, y，单位px
			color: 'inherit',
			fontSize: 15,
		},
		detail : {
			offsetCenter: [20, '40%'],
			fontWeight: 'bolder',
			fontSize: 25,
			color: 'inherit'
		},
		data:[{value: 0, name:'mg/L'}]
	}]
	
};

function get_option5(set, colors) {
	var set ={
		name:'氨氮',
		type:'gauge',
		//center : ['25%', '55%'],    // 默认全局居中 第一參數:x軸，第二參數:Y軸
		radius : '90%',
		min: set.min,
		max: set.max,
		startAngle:225,
		endAngle:45,
		splitNumber:5,
		axisLine: {            // 坐标轴线
			lineStyle: {       // 属性lineStyle控制线条样式
				color: [[ set.area2/100, colors[optionSet.color1].color],[ set.area3/100, colors[optionSet.color2].color],[1, colors[optionSet.color3].color]], 
				width: 8
			}
		},
		axisTick: {            // 坐标轴小标记
			length :12,        // 属性length控制线长
			lineStyle: {       // 属性lineStyle控制线条样式
				color: 'inherit'
			},
			color: '#FFFFFF'
		},
		splitLine: {           // 分隔线
			length :15,         // 属性length控制线长
			lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
				color: 'inherit'
			}
		},
		pointer: {
			width:5
		},
		axisLabel: {
			color: 'inherit',
			distance: 10,
			fontSize: 10
		  },
		title : {
			fontSize: 10,
			offsetCenter: [20, '60%'],       // x, y，单位px
			color: 'inherit',
			fontSize: 15,
		},
		detail : {
			offsetCenter: [20, '40%'],
			fontWeight: 'bolder',
			fontSize: 25,
			color: 'inherit'
		},
		data:[{value: 0, name: set.unit}]
	};
	return {
		series: [set]
	};
}

function getDefaultSetting(field) {
	var setting = {};
	if(field === 'temperature') {//temperature
		setting = {
			min:0, max:40,
			splitNumber:5,
		}
	}
}

//右斜PH
function get_option6(set, colors) {
	var set = {
		name:'轉速',
		type:'gauge',
		//center : ['25%', '55%'],    // 默认全局居中 第一參數:x軸，第二參數:Y軸
		radius : '90%',
		min: set.min,
		max: set.max,
		startAngle:135,
		endAngle:-45,
		splitNumber:7,
		axisLine: {            // 坐标轴线
			lineStyle: {       // 属性maxlineStyle控制线条样式
			color: [[ set.area2/100, colors[optionSet.color1].color],[ set.area3/100, colors[optionSet.color2].color],[1, colors[optionSet.color3].color]], 
				width: 8
			}
		},
		axisTick: {            // 坐标轴小标记
			length :12,        // 属性length控制线长
			lineStyle: {       // 属性lineStyle控制线条样式
				color: 'inherit'
			}
		},
		splitLine: {           // 分隔线
			length :20,         // 属性length控制线长
			lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
				color: 'inherit'
			}
		},
		pointer: {
			width:5
		},
		axisLabel: {
			color: 'inherit',
			distance: 10,
			fontSize: 10
		},
		title : {
			fontSize: 10,
			offsetCenter: [-20, '60%'],       // x, y，单位px
			color: 'inherit',
			fontSize: 15,
		},
		detail : {
			offsetCenter: [-20, '40%'],
			fontWeight: 'bolder',
			fontSize: 25,
			color: 'inherit'
		},
		data:[{value: 0, name: set.unit}]
	};

	return {
		series: [set]
	};
}


var gauge_option6 = {
	series: [
	{
	name:'轉速',
	type:'gauge',
	//center : ['25%', '55%'],    // 默认全局居中 第一參數:x軸，第二參數:Y軸
	radius : '90%',
	min:0,
	max:14,
	startAngle:135,
	endAngle:-45,
	splitNumber:7,
	axisLine: {            // 坐标轴线
		lineStyle: {       // 属性lineStyle控制线条样式
		color: [[0.2, '#ff4500'],[0.8, '#228b22'],[1, '#ff4500']], 
			width: 8
		}
	},
	axisTick: {            // 坐标轴小标记
		length :12,        // 属性length控制线长
		lineStyle: {       // 属性lineStyle控制线条样式
			color: 'inherit'
		}
	},
	splitLine: {           // 分隔线
		length :20,         // 属性length控制线长
		lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
			color: 'inherit'
		}
	},
	pointer: {
		width:5
	},
	axisLabel: {
		color: 'inherit',
		distance: 10,
		fontSize: 10
	  },
	title : {
		fontSize: 10,
		offsetCenter: [-20, '60%'],       // x, y，单位px
		color: 'inherit',
		fontSize: 15,
	},
	detail : {
		offsetCenter: [-20, '40%'],
		fontWeight: 'bolder',
		fontSize: 25,
		color: 'inherit'
	},
	data:[{value: 0, name: 'ph'}]
}]
};

var gauge_option8 = {
	tooltip: {
	  formatter: '{a} <br/>{b} : {c}%'
	},
	series: [
	  {
		name: 'Pressure',
		type: 'gauge',
		radius : '100%',
		detail: {
		  formatter: '{value}'
		},
		data: [
		  {
			value: 50,
			name: 'SCORE'
		  }
		]
	  }
	]
  };

function getGaugeFieldOption(options, field) {
	let option = options['series'][0];
	let data = option.data;
    if(field === 1) {//溫度
		option.min = 0;
		option.max = 40;
		option.splitNumber = 4;
		option.data[0]['name'] = '℃';
	} else if(field === 2){//溶解氧
		option.min = 0;
		option.max = 20;
		option.splitNumber = 5;
		option.data[0]['name'] = 'mg/L';
	}  else if(field === 3){//氨氮
		option.min = 0;
		option.max = 1;
		option.splitNumber = 5;
		option.data[0]['name'] = 'mg/L';
	}  else if(field === 4){//電導率
		option.min = 0;
		option.max = 4000;
		option.splitNumber = 4;
		option.data[0]['name'] = 'mg/L';
	}  else if(field === 5){//PH
		option.min = 0;
		option.max = 14;
		option.splitNumber = 7;
		option.data[0]['name'] = 'PH';
	}
	return options
}

function getGaugeFieldUnit(field) {
	var unit = '℃';
    if(field === 1) {//溫度
		unit = '℃';
	} else if(field === 2){//溶解氧
		unit = 'mg/L';
	}  else if(field === 3){//氨氮
		unit = 'mg/L';
	}  else if(field === 4){//電導率
		unit = 'mg/L';
	}  else if(field === 5){//PH
		unit = 'PH';
	}
	return unit;
}

let lineOption = {
  title: {
    text: 'Stacked Line'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
};

let areaOption = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',//線性圖
        areaStyle: {} ,//線性圖轉區塊圖
        smooth: true,//平順線性圖
    }]
};

let barOption = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'bar',//線性圖
        areaStyle: {} ,//線性圖轉區塊圖
        smooth: true,//平順線性圖
    }]
};

let appOption = {
    title: {
        text: '溫濕度折線圖'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: []
    },
    /* dataZoom: [
        {
            show: true,
            realtime: true,
            start: 0,
            end: 100
        }
    ], */
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: []
};

/*getLineOption: report lint option for lora format
* @param title: line title
* @param fields : field key list
* @param titles : field name list
* @param list: report list
*
*/
function getLineOption(title, fields,titles, list) {
    let mData = {time:[]};
    let serials = [];
    let option = JSON.parse(JSON.stringify(appOption));
    option.title.text = title;
    option.legend.data = titles;

    //Get serial data
    list.forEach(function(report) {
        mData['time'].push(report['recv']);
        for(let i=0; i < fields.length; ++i) {
            let key =  fields[i];
            ;
            if(mData[key] == undefined) {
                mData[key] = [];
            }
            mData[key].push(report[key])
        }
    });
    option.xAxis.data = mData.time;

    for(let j=0; j < fields.length; ++j) {
        let key = fields[j];
        let title = titles[j];
        let serial = {
            name: key, // field name
            type: 'line',
            data: mData[key]
        };
        option.series.push(serial);
    }
    
    
    return option;
}

/*getLineOption: report lint option for lora format
* @param title: line title
* @param fields : field key list
* @param titles : field name list
* @param list: report list
* {"macAddr":"0000000005010c20","data":"fb010694021a060110032a7b250000","timestamp":1555382382000,
  "recv":"2019-04-16T02:39:42Z","date":"2019-04-16 10:39:42","information":{"voltage":538,"temperature":27.2,"o2":81}}
*/
function getLoraLineOption(title, fields,titles, list=null) {
    let mData = {time:[]};
    let serials = [];
	let tmp = JSON.parse(JSON.stringify(appOption));
	
    tmp.title.text = title;
    tmp.legend.data = titles;
    //Get serial
    titles.forEach(function(key) {
        mData[key] = []
        let serial = {
            name: key,
            type: 'line',
            data: []
        };
        serials.push(serial);
    });

    tmp.series = serials;

	//Get serial data
	if(list && list.length>0) {
		list.forEach(function(report) {
			mData['time'].push(report['recv']);
			for(let i=0; i < fields.length; ++i) {
				let key =  fields[i];
				;
				if(mData[key] == undefined) {
					mData[key] = [];
				}
				mData[key].push(report['information'][key])
			}
		});
	} else {
		mData['time'].push(new Date().toLocaleString());
			for(let i=0; i < fields.length; ++i) {
				let key =  fields[i];
				;
				if(mData[key] == undefined) {
					mData[key] = [];
				}
				mData[key].push(0)
			}

	}
   

    tmp.xAxis.data = mData.time;

    for(let j=0; j < fields.length; ++j) {
        let key = fields[j];
        tmp.series[j].data = mData[key];
    }
    return tmp;
}


function refreshLineData(myChart, fields, data){
    //刷新数据
    let origin_option = myChart.getOption();
    for(let j=0; j < fields.length; ++j) {
        let key = fields[j];
		origin_option.series[j].data.push(data[key]);
		
    }
    let date = data['recv'];
    date = new Date(date);
    date = date.toLocaleString();
	origin_option.xAxis[0].data.push(date);
	

    myChart.setOption(origin_option, true);
}

function getGaugeSetting(target, name, value, set) {
    //console.log('set -->');
    //console.log(set);
    let mOption = JSON.parse(JSON.stringify(target));
    let data = mOption.series[0];
    let min,max,unit;
    if(set !== null) {
        min = set.min;
        max = set.max;
        unit = set.unit;
        data.axisLine.lineStyle.color = set.range;
    } else if(name === 'temperature' || name === '溫度') {
        min = -20;
        max = 50;
        unit = '°C';
    } else if(name === 'humidity' || name === '濕度') {
        min = 0;
        max = 100;
        unit = '%';
    } else {
        min = 0;
        max = 100;
        unit = '';
    }

    data.name = name;//values[i];
    data.detail.formatter = '{value}' + unit;
    data.data[0].value = value;//report[keys[i]];
    data.data[0].name = name;//values[i];
    let mUnit = '{value}' + unit;
    if(min !== undefined)
        data.min = min;
    if(max !== undefined)
        data.max = max;
    if(unit !== undefined)
        data.detail.formatter = mUnit;
    //console.log('Gauge option:');
    //console.log(mUnit);
    return mOption;
}