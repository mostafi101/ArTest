/* 
 *	Analytics Blippar Class	
 */
var blipp = require('blippar').blipp;

class AnalyticsManager {

    constructor() {}
    init(name, version, baseURL)
    {
        this.name = name;
        this.version = version;
        this.base = baseURL;
    }
    addScreenAnalytics(type, action, data)
    {
        var post = type + "=" + action;
        Object.keys(data).forEach(function (key) {
            console.log(key, data[key]);
            post += "&" + key + "=" + data[key];
        });
        blipp.xmlHttpRequest(
            'POST',
            this.base + '/addAnalytics',
            function (code, response) {
                switch (code) {
                    case blipp.xmlHttpRequest.DONE:
                        console.log('Results: ' + response);
                        break;
                    case blipp.xmlHttpRequest.PROGRESS:
                        console.log('Progress: ' + response);
                        break;
                }
            },
            post
        );
    }
    addAnalytics(type, action, label, value, data)
    {
        var post = type + "=" + action + "&label=" + label + "&value=" + value;
        Object.keys(data).forEach(function (key) {
            console.log(key, data[key]);
            post += "&" + key + "=" + data[key];
        });
        blipp.xmlHttpRequest(
            'POST',
            this.base + '/addAnalytics',
            function (code, response) {
                switch (code) {
                    case blipp.xmlHttpRequest.DONE:
                        console.log('Results: ' + response);
                        break;
                    case blipp.xmlHttpRequest.PROGRESS:
                        console.log('Progress: ' + response);
                        break;
                }
            },
            post
        );
    }
}
var AManager = new AnalyticsManager();
exports.analyticsManager = AManager;