var request = require("request");
var Q = require("q");
var desUrl = "http://google.com.hk";


var testProxy = function (proxy) {
	var proxyRequest = request.defaults({
		proxy: "http://" + proxy.Ip + ":" + proxy.Port,
		timeout: 2000,
		time: true
	});

	var q = Q.denodeify(proxyRequest);
	return q(desUrl)
	.then(function (result) {
		if (result[0].statusCode == 200) {
			proxy.isValid = true;
			proxy.speedTime = result[0].elapsedTime;
			console.log("Proxy Valid:  %s:%s in %s, rate is:%s", proxy.Ip, proxy.Port, proxy.Place, proxy.speedTime);
			return [proxy];
		}
		return null;

	})
	.spread(function(validProxy){
		//console.log(validProxy);
	})
	.catch(function (err) {
		console.error(err);
	});
}

exports.testProxy = testProxy;