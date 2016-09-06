var io = undefined;

exports.init = function (server) {
    io = require('socket.io')(server);

    io.on('connection', function (socket) {
        console.log('使用者連入');
        socket.on('add-channel', function (channel) {
            if (channel == 'pinball') {
                socket.join(channel);
            }
        });
    });
};