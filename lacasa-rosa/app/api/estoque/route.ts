"use server";

import { db } from "@/app/lib/db";

export interface ProdutoProps {
    produto_id: number;
    produto_nome: string;
    produto_preco: number;
    produto_tamanho: string;
    produto_categoria: string;
    produto_imagem: string | null;
    produto_estoque: number;
    produto_status: string;
}

//buscar todos os produtos
export async function produtoGetAll() {
    const result = await db.query(
        "SELECT * FROM produtos ORDER BY LOWER(produto_nome) ASC"
    )

    return result.rows.map((produto) => ({
        ...produto,
        produto_imagem: produto.produto_imagem
            ? Buffer.from(produto.produto_imagem).toString("base64")
            : null,
    }));
}

//buscar informações por ID de produto
export async function produtoGetId<ProdutoProps>(produto_id: number) {
    if (!produto_id) {
        return {
            success: false,
            message: "Produto não encontrado!"
        }
    }

    const result = await db.query(
        "SELECT * FROM produtos WHERE produto_id = $1", [produto_id]
    )

    const produto = result.rows[0]

    const imagemBase64 = produto?.produto_imagem
        ? Buffer.from(produto.produto_imagem).toString("base64")
        : null;

    produto.produto_imagem = imagemBase64

    return produto
}

//barra de pesquisa e busca de produtos
export async function produtoSearch(nome?: string, apenasDisponiveis = false) {
    const result = await db.query(
        `
        SELECT *
        FROM produtos
        WHERE ($1::text IS NULL OR produto_nome ILIKE $2)
          AND ($3::boolean = FALSE OR produto_status = 'disponivel')
        ORDER BY LOWER(produto_nome)
        `,
        [
            nome || null,
            `%${nome}%`,
            apenasDisponiveis // $3 indica se deve aplicar o filtro de disponibilidade
        ]
    );

    return result.rows.map((produto) => ({
        ...produto,
        produto_imagem: produto.produto_imagem
            ? Buffer.from(produto.produto_imagem).toString("base64")
            : null,
    }));
}

//incluir produto
export async function produtoPost(formData: FormData) {
    const produto_nome = formData.get("nome")
    const produto_preco = formData.get("valor")
    const produto_tamanho = formData.get("tamanho")
    const produto_categoria = formData.get("categoria")
    const produto_imagem = formData.get("imagem")
    const produto_estoque = formData.get("quantidade")
    const produto_status = formData.get("situacao")

    const result = await db.query(
        "SELECT produto_nome FROM produtos WHERE produto_nome = $1", [produto_nome]
    )

    if (result.rows.length > 0) {
        return {
            success: false,
            message: "O produto já existe!"
        }
    }

    let buffer = null;

      if (produto_imagem instanceof File) {

        // valida se foi enviada uma imagem
        if (produto_imagem.size === 0) {
            return {
                success: false,
                message: "Selecione uma imagem para o produto!"
            };
        }

        // valida tamanho máximo (5 MB)
        if (produto_imagem.size > 5 * 1024 * 1024) {
            return {
                success: false,
                message: "A imagem deve ter no máximo 5 MB!"
            };
        }

        const bytes = await produto_imagem.arrayBuffer();
        buffer = Buffer.from(bytes);
    }

    await db.query(
        `
        INSERT INTO produtos (
            produto_nome,   
            produto_preco, 
            produto_tamanho,  
            produto_categoria,  
            produto_imagem,    
            produto_estoque,
            produto_status
        )
        VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7
        )
        `,
        [
            produto_nome,   // $1
            produto_preco,    // $2
            produto_tamanho,  // $3
            produto_categoria,  // $4
            buffer,    // $5
            produto_estoque, //$6
            produto_status //$7
        ]
    );

    return {
        success: true,
        message: "Produto cadastrado!"
    }
}

//alterar produto
export async function produtoPut(formData: FormData) {
    const produto_id = formData.get("id")
    const produto_nome = formData.get("nome")
    const produto_preco = formData.get("valor")
    const produto_tamanho = formData.get("tamanho")
    const produto_categoria = formData.get("categoria")
    const produto_imagem = formData.get("imagem")
    const produto_estoque = formData.get("quantidade")
    const produto_status = formData.get("situacao")


    let buffer = null;

      if (produto_imagem instanceof File) {

        // valida se foi enviada uma imagem
        if (produto_imagem.size === 0) {
            return {
                success: false,
                message: "Selecione uma imagem para o produto!"
            };
        }

        // valida tamanho máximo (5 MB)
        if (produto_imagem.size > 5 * 1024 * 1024) {
            return {
                success: false,
                message: "A imagem deve ter no máximo 5 MB!"
            };
        }

        const bytes = await produto_imagem.arrayBuffer();
        buffer = Buffer.from(bytes);
    }

    await db.query(
        `
        UPDATE produtos
        SET
            produto_nome = $2,
            produto_preco = $3,
            produto_tamanho = $4,
            produto_categoria = $5,
            produto_imagem = COALESCE($6, produto_imagem),
            produto_estoque = $7,
            produto_status = $8
        WHERE produto_id = $1
        `,
        [
            produto_id, //$1
            produto_nome,   // $2
            produto_preco,    // $3
            produto_tamanho,  // $4
            produto_categoria,  // $5
            buffer,    // $6
            produto_estoque, //$7
            produto_status //$8
        ]
    );

    return {
        success: true,
        message: "Alterações salvas!"
    };
}