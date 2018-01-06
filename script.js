$('document').ready(() => {
  const music = new Audio("background_music_1.wav");
  music.volume = .2;
  music.load();
  music.loop = true;
  music.play();

  $('#game-plane').show();
  $('#loading').hide();

  $('#create-question').on('click', function () {
    const data = {}
    data.question = $('#new-question').value();
    data.option1 = $('#option1').value();
    data.option2 = $('#option2').value();
    data.option3 = $('#option3').value();
    $.ajax({
      url: "https://forthepeopleserver.herokuapp.com/",
      method: 'POST',
      data,
      success: function () {
        $('#option1').value("");
        $('#option2').value("");
        $('#option3').value("");
        $('#create-question-form').hide();
      }
    })
  });

  $('#add-question').on('click', function () {
    window.open('https://goo.gl/forms/hzLgvA964yoowB2g1', '_blank');
  })


  $('.message').hide();
  $('.verdict').hide();
  $('.verdict-weak').hide();
  $('#quit').show();
  const currentQuestion = localStorage.currentQuestion || 1;
  let volumeStatus = 'On'
  let creditIsShown = false;
  $('#show-credits').on('click', function () {
    $('.other-messages').toggle();
    $('#credits').toggle();
    if (creditIsShown) {
      $(this).text('Show Credits');
      creditIsShown = false;
    } else {
      $(this).text('Hide Credits');
      creditIsShown = true;
    }
  });

  $('#toggle-music').on('click', function () {
    if (volumeStatus === 'On') {
      music.volume = .0;
      volumeStatus = 'Off'
      $(this).text('Music On')
    } else {
      music.volume = .2;
      volumeStatus = 'On'
      $(this).text('Music Off')
    }
  });

  $('#quit').on('click', function () {
    $(this).hide();
    $(`#${localStorage.currentQuestion || 1}`).hide();
    showGameEnd(true);
    localStorage.setItem('currentQuestion', 1);
  });

  $(`#${currentQuestion}`).show();

  $('.answer-button').on('click', function () {
    const next = parseInt($(this).parent().attr('id')) + 1
    $(this).parent().hide()
    $(`#${next}`).show()
    localStorage.setItem('currentQuestion', next)
    if ($(`#${next}`).length === 0) {
      showGameEnd();
    }
  });

  if ($(`#${currentQuestion}`).length === 0) {
    $('#game-result').show();
  }

  $('.replay-button').on('click', function () {
    localStorage.setItem('currentQuestion', 1);
    $('#game-result').hide();
    $('#quit').show();
    $('#1').show();
  });
});

function showGameEnd(viaQuit = false) {
  $('.verdict').hide();
  $('#quit').hide();
  const number = Math.floor(Math.random()*3);
  const verdictDiv = $('.verdict')[number];
  let verdict = '';
  if (viaQuit) {
    $('.verdict-weak').show();
    verdict = "I\'ll not quit for the people."
  } else {
    $(verdictDiv).show();

    if (number === 0) {
      verdict = "I\'ll be excellent for the people. "
    }

    if (number === 1) {
      verdict = "I\'ll not be indecisive for the people."
    }

    if (number === 2) {
      verdict = "I'll not be criminal for the people."
    }

    $('.verdict-weak').hide();
  }
  $('.tweet-button').attr('href',
    `https://twitter.com/intent/tweet?text=${verdict} https://theozmic.github.io/ForThePeople/
    @AsoRock @MBuhari &hashtags=ForThePeopleGame,BetterNaija,LeadUsWell`);

  localStorage.setItem('currentQuestion', 1);
  $('#game-result').show();
}
