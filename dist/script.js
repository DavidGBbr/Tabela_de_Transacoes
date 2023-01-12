import fetchData from "./fetchData.js";
import normalizarTransacao from "./normalizarTransacao.js";
async function handleData() {
    const data = await fetchData("https://api.origamid.dev/json/transacoes.json?");
    if (!data)
        return null;
    const transacoes = data.map(normalizarTransacao);
    console.log(transacoes);
}
handleData();
//# sourceMappingURL=script.js.map