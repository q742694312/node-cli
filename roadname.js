import { Wgs84toShanghai,ShanghaiToWgs84 } from './Wgs84toShangHaiConvertor.js'
import { bd09togcj02,gcj02tobd09, wgs84togcj02, gcj02towgs84} from './coordtransform.js'
import * as xlsx from 'node-xlsx'
import * as fs from 'fs'
import * as path from 'path'
import axios from 'axios'
//sheetjs.com/

var sheets = xlsx.parse('./xlsx/杨浦区坐标.xlsx');
// let sheets = xlsx.parse(path.join(__dirname, 'browser.xlsx'))
// const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/南大宝山树木数据.xlsx`));



searchName()
async function searchName(){
	let name_index=2
	var excelObj = sheets[0].data;
	
	// console.log(workSheetsFromBuffer);
	var data = [];
	for (var i in excelObj) {
		var arr = [];
		var line = excelObj[i];
		if(i>0){
			let name=line[name_index]
			let dt=await searchBD(name)
			line.push(dt)
		}
		arr=arr.concat(line)
		data.push(arr);
	}
	var buffer = xlsx.build([
		{
			name: 'sheet1',
			data: data
		}
	]);

	//将文件内容插入新的文件中
	fs.writeFileSync('./test1.xlsx', buffer, { 'flag': 'w' });
	console.log('结束运行');
}


async function searchV2(){
	let data=	await axios({
		method: 'get',
		url: 'http://api.tianditu.gov.cn/v2/search',
		params:{
			postStr:{
				keyWord:"人民广场",
				mapBound:"-180,-90,180,90",
				level:12,
				"queryType":7,
				start:0,
				count:300
			},
			type:'query',
			tk:"1f4ff14ad58ec89446aeb87372ba8523"
		}
	});
	console.log(data);

}


/*BAIDU*/
async function searchBD(address){
	let {data}=	await axios({
		method: 'get',
		url: 'http://api.map.baidu.com/geocoder/v2/',
		params:{
			address: address, 
			city: '上海市', 
			output: 'json', 
			ak: '1m5l7LTP2hvP2OHDU8uCsnGf'
		}
	});
	if(data.result){
		let location = data.result.location;
		let coordinate =bd09togcj02(location.lng, location.lat) 
		let st= gcj02towgs84(coordinate[0],coordinate[1])
		console.log(st);
		return st.toString()
	}else{
		return ""
	}
	
}

 

