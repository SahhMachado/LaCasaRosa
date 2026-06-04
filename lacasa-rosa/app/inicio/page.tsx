import { db } from "../lib/db"
import Inicio from "./components/inicio"


export default async function Page() {
  const result = await db.query(
    "SELECT * FROM produtos"
  )
  
  return (
    <Inicio produtos={result.rows} />
  )
}