var SnapGame = SnapGame || { };

SnapGame.turnNumber = 0;
SnapGame.allowTurn = true;

SnapGame.defineAllImages = function() {
  var $copy = $('.flipper').clone();
  SnapGame.$allImages = $('.flipper').add($copy);
  SnapGame.$remaingImages = SnapGame.$allImages;
}

SnapGame.$imageOrder = $();

SnapGame.pluckImage = function() {
  var indexLength = SnapGame.$remaingImages.length;
  var indexToPluck = _.random(0, indexLength - 1);
  var $plucked = SnapGame.$remaingImages[indexToPluck];
  SnapGame.$remaingImages = _.without(SnapGame.$remaingImages, $plucked);
  SnapGame.$imageOrder.push($plucked);
  return $plucked
}

SnapGame.buildImageOrder = function() {
  var iterations = SnapGame.$allImages.length;
  SnapGame.$imageOrder = _(iterations).times(function() { return SnapGame.pluckImage() });
}

SnapGame.buildRows = function(boardSize) {
  var iterator = 1 
  _(boardSize).times( function() {
    $('#snapgame').append('<div id="row' + iterator.toString() + '"></div>');
    iterator = iterator + 1;   
  });
}

SnapGame.buildBoard = function() {
  var boardSize = Math.sqrt(SnapGame.$allImages.length);
  SnapGame.buildRows(boardSize);
  var $rows = $("[id^=row]");
  var cardIterator = 0; 
  $.each($rows, function( index, row ) {
    var $row = $(row);
    _(boardSize).times(function() {
      $row.append(SnapGame.$imageOrder[cardIterator]);
      cardIterator = cardIterator + 1;
    }); 
  });
}

SnapGame.flipper = function() {
  $('.flipper').on( 'click', function(ev) {
    if (SnapGame.allowTurn === true) {
      SnapGame.allowTurn = false;
      SnapGame.turnNumber = SnapGame.turnNumber + 1;
      var flipper = $(ev.target).parent();
      flipper.children('div').slideToggle();
      SnapGame.evaluateTurn(flipper.children('.window'));
      SnapGame.turnCheck();
      setTimeout(function() { SnapGame.turnComplete(flipper.children('.window')); }, 3250);
    }
  });
}

SnapGame.evaluateTurn = function(divElement) {
  if (SnapGame.turnNumber % 2 === 1) {
    SnapGame.imageOne = divElement.children().attr('class');
  }
  if (SnapGame.turnNumber % 2 === 0) {
    SnapGame.imageTwo = divElement.children().attr('class');
  }
}

SnapGame.turnComplete = function(divElement) {
  if (SnapGame.turnNumber % 2 === 0) {
    $('.window').slideUp();
    $('.front').slideDown();
    SnapGame.allowTurn = true;
  }
  if ((SnapGame.imageOne == SnapGame.imageTwo) && (SnapGame.imageOne != ""))  {
    $("." + divElement.children().attr('class')).parent().parent().css("opacity", 0);
  }
  if (SnapGame.turnNumber % 2 === 0) {
    SnapGame.imageTwo = "";
    SnapGame.imageOne = "";
  }
}

SnapGame.turnCheck = function() {
  if (SnapGame.turnNumber % 2 === 1) {
    SnapGame.allowTurn = true;
  }
}

SnapGame.formatImages = function() {
  var $images = $('img')
  $images.each(function( index ) {
    var height = this.naturalHeight;
    var width = this.naturalWidth;
    var adjustmentArray = SnapGame.adjustPhoto(height, width); 
    $(this).parent().css({ 
      backgroundImage: 'url("' + $(this).attr("src") + '")',
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
      overflow: "hidden",
      backgroundSize: adjustmentArray[0] + " " + adjustmentArray[1]
    });
    $(this).css({
      opacity: 0
    });
  });
}

SnapGame.adjustPhoto = function(height, width) {
  var container = parseInt($($('.flipper')[0]).css('height'));
  if (height >= width) {
      height = String((container / width) * height) + "px";
      width = String(container) + "px";
      return [width, height];
  } else {
      width = String((container / height) * width) + "px";
      height = String(container) + "px";
      return [width, height];
  }
}

SnapGame.loginModal = function() {
  el = document.getElementById("login-modal");
  el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  $('#login_link').toggle();
}
SnapGame.clickModalClickHandler = function() {
  $('#modal-open').on('click', function(ev) {
    ev.preventDefault();
    SnapGame.loginModal();
  });
  $('#modal-close').on('click', function(ev) {
    ev.preventDefault();
    SnapGame.loginModal();
  });
}

SnapGame.setup = function () {
  SnapGame.defineAllImages();
  SnapGame.buildImageOrder();
  SnapGame.buildBoard();
  SnapGame.flipper();
  SnapGame.formatImages();
  SnapGame.clickModalClickHandler();
  SnapGame.loginModal();
}



$(SnapGame.setup);