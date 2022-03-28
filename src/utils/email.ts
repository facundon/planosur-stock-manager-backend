import { Product } from ".prisma/client"
import { createTransport } from "nodemailer"

const checkEnvs = () => {
   if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS ||
      !process.env.SMTP_TO ||
      !process.env.SMTP_FROM
   )
      throw Error("Must define SMTP_HOST/USER/PASS/TO/FROM envs")
}

export const sendEmail = async (message: string, subject: string) => {
   checkEnvs()

   const transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
         user: process.env.SMTP_USER,
         pass: process.env.SMTP_PASS,
      },
   })

   await transporter.sendMail({
      from: `"Planosur Stock" <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_TO,
      subject,
      html: message,
   })
}

export function getBaseMessage(
   products: (Product & {
      provider: {
         name: string
      }
      category: {
         name: string
      }
   })[]
) {
   return `<h4>Los siguientes productos se encuentran por debajo del stock mínimo:</h4><br />
   <ul>${products
      .map(
         product =>
            `<li>${product.code} - ${product.name}: <span style="color: cyan;">Cp.</span>: <strong>${product.blankStock}</strong> ---- <span style="color: darkslateblue;">Pv.</span>: <strong>${product.unregisteredStock}</strong></li>`
      )
      .toString()}</ul>
   `
}
