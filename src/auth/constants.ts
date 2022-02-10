if (!process.env.SECRET) throw Error("Must declare SECRET env")

export const jwtConstants = {
   secret: process.env.SECRET,
}
