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

var $showingContainer;
var $welcome_container;
var $question_container;
var $correct_container;
var $wrong_container;

var $question_Q;
var $question_text;
var $question_buttons;

$(function () {
    var $connect_status = $('#connect_status');
    $welcome_container = $('#welcome');
    $question_container = $('#question');
    $correct_container = $('#correct');
    $wrong_container = $('#wrong');
    $showingContainer = $welcome_container;

    $question_Q = $('#question_Q');
    $question_text = $('#question_text');
    $question_buttons = [
        $('#question_button_0'), $('#question_button_1')
    ];

    socket = io("//" + window.location.hostname + (location.port == "" ? "" : ":" + location.port));

    socket.on("connect", function () {
        $connect_status.removeClass();
        $connect_status.addClass('text-success');
        $connect_status.html('<i class="fa fa-check-circle" aria-hidden="true"></i>&nbsp;連線成功');

        socket.emit('add-channel', 'pinball');

        socket.on('fire', function (data) {
            if ($showingContainer == $welcome_container) {
                showQuestion();
            }
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

    $('#pinball').click(showQuestion);
    $('#correct_return').click(function () {
        switchContainer($welcome_container);
    });
    $('#wrong_return').click(function () {
        switchContainer($welcome_container);
    });
});

function showQuestion() {
    // 更新內容
    var index = Math.floor(Math.random() * questions.length);
    var question = questions[index];
    $question_Q.text('Q' + (index + 1) + "： ");
    $question_text.text(question["text"]);
    for (var i = 0; i < 2; i++) {
        $question_buttons[i].text(question["options"][i]);
        if (i == question["ans"]) {
            $question_buttons[i].click(showCorrect);
        }
        else {
            $question_buttons[i].click(showWrong);
        }
    }

    // switch
    switchContainer($question_container);
}

function showCorrect() {
    switchContainer($correct_container);
}

function showWrong() {
    switchContainer($wrong_container);
}

function switchContainer($container) {
    $showingContainer.animateCss('bounceOut', function () {
        $showingContainer.hide();

        $showingContainer = $container;
        $showingContainer.show().animateCss('bounceIn');
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
