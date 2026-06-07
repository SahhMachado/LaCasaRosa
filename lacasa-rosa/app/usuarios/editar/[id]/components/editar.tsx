"use client";

import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa6";
import { BsPencilFill } from "react-icons/bs";
import Image from "next/image";
import { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { UserProps, userPut } from "@/app/api/user/route";


export default function Editar({ usuario }: { usuario: UserProps }) {
    // Estado para controlar o preview da imagem carregada
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const [cpf, setCpf] = useState("");

    const formatCPF = (cpf: string) => {
        return cpf
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
            .slice(0, 14);
    };

    const [showPassword, setShowPassword] = useState(false);

    const [mensagem, setMensagem] = useState("");

    async function handleSubmit(formData: FormData) {
        const result = await userPut(formData)

        if (result.success == true) {
            setMensagem(`${result.message}`);
            setTimeout(() => {
                setMensagem("");
            }, 2000);  
        }
    }

    return (
        <div>
            {mensagem && (
                <div className="fixed top-5 right-5 z-50 bg-[#F2EBD5] text-[#F25EA3] px-6 py-3
                                rounded-lg shadow-lg font-bold">
                    <span>{mensagem}</span>
                </div>
            )}

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
                        <div className="w-25 h-25 rounded-full bg-[#F2594B] text-[#F2EBD5] 
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
                                <FaUser size={65} />
                            )}
                        </div>

                        {/* ícone lápis */}
                        <BsPencilFill size={25} className="absolute top-18 right-1" />
                    </label>
                </div>
                <input readOnly
                    name="id"
                    value={usuario.usuario_id}
                    type="text"
                    className="hidden mb-5 w-full h-auto px-3 p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-black placeholder:text-sm placeholder:opacity-60 text-[#F2594B] font-bold" 
                />
                <label>Nome:</label>
                <input
                    name="nome"
                    required
                    defaultValue={usuario.usuario_nome}
                    type="text"
                    className="mb-5 w-full h-auto px-3 p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-black placeholder:text-sm placeholder:opacity-60 text-[#F2594B] font-bold" />

                <label>CPF:</label>
                <input
                    name="cpf"
                    required
                    placeholder="Informe o CPF aqui, com pontos e traço..."
                    onChange={(e) => setCpf(formatCPF(e.target.value))}
                    defaultValue={usuario.usuario_cpf}
                    type="text"
                    className="mb-5 w-full h-auto px-3 p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-black placeholder:text-sm placeholder:opacity-60 text-[#F2594B] font-bold" />

                <label>E-mail:</label>
                <input
                    name="email"
                    required
                    defaultValue={usuario.usuario_email}
                    type="email"
                    className="mb-5 w-full h-auto px-3 p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-black placeholder:text-sm placeholder:opacity-60 text-[#F2594B] font-bold" />

                <label>Senha:</label>
                <input
                    name="senha"
                    required
                    defaultValue={usuario.usuario_senha}
                    type={showPassword ? "text" : "password"}
                    className="mb-5 w-full h-auto px-3 p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-black placeholder:text-sm placeholder:opacity-60 text-[#F2594B] font-bold" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-12 bottom-70 text-[#F2594B]" >
                    {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
                </button>

                <label>Ativo?</label><br />
                <select
                    defaultValue={usuario.usuario_ativo ? "1" : "0"}
                    name="status"
                    className="w-full mb-5 outline-none
                                    appearance-none bg-[#F2C84B] text-[#F2594B] font-bold rounded-md h-auto px-3 p-1 shadow-md">

                    <option value="1" className="bg-[#F2EBD5]">Sim</option>
                    <option value="0" className="bg-[#F2EBD5]">Não</option>
                </select>
                <div className="pointer-events-none absolute right-12 bottom-51 flex items-center">
                    <TiArrowSortedDown size={25} className="text-[#F2594B]" />
                </div>

                <label>Tipo:</label><br />
                <select
                    defaultValue={usuario.role}
                    name="tipouser"
                    className="w-full outline-none
                    appearance-none bg-[#F2C84B] text-[#F2594B] font-bold rounded-md h-auto px-3 p-1 shadow-md">

                    <option value="admin" className="bg-[#F2EBD5]">Admin</option>
                    <option value="normal" className="bg-[#F2EBD5]">Normal</option>
                </select>
                <div className="pointer-events-none absolute right-12 bottom-31.5 flex items-center">
                    <TiArrowSortedDown size={25} className="text-[#F2594B]" />
                </div>

                <input name="salvar"
                    value="Salvar"
                    type="submit"
                    className="bg-[#F2594B] w-full h-auto p-2 font-bold text-[#F2EBD5] mt-10 text-xl rounded-md hover:shadow-xl" />
            </form>
        </div>
    )
}