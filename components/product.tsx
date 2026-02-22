import Image from 'next/image';

export default function Product() {
    return (
      <div className="flex flex-col min-h-screen bg-product gap-6">
      <div className="relative w-full h-48 sm:h-64">
        <Image
        src="/imagenProduct.png"
        alt="Imagem de produto"
        fill
        className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 px-4 sm:px-8 md:px-30 pt-6 sm:pt-10 pb-6 sm:pb-10">
        <ul className="mb-5">
        <li className="text-primary text-3xl sm:text-5xl font-title">Cortinas</li>
        <li className="text-primary text-3xl sm:text-5xl font-title">Persianas</li>
        <li className="text-primary text-3xl sm:text-5xl font-title">Papeis de Paredes</li>
        <li className="text-primary text-3xl sm:text-5xl font-title">Toldos</li>
        </ul>
        <p className="text-primary text-center font-text text-lg sm:text-2xl">
        Ha mais de 10 anos no Distrito Federal, a Charme Decoraçoes é
        especialista em cortinas, persianas, toldos e papeis de parede,
        oferecendo soluções completas que vão da venda a instalaçõ e
        higienização, com atendimento personalizado, excelencia tecnica e
        compromisso em transformar ambientes corn qualidade e
        durabilidade{" "}
        </p>
      </div>
      </div>
    );
}