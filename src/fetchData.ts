export default async function fetchData<T>(url: string): Promise<T | null> {
  // Fazendo o fetch e retornando os dados em json
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erro: " + response.status);
    const json = await response.json();
    return json;
    // Caso dê erro
  } catch (error) {
    if (error instanceof Error) console.error("fetchData: " + error.message);
    return null;
  }
}
