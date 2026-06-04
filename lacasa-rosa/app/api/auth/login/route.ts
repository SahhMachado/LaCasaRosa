"use server";

import { db } from "@/app/lib/db";

export async function loginAction(formData: FormData) {
    const email = formData.get("email")
    const senha = formData.get("senha")

    const result = await db.query(
    "SELECT * FROM usuarios WHERE usuario_email = $1", [email]
    )

    const user = result.rows[0]

    if(!user){
        return{
            sucess: false,
            message: "Usuário não encontrado!"
        }
    }

    if(senha !== user.usuario_senha){
        return{
            sucess: false,
            message: "Senha inválida!"
        }
    }

    return{
        sucess: true,
        user_id: user.usuario_id
    }
}