// 交易状态码
let stateName = (state) => {
	let name = null;
	// '订单状态{10:未接单, 20:已接单, 30:取消交易, 40:交易失败, 50:交易成功(待评价), 60:交易完成
	switch (state) {
		case 30:
			name = '取消交易'
			break;
		case 40:
			name = '交易失败'
			break;
		case 60:
			name = '交易完成'
			break;
	}
	return name;
}
export {
	stateName
}
