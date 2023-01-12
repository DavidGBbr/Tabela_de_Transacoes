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
  public semana;
  public melhorDia;

  constructor(transacoes: Transacao[]) {
    this.transacoes = transacoes;
    this.total = this.setTotal();
    this.pagamento = this.setPagamento();
    this.status = this.setStatus();
    this.semana = this.setSemana();
    this.melhorDia = this.setMelhorDia();
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
  // definir a quantidade de vendas por dia da semana
  private setSemana() {
    const semana = {
      ["Domingo"]: 0,
      ["Segunda"]: 1,
      ["Terça"]: 2,
      ["Quarta"]: 3,
      ["Quinta"]: 4,
      ["Sexta"]: 5,
      ["Sábado"]: 6,
    };
    for (let i = 0; i < this.transacoes.length; i++) {
      const day = this.transacoes[i].data.getDay();
      if (day === 0) semana["Domingo"] += 1;
      if (day === 1) semana["Segunda"] += 1;
      if (day === 2) semana["Terça"] += 1;
      if (day === 3) semana["Quarta"] += 1;
      if (day === 4) semana["Quinta"] += 1;
      if (day === 5) semana["Sexta"] += 1;
      if (day === 6) semana["Sábado"] += 1;
    }
    return semana;
  }
  // Definindo o dia com mais vendas das semanas
  private setMelhorDia() {
    return Object.entries(this.semana).sort((a, b) => {
      return b[1] - a[1];
    })[0];
  }
}
