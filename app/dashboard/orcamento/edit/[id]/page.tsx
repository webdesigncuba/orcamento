"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabaseClients";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Orcamento {
  id: string;
  name: string;
  services: string;
  localization: string;
  medid: string;
  observation: string;
  total: string;
  status: string;
}

interface Servico {
  id: string;
  nome: string;
}

interface OrcamentoService {
  id: string;
  orcamento_id: string;
  servico_id: string;
}

export default function EditOrcamentoPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [orcamentoData, setOrcamentoData] = useState<Orcamento | null>(null);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Traer orçamento
      const { data: orcamentoData, error: orcamentoError } = await supabase
        .from("ocamento")
        .select("*")
        .eq("id", id)
        .single();

      if (!orcamentoError && orcamentoData) {
        setOrcamentoData(orcamentoData);

        // Traer serviços asociados
        const { data: servicosData, error: servicosError } = await supabase
          .from("orcamento_servicos")
          .select("servico_id")
          .eq("orcamento_id", orcamentoData.id);

        if (!servicosError && servicosData) {
          setSelectedServices(servicosData.map((s) => String(s.servico_id)));
        }
      }

      // Traer todos los serviços
      const { data: allServices } = await supabase.from("servicos").select("*");
      if (allServices) setServicos(allServices as Servico[]);
    };

    if (id) fetchData();
  }, [id]);

  const handleSave = async () => {
    if (!orcamentoData) return;

    orcamentoData.status = 'generated'
    // Actualizar orçamento
    await supabase
      .from("ocamento")
      .update(orcamentoData)
      .eq("id", orcamentoData.id);

    // Traer asociaciones actuales
    const { data: currentAssociations, error: currentError } = await supabase
      .from("orcamento_servicos")
      .select("servico_id")
      .eq("orcamento_id", orcamentoData.id);

    if (currentError) {
      console.error("Error al traer asociaciones:", currentError);
      return;
    }

    const currentIds =
      currentAssociations?.map((s) => String(s.servico_id)) || [];

    // Calcular diferencias
    const toInsert = selectedServices.filter((id) => !currentIds.includes(id));
    const toDelete = currentIds.filter((id) => !selectedServices.includes(id));

    // Eliminar solo los que se desmarcaron
    if (toDelete.length > 0) {
      await supabase
        .from("orcamento_servicos")
        .delete()
        .eq("orcamento_id", orcamentoData.id)
        .in("servico_id", toDelete);
    }

    // Insertar solo los nuevos seleccionados
    if (toInsert.length > 0) {
      const newAssociations = toInsert.map((servicoId) => ({
        orcamento_id: orcamentoData.id,
        servico_id: servicoId,
        preco_unitario: 0,
      }));
      console.log("Asociacion", newAssociations);
      await supabase.from("orcamento_servicos").insert(newAssociations);
    }

    // Redirigir al template dinámico pdf/[id]
    router.push(`/dashboard/orcamento/pdf/${orcamentoData.id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 p-4 md:p-10">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Editar Orçamento</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                  }}
                  className="space-y-4"
                >
                  <Label>Nome</Label>
                  <Input
                    type="text"
                    value={orcamentoData?.name}
                    onChange={(e) =>
                      setOrcamentoData((prev) =>
                        prev ? { ...prev, name: e.target.value } : prev,
                      )
                    }
                    className="w-full border p-2 rounded"
                    placeholder="Nome"
                  />
                  <Label>Serviço</Label>
                  <div className="space-y-2 mb-4">
                    {servicos.map((servico) => (
                      <div key={servico.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedServices.includes(servico.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedServices((prev) => [
                                ...prev,
                                servico.id,
                              ]);
                            } else {
                              setSelectedServices((prev) =>
                                prev.filter((id) => id !== servico.id),
                              );
                            }
                          }}
                        />
                        <span>{servico.nome}</span>
                      </div>
                    ))}
                  </div>

                  <Label>Localização</Label>
                  <Input
                    type="text"
                    value={orcamentoData?.localization}
                    onChange={(e) =>
                      setOrcamentoData((prev) =>
                        prev ? { ...prev, localization: e.target.value } : prev,
                      )
                    }
                    className="w-full border p-2 rounded"
                  />
                  <Label>Medidas</Label>
                  <Input
                    type="text"
                    value={orcamentoData?.medid}
                    onChange={(e) =>
                      setOrcamentoData((prev) =>
                        prev ? { ...prev, medid: e.target.value } : prev,
                      )
                    }
                    className="w-full border p-2 rounded"
                  />
                  <Label>Observações</Label>
                  <Textarea
                    value={orcamentoData?.observation}
                    onChange={(e) =>
                      setOrcamentoData((prev) =>
                        prev ? { ...prev, observation: e.target.value } : prev,
                      )
                    }
                    className="w-full border p-2 rounded"
                  />
                  <Label>Total</Label>
                  <Input
                    type="text"
                    value={orcamentoData?.total}
                    onChange={(e) =>
                      setOrcamentoData((prev) =>
                        prev ? { ...prev, total: e.target.value } : prev,
                      )
                    }
                    className="w-full border p-2 rounded"
                  />
                  <Button type="submit" className="w-full">
                    Guardar cambios y Gerar Orçamento
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
