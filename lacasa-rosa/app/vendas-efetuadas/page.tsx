"use client";

import CirclesBottom from "@/app/components/circles-bottom"
import CirclesTop from "@/app/components/circles-top"
import { Poppins } from "next/font/google";
import { Major_Mono_Display } from "next/font/google";
import { IoSearchOutline } from "react-icons/io5";
import { FaArrowLeft, FaEye } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { BsFillBasket2Fill } from "react-icons/bs";
import Link from "next/link";
import { useState } from "react";
import Modal from "../components/modal";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const majorMono = Major_Mono_Display({
  subsets: ["latin"],
    weight: "400",
});

export default function VendasEfetuadas() {
    const [aberto, setAberto] = useState(false);

    return(
        <div className={poppins.className + " relative w-screen h-screen bg-[#F2EBD5] text-black overflow-hidden"}>
            <CirclesTop />
            <CirclesBottom />

            <div className="relative z-10 flex flex-col flex-1">

                {/* Título e pesquisa */}
                <header className="m-45 mb-10">
                    <h1 className={majorMono.className + " text-4xl mt-2 mb-5"}>Vendas Efetuadas</h1>
                    <IoSearchOutline size={20} className="absolute opacity-50 mt-1" />
                    <input type="text" placeholder="Pesquise aqui..." className="outline-0 p-1 w-full ml-5" />
                    <div className="border border-black/30"></div>
                </header>

                {/* Área de produtos */}
                <div className="h-120 ml-45 mr-45 overflow-y-auto overflow-x-hidden text-[#F2EBD5] font-bold">
                    <div className="bg-[#F25EA3] h-20 rounded-lg border-2 border-[#F2EBD5] mb-10 flex text-center items-center">
                        <div className="w-15 h-15 rounded-full bg-[#F2EBD5] ml-5 mr-10 text-[#F25EA3] flex items-center justify-center">
                            <BsFillBasket2Fill size={40} />
                        </div>
                        <p className="mr-25 2xl:mr-60 min-w-45">001</p>
                        <p  className="mr-25 2xl:mr-60 min-w-45">R$ 24,90</p>
                        <p  className="mr-10 2xl:mr-48 min-w-25">1 un.</p>
                        <span className="mr-5 min-w-30">Finalizada</span>
                        <Link href="/vendas-efetuadas/detalhes-venda" className="mr-5 hover:scale-110">
                            <FaEye size={30}/>
                        </Link>
                        <button onClick={() => setAberto(true)} className="mr-5 hover:scale-110">
                            <TiCancel size={32}/>
                        </button>
                    </div>

                    <div className="bg-[#F25EA3] h-20 rounded-lg border-2 border-[#F2EBD5] mb-10 flex text-center items-center">
                        <div className="w-15 h-15 rounded-full bg-[#F2EBD5] ml-5 mr-10 text-[#F25EA3] flex items-center justify-center">
                            <BsFillBasket2Fill size={40} />
                        </div>
                        <p className="mr-25 2xl:mr-60 min-w-45">002</p>
                        <p  className="mr-25 2xl:mr-60 min-w-45">R$ 00,00</p>
                        <p  className="mr-10 2xl:mr-48 min-w-25">1 un.</p>
                        <span className="mr-5 min-w-30">Cancelada</span>
                        <Link href="/vendas-efetuadas/detalhes-venda" className="mr-5 hover:scale-110">
                            <FaEye size={30} />
                        </Link>
                        <button onClick={() => setAberto(true)} className="mr-5 hover:scale-110">
                            <TiCancel size={32}/>
                        </button>
                    </div>

                    <Modal aberto={aberto} fechar={() => setAberto(false)} />
                </div>

                {/* Botão para voltar*/}
                <div className="flex items-center ml-45 gap-x-90 mt-10 2xl:mt-4 2xl:gap-x-150">
                    <Link href="/inicio" className="bg-[#F2C84B] w-10 h-10 rounded-full flex flex-col items-center 
                                                    justify-center shadow-md hover:scale-110">
                        <FaArrowLeft size={30} className="text-[#F2594B]" />
                    </Link>
                </div>

            </div>
        </div>
    )
}
