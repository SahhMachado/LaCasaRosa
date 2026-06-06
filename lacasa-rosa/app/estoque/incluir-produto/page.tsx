"use server";

import { BiSolidShoppingBags } from "react-icons/bi";
import { Poppins } from "next/font/google";
import { Major_Mono_Display } from "next/font/google";
import CirclesTop from "@/app/components/circles-top";
import CirclesBottom from "@/app/components/circles-bottom";
import BackgroundStripes from "@/app/components/background-stripes";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import Incluir from "./components/incluir";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const majorMono = Major_Mono_Display({
  subsets: ["latin"],
    weight: "400",
});

export default async function Page() {    
    return(
        <div className="w-screen h-screen relative flex flex-col bg-[#F2EBD5] text-black overflow-hidden">
            <CirclesTop />

            <div className={poppins.className + " ml-25 mt-80"}>
                <BiSolidShoppingBags size={80}/>
                <h1 className={majorMono.className + " text-4xl mt-2 mb-5"}>Bem-Vindo(a)!</h1>
                <h2 className="text-2xl">Aqui você pode cadastrar os produtos  <br /> em estoque</h2>
            </div>
            
            <div className={poppins.className + " relative z-10"}>
                {/* Card */}
                <div className="bg-[#F2EBD5] w-[30%] h-auto p-10 rounded-2xl absolute right-40 -top-100">
                    
                    <Incluir />  
                    
                    <Link href="/estoque" className="pointer-events-none flex flex-col items-center text-sm mb-1 hover:scale-110">
                        <FaArrowLeft size={40} className="text-[#F2594B] pointer-events-auto" />
                    </Link>  
                </div>
            </div>
            <BackgroundStripes />
            <CirclesBottom />
        </div>
    )
}