const prisma = require("../prismaClient");
const response = require("../../response.js");
const moment = require("moment/moment");
const { Prisma } = require("@prisma/client");

const now = moment();
const listSettingConcert = async (req, res, next) => {
  try {
    const concerts = await prisma.concert.findMany();

    const futureConcerts = concerts.filter((concert) => {
      // Combine start_date and start_hours into a single datetime string
      const concertDateTime = moment(`${concert.start_date}`, "DD-MM-YYYY");
      console.log(now);
      // Check if the concert starts in the future
      return concertDateTime.isSameOrAfter(now);
    });

    return response(200, futureConcerts, "Berhasil Mengambil Data", res);
  } catch (error) {
    console.log(error);
    return response(403, error, "Something went wrong", res);
  }
};

module.exports = { listSettingConcert };
