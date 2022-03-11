import { Wgs84toShanghai,ShanghaiToWgs84 } from './Wgs84toShangHaiConvertor.js'
import { bd09togcj02,gcj02tobd09, wgs84togcj02, gcj02towgs84} from './coordtransform.js'
import * as xlsx from 'node-xlsx'
import * as fs from 'fs'
import * as path from 'path'

let a=[
	[121.549995,31.264016],
	[121.550534,31.264379]
]


for(let item of a){

	console.log(item);

	let x=item[0]
	let y=item[1]
	let lo1=bd09togcj02(x,y)

	let wgs=gcj02towgs84(lo1[0],lo1[1])
	let wgs_reverse=wgs.reverse()

	let sh=Wgs84toShanghai(wgs_reverse)
	console.log('sh',sh);

	console.log(`-------------------------------`);
}





console.log('结束运行');