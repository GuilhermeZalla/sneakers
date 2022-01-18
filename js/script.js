 const elements = {
     menMenu: document.getElementById("men-menu"),
     menHiddenMenu: document.getElementById("men-hidden-menu"),
     womenMenu: document.getElementById("women-menu"),
     womenHiddenMenu: document.getElementById("women-hidden-menu"),
     newsLetter: document.getElementById("news-letter"),
     newsLetterModal: document.getElementById("news-letter-modal")
 }


 function closeNewsLetter() {
     elements.newsLetterModal.classList.add("fade-out");
     setInterval(function() {
         elements.newsLetter.style.display = "none";
     }, 230)
 }