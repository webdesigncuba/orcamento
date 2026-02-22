import Image from 'next/image';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-background-form">
      <div className="p-6 md:p-10">
      <h1 className="text-text text-4xl md:text-8xl font-title mb-8">
        QUEM SOMOS
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
        <div className="flex flex-col items-center md:items-start">
        <Image
          src="/logoAbout.png"
          alt="Imagem sobre nós"
          width={150}
          height={150}
          className="object-cover rounded-lg mb-4"
        />
        <p className="text-text text-center md:text-left font-text text-lg md:text-2xl">
          A <strong>Charme Decorações</strong> é sinônimo de excelência em soluções personalizadas para eventos e decorações completas para janelas e ambientes no <strong>Distrito Federal</strong>. Com <strong>anos de experiência</strong>, transformamos <strong>residências</strong> e <strong>escritórios</strong> em espaços sofisticados e funcionais. Nossa equipe especializada combina design contemporâneo com funcionalidade prática, garantindo resultados que superam expectativas. Cada projeto é único, desenvolvido com atenção aos detalhes e respeito ao <strong>seu estilo pessoal</strong>.
        </p>
        </div>
        <div className="flex justify-center">
        <Image
          src="/imagenAbout2.png"
          alt="Imagem sobre nós"
          width={350}
          height={750}
          className="w-full max-w-xs md:max-w-none"
        />
        </div>
        <div className="flex justify-center">
        <Image
          src="/imagenAbout1.png"
          alt="Imagem sobre nós"
          width={350}
          height={850}
          className="w-full max-w-xs md:max-w-none"
        />
        </div>
      </div>
      </div>
    </div>
  );
}
