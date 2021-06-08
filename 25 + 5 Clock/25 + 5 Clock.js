let clock, stopWatch;
var breakTime = 5;
var sessionTime = 25;
var clicked = 0;
var startDisplay = $("#time-left");
var startDuration = 60 * sessionTime;
var running = false;
const ENDAUDIO = document.getElementById('beep');
const RESETAUDIO = new Audio('sounds/Disco.wav');
var outcome = $('#time-left');
var outcomeHead = $('#timer-label span');

    function getStart(startDuration, startDisplay) {
        var time = startDuration;
        var minutes, seconds;
        minutes = parseInt(time / 60, 10);
        seconds = parseInt(time % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        return minutes + ":" + seconds;
    }
    outcome.text(getStart(startDuration, startDisplay));

    function startTime(duration, display) {
        var time = duration;
        var minutes, seconds;
            clock = setInterval(function(){
                if(running) {
                minutes = parseInt(time / 60, 10);
                seconds = parseInt(time % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                display.text(minutes + ":" + seconds);
                outcomeHead.text('In Session');

                if(minutes < 1) {
                    display.css('color', '#dc3545');
                    outcomeHead.css('color', '#dc3545');
                }

                if (--time < 0) {
                    ENDAUDIO.play();
                    clearInterval(clock);
                    var timer = breakTime * 60;
                    startBreak(timer, outcome);
                }
            }
            }, 1000);

    };

    function startBreak(duration, outcome) {
        var timeBreak = duration;
        var min, sec;
            stopWatch = setInterval(function(){
                if(running) {
                    min = parseInt(timeBreak / 60, 10);
                    sec = parseInt(timeBreak % 60, 10);

                    min = min < 10 ? "0" + min : min;
                    sec = sec < 10 ? "0" + sec : sec;
                    outcome.text(min + ":" + sec);
                    outcomeHead.text('Break Time');

                    if(min < 1) {
                        outcome.css('color', '#dc3545');
                        outcomeHead.css('color', '#dc3545');
                    }

                    if (--timeBreak < 0) {
                        ENDAUDIO.play();
                        clearInterval(stopWatch);
                        clicked = 0;
                        running = false;
                        $('#start_stop').click();
                    }
                }
            }, 1000);
    }

    $('#start_stop').on('click', function(){
        var display = $("#time-left");
        var duration = 60 * sessionTime;
        if (clicked == 0) {
            startTime(duration, display);
            clicked++;
        }
        if (!running) {
            running = true;
        } else {
            running = false;
        }
    });

    $('#reset').on('click', function(){
        breakTime = 5;
        sessionTime = 25;
        $('#session-length b').text(sessionTime);
        $('#break-length b').text(breakTime);
        outcomeHead.text('Session');
        clearInterval(clock);
        clearInterval(stopWatch);
        $('#time-left').text('25:00');
        running = false;
        clicked = 0;
        ENDAUDIO.pause();
        ENDAUDIO.currentTime = 0;
    });

    $('#break-decrement').on('click', function() {
        if(breakTime > 1) {
            if(!running) {
                breakTime--;
                $('#break-length b').text(breakTime);
            }    
        }
    });  

    $('#break-increment').on('click', function() {
        if(breakTime < 60) {
            if(!running) {
                breakTime++;
                $('#break-length b').text(breakTime);
            }
        }
    });

    $('#session-decrement').on('click', function() {
        if(sessionTime > 1) {
            if(!running){
                sessionTime--;
                $('#session-length b').text(sessionTime);
                startDuration = 60 * sessionTime;
                outcome.text(getStart(startDuration, startDisplay));
            }
        }
    });

    $('#session-increment').on('click', function() {
        if(sessionTime < 60) {
            if(!running){
                sessionTime++;
                $('#session-length b').text(sessionTime);
                startDuration = 60 * sessionTime;
                outcome.text(getStart(startDuration, startDisplay));
            }
        }
    }); 
    
    $('#session-length b').text(sessionTime);
    $('#break-length b').text(breakTime);