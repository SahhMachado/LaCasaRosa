"use server";

import { db } from "@/app/lib/db";

export interface VendaProps {
    venda_id: number;
    venda_total: number;
    venda_formapagto: string;
    venda_status: string;
    venda_data: Date;
    cancelada_em: Date | null;
    venda_usuario_id: number;
}

//buscar todas as vendas
export async function vendasGetAll() {
    const result = await db.query(
        "SELECT * FROM vendas ORDER BY venda_id ASC"
    )

    return result.rows
}

//buscar as vendas por ID de usuário
export async function vendasGetIdUser<ProdutoProps>(usuario_id: number) {
    const result = await db.query(
        "SELECT * FROM vendas WHERE venda_usuario_id = $1", [usuario_id]
    )

    return result.rows[0]
}

//buscar informações por ID de venda
export async function vendaGetId<VendasProps>(venda_id: number) {
    if (!venda_id) {
        return {
            success: false,
            message: "Venda não encontrada!"
        }
    }

    const result = await db.query(
        "SELECT * FROM vendas WHERE venda_id = $1", [venda_id]
    )
    
    return result.rows[0]
}

//cancelar venda
export async function cancelarVenda() {
    const result = await db.query(
        "SELECT * FROM vendas ORDER BY venda_id ASC"
    )

    return result.rows
}