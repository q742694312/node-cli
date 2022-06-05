import { Wgs84toShanghai,ShanghaiToWgs84 } from './Wgs84toShangHaiConvertor.js'
import { bd09togcj02,gcj02tobd09, wgs84togcj02, gcj02towgs84} from './coordtransform.js'

/// 坐标转换 简单版
let a=[
	[121.549995,31.264016],
	[121.550534,31.264379]
]


http://api.tianditu.gov.cn/v2/search?postStr={"keyWord":"北京大学","level":12,"mapBound":"116.02524,39.83833,116.65592,39.99185","queryType":1,"start":0,"count":10}&type=query&tk=您的密钥

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