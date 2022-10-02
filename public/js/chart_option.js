
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
			color: 'auto'
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
		  color: 'auto',
		  distance: 20,
		  fontSize: 20
		},
		title : {
			offsetCenter: [0, '60%'],       // x, y，单位px
			textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
				fontWeight: 'bolder',
				fontSize: 15,
				fontStyle: 'italic',
				color: 'auto'
			}
		},
		detail: {
		  offsetCenter: [0, '40%'],
		  valueAnimation: true,
		  formatter: '{value}',
		  color: 'auto',
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
			color: 'auto',
			distance: 10,
			fontSize: 10
		  },
		  title : {
			offsetCenter: [0, '90%'],       // x, y，单位px
			textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
				fontWeight: 'bolder',
				fontSize: 15,
				fontStyle: 'italic',
				color: 'auto'
			}
		},
		detail : {
			offsetCenter: [0, '70%'],
			textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
				fontWeight: 'bolder',
				fontSize: 20,
				color: 'auto'
			}
		},
		  data:[{value: 2400, name: 'mg/l'}]
	  }
	]
  };

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
			color: 'auto',
			distance: 10,
			fontSize: 10
		  },
		title : {
			offsetCenter: [0, '90%'],       // x, y，单位px
			textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
				fontWeight: 'bolder',
				fontSize: 15,
				fontStyle: 'italic',
				color: '#FFFFFF'
			}
		},
		detail : {
			offsetCenter: [0, '70%'],
			textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
				fontWeight: 'bolder',
				fontSize: 25,
				color: '#FFFFFF'
			}
		},
		data:[{value: 400, name: 'mg/l'}]
	}]
};

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
				color: 'auto'
			},
			textStyle: {
				color: '#FFFFFF'
				}
		},
		splitLine: {           // 分隔线
			length :15,         // 属性length控制线长
			lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
				color: 'auto'
			}
		},
		pointer: {
			width:5
		},
		axisLabel: {
			color: 'auto',
			distance: 10,
			fontSize: 10
		  },
		title : {
			fontSize: 10,
			offsetCenter: [20, '60%'],       // x, y，单位px
			textStyle: {
				color: 'auto',
				fontSize: 15,
				}
		},
		detail : {
			offsetCenter: [20, '40%'],
			textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
				fontWeight: 'bolder',
				fontSize: 25,
				color: 'auto'
			}
		},
		data:[{value: 0.3, name: 'mg/l'}]
	}]
	
};

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
function get_option6() {
	var set = {
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
				color: 'auto'
			}
		},
		splitLine: {           // 分隔线
			length :20,         // 属性length控制线长
			lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
				color: 'auto'
			}
		},
		pointer: {
			width:5
		},
		axisLabel: {
			color: 'auto',
			distance: 10,
			fontSize: 10
		},
		title : {
			fontSize: 10,
			offsetCenter: [-20, '60%'],       // x, y，单位px
			textStyle: {
				color: 'auto',
				fontSize: 15,
			}
		},
		detail : {
			offsetCenter: [-20, '40%'],
			textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
				fontWeight: 'bolder',
				fontSize: 25,
				color: 'auto'
			}
		},
		data:[{value: 6.7, name: 'ph'}]
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
			color: 'auto'
		}
	},
	splitLine: {           // 分隔线
		length :20,         // 属性length控制线长
		lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
			color: 'auto'
		}
	},
	pointer: {
		width:5
	},
	axisLabel: {
		color: 'auto',
		distance: 10,
		fontSize: 10
	  },
	title : {
		fontSize: 10,
		offsetCenter: [-20, '60%'],       // x, y，单位px
		textStyle: {
			color: 'auto',
			fontSize: 15,
			}
	},
	detail : {
		offsetCenter: [-20, '40%'],
		textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			fontWeight: 'bolder',
			fontSize: 25,
			color: 'auto'
		}
	},
	data:[{value: 6.7, name: 'ph'}]
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
        //areaStyle: {} ,//線性圖轉區塊圖
        smooth: true,//平順線性圖
    }]
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

function getLineOption(title, fields,titles, list) {
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