$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            if (callback !== undefined) {
                callback();
            }
        });
    }
});

$(function () {
    var $connect_status = $('#connect_status');

    socket = io("//" + window.location.hostname + (location.port == "" ? "" : ":" + location.port));

    socket.on("connect", function () {
        $connect_status.removeClass();
        $connect_status.addClass('text-success');
        $connect_status.html('<i class="fa fa-check-circle" aria-hidden="true"></i>&nbsp;連線成功');

        socket.emit('add-channel', 'pinball');

        socket.on('fire', function (data) {
            showQuestion();
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

    $showingContainer = $('#welcome');
    $question_Q = $('#question_Q');
    $question_text = $('#question_text');
    $question_buttons = [
        $('#question_button_0'), $('#question_button_1')
    ];

    $('#pinball').click(showQuestion);
});

var $showingContainer;
var $question_Q;
var $question_text;
var $question_buttons;

function showQuestion() {
    // 更新內容
    var index = Math.floor(Math.random() * questions.length);
    var question = questions[index];
    $question_Q.text('Q' + (index + 1) + "： ");
    $question_text.text(question["text"]);
    for (var i = 0; i < 2; i++) {
        $question_buttons[i].text(question["options"][i]);
    }

    // switch
    switchContainer('question');
}

function showCorrect() {
    
}

function showWrong() {
    
}

function switchContainer(id) {
    $showingContainer.animateCss('bounceOut', function () {
        $showingContainer.hide();
        $('#' + id).show().animateCss('bounceIn');
    });
}

var questions = [
    {
        "text": "如果密碼被盜了該怎麼樣？",
        "options": [
            "報警",
            "改密碼"
        ],
        "ans": 1
    },
    {
        "text": "如果有網站問你說你的手機已經中毒了然後要求是否進行掃描？",
        "options": [
            "按下是",
            "離開"
        ],
        "ans": 1
    }
];
