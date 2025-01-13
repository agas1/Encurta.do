const encurtarBtn = document.getElementById('encurtar-btn');
const copiarBtn = document.getElementById('copiar-btn');
const resultadoBox = document.getElementById('resultado');
const urlInput = document.getElementById('url-input');

// Função para validar se a entrada é uma URL
function validarURL(url) {
  try {
    new URL(url); // Tenta criar um objeto URL
    return true;  // É uma URL válida
  } catch (e) {
    return false; // Não é uma URL válida
  }
}

// Evento para encurtar a URL
encurtarBtn.addEventListener('click', () => {
  const url = urlInput.value.trim();
  
  if (url === '') {
    alert('Por favor, insira uma URL.');
    return;
  }

  if (!validarURL(url)) {
    alert('Por favor, insira uma URL válida.');
    return;
  }

  // Simula o encurtamento da URL
  const urlEncurtada = `https://encurta.do/${Math.random().toString(36).substring(7)}`;
  encurtarBtn.classList.add('animated');

  // Exibe o link na box
  resultadoBox.innerHTML = `<a href="${urlEncurtada}" target="_blank">${urlEncurtada}</a>`;
  resultadoBox.classList.add('visivel'); // Adiciona a classe para exibir a box
});

// Evento para copiar o link
copiarBtn.addEventListener('click', () => {
  const linkElement = resultadoBox.querySelector('a');
  if (linkElement) {
    const texto = linkElement.href; // Obtém o valor do atributo href
    navigator.clipboard.writeText(texto)
      .then(() => {
        alert('URL copiada para a área de transferência!');
      })
      .catch(err => {
        console.error('Erro ao copiar:', err);
      });
  } else {
    alert('Nenhum link disponível para copiar.');
  }
});
