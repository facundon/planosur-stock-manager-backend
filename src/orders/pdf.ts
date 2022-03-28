import { createWriteStream } from "fs"
import PDFDocument = require("pdfkit-table")

type ProductInOrder = {
   product: {
      name: string
      code: string
   }
   blankQty: number
   unregisteredQty: number
}

export function generatePdf(productsInOrder: ProductInOrder[], orderId: number): string {
   const doc = new PDFDocument({
      layout: "portrait",
      margin: 30,
      size: "A4",
   })
   const fileName = `orden-${orderId}`

   doc.pipe(createWriteStream(`public/${fileName}.pdf`))

   const tableArray = {
      headers: ["Producto", "Cuenta 1", "Cuenta 2"],
      rows: productsInOrder.map(productInOrder => [
         `${productInOrder.product.code} ${productInOrder.product.name}`,
         productInOrder.blankQty.toString(),
         productInOrder.unregisteredQty.toString(),
      ]),
   }

   doc.text(`Orden N° ${orderId}`, {
      align: "left",
      continued: true,
      baseline: "middle",
      lineGap: 10,
   })
   doc.text(
      new Date().toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" }),
      { align: "right", lineGap: 10, baseline: "middle" }
   )
   doc.rect(20, 40, 555, 2)

   doc.table(tableArray, {
      padding: 5,
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(12),
      prepareRow: (row, indexColumn, indexRow, rectRow) => {
         doc.font("Helvetica").fontSize(10)
         indexColumn === 0 && doc.addBackground(rectRow, indexRow % 2 ? "white" : "yellow", 0.15)
      },
   })

   doc.end()

   //TODO: Upload to S3 or somewhere
   return `${process.env.HOST}/${fileName}`
}
