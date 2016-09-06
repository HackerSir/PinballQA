$(function () {
    var $connect_status = $('#connect_status');

    socket = io("//" + window.location.hostname + (location.port == "" ? "" : ":" + location.port));

    socket.on("connect", function () {
        $connect_status.removeClass();
        $connect_status.addClass('text-success');
        $connect_status.html('<i class="fa fa-check-circle" aria-hidden="true"></i>&nbsp;連線成功');

        socket.emit('add-channel', 'pinball');

        socket.on('fire', function (data) {

        })
    });

    // 連線失敗提示
    socket.on("connect_error", function () {
        $connect_status.removeClass();
        $connect_status.addClass('text-danger');
        $connect_status.html('<i class="fa fa-exclamation-circle" aria-hidden="true"></i>&nbsp;連線失敗');
    });

    // 連線中提示
    socket.on("reconnecting", function () {
        $connect_status.removeClass();
        $connect_status.addClass('text-danger');
        $connect_status.html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>&nbsp;連線中');
    });
});

function showQuestion(index) {
    // 更新內容

    // switch

}
