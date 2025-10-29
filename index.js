const PDFDocument = require("pdfkit");
const fs = require("fs");

function gerarContrato(dados) {
  const doc = new PDFDocument({ margin: 50 });
  const nomeArquivo = `Contrato_${dados.contratante.nome.replace(/\s+/g, "_")}.pdf`;
  doc.pipe(fs.createWriteStream(nomeArquivo));

  // ====== CABEÇALHO ======
  doc
    .fontSize(18)
    .text("CONTRATO DE PRESTAÇÃO DE ASSESSORIA MICROSERVIÇO", {
      align: "center",
      underline: true,
    })
    .moveDown(2);

  // ====== DADOS DAS PARTES ======
  doc.fontSize(12).text(`CONTRATANTE: ${dados.contratante.nome}, CNPJ: ${dados.contratante.cnpj}, com sede em ${dados.contratante.endereco}.`);
  doc.moveDown(1);
  doc.text(`CONTRATADA: ${dados.contratada.nome}, CNPJ: ${dados.contratada.cnpj}, com sede em ${dados.contratada.endereco}.`);
  doc.moveDown(2);

  // ====== CLÁUSULAS ======
  doc.font("Helvetica-Bold").text("CLÁUSULA PRIMEIRA – OBJETO DO CONTRATO");
  doc.font("Helvetica").text(`A CONTRATADA se compromete a ${dados.objeto}.`);
  doc.moveDown(1);

  doc.font("Helvetica-Bold").text("CLÁUSULA SEGUNDA – PRAZO E CRONOGRAMA");
  doc.font("Helvetica").text(`Prazo de execução: ${dados.prazo}.`);
  doc.moveDown(1);

  doc.font("Helvetica-Bold").text("CLÁUSULA TERCEIRA – REMUNERAÇÃO");
  doc.font("Helvetica").text(`Valor total: R$ ${dados.valor}. Pagamento via PIX: ${dados.chavePix}.`);
  doc.moveDown(1);

  doc.font("Helvetica-Bold").text("CLÁUSULA QUARTA – OBRIGAÇÕES DA CONTRATADA");
  doc.font("Helvetica").text("• Desenvolver o microserviço conforme especificações acordadas.\n• Garantir a integridade e a confidencialidade das informações.\n• Finalizar a entrega dos documentos.");
  doc.moveDown(1);

  doc.font("Helvetica-Bold").text("CLÁUSULA QUINTA – OBRIGAÇÕES DA CONTRATANTE");
  doc.font("Helvetica").text("• Fornecer todas as informações necessárias.\n• Efetuar os pagamentos nas condições estabelecidas.");
  doc.moveDown(1);

  doc.font("Helvetica-Bold").text("CLÁUSULA SEXTA – CONFIDENCIALIDADE");
  doc.font("Helvetica").text("Ambas as partes comprometem-se a manter sigilo sobre todas as informações trocadas durante e após a vigência deste contrato.");
  doc.moveDown(1);

  doc.font("Helvetica-Bold").text("CLÁUSULA SÉTIMA – RESCISÃO");
  doc.font("Helvetica").text("O contrato poderá ser rescindido em caso de descumprimento de cláusula ou por notificação antecipada.");
  doc.moveDown(1);

  doc.font("Helvetica-Bold").text("CLÁUSULA OITAVA – DISPOSIÇÕES GERAIS");
  doc.font("Helvetica").text(`Fica eleito o foro da comarca de ${dados.cidadeForo}, para dirimir quaisquer controvérsias oriundas deste contrato.`);
  doc.moveDown(3);

  // ====== ASSINATURAS ======
  doc.text(`${dados.cidadeForo}, ${dados.data}.`, { align: "center" });
  doc.moveDown(4);
  doc.text("________________________________", 100, doc.y, { align: "left" });
  doc.text("________________________________", -100, doc.y, { align: "right" });
  doc.text("CONTRATANTE", 100, doc.y, { align: "left" });
  doc.text("CONTRATADA", -100, doc.y, { align: "right" });

  doc.end();
  console.log(`✅ Contrato gerado: ${nomeArquivo}`);
}

// ====== EXEMPLO DE USO ======
const dadosExemplo = {
  contratante: {
    nome: "Empresa XPTO Ltda",
    cnpj: "12.345.678/0001-99",
    endereco: "Rua das Flores, 123 - João Pessoa/PB",
  },
  contratada: {
    nome: "Assessoria Tech Solutions",
    cnpj: "98.765.432/0001-11",
    endereco: "Av. Central, 456 - Recife/PE",
  },
  objeto: "desenvolver e manter o microserviço AFE INICIAL DISTRIBUIDOR ANVISA para a contratante.",
  prazo: "até a entrega dos documentos e aprovação junto à ANVISA.",
  valor: "2.500,00",
  chavePix: "83993711271 (Banco do Brasil)",
  cidadeForo: "João Pessoa/PB",
  data: "28 de outubro de 2025",
};

gerarContrato(dadosExemplo);
