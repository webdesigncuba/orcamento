"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabaseClients";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Checkbox } from "./ui/checkbox";

interface Services {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
}
interface FormData {
  name: string;
  localization: string;
  medid: string;
  observation: string;
  total: string;
  services: string[]; // 👈 precisa ser um array
}

export default function FormLogo() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    localization: "",
    medid: "",
    observation: "",
    total: "",
    services: [], // 👈 inicializa como array
  });

  const [services, setServices] = useState<Services[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getServices = async () => {
    const { data, error } = await supabase.from("servicos").select("*");

    if (error) {
      toast.error("Erro ao pesquisar os serviços");
      return;
    }

    if (data) {
      setServices(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Insertar orçamento y obtener el registro creado
    const { data: orcamento, error } = await supabase
      .from("ocamento") // 👈 asegúrate que el nombre de la tabla sea correcto
      .insert([
        {
          name: formData.name,
          localization: formData.localization,
          medid: formData.medid,
          observation: formData.observation,
        },
      ])
      .select()
      .single(); // 👈 esto devuelve el objeto recién insertado

    if (error) {
      console.error("Error al guardar:", error.message);
      toast.error("Erro ao guardar os dados");
      return;
    }

    // 3. Insertar servicios relacionados en la tabla puente
    const orcamentoId = orcamento.id;

    const rows = formData.services.map((serviceId) => ({
      orcamento_id: orcamentoId,
      servico_id: serviceId,
      quantidade: 1,
      preco_unitario: 0, // ajusta según tu lógica
    }));

    const { error: servError } = await supabase
      .from("orcamento_servicos")
      .insert(rows);

    if (servError) {
      toast.error("Erro ao salvar serviços do orçamento");
      return;
    }

    toast.success("Orçamento salvo com serviços!");
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <div className="bg-foreground p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
      <div className="flex flex-col min-h-screen items-center justify-center p-4">
        <h1 className="text-text text-center font-title font-bold text-2xl md:text-5xl mt-5">
          ORÇAMENTO PERSONALIZADO
        </h1>
        <Image
          src="/logo.jpg"
          alt="Imagem de orçamento personalizado"
          width={500}
          height={500}
          className="mt-10 w-full max-w-xs md:max-w-md"
        />
      {/*  <Button className="w-full" onClick={() => router.push("/login")}>
          Administracao
        </Button> */}
      </div>
      <div className="rounded-lg overflow-hidden bg-background-form">
        <h1 className="text-text text-xl md:text-2xl text-center p-4 font-bold font-form">
          FORMULARIO PARA ORÇAMENTO PERSONALIZADO
        </h1>
        <div className="flex flex-col gap-4 p-4">
          <div className="bg-background-form p-4 rounded-lg">
            <form onSubmit={handleSubmit}>
              <Field>
                <FieldSet>
                  <FieldGroup className="flex flex-col gap-2">
                    <FieldLabel
                      htmlFor="name"
                      className="block text-text font-medium font-form"
                    >
                      Seu Nome
                    </FieldLabel>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Seu Nome"
                      required
                      className="border-border-custom focus:ring-0 focus:border-custom text-sm md:text-base"
                    />
                  </FieldGroup>

                  <FieldGroup className="flex flex-col gap-2">
                    <Label className="text-text font-medium font-form text-sm md:text-base">
                      Qual serviço deseja orçamento personalizado?
                    </Label>
                    {services.map((service) => (
                      <Field orientation="horizontal" key={service.id}>
                        <Checkbox
                          id={`service-${service.id}`}
                          name="services"
                          value={service.id} // 👈 valor del servicio
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({
                                ...formData,
                                services: [...formData.services, service.id],
                              });
                            } else {
                              setFormData({
                                ...formData,
                                services: formData.services.filter(
                                  (s) => s !== service.nome,
                                ),
                              });
                            }
                          }}
                        />
                        <Label htmlFor={`service-${service.id}`}>
                          {service.nome}
                        </Label>
                      </Field>
                    ))}
                  </FieldGroup>

                  <FieldGroup className="flex flex-col gap-2">
                    <FieldLabel htmlFor="localization">Localização</FieldLabel>
                    <Input
                      id="localization"
                      name="localization"
                      value={formData.localization}
                      onChange={handleChange}
                      placeholder="Descreva o bairro ou localização"
                      required
                    />
                  </FieldGroup>

                  <FieldGroup className="flex flex-col gap-2">
                    <FieldLabel htmlFor="medid">Medidas</FieldLabel>
                    <Textarea
                      id="medid"
                      name="medid"
                      value={formData.medid}
                      onChange={handleChange}
                      placeholder="Medidas, ex: 1,2m largura x 3,0m de altura"
                      required
                    />
                  </FieldGroup>

                  <FieldGroup className="flex flex-col gap-2">
                    <FieldLabel htmlFor="observation">Observações</FieldLabel>
                    <Textarea
                      id="observation"
                      name="observation"
                      value={formData.observation}
                      onChange={handleChange}
                      placeholder="Observações sobre o serviço"
                      required
                    />
                  </FieldGroup>
                </FieldSet>

                <Button
                  type="submit"
                  className="bg-button text-text hover:bg-custom-border/80 focus:ring-0 font-form font-bold w-full"
                >
                  Enviar
                </Button>
              </Field>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}