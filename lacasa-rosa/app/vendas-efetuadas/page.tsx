import { vendaSearch } from "../api/vendas/route";
import VendasEfetuadas from "./components/vendas-efetuadas"

export default async function Page(
  {
    searchParams,
}: {
    searchParams: Promise<{ pesquisa?: string }>
}) {

  const { pesquisa } = await searchParams;

  const vendas = await vendaSearch(pesquisa);
  
  return (
    <VendasEfetuadas vendas={vendas} />    
  )
}