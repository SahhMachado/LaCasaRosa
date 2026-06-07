"use server";

import CirclesBottom from "@/app/components/circles-bottom"
import CirclesTop from "@/app/components/circles-top"
import { Poppins } from "next/font/google";
import { Major_Mono_Display } from "next/font/google";
import { IoSearchOutline } from "react-icons/io5";
import { FaArrowLeft, FaEye } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import Link from "next/link";
import { usuarioSearch } from "../api/user/route";
import SearchBar from "../components/searchbar";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
});

const majorMono = Major_Mono_Display({
    subsets: ["latin"],
    weight: "400",
});

function capitalize(texto: string) {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

export default async function Usuarios({
    searchParams,
}: {
    searchParams: Promise<{ pesquisa?: string }>
}) {
    const { pesquisa } = (await searchParams) || {};

    const usuarios = await usuarioSearch(pesquisa);

    return (
        <div className={poppins.className + " relative w-screen h-screen bg-[#F2EBD5] text-black overflow-hidden"}>
            <CirclesTop />
            <CirclesBottom />

            <div className="relative z-10 flex flex-col flex-1">

                {/* Título e pesquisa */}
                <header className="m-45 mb-10">
                    <h1 className={majorMono.className + " text-4xl mt-2 mb-5"}>Usuários</h1>
                    <div className="relative">
                        <IoSearchOutline size={20} className="absolute opacity-50 mt-1" />
                        <SearchBar placeholder="Pesquise aqui pelo nome ou e-mail..." className="outline-0 p-1 w-full ml-5" />
                    </div>
                    <div className="border border-black/30"></div>
                </header>

                {/* Área de usuários */}
                <div className="h-120 ml-45 mr-45 overflow-y-auto overflow-x-hidden text-[#F2EBD5] font-bold">
                    {usuarios.map((usuario) => (
                        <div key={usuario.usuario_id} className="bg-[#F25EA3] h-20 rounded-lg border-2 border-[#F2EBD5] mb-10 flex text-center items-center">
                            <img src={`data:image/jpeg;base64,${usuario.usuario_imagem}`} className="w-15 h-15 rounded-full border-4 border-[#F2EBD5] ml-5 mr-10" />
                            <p className="mr-40 2xl:mr-95 min-w-45 max-w-45">{usuario.usuario_nome}</p>
                            <p className="mr-45 2xl:mr-95 min-w-45">{capitalize(usuario.role)}</p>
                            <span className="mr-5 min-w-30">{usuario.usuario_ativo}</span>
                            <Link href={`/usuarios/visualizar/${usuario.usuario_id}`} className="mr-5 hover:scale-110">
                                <FaEye size={30} />
                            </Link>
                            <Link href={`/usuarios/editar/${usuario.usuario_id}`} className="mr-5 hover:scale-110">
                                <BiSolidEdit size={30} />
                            </Link>
                        </div>
                    ))
                    }
                </div>

                {/* Botão para voltar */}
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
