const prisma = require("../prismaClient");
const response = require("../../response.js");
const { convertTimeToDateTime, extractTimeFromDateTime, convertToISODate, convertToDDMMYYYY } = require("../utils/timeHandler");
const { Prisma } = require("@prisma/client");

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

  try {
    const concert = await prisma.concert.create({
      data: {
        name,
        description,
        logo,
        start_hours,
        price,
        start_date,
      },
    });
    return response(200, concert, "Berhasil Menambah Data", res);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { listConcerts, createConcert };
