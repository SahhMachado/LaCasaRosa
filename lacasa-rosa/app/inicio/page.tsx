"use client";

import { useState } from "react";
import { Poppins } from "next/font/google";
import { Major_Mono_Display } from "next/font/google";
import { IoSearchOutline } from "react-icons/io5";
import { BsListStars } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import { BsFillHandbagFill } from "react-icons/bs";
import Menu from "../components/menu";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const majorMono = Major_Mono_Display({
  subsets: ["latin"],
    weight: "400",
});

export default function Inicio() {
    const [aberto, setAberto] = useState(false);
    
    return(
        <div className={poppins.className + " w-screen h-screen bg-[#F2EBD5] flex flex-col overflow-hidden"}>
            {/* Menu principal */}
            <header className="bg-[#F25EA3] flex justify-center items-center gap-65 p-10">
                <button onClick={() => setAberto(true)} className="bg-[#f2c84b]/70 text-[#F2594B] w-20 h-20 rounded-full shadow-md flex items-center justify-center">
                    <BsListStars size={60} />
                </button>

                <h1 className={majorMono.className + " text-4xl mt-2 mb-5"}>O que você está buscando?</h1>
                
                <Link href="/perfil" className="bg-[#f2c84b]/70 text-[#F2594B] w-20 h-20 rounded-full shadow-md flex items-center justify-center">
                    <FaUser size={50} />
                </Link>
            </header>

            <Menu aberto={aberto} fechar={() => setAberto(false)} />

            {/* Barra de pesquisa */}
            <div className="text-[#F2EBD5] bg-[#f25ea3ad] w-full flex text-center justify-center relative">
                <input placeholder="Pesquise aqui..." type="text" className="outline-none focus:outline-none p-1 placeholder:text-[#F2EBD5] w-150 text-center" />
                <IoSearchOutline size={20} className="text-[#F2EBD5] absolute right-100 top-1/2 -translate-y-1/2" />
            </div>

            {/* Área de produtos */}
            <div className="text-black text-sm mt-25 flex-1 overflow-y-auto">
                <div className="flex flex-wrap justify-center items-center gap-y-10 gap-x-44">
                    <div className="flex flex-col text-center">
                        <img src="/images/blusinha-croche.jpeg" className="w-50 h-50 mb-4 border-2 border-[#F25EA3] shadow-lg rounded-xl" />
                        <p>Blusinha Crochê Charlotte</p>
                        <p>R$ 29,90</p>
                    </div>
                    <div className="flex flex-col text-center">
                        <img src="#" className="w-50 h-50 mb-4 border-2 border-[#F25EA3] shadow-lg rounded-xl" />
                        <p>Produto XXX</p>
                        <p>R$ 00,00</p>
                    </div>
                    <div className="flex flex-col text-center">
                        <img src="#" className="w-50 h-50 mb-4 border-2 border-[#F25EA3] shadow-lg rounded-xl" />
                        <p>Produto XXX</p>
                        <p>R$ 00,00</p>
                    </div>
                   <div className="flex flex-col text-center">
                        <img src="#" className="w-50 h-50 mb-4 border-2 border-[#F25EA3] shadow-lg rounded-xl" />
                        <p>Produto XXX</p>
                        <p>R$ 00,00</p>
                    </div>
                    
                    <div className="border border-[#F2C84B]/32 w-full"></div>

                    <div className="flex flex-col text-center">
                        <img src="/images/shorts-almond.jpeg" className="w-50 h-50 mb-4 border-2 border-[#F25EA3] shadow-lg rounded-xl" />
                        <p>Shorts Almond</p>
                        <p>R$ 39,90</p>
                    </div>
                    <div className="flex flex-col text-center">
                        <img src="#" className="w-50 h-50 mb-4 border-2 border-[#F25EA3] shadow-lg rounded-xl" />
                        <p>Produto XXX</p>
                        <p>R$ 00,00</p>
                    </div>
                    <div className="flex flex-col text-center">
                        <img src="#" className="w-50 h-50 mb-4 border-2 border-[#F25EA3] shadow-lg rounded-xl" />
                        <p>Produto XXX</p>
                        <p>R$ 00,00</p>
                    </div>
                    <div className="flex flex-col text-center">
                        <img src="#" className="w-50 h-50 mb-4 border-2 border-[#F25EA3] shadow-lg rounded-xl" />
                        <p>Produto XXX</p>
                        <p>R$ 00,00</p>
                    </div>
                </div>
            </div>

            {/* Botão para finalizar a venda */}
            <Link href="/finalizar-venda">
                <div className="absolute bg-[#F25EA3] text-[#F2EBD5] w-25 h-25 bottom-10 right-15 shadow-md rounded-full 
                                flex items-center justify-center hover:scale-110">
                    <BsFillHandbagFill size={60} />
                </div>
            </Link>
        </div>
    )
}