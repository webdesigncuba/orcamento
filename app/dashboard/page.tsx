'use client';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/lib/supabaseClients";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from "sonner";

interface Orcamento {
  id: number;
  name: string;
  service: string;
  localization: string;
  medid: string;
  observation: string;
   total: number | null;
}


export default function Dashboard(){
    const router = useRouter();
    const [orcamento, setOrcamento] = useState<Orcamento[]>([]);
    const [orcamentoData, setOrcamentoData] = useState<Orcamento | null>(null);
    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const simulation = async () => {
      console.log("Inicio...");
      await wait(10000); // espera 30 segundo

    };


    const getOrcamento = async (id: number): Promise<void> => {
      try {
        const { data, error } = await supabase
          .from("ocamento") // nombre correcto de la tabla
          .select("*")
          .eq("id", id)
          .single(); // devuelve solo un registro

        if (error) {
          toast.error("Erro ao recuperar os dados do Orcamento");
          console.error(error);
          return;
        }

        if (data) {
          setOrcamentoData(data);
            console.log(data);
          if (data.total === null || data.total === "") {
            toast.success('O orçamento que você está tentando imprimir não contém o valor total; você será redirecionado para editá-lo.')
            await simulation();
            router.push(`/dashboard/edit/${data.id}`);
          }else{
            router.push(`/dashboard/orcamento/${data.id}`);
          }
        }

      } catch (err) {
        console.error("Unexpected error:", err);
        toast.error("Erro inesperado ao recuperar os dados");
      }
    };


    useEffect(() => {
      const fetchOcamento = async () => {
        const { data, error } = await supabase
          .from("ocamento") // nombre de tu tabla
          .select("*"); // selecciona todas las columnas

        if (error) {
          console.error("Error al obtener datos:", error.message);
          toast.error("Erro a o consultar os Orçamentos");
        } else {
          setOrcamento(data);
        }
      };

      fetchOcamento();
    }, []);

  return (
  <div className="flex min-h-screen flex-col items-center justify-start p-10 w-screen bg-foreground">
    {/* Imagen arriba */}
    <Image
      src="/logo.jpg"
      alt="Logo"
      width={200}
      height={200}
      className="mb-6"
    />

    {/* Tabla en escritorio */}
    <div className="hidden md:block w-full">
      <Table className="w-full border border-gray-300">
        <TableHeader className="bg-primary text-white">
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Localidad</TableHead>
            <TableHead>Medidas</TableHead>
            <TableHead>Observações</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-green-700">
          {orcamento.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.service}</TableCell>
              <TableCell>{item.localization}</TableCell>
              <TableCell>{item.medid}</TableCell>
              <TableCell>{item.observation}</TableCell>
              <TableCell>$R{item.total}</TableCell>
              <TableCell className="text-right">
                <Button size="xs" variant="outline" onClick={() => {getOrcamento(item.id)}}>Generar Orcamento</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    {/* Cards en móviles */}
    <div className="block md:hidden w-full space-y-4">
      {orcamento.map((item) => (
        <div key={item.id} className="border rounded-lg p-4 shadow bg-white text-primary">
          <p><strong>ID:</strong> {item.id}</p>
          <p><strong>Nome:</strong> {item.name}</p>
          <p><strong>Service:</strong> {item.service}</p>
          <p><strong>Localidad:</strong> {item.localization}</p>
          <p><strong>Medidas:</strong> {item.medid}</p>
          <p><strong>Observações:</strong> {item.observation}</p>
          <p><strong>Total:</strong> R$ {item.total}</p>
          <div className="text-right mt-2">
            <Button size="xs" variant="outline" onClick={() => {getOrcamento(item.id)}}>Generar Orcamento</Button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

}