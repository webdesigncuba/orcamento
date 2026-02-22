"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabaseClients";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from "sonner";

interface Orcamento {
  id: number;
  name: string;
  services: string;
  localization: string;
  medid: string;
  observation: string;
  total: string ;
}

interface OrcamentoService {
  id: string;
  orcamento_id: string;
  servico_id: string;
}

export default function EditOrcamentoPage() {
  const { id } = useParams(); // obtiene el id de la URL
  const router = useRouter();
  const [orcamentoData, setOrcamentoData] = useState<Orcamento | null>(null);
  const [orcamentoService, setOrcamentoService ] = useState<OrcamentoService[]>([])

  const handleSave = async () => {
    if (!orcamentoData) return;
    const { error } = await supabase
      .from("ocamento")
      .update(orcamentoData)
      .eq("id", orcamentoData.id);

    if (!error) {
      router.push("/dashboard");
    }
  };

  if (!orcamentoData) {
    return <p>Cargando datos...</p>;
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("ocamento")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        setOrcamentoData(data);
        console.log(data)
      }
    };
    if (id) fetchData();
  }, [id]);

 

  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-10 w-screen bg-foreground">
      <Card className="w-full max-w-sm">
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
        value={orcamentoData.name}
        onChange={(e) =>
          setOrcamentoData((prev) =>
            prev ? { ...prev, name: e.target.value } : prev,
          )
        }
        className="w-full border p-2 rounded"
        placeholder="Nome"
      />
      <Label>Serviço</Label>
      <Input
        type="text"
        value={orcamentoData.services}
        onChange={(e) =>
          setOrcamentoData((prev) =>
            prev ? { ...prev, services: e.target.value } : prev,
          )
        }
        className="w-full border p-2 rounded"
        placeholder="Serviço"
      />
      <Label>Localização</Label>
      <Input
        type="text"
        value={orcamentoData.localization}
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
        value={orcamentoData.medid}
        onChange={(e) =>
          setOrcamentoData((prev) =>
            prev ? { ...prev, medid: e.target.value } : prev,
          )
        }
        className="w-full border p-2 rounded"
      />
    <Label>Observações</Label>
      <Textarea
        value={orcamentoData.observation}
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
        value={orcamentoData.total}
        onChange={(e) =>
          setOrcamentoData((prev) =>
            prev ? { ...prev, total: e.target.value } : prev,
          )
        }
        className="w-full border p-2 rounded"
      />

     
      <Button
        type="submit"
        className="w-full"
      >
        Guardar cambios y Gerar Orçamento
      </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}