var BTD = BTD || {};

BTD.Mediator = (function() {

    var channels = {};
    var obj = {};

    obj.subscribe = function (channel, subscription) {
        if (!channels[channel]) channels[channel] = [];
        channels[channel].push(subscription);
    };

    obj.publish = function (channel) {
        if (!channels[channel]) return;
        var args = [].slice.call(arguments, 1);
        for (var i = 0, l = channels[channel].length; i < l; i++) {
            channels[channel][i].apply(this, args);
        }
    };

    return obj;
}());