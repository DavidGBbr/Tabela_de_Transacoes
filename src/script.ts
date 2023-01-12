import fetchData from "./fetchData.js";
import normalizarTransacao from "./normalizarTransacao.js";

async function handleData() {
  // fetch da nossa api
  const data = await fetchData<TransacaoAPI[]>(
    "https://api.origamid.dev/json/transacoes.json?"
  );
  if (!data) return null;
  // Normalizando os dados recebidos da nossa API
  const transacoes = data.map(normalizarTransacao);
  // Preenchendo a tabela com as transações em formato correto
  preencherTabela(transacoes);
}

function preencherTabela(transacoes: Transacao[]): void {
  // Selecionamos nossa tabela
  const tabela = document.querySelector("#tabela-transacoes tbody");
  if (!tabela) return;
  // mostrando cada transação dentro da tabela
  transacoes.forEach((transacao) => {
    tabela.innerHTML += `
    <tr>
      <td>${transacao.nome}</td>
      <td>${transacao.email}</td>
      <td>R$ ${transacao.moeda}</td>
      <td>${transacao.pagamento}</td>
      <td>${transacao.status}</td>
    </tr>
    `;
  });
}

handleData();
