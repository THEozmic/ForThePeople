$('document').ready(() => {
  document.getElementById("backgroundAudio").volume = 0.1;
  // var number = Math.floor(Math.random() * 4) + 1;
  // document.getElementById("backgroundAudio").src = `background_music_${number}.3gp`;
  // $("#backgroundAudio").on('ended', function() {
  //   var number = Math.floor(Math.random() * 4) + 1;
  //   document.getElementById("backgroundAudio").src = `background_music_${number}.3gp`;
  // });
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
      document.getElementById("backgroundAudio").volume = 0.0;
      volumeStatus = 'Off'
      $(this).text('On Music')
    } else {
      document.getElementById("backgroundAudio").volume = 0.1;
      volumeStatus = 'On'
      $(this).text('Off Music')
    }
  });

  $('#quit').on('click', function () {
    $(this).hide();
    $(`#${localStorage.currentQuestion}`).hide();
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
  var number = Math.floor(Math.random()*3);
  var div = $('.verdict')[number];
  let verdict = '';
  if (viaQuit) {
    $('.verdict-weak').show();
    verdict = "I\'ll not quit for the people."
  } else {
    $(div).show();
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
  $('.tweet-button').attr('href', `https://twitter.com/intent/tweet?text=${verdict} https://theozmic.github.io/ForThePeople/ @AsoRock @MBuhari &hashtags=ForThePeopleGame,BetterNaija,LeadUsWell`);
  localStorage.setItem('currentQuestion', 1);
  $('#game-result').show();
}
