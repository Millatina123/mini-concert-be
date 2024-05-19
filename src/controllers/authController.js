const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../prismaClient");
const response = require("../../response.js");

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

const register = async (req, res, next) => {
  const { email, password, name, phone_number } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        phone_number,
        password: hashedPassword,
      },
    });
    return response(200, user, "Berhasil Mendaftar", res);
  } catch (error) {
    return response(403, email, "Something went wrong", res);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
    return response(401, email, "Invalid Username and Password", res);
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

  return response(200, { token, user }, "Berhasil Login", res);
};

module.exports = { register, login };
