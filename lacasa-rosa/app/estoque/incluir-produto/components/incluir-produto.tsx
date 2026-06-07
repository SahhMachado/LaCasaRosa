"use client";

import { BsPencilFill } from "react-icons/bs";
import { MdMoveToInbox } from "react-icons/md";
import { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { NumericFormat } from "react-number-format";
import { produtoPost } from "@/app/api/estoque/route";
import { useRouter } from "next/navigation";

export default function Incluir() {
    // Estado para controlar o preview da imagem carregada
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const [preco, setPreco] = useState("");

    const [mensagem, setMensagem] = useState("");

    const router = useRouter();

    async function handleSubmit(formData: FormData) {        
        const result = await produtoPost(formData)

        if (result.success == true) {
            setMensagem(`${result.message}`);

            setTimeout(() => {
                setMensagem("");
            }, 2000);
        }

        router.refresh();
    }

    return (
        <div>
            {mensagem && (
                <div className="fixed top-5 right-5 z-50 bg-[#F2EBD5] text-[#F25EA3] px-6 py-3
                                rounded-lg shadow-lg font-bold">
                    <span>{mensagem}</span>
                </div>
            )}
            <form action={handleSubmit} className="mb-5">
                {/* Imagem do produto */}
                <div className="flex flex-col items-center mb-3">
                    <label className="relative">
                        <input name="imagem"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange} />

                        {/* Imagem */}
                        <div className="w-25 h-25 rounded-full bg-[#F2594B] text-[#F2EBD5] flex flex-col items-center justify-center shadow-lg">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                <MdMoveToInbox size={65} />
                            )}
                        </div>

                        {/* ícone lápis */}
                        <BsPencilFill size={25} className="absolute top-18 right-1" />
                    </label>
                </div>
                <label>Nome:</label>
                <input placeholder="Informe o nome do produto aqui..." 
                        required
                        name="nome"
                        type="text"
                        className="mb-3 w-full h-auto px-3 p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-black placeholder:text-sm placeholder:opacity-60 text-[#F2594B] font-bold" />

                <label>Valor:</label>
                <NumericFormat
                    required
                    placeholder="0,00" 
                    value={preco}
                    onValueChange={(values) => {
                        setPreco(values.value); // ex: "1234.56"
                    }}
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                    fixedDecimalScale
                    className="mb-3 w-full h-auto px-3 p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                            placeholder:font-light placeholder:text-black placeholder:text-sm placeholder:opacity-60 text-[#F2594B] font-bold"
                />

                <input
                    type="hidden"
                    name="valor"
                    value={preco}
                />

                <label>Quantidade:</label>
                <input defaultValue={1} 
                        min={1}
                        required
                        placeholder="Informe a quantidade em estoque aqui..." 
                        name="quantidade" 
                        type="number"
                        className="mb-3 w-full h-auto px-3 p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-black placeholder:text-sm placeholder:opacity-60 text-[#F2594B] font-bold" />

                <label>Tamanho:</label>
                <input placeholder="Informe o tamanho aqui..."
                        name="tamanho"
                        required
                        type="text"
                        className="mb-3 w-full h-auto px-3 p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-black placeholder:text-sm placeholder:opacity-60 text-[#F2594B] font-bold" />

                <label>Categoria:</label>
                <input placeholder="Exemplo: Blusas, Calças, Sapatos" 
                        name="categoria" 
                        type="text"
                        className="mb-3 w-full h-auto px-3 p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-black placeholder:text-sm placeholder:opacity-60 text-[#F2594B] font-bold" />

                <label>Situação:</label><br />
                <select name="situacao" className="w-full mb-10 outline-none
                                    appearance-none bg-[#F2C84B] font-bold text-[#F2594B] rounded-md h-auto px-3 p-1 shadow-md"
                    defaultValue="disponivel">

                    <option value="vendido" className="bg-[#F2EBD5]">Vendido</option>
                    <option value="disponivel" className="bg-[#F2EBD5]">Disponível</option>
                    <option value="reservado" className="bg-[#F2EBD5]">Reservado</option>
                </select>
                <div className="pointer-events-none absolute right-12 bottom-48 flex items-center">
                    <TiArrowSortedDown size={25} className="text-[#F2594B]" />
                </div>

                <input id="salvar" value="Salvar" type="submit"
                    className="bg-[#F2594B] w-full h-auto p-2 font-bold text-[#F2EBD5] text-xl rounded-md hover:shadow-xl" />
            </form>
        </div>
    )
}