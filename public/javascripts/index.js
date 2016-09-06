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
    },
    {
        "text": "如果line顯示“請綁定你的手機號碼”, 這是惡意程式？",
        "options": [
            "不是, line正常安全措施",
            "是, 馬上通知警察杯杯"
        ],
        "ans": 0
    },
    {
        "text": "如果你的朋友手機或筆電沒進入保護模式, 或沒設置密碼等措施, 可以採取何種行為？",
        "options": [
            "醒醒吧!你沒有朋友",
            "幫他到ＦＢ發文表示自己被盜了, 在還給他"
        ],
        "ans": 1
    },
    {
        "text": "請問要如何在windows環境下開啟命令提示字元",
        "options": [
            "按下windwos鍵並輸入cmd",
            "對螢幕大喊C8763"
        ],
        "ans": 0
    },
    {
        "text": "在設定密碼時, 哪種比較安全？",
        "options": [
            "1234",
            "d@sSm0rp"
        ],
        "ans": 1
    },
    {
        "text": "黑客社社員大多數來自哪個科系？",
        "options": [
            "資訊系",
            "工具人系"
        ],
        "ans": 0
    },
    {
        "text": "學校宿舍用netcut會導致什麼情形？",
        "options": [
            "爽切就切好爽",
            "整棟網路被停用, 並且收單與維運組人員泡茶"
        ],
        "ans": 1
    },
    {
        "text": "Pokemon GO 是利用什麼來得知所在位置 ？",
        "options": [
            "IP",
            "GPS"
        ],
        "ans": 1
    },
    {
        "text": "如果中勒索軟體要怎麼辦？",
        "options": [
            "平常備份拿出來還原",
            "什麼！？沒備份？那沒救了ㄏ ㄏ"
        ],
        "ans": 0
    }
];
