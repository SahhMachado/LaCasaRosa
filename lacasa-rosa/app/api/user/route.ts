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

export async function userDelete(formData: FormData) {
    
}