const fs = require('fs')

var state = {
	"bt": "available",
	"bnr": "available",
	"enc2": "available",
	"enc3": "available",
	"ita1": "available",
	"ita3": "available",
	"ark": "available",
	"b2": "available",
	"b3": "available",
	"tbf": "available",
	"tfw": "available"
}
if (fs.existsSync('./PickBanState.json')) {
	state = JSON.parse(fs.readFileSync("./PickBanState.json"))
}

module.exports = nodecg => {
	function sendDataUpdate(ignoreId) {
		state.socketId = ignoreId
		nodecg.sendMessage('PickBanUpdate', state)
		delete state.socketId
	}
	nodecg.listenFor('PickBanStateRequest', (id) => {
		sendDataUpdate(id)
	});
	nodecg.listenFor('UpdatePickBanData', (value) => {
		for (key in value) {
			state[key] = value[key]
		}
		sendDataUpdate(state.socketId)
		delete state.socketId
		const jsonString = JSON.stringify(state)
		fs.writeFile('./PickBanState.json', jsonString, err => {
			if (err) {
				console.log('Error writing file', err)
			} else {
			}
		})
	})
};