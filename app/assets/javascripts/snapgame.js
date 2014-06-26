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
      var flipper = $(ev.target).parent().parent();
      flipper.children('div').slideToggle();
      SnapGame.evaluateTurn(flipper.children('.window'));
      SnapGame.turnCheck();
      setTimeout(function() { SnapGame.turnComplete(flipper.children('.window')); }, 3000);
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
  
}

SnapGame.setup = function () {
  SnapGame.defineAllImages();
  SnapGame.buildImageOrder();
  SnapGame.buildBoard();
  SnapGame.flipper();
}



$(SnapGame.setup);