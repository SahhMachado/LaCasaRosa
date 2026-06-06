import { produtoSearch } from "../api/estoque/route";
import Inicio from "./components/inicio"

export default async function Page(
  {
    searchParams,
  }: {
    searchParams: Promise<{ pesquisa?: string }>
  }
) {

  const { pesquisa } = (await searchParams) || {};

  const produtos = await produtoSearch(pesquisa, true);

  return (
    <Inicio produtos={produtos} />
  )
}