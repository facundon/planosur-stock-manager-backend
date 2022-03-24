declare module "pdfkit-table" {
   export interface TableHeaderProps {
      label: string
      property: string
      width: number
      align?: string
      valign?: string
      headerColor?: string
      headerOpacity?: number
      headerAlign?: string
      columnColor?: string
      columnOpacity?: number
      renderer: (
         value: string,
         indexColumn: number,
         indexRow: number,
         row: number,
         rectRow: Rect,
         rectCell: Rect
      ) => string | null
   }
   export interface TableData {
      headers: string[] | TableHeaderProps[]
      rows: string[][]
      datas?: Record<string, string>[]
      title?: string
      subtitle?: string
   }

   interface TableDividerOptions {
      disabled: boolean
      width: number
      opacity: number
   }

   interface Rect {
      x: number
      y: number
      width: number
      height: number
   }
   export interface TableOptions {
      title?: string
      subtitle?: string
      width?: number
      x?: number
      y?: number
      divider?: {
         header: TableDividerOptions
         horizontal: TableDividerOptions
      }
      padding?: number
      columnSpacing?: number
      prepareHeader?: () => void
      prepareRow?: (
         row: string,
         indexColumn: number,
         indexRow: number,
         rectRow: Rect,
         rectCell: Rect
      ) => void
   }

   import PDFKit from "pdfkit"
   class PDFDocument extends PDFKit {
      addBackground(
         { x, y, width, height }: Rect,
         fillColor: string,
         fillOpacity: number,
         callback?: () => void
      ): void

      async table(data: TableData, options?: TableOptions): Promise<void>
   }

   export = PDFDocument
}
