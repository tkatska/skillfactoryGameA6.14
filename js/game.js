const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;

function nextTurn() {
  $('.target').removeClass('target');
  $('.miss').removeClass('miss');

  let divSelector = randomDivId();
  $(divSelector).addClass('target');
  $(divSelector).text(hits + 1);

  if (hits === 1) {
    firstHitTime = getTimestamp();
    console.log(firstHitTime);
  }
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  hits = 0;
  $('.game-field, #button-start').hide();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $('#total-time-played').text(totalPlayedSeconds);
  $('#win-message').removeClass('d-none');
}

function handleClick(event) {
  let target = $(event.target);
  if ($(event.target).hasClass('target')) {
    target.text('')
    hits = hits + 1;
    nextTurn();
  } else {
    $(event.target).hasClass('miss')
  }
}

$(function () {
  $('#button-start').click(function () {
    nextTurn();
    $('.game-field').click(handleClick);
  });
});

function init() {
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);