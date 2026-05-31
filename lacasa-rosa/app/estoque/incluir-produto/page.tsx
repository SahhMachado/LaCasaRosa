"use client";

import { BiSolidShoppingBags } from "react-icons/bi";
import { Poppins } from "next/font/google";
import { Major_Mono_Display } from "next/font/google";
import CirclesTop from "@/app/components/circles-top";
import CirclesBottom from "@/app/components/circles-bottom";
import BackgroundStripes from "@/app/components/background-stripes";
import { FaArrowLeft, FaUser } from "react-icons/fa6";
import { BsPencilFill } from "react-icons/bs";
import { MdMoveToInbox } from "react-icons/md";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { TiArrowSortedDown } from "react-icons/ti";
import { NumericFormat } from "react-number-format";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const majorMono = Major_Mono_Display({
  subsets: ["latin"],
    weight: "400",
});


export default function Editar() {
    // Estado para controlar o preview da imagem carregada
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const [preco, setPreco] = useState("");

    return(
        <div className="w-screen h-screen relative flex flex-col bg-[#F2EBD5] text-black overflow-hidden">
            <CirclesTop />

            <div className={poppins.className + " ml-25 mt-80"}>
                <BiSolidShoppingBags size={80}/>
                <h1 className={majorMono.className + " text-4xl mt-2 mb-5"}>Bem-Vindo(a)!</h1>
                <h2 className="text-2xl">Aqui você pode cadastrar os produtos  <br /> em estoque</h2>
            </div>
            
            <div className={poppins.className + " relative z-10"}>
                {/* Card */}
                <div className="bg-[#F2EBD5] w-[30%] h-auto p-10 rounded-2xl absolute right-40 -top-100">

                    {/* Imagem do produto */}
                    <div className="flex flex-col items-center mb-1">
                        <label className="relative">
                            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

                            {/* imagem */}
                            <div className="w-25 h-25 rounded-full bg-[#F2594B] text-[#F2EBD5] 
                                            flex flex-col items-center justify-center shadow-lg">
                                {preview ? (
                                    <img src={preview} alt="Avatar" className="w-full h-full object-cover rounded-full border-4 border-[#F2594B]" />
                                    ) : (
                                    <MdMoveToInbox size={65} />
                                )}
                            </div>

                            {/* ícone lápis */}
                            <BsPencilFill size={25} className="absolute top-18 right-1" />
                        </label>
                    </div>

                    <form className="mb-5">
                        <label>Nome:</label>
                        <input placeholder="Informe o nome do produto aqui..." id="nome" type="text" 
                        className="mb-3 w-full h-auto px-3 p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-black placeholder:text-sm placeholder:opacity-60 text-[#F2594B] font-bold" />

                        <label>Valor:</label>
                          <NumericFormat
                            placeholder="0,00" id="valor"
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

                        <label>Quantidade:</label>
                        <input defaultValue={1} placeholder="Informe a quantidade em estoque aqui..." id="quantidade" type="number" 
                        className="mb-3 w-full h-auto px-3 p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-black placeholder:text-sm placeholder:opacity-60 text-[#F2594B] font-bold" />
                        
                        <label>Tamanho:</label>
                        <input placeholder="Informe o tamanho aqui..." id="tamanho" type="text" 
                        className="mb-3 w-full h-auto px-3 p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-black placeholder:text-sm placeholder:opacity-60 text-[#F2594B] font-bold" />

                        <label>Categoria:</label>
                        <input placeholder="Exemplo: Blusas, Calças, Sapatos" id="categoria" type="text" 
                        className="mb-3 w-full h-auto px-3 p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-black placeholder:text-sm placeholder:opacity-60 text-[#F2594B] font-bold" />

                        <label>Situação:</label><br />
                        <select name="situacao" id="situacao" className="w-full mb-10 outline-none
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

                    <Link href="/estoque" className="pointer-events-none flex flex-col items-center text-sm mb-1 hover:scale-110">
                        <FaArrowLeft size={40} className="text-[#F2594B] pointer-events-auto" />
                    </Link>  
                </div>
            </div>
            <BackgroundStripes />
            <CirclesBottom />
        </div>
    )
}