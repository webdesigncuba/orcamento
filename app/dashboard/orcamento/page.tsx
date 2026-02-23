'use client'
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/lib/supabaseClients";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Orcamento {
  'id': string,
  'name':string,
  'medid':string,
  'localization': string,
  'observation': string,
  'total': string,
  'status': string,
}

export default function New(){
    const router = useRouter();
    const [orcamentoData, setOrcamentoData] = useState<Orcamento []>([]);
    
    const handleEdit = async(id:string) => {
      router.push(`/dashboard/orcamento/edit/${id}/`);

    }

    useEffect(()=> {
      const fetchOrcamentoNew = async () => {
        const { data, error } = await supabase
        .from('ocamento')
        .select("*")
        .eq('status','new')
        if(error){
          toast.error('Erro na obtenção de orçamentos')
        }else{
          setOrcamentoData(data);
        }
      }
      fetchOrcamentoNew();
      }, []);

    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 p-4 md:p-10">
              {/* Tabla solo en escritorio */}
              <div className="hidden md:block overflow-x-auto">
                <Table className="min-w-full border-collapse">
                  <TableHeader className="bg-primary">
                    <TableRow>
                      <TableHead className="w-[100px]">Nome</TableHead>
                      <TableHead>Localização</TableHead>
                      <TableHead>Medidas</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-primary border-b">
                    {orcamentoData.map((orcamento) => (
                      <TableRow key={orcamento.id}>
                        <TableCell>{orcamento.name}</TableCell>
                        <TableCell>{orcamento.localization}</TableCell>
                        <TableCell>{orcamento.medid}</TableCell>
                        <TableCell>{orcamento.total}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button size="sm">Ver</Button>
                          <Button size="sm" onClick={() => {handleEdit(orcamento.id)}}>Editar</Button>
                          {orcamento.total !== null && (
                            <Button size="sm">Gerar</Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Cards solo en móviles */}
              <div className="block md:hidden space-y-4 text-primary">
                {orcamentoData.map((orcamento) => (
                  <div
                    key={orcamento.id}
                    className="border rounded p-4 bg-white shadow-sm"
                  >
                    <p>
                      <strong>Nome:</strong> {orcamento.name}
                    </p>
                    <p>
                      <strong>Localização:</strong> {orcamento.localization}
                    </p>
                    <p>
                      <strong>Medidas:</strong> {orcamento.medid}
                    </p>
                    <p>
                      <strong>Total:</strong> R$ {orcamento.total}
                    </p>
                    <div className="flex justify-end gap-2 mt-2">
                      <Button size="sm">Ver</Button>
                      <Button size="sm">Editar</Button>
                      {orcamento.total !== null && (
                        <Button size="sm">Gerar</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}