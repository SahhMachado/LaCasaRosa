"use server";

import CirclesBottom from "@/app/components/circles-bottom"
import CirclesTop from "@/app/components/circles-top"
import { Poppins } from "next/font/google";
import { Major_Mono_Display } from "next/font/google";
import { IoSearchOutline } from "react-icons/io5";
import { FaArrowLeft, FaEye } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import Link from "next/link";
import { produtoSearch } from "../api/estoque/route";
import SearchBar from "../components/searchbar";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
});

const majorMono = Major_Mono_Display({
    subsets: ["latin"],
    weight: "400",
});

const statusFormatado: Record<string, string> = {
    disponivel: "Disponível",
    vendido: "Vendido",
    reservado: "Reservado",
};

export default async function Estoque(
    {
        searchParams,
    }: {
        searchParams: Promise<{ pesquisa?: string }>
    }
) {
    const { pesquisa } = await searchParams;

    const produtos = await produtoSearch(pesquisa);

    return (
        <div className={poppins.className + " relative w-screen h-screen bg-[#F2EBD5] text-black overflow-hidden"}>
            <CirclesTop />
            <CirclesBottom />

            <div className="relative z-10 flex flex-col flex-1">

                {/* Título e pesquisa */}
                <header className="m-45 mb-10">
                    <h1 className={majorMono.className + " text-4xl mt-2 mb-5"}>Estoque</h1>
                    <div className="relative">
                        <IoSearchOutline
                            size={20}
                            className="absolute left-0 top-1/2 -translate-y-1/2 opacity-50"
                        />

                        <SearchBar 
                            placeholder="Pesquise pelo nome do produto..."
                            className="outline-none p-1 w-full ml-5" 
                        />
                    </div>
                    <div className="border border-black/30"></div>
                </header>

                {/* Área de produtos */}
                <div className="h-120 ml-45 mr-45 overflow-y-auto overflow-x-hidden text-[#F2EBD5] font-bold">
                    {produtos.map((produto) => (
                        <div key={produto.produto_id} className="bg-[#F25EA3] h-20 rounded-lg border-2 border-[#F2EBD5] mb-10 flex text-center items-center">
                            <img src={`data:image/jpeg;base64,${produto.produto_imagem}`} className="w-15 h-15 rounded-full border-4 border-[#F2EBD5] ml-5 mr-10" />
                            <p className="mr-25 2xl:mr-60 min-w-45 max-w-45">{produto.produto_nome}</p>
                            <p className="mr-25 2xl:mr-60 min-w-45 max-w-45">
                                {Number(produto.produto_preco).toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })}
                            </p>
                            <p className="mr-10 2xl:mr-48 min-w-25 max-w-25">{produto.produto_estoque}</p>
                            <span className="mr-5 min-w-30 max-w-30">{statusFormatado[produto.produto_status]}</span>
                            <Link href={`/estoque/visualizar-produto/${produto.produto_id}`} className="mr-5 hover:scale-110">
                                <FaEye size={30} />
                            </Link>
                            <Link href={`/estoque/editar-produto/${produto.produto_id}`} className="mr-5 hover:scale-110">
                                <BiSolidEdit size={30} />
                            </Link>
                        </div>
                    ))
                    }
                </div>

                {/* Botões para voltar e incluir produto*/}
                <div className="flex items-center ml-45 gap-x-90 mt-10 2xl:mt-4 2xl:gap-x-150">
                    <Link href="/inicio" className="bg-[#F2C84B] w-10 h-10 rounded-full flex flex-col items-center 
                                                    justify-center shadow-md hover:scale-110">
                        <FaArrowLeft size={30} className="text-[#F2594B]" />
                    </Link>
                    <Link href="/estoque/incluir-produto" id="incluir" className="bg-[#F2C84B] w-50 p-2 font-bold text-[#F2594B] text-lg rounded-md
                                                    shadow-md hover:scale-110 flex items-center justify-center">
                        Incluir Produto
                    </Link>
                </div>

            </div>
        </div>
    )
}
