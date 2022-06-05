import { Wgs84toShanghai,ShanghaiToWgs84 } from './Wgs84toShangHaiConvertor.js'
import { bd09togcj02,gcj02tobd09, wgs84togcj02, gcj02towgs84} from './coordtransform.js'
import * as xlsx from 'node-xlsx'
import * as fs from 'fs'
import * as path from 'path'
//sheetjs.com/

var sheets = xlsx.parse('./xlsx/0502.xls');

var x_index=1
var y_index=2
// let sheets = xlsx.parse(path.join(__dirname, 'browser.xlsx'))
// const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/南大宝山树木数据.xlsx`));

var excelObj = sheets[0].data;
// console.log(workSheetsFromBuffer);
var data = [];
for (var i in excelObj) {
	var arr = [];
	var line = excelObj[i];
	if(i>0){
		let wgs84_X=line[x_index]
		let wgs84_Y=line[y_index]
		let {X,Y}=ShanghaiToWgs84([wgs84_Y,wgs84_X])
		// let {X,Y}=Wgs84toShanghai([wgs84_Y,wgs84_X])
		
		// let {X,Y}=WGS84_bd(wgs84_X,wgs84_Y)

		line.push(X)
		line.push(Y)
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



function WGS84_bd(wgs84_X,wgs84_Y) {
	let [g_x,g_y]=wgs84togcj02(wgs84_X,wgs84_Y)
	let [B_X,B_y]=	gcj02tobd09(g_x,g_y)
	return {
		X:B_X,
		Y:B_y
	}
}

//将文件内容插入新的文件中
fs.writeFileSync('./test1.xlsx', buffer, { 'flag': 'w' });
console.log('结束运行');