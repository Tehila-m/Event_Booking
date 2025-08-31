// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import User from "../models/sql/User.js"; // adjust path if needed

// const JWT_SECRET = process.env.JWT_SECRET;

// export default async function authRoutes(app) {
//   // Login route -> returns token
//   app.post("/login", async (request, reply) => {
//     const { email, password } = request.body;

//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//       return reply.code(401).send({ error: "Invalid email or password" });
//     }

//     const isMatch = await bcrypt.compare(password, user.passwordHash);
//     if (!isMatch) {
//       return reply.code(401).send({ error: "Invalid email or password" });
//     }

//     const token = jwt.sign(
//       { id: user.id, email: user.email },
//       JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     return reply.send({ token, user: { id: user.id, email: user.email, name: user.name } });
//   });

