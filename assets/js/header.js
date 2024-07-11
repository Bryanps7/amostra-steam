document.getElementById('menu-toggle').addEventListener('click', function() {
    var menu = document.getElementById('menu');
    menu.classList.toggle('show');
});

function ajustarMarginTop() {
    let header = document.getElementById('header');
    let main = document.getElementById('main');
    let alturaHeader = header.offsetHeight;
    main.style.marginTop = alturaHeader + 'px';
  }

  // Ajusta a margem ao carregar a página
  window.onload = ajustarMarginTop();

  // Ajusta a margem ao redimensionar a janela
  window.onresize = ajustarMarginTop();