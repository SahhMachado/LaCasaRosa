"use server";

import { db } from "@/app/lib/db";

export interface UserProps {
    usuario_id: number;
    usuario_nome: string;
    usuario_email: string;
    usuario_senha: string;
    usuario_cpf: string;
    usuario_imagem: string | null;
    role: string;
    usuario_ativo: boolean;
}

//buscar todos os usuários
export async function userGetAll() {
    const result = await db.query(
    "SELECT * FROM usuarios"
    )

    return result.rows.map((user) => ({
        ...user,
        usuario_imagem: user.usuario_imagem
            ? Buffer.from(user.usuario_imagem).toString("base64")
            : null,
    }));
}

//buscar informações por ID de usuário
export async function userGetId<UserProps>(usuario_id: number) {
    if(!usuario_id){
        return{
            sucess: false,
            message: "Usuário não encontrado!"
        }
    }

    const result = await db.query(
    "SELECT * FROM usuarios WHERE usuario_id = $1", [usuario_id]
    )

    const user = result.rows[0]

    const imagemBase64 = user?.usuario_imagem
    ? Buffer.from(user.usuario_imagem).toString("base64")
    : null;

    user.usuario_imagem = imagemBase64

    return user
}

//incluir usuário
export async function userPost(formData: FormData) {
    const usuario_nome = formData.get("nome") 
    const usuario_cpf = formData.get("cpf") 
    const usuario_email = formData.get("email")
    const usuario_senha = formData.get("senha")
    const usuario_role = "normal"

    const result = await db.query(
        "SELECT usuario_cpf, usuario_email FROM usuarios WHERE usuario_cpf = $1 OR usuario_email = $2", [usuario_cpf, usuario_email]
    )

    if(result.rows[0]){
        const user = result.rows[0]

        return{
            sucess: false,  
            message: user.usuario_cpf == usuario_cpf ? "O CPF já existe!" : "O e-mail já existe!"
        }
    }

    await db.query(
        `
        INSERT INTO usuarios (
            usuario_nome,
            usuario_cpf,
            usuario_email,
            usuario_senha,
            role
        )
        VALUES (
            $1,
            $2,
            $3,
            $4,
            $5
        )
        `,
        [
            usuario_nome,   // $1
            usuario_cpf,    // $2
            usuario_email,  // $3
            usuario_senha,  // $4
            usuario_role    // $5
        ]
    );   

    return{
        sucess: true
    }
}

//alterar imagem de perfil
export async function userPutImage(formData: FormData) {
    const usuario_id = 1
    const usuario_imagem = formData.get("imagem") as File

    if (!usuario_imagem || usuario_imagem.size === 0) {
        throw new Error("Nenhuma imagem enviada");
    }

    const bytes = await usuario_imagem.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    await db.query("UPDATE usuarios SET usuario_imagem = $1 WHERE usuario_id = $2",
        [buffer, usuario_id]
    );

    return {
        sucess: true,
        message: "Imagem salva!"
    };
}

//alterar usuário
export async function userPut(formData: FormData) {
    const usuario_id = formData.get("id")
    const usuario_imagem = formData.get("imagem") as File
    const usuario_nome = formData.get("nome") 
    const usuario_cpf = formData.get("cpf") 
    const usuario_email = formData.get("email")
    const usuario_senha = formData.get("senha")
    const usuario_role = formData.get("tipouser")
    const usuario_ativo = formData.get("status")

    const bytes = await usuario_imagem.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    await db.query(
        `
        UPDATE usuarios
        SET
            usuario_imagem = $1,
            usuario_nome   = $3,
            usuario_cpf    = $4,
            usuario_email  = $5,
            usuario_senha  = $6,
            role           = $7,
            usuario_ativo  = $8
        WHERE usuario_id = $2
        `,
        [
            buffer,          // $1
            usuario_id,      // $2
            usuario_nome,    // $3
            usuario_cpf,     // $4
            usuario_email,   // $5
            usuario_senha,   // $6
            usuario_role,    // $7
            usuario_ativo    // $8
        ]
    );

    return {
        sucess: true,
        message: "Alterações salvas!"
    };
}