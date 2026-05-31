import Link from "next/link";
import CirclesBottom from "../components/circles-bottom";
import CirclesTop from "../components/circles-top";
import { Poppins } from "next/font/google";
import { Major_Mono_Display } from "next/font/google";
import { FaArrowLeft } from "react-icons/fa6";
import { BsPlusSquareFill } from "react-icons/bs";
import { PiMinusSquareFill } from "react-icons/pi";
import { BsFillXSquareFill } from "react-icons/bs";
import { TiArrowSortedDown } from "react-icons/ti";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const majorMono = Major_Mono_Display({
  subsets: ["latin"],
    weight: "400",
});

export default function FinalizarVenda() {
    return(
        <div className={poppins.className + " relative w-screen min-h-screen flex flex-col bg-[#F2EBD5] text-black overflow-hidden"}>
           
           <CirclesTop />
           <CirclesBottom />

            {/* Título */}
            <div className="relative z-10 flex flex-col flex-1">
                <header className="m-45 mb-10">
                    <h1 className={majorMono.className + " text-4xl mt-2 mb-5"}>Finalizar Venda</h1>
                    <div className="border border-black/30"></div>
                </header>

                <form>
                    {/* Área de produtos da venda */}
                    <div className="h-141 ml-45 mr-45 overflow-y-auto overflow-x-hidden text-[#F2EBD5] font-bold">
                        <div className="bg-[#F25EA3] h-20 rounded-lg border-2 border-[#F2EBD5] mb-10 
                                        flex text-center items-center">
                            <img src="/images/blusinha-rosy.jpeg" className="w-15 h-15 rounded-full border-4 border-[#F2EBD5] ml-5 mr-10" />
                            <p className="mr-30 2xl:mr-70 min-w-45">Blusinha Rosy</p>
                            <p  className="mr-23 2xl:mr-38 min-w-45">R$ 24,90</p>
                            <p  className="mr-12 2xl:mr-62 min-w-45">1 un.</p>
                            <button className="mr-5 hover:scale-110">
                                <BsPlusSquareFill size={25} />
                            </button>
                            <button className="mr-5 hover:scale-110">
                                <PiMinusSquareFill size={33} />
                            </button>
                            <button className="mr-5 hover:scale-110">
                                <BsFillXSquareFill size={25} />
                            </button>
                        </div>

                        <div className="bg-[#F25EA3] h-20 rounded-lg border-2 border-[#F2EBD5] mb-10
                                        flex text-center items-center">
                            <img src="#" className="w-15 h-15 rounded-full border-4 border-[#F2EBD5] ml-5 mr-10" />
                            <p className="mr-30 2xl:mr-70 min-w-45">Produto XXX</p>
                            <p  className="mr-23 2xl:mr-38 min-w-45">R$ 00,00</p>
                            <p  className="mr-12 2xl:mr-62 min-w-45">1 un.</p>
                            <button className="mr-5 hover:scale-110">
                                <BsPlusSquareFill size={25} />
                            </button>
                            <button className="mr-5 hover:scale-110">
                                <PiMinusSquareFill size={33} />
                            </button>
                            <button className="mr-5 hover:scale-110">
                                <BsFillXSquareFill size={25} />
                            </button>
                        </div>

                        <div className="bg-[#F25EA3] h-20 rounded-lg border-2 border-[#F2EBD5] mb-10
                                        flex text-center items-center">
                            <img src="#" className="w-15 h-15 rounded-full border-4 border-[#F2EBD5] ml-5 mr-10" />
                            <p className="mr-30 2xl:mr-70 min-w-45">Produto XXX</p>
                            <p  className="mr-23 2xl:mr-38 min-w-45">R$ 00,00</p>
                            <p  className="mr-12 2xl:mr-62 min-w-45">1 un.</p>
                            <button className="mr-5 hover:scale-110">
                                <BsPlusSquareFill size={25} />
                            </button>
                            <button className="mr-5 hover:scale-110">
                                <PiMinusSquareFill size={33} />
                            </button>
                            <button className="mr-5 hover:scale-110">
                                <BsFillXSquareFill size={25} />
                            </button>
                        </div>                  
                    </div>

                    {/* Informações total venda e forma de pagamento */}
                    <div className="flex text-center items-center font-bold">
                        <span className="bg-[#F2594B] text-[#F2EBD5] p-2 absolute z-10 text-center items-center right-98 mt-7">
                            <label className="mr-2">Pagto.:</label>
                            <select name="pagamento" id="pagamento" 
                            className="w-30 bg-[#F2594B] transition-colors outline-none
                                        appearance-none" defaultValue="dinheiro">
                                <option value="dinheiro" className="bg-[#F2EBD5] text-[#F2594B]">Dinheiro</option>
                                <option value="pix" className="bg-[#F2EBD5] text-[#F2594B]">PIX</option>
                                <option value="cartao" className="bg-[#F2EBD5] text-[#F2594B]">Cartão</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                <TiArrowSortedDown size={18} />
                            </div>
                        </span>

                        <span className="bg-[#F2594B] text-[#F2EBD5] p-2 absolute min-w-45 max-w-45 flex text-center items-center gap-x-5 right-48 2xl:right-50 mt-7">
                            <p>Total:</p>
                            <p>R$ 124,90</p>
                        </span>
                    </div>

                    {/* Botões para voltar e concluir venda*/}
                    <div className="flex items-center ml-45 gap-x-90 mt-20 2xl:mt-4 2xl:gap-x-150">
                        <Link href="/inicio" className="bg-[#F2C84B] w-10 h-10 rounded-full flex flex-col items-center 
                                                        justify-center shadow-md hover:scale-110">
                            <FaArrowLeft size={30} className="text-[#F2594B]" />
                        </Link>
                        <button type="submit" id="concluir" className="bg-[#F2C84B] w-50 p-2 font-bold text-[#F2594B] text-lg rounded-md
                                                        shadow-md hover:scale-110">
                            Concluir
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
