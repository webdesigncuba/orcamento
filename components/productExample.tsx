import Image from "next/image";

export default function ProductExample() {
  return (
    <div className="flex flex-col min-h-screen bg-product gap-6">
      <div className="p-6 md:p-10">
        <h1 className="text-text text-4xl md:text-8xl font-title mb-8 text-center">
          VARIEDADE EM TECIDOS
        </h1>
        <div className="bg-white p-5">
          <Image
            src="/cortinas.png"
            alt="Imagem de variedade em tecidos"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
          <p className="text-center text-text font-text text-2xl mt-5">
            SUA PERSONALIDADE
          </p>
          <p className="text-center text-text font-text text-2xl mt-5">
            Cada tecido selecionado para atender às suas necessidades
            específicas de privacidade, iluminação e estética. Nossa equipe
            orienta na escolha perfeita para cada projeto.
          </p>
        </div>
        <div className="mt-20">
          <h2 className="text-text font-title text-5xl text-center">
            NOSSAS SOLUÇÕES EM CORTINAS E PERSIANAS
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <div className="flex flex-col items-center md:items-start p-10">
            <Image
              src="/persianas.png"
              alt="Imagem sobre nós"
              width={450}
              height={250}
              className="object-cover rounded-lg mb-4"
            />
            <p className="text-center text-primary font-text font-bold text-3xl mb-10">
              Persianas de Madeira e PVC
            </p>
            <p className="text-center text-primary font-text text-2xl">
              Durabilidade e elegância combinadas em modelos que agregam valor e
              privacidade aos seus espaços
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start p-10">
            <p className="text-center text-primary font-text font-bold text-3xl mb-10">
              Blackout e Translucidos
            </p>
            <p className="text-center text-primary font-text text-2xl">
              Controle total da luminocidade com opções termicas e acústicas
              para conforto máximo em qualquer ambiente
            </p>
            <Image
              src="/blackout.png"
              alt="Imagem sobre nós"
              width={450}
              height={250}
              className="object-cover rounded-lg mb-4"
            />
          </div>
        </div>
        <div className="relative w-full h-48 sm:h-64">
          <Image
            src="/Cortin.png"
            alt="Imagem de produto"
            fill
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <div className="flex flex-col items-center md:items-start p-10">
            <h2 className="text-primary font-title text-5xl text-center">
              TECIDOS NATURAIS
            </h2>
            <p className="text-primary font-text text-center text-2xl">
              Algodão, linho e seda para ambientes clássicos e sofisticados
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start p-10">
            <h2 className="text-primary font-title text-5xl text-center">
              TECIDOS TÉCNICOS
            </h2>
            <p className="text-primary font-text text-center text-2xl">
              Tecidos Técnicos Resistentes à luz, fáceis de limpar e com
              durabilidade superio
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 md:gap-10 mt-10 mb-10">
          <h2 className="text-primary font-title text-5xl ">
            TECIDOS NATURAIS
          </h2>
          <p className="text-primary font-text text-2xl">
            Algodão, linho e seda para ambientes clássicos e sofisticados
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 md:gap-10 mt-20 mb-20">
          <h2 className="text-primary font-title text-5xl">PROFISSIONAL</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 ">
          <div className="flex flex-col items-center md:items-start p-10">
            <p className="text-primary font-text text-2xl font-bold mb-20">
              PERSIANAS CHARME
            </p>
            <p className="text-primary font-text text-2xl  ">
              Transformam o ambiente de trabalho ao unir conforto visual,
              controle preciso da luz e um design atemporal que valoriza o
              espaço, melhora o bem estar e cria condições ideais para
              produtividade todos os dias.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start ">
            <Image
              src="/imagen3.png"
              alt="Imagem de produto"
              width={600}
              height={700}
              className="object-cover mb-4"
            />
          </div>

        </div>
      </div>
       <div className="grid grid-cols-1 md:grid-cols-1 gap-6 md:gap-10 ">
           <Image
              src="/imagenfooter1.png"
              alt="Imagem de produto"
              width={600}
              height={700}
              className="object-cover mb-4 w-full"
            />
        </div>
    </div>
  );
}