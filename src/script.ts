import { CountList } from "./countBy.js";
import Estatisticas from "./Estatisticas.js";
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
  preencherEstatisticas(transacoes);
}

function preencherLista(lista: CountList, containerId: string): void {
  const containerElement = document.getElementById(containerId);
  if (containerElement) {
    Object.keys(lista).forEach((key) => {
      containerElement.innerHTML += `<p>${key}: ${lista[key]}</p>`;
    });
  }
}

function preencherEstatisticas(transacoes: Transacao[]): void {
  // Utilizamos a classe Estatísticas para exibir informações com base nos dados recebidos pela API
  const data = new Estatisticas(transacoes); // Calculamos o valor total das transações e o exibimos no tela

  preencherLista(data.pagamento, "pagamento");
  preencherLista(data.status, "status");

  console.log(data);
  const totalElement = document.querySelector<HTMLElement>("#total span");
  if (totalElement) {
    totalElement.innerText = data.total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
  console.log(data.total);
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
