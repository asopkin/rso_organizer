function highlightThis(event){var backgroundColor=this.style.backgroundColor;this.style.backgroundColor="yellow",alert(this.className),this.style.backgroundColor=backgroundColor}for(var divs=document.getElementsByClassName("alert"),i=0;i<divs.length;i++)divs[i].addEventListener("click",highlightThis);$(document).ready(function(){$(".crsl").slick({centerMode:!0,centerPadding:"3px",autoplay:!0,autoplaySpeed:2e3,dots:!0,infinite:!0,speed:300,slidesToShow:1,slidesToScroll:2,arrows:!0})}),$(document).ready(function(){$("#calendar").kendoCalendar()});