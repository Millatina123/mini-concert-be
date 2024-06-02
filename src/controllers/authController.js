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
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return response(403, [], "Email Sudah Terdaftar", res);
    }
    const user = await prisma.user.create({
      data: {
        email,
        name,
        phone_number: phone_number.toString(),
        password: hashedPassword,
      },
    });

    const findUser = await prisma.user.findUnique({
      where: { email },
    });

    const token = jwt.sign({ userId: findUser.id, role: findUser.role }, SECRET_KEY);

    return response(200, { token, user: findUser }, "Berhasil Mendaftar", res);
  } catch (error) {
    return response(403, error, "Something went wrong", res);
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

  const token = jwt.sign({ userId: user.id, role: user.role }, SECRET_KEY);

  return response(200, { token, user }, "Berhasil Login", res);
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return response(401, null, "Token is required", res);
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    console.log(decoded);
    if (err) {
      return response(401, null, "Invalid token", res);
    }

    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  });
};

module.exports = { register, login, verifyToken };
