// javascript

// obter o modal
var modal = document.getElementById('myModal');

// obter o elemento <span> que fecha o modal
var span = document.getElementsByClassName("close")[0];

//Quando o usuário clica em <span>(x), fecha o modal
span.onclick = function() {
    modal.style.display = "none";
}

//Obter todas as imagens e inserir a imagem clicada dentro do modal
//Obter o conteúdo de descrição da imagem e inseri-lo dentro da legenda da imagem modal
var images = document.getElementsByTagName('img');
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
var i;
for (i = 0; i < images.length; i++) {
   images[i].onclick = function(){
       modal.style.display = "block";
       modalImg.src = this.src;
       modalImg.alt = this.alt;
       captionText.innerHTML = this.nextElementSibling.innerHTML;
   }
}
