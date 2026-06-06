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
import Modal from "@/app/components/modal";
import { VendaProps } from "@/app/api/vendas/route";
import SearchBar from "@/app/components/searchbar";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
});

const majorMono = Major_Mono_Display({
    subsets: ["latin"],
    weight: "400",
});

const statusFormatado: Record<string, string> = {
    finalizada: "Finalizada",
    cancelada: "Cancelada"
};

const pagtoFormatado: Record<string, string> = {
    pix: "PIX",
    cartao: "Cartão",
    dinheiro: "Dinheiro"
};

export default function VendasEfetuadas({ vendas }: { vendas: VendaProps[] }) {
    const [aberto, setAberto] = useState(false); //controla o modal de cancelamento 

    const [vendaSelecionada, setVendaSelecionada] = useState<number | null>(null); //armazena o ID da venda

    return (
        <div className={poppins.className + " relative w-screen h-screen bg-[#F2EBD5] text-black overflow-hidden"}>
            <CirclesTop />
            <CirclesBottom />

            <div className="relative z-10 flex flex-col flex-1">

                {/* Título e pesquisa */}
                <header className="m-45 mb-10">
                    <h1 className={majorMono.className + " text-4xl mt-2 mb-5"}>Vendas Efetuadas</h1>
                    <div className="relative">
                        <IoSearchOutline size={20} className="absolute opacity-50 mt-1" />
                        <SearchBar
                            placeholder="Pesquise pelo ID da venda..."
                            className="outline-0 p-1 w-full ml-5"
                        />
                    </div>
                    <div className="border border-black/30"></div>
                </header>


                {/* Área de vendas */}
                <div className="h-120 ml-45 mr-45 overflow-y-auto overflow-x-hidden text-[#F2EBD5] font-bold">
                    {
                        vendas.map((venda) => (
                            <div key={venda.venda_id} className="bg-[#F25EA3] h-20 rounded-lg border-2 border-[#F2EBD5] mb-10 flex text-center items-center">
                                <div className="w-15 h-15 rounded-full bg-[#F2EBD5] ml-5 mr-10 text-[#F25EA3] flex items-center justify-center">
                                    <BsFillBasket2Fill size={40} />
                                </div>
                                <p className="mr-25 2xl:mr-60 min-w-45">{venda.venda_id}</p>
                                <p className="mr-25 2xl:mr-60 min-w-45">
                                    {Number(venda.venda_total).toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </p>
                                <p className="mr-10 2xl:mr-48 min-w-25">{pagtoFormatado[venda.venda_formapagto]}</p>
                                <span className="mr-5 min-w-30">{statusFormatado[venda.venda_status]}</span>
                                <Link title="Visualizar venda" href={`/vendas-efetuadas/detalhes-venda/${venda.venda_id}`} className="mr-5 hover:scale-110">
                                    <FaEye size={30} />
                                </Link>
                                <button
                                    disabled={venda.venda_status === "cancelada"}
                                    title={
                                        venda.venda_status === "cancelada"
                                            ? "Venda já cancelada"
                                            : "Cancelar venda"
                                    }
                                    onClick={() => {
                                        setVendaSelecionada(venda.venda_id);
                                        setAberto(true);
                                    }}
                                    className="mr-5 hover:scale-110"
                                >
                                    <TiCancel size={32} />
                                </button>
                            </div>
                        ))
                    }

                    <Modal
                        aberto={aberto}
                        fechar={() => {
                            setAberto(false);
                            setVendaSelecionada(null);
                        }}
                        vendaId={vendaSelecionada}
                    />
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
