"use client";
import { supabase } from "@/lib/supabaseClients";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Instagram, Phone } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Orcamento {
  id: number;
  name: string;
  services: string;
  localization: string;
  medid: string;
  observation: string;
  total: string;
  number: string;
  created_at: string;
}

interface OrcamentoServico {
  id: string;
  orcamento_id: string;
  servico_id: string;
  servicos: { nome: string }; // 👈 array
}

export default function OrcamentoPage() {
  const { id } = useParams();
  const [orcamentoData, setOrcamentoData] = useState<Orcamento | null>(null);
  const [orcamentoServices, setOrcamentoServices] = useState<
    OrcamentoServico[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("ocamento")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        setOrcamentoData(data);

        // Traer serviços asociados usando el id del data recién recibido
        const { data: servicosData, error: servicosError } = await supabase
          .from("orcamento_servicos")
          .select(
            `
          id,
          orcamento_id,
          servico_id,
          servicos (nome)
        `,
          ) // 👈 join con la tabla servicos
          .eq("orcamento_id", data.id);
        if (!servicosError && servicosData) {
          setOrcamentoServices(servicosData as unknown as OrcamentoServico[]);
          console.log(servicosData);
        } else {
          console.log(servicosError);
        }
      }
    };
    if (id) fetchData();
  }, [id, orcamentoServices]);

  useEffect(() => {
    if (orcamentoServices.length > 0 && orcamentoData) {
      const generatePDF = async () => {
        const element = document.getElementById("orcamento-layout");
        if (!element) return;

        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
        pdf.save(`orcamento-${orcamentoData.id}.pdf`);
      };

      generatePDF();
    }
  }, [orcamentoData, orcamentoServices]); // 👈 escucha ambos

  return (
    <div
      id="orcamento-layout"
      style={{
        width: "794px", // A4 ~ 794px
        height: "1123px", // A4 ~ 1123px
        backgroundColor: "#fdfbf4",
        color: "#333333",
        padding: "24px",
        boxSizing: "border-box",
        margin: "0 auto", // centrar sin cortar fondo
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          borderBottom: "1px solid #ccc",
          paddingBottom: "16px",
        }}
      >
        <div style={{ position: "relative" }}>
          <img
            src="/logo.jpg"
            alt="Logo"
            width={300}
            height={300}
            style={{ marginTop: "-19px" }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            right: "250px",
            top: "99px",
            fontSize: "14px",
            padding: "16px",
            borderRadius: "8px",
            backgroundColor: "#44463e",
            color: "#f1ecec",
          }}
        >
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
          >
            <p>@charmedecor</p>
            <Instagram className="w-5 h-5" />
          </div>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
          >
            <p>(61) 98525-7346</p>
            <Phone className="w-5 h-5" />
          </div>
        </div>
      </header>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "16px",
          marginBottom: "16px",
          fontWeight: "600",
        }}
      >
        <p>Orçamento: {orcamentoData?.number}</p>

        <p style={{ textAlign: "left" }}>
          Data:{" "}
          {orcamentoData?.created_at
            ? new Date(orcamentoData.created_at).toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""}
        </p>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "16px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column", // 👈 apila verticalmente
          gap: "8px", // 👈 espacio entre elementos
          marginBottom: "20px",
        }}
      >
        <p
          style={{
            fontWeight: "500",
            backgroundColor: "#44463e",
            color: "#fff",
            padding: "8px",
            borderRadius: "4px",
          }}
        >
          CLIENTE
        </p>

        <p className="text-primary font-bold">Nome: {orcamentoData?.name}</p>
      </div>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "16px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column", // 👈 apila verticalmente
          gap: "8px", // 👈 espacio entre elementos
          marginBottom: "20px",
        }}
      >
        <p
          style={{
            fontWeight: "500",
            backgroundColor: "#44463e",
            color: "#fff",
            padding: "8px",
            borderRadius: "4px",
          }}
        >
          ENDEREÇO
        </p>

        <p className="text-primary font-bold">{orcamentoData?.localization}</p>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: "30px",
        }}
      >
        <h3
          style={{
            fontWeight: "500",
            backgroundColor: "#44463e",
            color: "#fff",
            padding: "8px",
            borderRadius: "4px",
          }}
        >
          ITENS
        </h3>
        <ul style={{ listStyle: "disc", paddingLeft: "20px" }}>
          {orcamentoServices.map((item) => (
            <li key={item.id} className="text-primary text-font">
              {item.servicos.nome}
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: "30px",
        }}
      >
        <h3
          style={{
            fontWeight: "500",
            backgroundColor: "#44463e",
            color: "#fff",
            padding: "8px",
            borderRadius: "4px",
          }}
        >
          Observações
        </h3>
        <p className="text-primary font-bold">{orcamentoData?.observation}</p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #ccc",
          paddingTop: "16px",
          marginBottom: "30px",
        }}
      >
        <span style={{ fontWeight: "600" }}>Total</span>
        <span style={{ fontSize: "18px", fontWeight: "bold" }}>
          R$ {orcamentoData?.total}
        </span>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "16px",
          borderRadius: "8px",
          backgroundColor: "#f9fafb",
          color: "#333333",
        }}
      >
        <h3 style={{ fontWeight: "500", marginBottom: "8px" }}>
          Formas de pagamento:
        </h3>
        <ul
          style={{ listStyle: "disc", paddingLeft: "20px", fontSize: "14px" }}
        >
          <li>4x sem juros no cartão de crédito ou à vista via Pix</li>
          <li>Orçamento válido por 15 dias</li>
        </ul>
      </div>
    </div>
  );
}
