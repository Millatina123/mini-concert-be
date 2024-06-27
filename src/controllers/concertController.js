const prisma = require("../prismaClient");
const response = require("../../response.js");
const { convertTimeToDateTime, extractTimeFromDateTime, convertToISODate, convertToDDMMYYYY } = require("../utils/timeHandler");
const { Prisma } = require("@prisma/client");
const generateConcertCode = require("../utils/generateConcertCode");

const listConcerts = async (req, res, next) => {
  try {
    const concerts = await prisma.concert.findMany();

    // Extract time from DateTime

    return response(200, concerts, "Berhasil Mengambil Data", res);
  } catch (error) {
    console.log(error);
    return response(403, error, "Something went wrong", res);
  }
};

const createConcert = async (req, res, next) => {
  const { name, description, logo, start_date, start_hours, price } = req.body;
  const code = generateConcertCode();
  try {
    const concert = await prisma.concert.create({
      data: {
        name,
        description,
        logo,
        start_hours,
        price,
        start_date,
        code,
        is_start: 0,
      },
    });
    return response(200, concert, "Berhasil Menambah Data", res);
  } catch (error) {
    console.log(error);
  }
};

const getConcertByCode = async (req, res, next) => {
  const { code } = req.params;
  try {
    const concert = await prisma.concert.findFirst({
      where: {
        code,
      },
    });
    return response(200, concert, "Berhasil Mengambil Data", res);
  } catch (error) {
    console.log(error);
    return response(403, error, "Something went wrong", res);
  }
};

module.exports = { listConcerts, createConcert, getConcertByCode };
