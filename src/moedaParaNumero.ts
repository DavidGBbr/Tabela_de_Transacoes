/**
 * Recebe string '1.200,50' retorna number: 1200.50
 */

export default function moedaParaNumero(moeda: string): number | null {
  //Limpando o dado de moeda para um número válido
  const numero = Number(moeda.replaceAll(".", "").replace(",", "."));
  return isNaN(numero) ? null : numero;
}
