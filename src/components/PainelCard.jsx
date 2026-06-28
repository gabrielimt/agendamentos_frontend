export default function PainelCard({title, value, icon: Icone}){
    return(
        <div className="
            w-full md:w-[48%] xl:w-[24%] /* Responsividade de largura */
            flex justify-between items-start
            p-5 md:p-6
            bg-white border border-gray-100 shadow-sm rounded-xl
        ">
            <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold text-gray-700">
                    {title}
                </h3>
                <p className="text-4xl font-bold text-gray-900 mt-1">
                    {value}
                </p>
            </div>
            
            <div className="
                flex items-center justify-center
                min-w-10 min-h-10 w-10 h-10 
                bg-(--principal)
                rounded-full
            ">
              {Icone && <Icone size={20} color="#fff" />}
            </div>
        </div>
    )
}