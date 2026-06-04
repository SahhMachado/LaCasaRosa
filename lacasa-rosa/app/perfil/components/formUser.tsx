"use client";

import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa6";
import { BsPencilFill } from "react-icons/bs";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { Major_Mono_Display } from "next/font/google";
import { useState } from "react";
import { UserProps, userPutImage } from "@/app/api/user/route";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const majorMono = Major_Mono_Display({
  subsets: ["latin"],
    weight: "400",
});

export default function FormUser({ usuario } : {usuario: UserProps }) {

    // Estado para controlar o preview da imagem carregada
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const formatCPF = (cpf: string) => {
        return cpf
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
            .slice(0, 14);
    };

    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(formData: FormData) {
        const result = await userPutImage(formData)

        console.log(result)
    }

    console.log(usuario)

    return (
        <form action={handleSubmit} className="mb-8">
            {/* Imagem de perfil */}
            <div className="flex flex-col items-center mb-3">
                <label className="relative">
                    <input name="imagem" 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleFileChange} />

                    {/* Avatar */}
                    <div className="w-30 h-30 rounded-full bg-[#F2594B] text-[#F2EBD5] 
                                                flex flex-col items-center justify-center shadow-lg">
                         {preview ? (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : usuario.usuario_imagem ? (
                            <img
                                src={`data:image/jpeg;base64,${usuario.usuario_imagem}`}
                                alt="Foto de perfil"
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <FaUser size={75} />
                        )}
                    </div>

                    {/* ícone lápis */}
                    <BsPencilFill size={25} className="absolute top-22 right-1" />
                </label>
            </div>
            <label>Nome:</label>
            <input readOnly
                name="nome"
                value={usuario.usuario_nome}
                id="nome" type="text"
                className="mb-8 w-full h-auto px-3 p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-black placeholder:text-sm placeholder:opacity-60 text-[#F2594B] font-bold" />

            <label>CPF:</label>
            <input readOnly
                name="cpf"
                value={formatCPF(usuario.usuario_cpf)}
                id="cpf"
                type="text"
                className="mb-8 w-full h-auto px-3 p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-black placeholder:text-sm placeholder:opacity-60 text-[#F2594B] font-bold" />

            <label>E-mail:</label>
            <input readOnly
                name="email"
                value={usuario.usuario_email}
                id="email"
                type="email"
                className="mb-8 w-full h-auto px-3 p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-black placeholder:text-sm placeholder:opacity-60 text-[#F2594B] font-bold" />

            <label>Senha:</label>
            <input readOnly
                name="senha"
                value={usuario.usuario_senha}
                id="senha"
                type={showPassword ? "text" : "password"}
                className="mb-8 w-full h-auto px-3 p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-black placeholder:text-sm placeholder:opacity-60 text-[#F2594B] font-bold" />

            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-14 bottom-52 text-[#F2594B]" >
                {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
            </button>

            <input id="salvar"
                value="Salvar"
                type="submit"
                className="bg-[#F2594B] w-full h-auto p-3 font-bold text-[#F2EBD5] text-xl rounded-md hover:shadow-xl" />
        </form>
    )
}