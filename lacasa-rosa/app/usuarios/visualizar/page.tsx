"use client";

import { BiSolidShoppingBags } from "react-icons/bi";
import { Poppins } from "next/font/google";
import { Major_Mono_Display } from "next/font/google";
import CirclesTop from "@/app/components/circles-top";
import CirclesBottom from "@/app/components/circles-bottom";
import BackgroundStripes from "@/app/components/background-stripes";
import { FaUser } from "react-icons/fa6";
import { BsPencilFill } from "react-icons/bs";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { TiArrowSortedDown } from "react-icons/ti";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const majorMono = Major_Mono_Display({
  subsets: ["latin"],
    weight: "400",
});


export default function Visualizar() {
    // Estado para controlar o preview da imagem carregada
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return(
        <div className="w-screen h-screen relative flex flex-col bg-[#F2EBD5] text-black overflow-hidden">
            <CirclesTop />

            <div className={poppins.className + " ml-25 mt-80"}>
                <BiSolidShoppingBags size={80}/>
                <h1 className={majorMono.className + " text-4xl mt-2 mb-5"}>Bem-Vindo(a)!</h1>
                <h2 className="text-2xl">Este é seu perfil, fique à vontade para <br /> alterar sua foto</h2>
            </div>
            
            <div className={poppins.className + " relative z-10"}>
                {/* Card */}
                <div className="bg-[#F2EBD5] w-[30%] h-auto p-10 rounded-2xl absolute right-40 -top-94">

                    {/* Imagem de perfil */}
                    <div className="flex flex-col items-center mb-1">
                        <label className="relative">
                            <input disabled type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

                            {/* Avatar */}
                            <div className="w-25 h-25 rounded-full bg-[#F2594B] text-[#F2EBD5] 
                                            flex flex-col items-center justify-center shadow-lg">
                                {preview ? (
                                    <img src={preview} alt="Avatar" className="w-full h-full object-cover rounded-full border-4 border-[#F2594B]" />
                                    ) : (
                                    <FaUser size={70} />
                                )}
                            </div>

                            {/* ícone lápis */}
                            <BsPencilFill size={25} className="absolute top-18 right-1" />
                        </label>
                    </div>

                    <form className="mb-8">
                        <label>Nome:</label>
                        <input readOnly value="#" id="email" type="text" 
                        className="mb-5 w-full h-auto p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-sm placeholder:opacity-85 text-black/50" />

                        <label>CPF:</label>
                        <input readOnly value="#" id="email" type="text" 
                        className="mb-5 w-full h-auto p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-sm placeholder:opacity-85 text-black/50" />

                        <label>E-mail:</label>
                        <input readOnly value="#" id="email" type="email" 
                        className="mb-5 w-full h-auto p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-sm placeholder:opacity-85 text-black/50" />

                        <label>Senha:</label>
                        <input readOnly value="#" id="senha" type="password" 
                        className="mb-5 w-full h-auto p-1 bg-[#F2C84B] rounded-md outline-none focus:outline-none shadow-md
                                    placeholder:font-light placeholder:text-sm placeholder:opacity-85 text-black/50" />  

                        <label>Ativo?</label><br />
                        <select disabled name="status" id="status" className="w-full mb-5 outline-none
                                    appearance-none bg-[#F2C84B] text-black/50 rounded-md h-auto p-1 shadow-md" 
                                    defaultValue={1}>

                            <option value="1">Sim</option>
                            <option value="0">Não</option>
                        </select>    
                        <div className="pointer-events-none absolute right-12 bottom-51 flex items-center">
                            <TiArrowSortedDown size={25} className="text-[#F2594B]" />
                        </div> 

                        <label>Tipo:</label><br />
                        <select disabled name="tipouser" id="tipouser" className="w-full outline-none
                                    appearance-none bg-[#F2C84B] text-black/50 rounded-md h-auto p-1 shadow-md" 
                                    defaultValue="admin">

                            <option value="admin">Admin</option>
                            <option value="normal">Normal</option>
                        </select>    
                        <div className="pointer-events-none absolute right-12 bottom-31.5 flex items-center">
                            <TiArrowSortedDown size={25} className="text-[#F2594B]" />
                        </div>                       
                    </form> 

                    <div className="flex text-center items-center">
                        <Link href="/usuarios" className="bg-[#F2594B] w-full h-auto p-3 font-bold text-[#F2EBD5] text-xl rounded-md">
                                Voltar
                        </Link>         
                    </div>
                </div>
            </div>
            <BackgroundStripes />
            <CirclesBottom />
        </div>
    )
}