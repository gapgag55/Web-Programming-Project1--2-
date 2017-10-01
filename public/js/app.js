function Animation () {
  var loadBar = $('#load')

  // RESET SCROLLBAR
  window.scrollTo(0, 0)

  // REMOVE LOADBAR
  setTimeout(function () {
    $('#load').removeClass('is-active')
  }, 400)

  // CLICK HYPERLINK WITH ANIMATE 
  $('a').on('click', function (e) {
    e.preventDefault();

    loadBar.addClass('is-active')

    setTimeout(function () {
      window.location = $(this).attr('href')
    }.bind(this), 1000)
  })

  // SETTING DOM
  this.slide( $('.pagination li'), $('.covered-slides .pages'), 5000)
  this.tab( $('.information .voted li') )
}

// Carousel Image
Animation.prototype.slide = function (trigger, element, autoTime) {
  var move = 0
  
  if ( autoTime ) {
    setInterval(function () {
      if ( move + 100 < element.children().length * 100 ) {
        move += 100
      } else { 
        move = 0;
      }

      element.css({
        'transform': 'translate3d(-'+ move +'%, 0, 0)',
        'transition': 'all .7s cubic-bezier(.13,.79,.47,.99)'
      })

      $(trigger.eq(move/100))
        .addClass('is-active')
        .siblings()
        .removeClass('is-active')

    }, autoTime)
  }

  $(trigger).on('click', function () {
    var index = $(this).index() 

    move = index * 100
    element.css({
      'transform': 'translate3d(-'+ move +'%, 0, 0)',
      'transition': 'all .7s cubic-bezier(.13,.79,.47,.99)'
    })

    // reactive trigger
    $(this)
      .addClass('is-active')
      .siblings()
      .removeClass('is-active')
  })
}

Animation.prototype.tab = function (element) {
  $(element).on('click', function () {
    $(this)
      .addClass('is-active')
      .siblings()
      .removeClass('is-active')
  })
}

$(document).ready(function () {
  new Animation()
})