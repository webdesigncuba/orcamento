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
import { useState } from "react";
import { toast } from "sonner";

export default function FormLogo() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    services: "",
    localization: "",
    medid: "",
    observation: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("ocamento") // nombre de tu tabla en Supabase
      .insert([formData]); // aquí insertamos todo el objeto
    if (error) {
      console.error("Error al guardar:", error.message);
      toast.error("Erro a o guardar os dados");
    } else {
      toast.success("Solicitud enviada com sucesso");
      // limpiar formulario
      setFormData({
        name: "",
        services: "",
        localization: "",
        medid: "",
        observation: "",
      });
    }
  };

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
        <Button className="w-full" onClick={() => router.push('/login')}>Administracao</Button>
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
                    <RadioGroup
                      value={formData.services}
                      onValueChange={(val) =>
                        setFormData({ ...formData, services: val })
                      }
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem
                          value="Cortinas"
                          id="option-one"
                          className="border-border-custom"
                        />
                        <Label htmlFor="option-one">Cortinas</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem
                          value="Percianas"
                          id="option-two"
                          className="border-border-custom"
                        />
                        <Label htmlFor="option-two">Percianas</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem
                          value="Papeis de Paredes"
                          id="option-three"
                          className="border-border-custom"
                        />
                        <Label htmlFor="option-three">Papeis de Paredes</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem
                          value="Toldos"
                          id="option-four"
                          className="border-border-custom"
                        />
                        <Label htmlFor="option-four">Toldos</Label>
                      </div>
                    </RadioGroup>
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
