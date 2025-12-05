import { PDFDocument } from "pdf-lib";

export async function compressPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);

  const compressed = await pdfDoc.save({
    useObjectStreams: true
  });

  return compressed;
}
