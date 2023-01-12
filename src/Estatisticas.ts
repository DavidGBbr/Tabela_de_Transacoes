import countBy from "./countBy.js";

type TransacaoValor = Transacao & { valor: number }; // definimos que este type não receberá null, apenas number
// Essa função irá retornar os valores que não forem null (apenas number)
function filtrarValor(transacao: Transacao): transacao is TransacaoValor {
  return transacao.valor !== null;
}

export default class Estatisticas {
  private transacoes;
  public total;
  public pagamento;
  public status;

  constructor(transacoes: Transacao[]) {
    this.transacoes = transacoes;
    this.total = this.setTotal();
    this.pagamento = this.setPagamento();
    this.status = this.setStatus();
  }

  //calculando total
  private setTotal() {
    return this.transacoes.filter(filtrarValor).reduce((acc, item) => {
      return acc + item.valor;
    }, 0);
  }
  // total por forma de pagamento
  private setPagamento() {
    return countBy(this.transacoes.map(({ pagamento }) => pagamento));
  }
  // status de pagamentos
  private setStatus() {
    return countBy(this.transacoes.map(({ status }) => status));
  }
}
