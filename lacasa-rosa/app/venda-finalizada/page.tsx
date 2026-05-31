import Link from "next/link";
import CirclesBottom from "../components/circles-bottom";
import CirclesTop from "../components/circles-top";
import { Poppins } from "next/font/google";
import { FaCheck } from "react-icons/fa6";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export default function VendaFinalizada() {
    return(
        <div className={poppins.className + " relative w-screen min-h-screen flex bg-[#F2EBD5] text-black overflow-hidden"}>
            <CirclesTop />
            <CirclesBottom />
            <div className="flex flex-col justify-center items-center text-center w-full">
                <FaCheck size={60} />
                <h1 className="text-6xl mb-10 mt-5">Venda Finalizada!</h1>
                <Link href="/inicio" className="bg-[#F2594B] text-[#F2EBD5] text-xl p-1 w-50 rounded-md hover:shadow-xl">
                    Início
                </Link>
            </div>
        </div>
    )
}