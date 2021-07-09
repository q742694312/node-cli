import { Wgs84toShanghai } from './Wgs84toShangHaiConvertor.js'
import * as xlsx from 'node-xlsx'
import * as fs from 'fs'
import * as path from 'path'
//sheetjs.com/

var sheets = xlsx.parse('./123.xlsx');

// let sheets = xlsx.parse(path.join(__dirname, 'browser.xlsx'))
// const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/南大宝山树木数据.xlsx`));

var excelObj = sheets[0].data;
// console.log(workSheetsFromBuffer);
var data = [];
for (var i in excelObj) {
	var arr = [];
	var line = excelObj[i];
	if(i>0){
		let wgs84_X=line[2]
		let wgs84_Y=line[3]
		let {X,Y}=Wgs84toShanghai([wgs84_Y,wgs84_X])
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


//将文件内容插入新的文件中
fs.writeFileSync('./test1.xlsx', buffer, { 'flag': 'w' });
console.log('结束运行');