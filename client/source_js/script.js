var divs = document.getElementsByClassName('alert');
for(var i=0; i<divs.length; i++) {
  divs[i].addEventListener("click", highlightThis);
  /*
  divs[i].addEventListener("click", highlightThis, true);
  divs[i].addEventListener("click", highlightThis, false);*/
}

function highlightThis(event) {
    //event.stopPropagation();
  
    var backgroundColor = this.style.backgroundColor;
    this.style.backgroundColor='yellow';
    alert(this.className);
    this.style.backgroundColor=backgroundColor;
}

/** slider **/

// Write any custom javascript functions here
$(document).ready(function () {
    $('.crsl').slick({
        centerMode: true,
        centerPadding: '3px',
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true, /* Just changed this to get the bottom dots navigation */
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 2,
        arrows: true
    });
});