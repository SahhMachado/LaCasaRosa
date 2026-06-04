"use server";

import { db } from "@/app/lib/db";

export interface UserProps {
    usuario_id: number;
    usuario_nome: string;
    usuario_email: number;
    usuario_senha: string;
    usuario_cpf: string;
    usuario_imagem: string;
    usuario_role: string;
    usuario_ativo: string;
}

export async function userGetAll() {
    const result = await db.query(
    "SELECT * FROM usuarios"
    )

    return result.rows
}

export async function userGetId<UserProps>() {
    const usuario_id = 1

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
        `INSERT INTO usuarios (usuario_nome, usuario_cpf, usuario_email, usuario_senha, role) VALUES ($1, $2, $3, $4, $5)`, [usuario_nome,  usuario_cpf, usuario_email, usuario_senha, usuario_role]
    )    

    return{
        sucess: true
    }
}

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
        success: true,
    };
}

export async function userPut(formData: FormData) {
    
}