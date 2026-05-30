import CirclesBottom from "@/app/components/circles-bottom"
import CirclesTop from "@/app/components/circles-top"
import { Poppins } from "next/font/google";
import { Major_Mono_Display } from "next/font/google";
import { IoSearchOutline } from "react-icons/io5";
import { FaArrowLeft, FaEye } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const majorMono = Major_Mono_Display({
  subsets: ["latin"],
    weight: "400",
});

export default function Estoque() {
    return(
        <div className={poppins.className + " relative w-screen h-screen bg-[#F2EBD5] text-black overflow-hidden"}>
            <CirclesTop />
            <CirclesBottom />

            <div className="relative z-10 flex flex-col flex-1">

                {/* Título e pesquisa */}
                <header className="m-45 mb-10">
                    <h1 className={majorMono.className + " text-4xl mt-2 mb-5"}>Estoque</h1>
                    <form action="">
                        <button type="submit" className="absolute opacity-50 mt-1">
                            <IoSearchOutline size={20} />
                        </button>
                    </form>
                    <input type="text" placeholder="Pesquise aqui..." className="outline-0 p-1 w-full ml-5" />
                    <div className="border border-black/30"></div>
                </header>

                {/* Área de produtos */}
                <div className="h-120 ml-45 mr-45 overflow-y-auto overflow-x-hidden text-[#F2EBD5] font-bold">
                    <div className="bg-[#F25EA3] h-20 rounded-lg border-2 border-[#F2EBD5] mb-10 flex text-center items-center">
                        <img src="/images/blusinha-rosy.jpeg" className="w-15 h-15 rounded-full border-4 border-[#F2EBD5] ml-5 mr-10" />
                        <p className="mr-25 2xl:mr-60 min-w-45">Blusinha Rosy</p>
                        <p  className="mr-25 2xl:mr-60 min-w-45">R$ 24,90</p>
                        <p  className="mr-10 2xl:mr-48 min-w-25">1 un.</p>
                        <span className="mr-5 min-w-30">Disponível</span>
                        <button className="mr-5 hover:scale-110">
                            <FaEye size={30}/>
                        </button>
                        <button className="mr-5 hover:scale-110">
                            <BiSolidEdit size={30}/>
                        </button>
                    </div>

                    <div className="bg-[#F25EA3] h-20 rounded-lg border-2 border-[#F2EBD5] mb-10 flex text-center items-center">
                        <img src="#" className="w-15 h-15 rounded-full border-4 border-[#F2EBD5] ml-5 mr-10" />
                        <p className="mr-25 2xl:mr-60 min-w-45">Produto XXX</p>
                        <p  className="mr-25 2xl:mr-60 min-w-45">R$ 00,00</p>
                        <p  className="mr-10 2xl:mr-48 min-w-25">1 un.</p>
                        <span className="mr-5 min-w-30">Vendido</span>
                        <button className="mr-5 hover:scale-110">
                            <FaEye size={30}/>
                        </button>
                        <button className="mr-5 hover:scale-110">
                            <BiSolidEdit size={30}/>
                        </button>
                    </div>
                </div>

                {/* Botões para voltar e incluir produto*/}
                <div className="flex items-center ml-45 gap-x-90 mt-10 2xl:mt-4 2xl:gap-x-150">
                    <Link href="/inicio" className="bg-[#F2C84B] w-10 h-10 rounded-full flex flex-col items-center 
                                                    justify-center shadow-md hover:scale-110">
                        <FaArrowLeft size={30} className="text-[#F2594B]" />
                    </Link>
                    <button id="incluir" className="bg-[#F2C84B] w-50 p-2 font-bold text-[#F2594B] text-lg rounded-md
                                                    shadow-md hover:scale-110">
                        Incluir Produto
                    </button>
                </div>

            </div>
        </div>
    )
}
