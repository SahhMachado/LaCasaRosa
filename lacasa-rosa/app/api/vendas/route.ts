"use server";

import { db } from "@/app/lib/db";

export interface VendaProps {
    venda_id?: number;
    venda_total: number;
    venda_formapagto: string;
    venda_status?: string;
    venda_data?: Date;
    cancelada_em?: Date | null;
    usuario_id: number;
}

//buscar todas as vendas
export async function vendasGetAll() {
    const result = await db.query(
        "SELECT * FROM vendas ORDER BY venda_id ASC"
    )

    return result.rows
}

//buscar as vendas por ID de usuário
export async function vendasGetIdUser<VendasProps>(usuario_id: number) {
    const result = await db.query(
        "SELECT * FROM vendas WHERE usuario_id = $1", [usuario_id]
    )

    return result.rows[0]
}

//buscar informações por ID de venda
export async function vendaGetId<VendasProps>(venda_id: number) {
    const result = await db.query(
        "SELECT * FROM vendas WHERE venda_id = $1", [venda_id]
    )

    return result.rows[0]
}

//buscar informações de itens_venda
export async function itensVendaGet(venda_id: number) {
    const result = await db.query(
        `
        SELECT
            iv.item_id,
            iv.item_quantidade,
            iv.venda_id,
            iv.produto_id,
            p.produto_nome,
            p.produto_preco,
            p.produto_imagem
        FROM itens_venda iv
        INNER JOIN produtos p
            ON p.produto_id = iv.produto_id
        WHERE iv.venda_id = $1
        `,
        [venda_id]
    );

    return result.rows.map((item) => ({
        ...item,
        produto_imagem: item.produto_imagem
            ? Buffer.from(item.produto_imagem).toString("base64")
            : null,
    }));
}

//barra de pesquisa
export async function vendaSearch(id?: string) {
    let result;

    if (id?.trim()) {
        result = await db.query(
            `
            SELECT *
            FROM vendas
            WHERE CAST(venda_id AS TEXT) ILIKE $1
            ORDER BY venda_id ASC
            `,
            [`%${id}%`]
        );
    } else {
        result = await db.query(
            `
            SELECT *
            FROM vendas
            ORDER BY venda_id ASC
            `
        );
    }

    return result.rows;
}

//itens venda
export interface VendaProduto {
    venda_id: number,
    produto_id: number,
    quantidade: number
}

// incluir venda x produto
export async function vendaProdutoPost(oVendaProduto: VendaProduto) {
    if (
        !oVendaProduto.produto_id ||
        !oVendaProduto.venda_id ||
        !oVendaProduto.quantidade
    ) {
        return {
            success: false,
            message: "Não há todas as informações para incluir o relacionamento de Vendas x Produtos"
        };
    }

    await db.query("BEGIN");

    try {
        // Busca o estoque atual
        const produto = await db.query(
            `
            SELECT produto_estoque
            FROM produtos
            WHERE produto_id = $1
            `,
            [oVendaProduto.produto_id]
        );

        if (produto.rowCount === 0) {
            await db.query("ROLLBACK");

            return {
                success: false,
                message: "Produto não encontrado."
            };
        }

        const estoqueAtual = produto.rows[0].produto_estoque;

        if (estoqueAtual < oVendaProduto.quantidade) {
            await db.query("ROLLBACK");

            return {
                success: false,
                message: "Estoque insuficiente."
            };
        }

        // Insere o item da venda
        const result = await db.query(
            `
            INSERT INTO itens_venda (
                venda_id,
                produto_id,
                item_quantidade
            )
            VALUES (
                $1,
                $2,
                $3
            )
            RETURNING *
            `,
            [
                oVendaProduto.venda_id,
                oVendaProduto.produto_id,
                oVendaProduto.quantidade
            ]
        );

        // Atualiza estoque e status
        await db.query(
            `
            UPDATE produtos
            SET
                produto_estoque = produto_estoque - $1,
                produto_status = CASE
                    WHEN produto_estoque - $1 <= 0
                        THEN 'vendido'
                    ELSE produto_status
                END
            WHERE produto_id = $2
            `,
            [
                oVendaProduto.quantidade,
                oVendaProduto.produto_id
            ]
        );

        await db.query("COMMIT");

        return {
            success: true,
            message: "Venda x Produto incluída."
        };

    } catch (error) {
        await db.query("ROLLBACK");

        console.error(error);

        return {
            success: false,
            message: "Erro ao incluir Venda x Produto."
        };
    }
}

//incluir venda
export async function vendaPost(oVenda: VendaProps) {
    if (!oVenda.venda_total || !oVenda.venda_formapagto || !oVenda.usuario_id) {
        return {
            success: false,
            message: 'Não há todas as informações necessárias para a inclusão da Venda'
        }
    }

    const result = await db.query(
        `
        INSERT INTO vendas (
            venda_total,
            venda_formapagto,
            usuario_id
        )
        VALUES (
            $1,
            $2,
            $3
        )
        RETURNING venda_id
        `,
        [
            oVenda.venda_total,
            oVenda.venda_formapagto,
            oVenda.usuario_id
        ]
    );

    if (!result.rows[0]) {
        return {
            success: false,
            message: 'Não foi possível incluir a Venda'
        };
    }

    const vendaId = result.rows[0].venda_id;

    return {
        success: true,
        messagem: 'Venda Incluída',
        id: vendaId
    }
}

//cancelar venda
export async function cancelarVenda(venda_id: number) {
    await db.query("BEGIN");

    try {
        // Verifica se a venda existe
        const venda = await db.query(
            `
            SELECT venda_status
            FROM vendas
            WHERE venda_id = $1
            `,
            [venda_id]
        );

        if (!venda.rows[0]) {
            await db.query("ROLLBACK");

            return {
                success: false,
                error: "Venda não encontrada."
            };
        }

        // Impede cancelamento duplicado
        if (venda.rows[0].venda_status === "cancelada") {
            await db.query("ROLLBACK");

            return {
                success: false,
                error: "Esta venda já foi cancelada."
            };
        }

        // Atualiza status da venda
        await db.query(
            `
            UPDATE vendas
            SET
                venda_status = $1,
                cancelada_em = NOW()
            WHERE venda_id = $2
            `,
            [
                "cancelada",
                venda_id
            ]
        );

        // Devolve os itens ao estoque
        await db.query(
            `
            UPDATE produtos p
            SET
                produto_estoque = p.produto_estoque + iv.item_quantidade,
                produto_status = 'disponivel'
            FROM itens_venda iv
            WHERE
                iv.produto_id = p.produto_id
                AND iv.venda_id = $1
            `,
            [venda_id]
        );

        await db.query("COMMIT");

        return {
            success: true,
            message: "Venda cancelada com sucesso."
        };

    } catch (error) {
        await db.query("ROLLBACK");

        console.error("Erro ao cancelar venda:", error);

        return {
            success: false,
            error: "Não foi possível cancelar a venda."
        };
    }
}