"use client";

import { useState } from "react";
import { Poppins } from "next/font/google";
import { Major_Mono_Display } from "next/font/google";
import { IoSearchOutline } from "react-icons/io5";
import { BsListStars } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import { BsFillHandbagFill } from "react-icons/bs";
import Menu from "../components/menu";
// import { MdCancel } from "react-icons/md";
// import { FaGear } from "react-icons/fa6";
// import { BsCircleSquare } from "react-icons/bs";
// import { BsFillBagFill } from "react-icons/bs";

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
        <div className={poppins.className + " w-screen h-screen bg-[#F2EBD5] overflow-x-hidden"}>
            <header className="bg-[#F25EA3] flex justify-center items-center gap-65 p-10">
                <button onClick={() => setAberto(true)} className="bg-[#f2c84b]/70 text-[#F2594B] w-20 h-20 rounded-full shadow-md flex items-center justify-center">
                    <BsListStars size={60} className="absolute mt-0.5 opacity-15 text-black"/>
                    <BsListStars size={60} />
                </button>

                <h1 className={majorMono.className + " text-4xl mt-2 mb-5"}>O que você está buscando?</h1>

                <button className="bg-[#f2c84b]/70 text-[#F2594B] w-20 h-20 rounded-full shadow-md flex items-center justify-center">
                    <FaUser size={50} className="absolute mt-0.5 opacity-10 text-black" />
                    <FaUser size={50} />
                </button>
            </header>

            <Menu aberto={aberto} fechar={() => setAberto(false)} />

            <div className="text-[#F2EBD5] bg-[#f25ea3ad] w-full flex text-center justify-center relative">
                <input placeholder="Pesquise aqui..." type="text" className="outline-none focus:outline-none p-1 placeholder:text-[#F2EBD5] w-150 text-center" />
                <IoSearchOutline size={20} className="text-[#F2EBD5] absolute right-100 top-1/2 -translate-y-1/2" />
            </div>

            <div className="text-black text-sm flex justify-center gap-44 mt-25 mb-10">
                <div className="flex flex-col text-center">
                    <img src="/images/blusinha-croche.jpeg" className="w-50 h-50 mb-4 border-2 border-[#F25EA3] shadow-lg rounded-xl" />
                    <p>Blusinha Crochê Charlotte</p>
                    <p>R$ 29,90</p>
                </div>
                <div className="border-2 border-[#F25EA3] w-50 h-50 rounded-xl shadow-lg"></div>
                <div className="border-2 border-[#F25EA3] w-50 h-50 rounded-xl shadow-lg"></div>
                <div className="border-2 border-[#F25EA3] w-50 h-50 rounded-xl shadow-lg"></div>
            </div>
            <div className="border border-[#f2c84b]/30 p-10 text-black text-sm flex justify-center gap-44">
                <div className="flex flex-col text-center">
                    <img src="/images/shorts-almond.jpeg" className="w-50 h-50 mb-4 border-2 border-[#F25EA3] shadow-lg rounded-xl" />
                    <p>Shorts Almond</p>
                    <p>R$ 39,90</p>
                </div>
                <div className="border-2 border-[#F25EA3] w-50 h-50 rounded-xl shadow-lg"></div>
                <div className="border-2 border-[#F25EA3] w-50 h-50 rounded-xl shadow-lg"></div>
                <div className="border-2 border-[#F25EA3] w-50 h-50 rounded-xl shadow-lg"></div>
            </div>
            <div className="absolute bg-[#F25EA3] text-[#F2EBD5] w-25 h-25 bottom-10 right-15 shadow-md rounded-full flex items-center justify-center">
                <BsFillHandbagFill size={60} />
            </div>

            {/* <div className="w-screen h-screen absolute top-0 left-0 bg-black/50">
                <div className="absolute bg-[#F2EBD5]/75 text-[#F2594B] rounded-r-lg text-lg font-bold h-screen w-80 top-0 left-0 flex justify-center">
                    <MdCancel size={45} className="absolute top-5 right-5" />
                    <div className="mt-40 flex flex-col">
                        <p className="flex items-center gap-2"><FaGear /> <span>Painel Administrativo</span></p>
                        <div className="mt-4 mb-4 border-b border-[#F2594B]"></div>
                        <a href="#" className="mb-5 flex items-center gap-2"><BsCircleSquare /> <span className="hover:underline">Estoque</span></a>
                        <a href="#" className="mb-5 flex items-center gap-2"><FaUser /> <span className="hover:underline">Usuários</span></a>
                        <a href="#" className="mb-5 flex items-center gap-2"><BsFillBagFill /> <span className="hover:underline">Vendas Efetuadas</span> </a>
                    </div>
                </div>
            </div> */}
        </div>
    )
}