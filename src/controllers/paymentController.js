const prisma = require("../prismaClient");
const response = require("../../response.js");
const { Prisma } = require("@prisma/client");
const moment = require("moment/moment");

const listConcerts = async (req, res, next) => {
  try {
    const concerts = await prisma.concert.findMany({
      where: {
        AND: [
          {
            start_date: {
              gt: new Date().toISOString().slice(0, 10), // Current date in YYYY-MM-DD format
            },
          },
          {
            OR: [
              {
                start_date: {
                  gt: new Date().toISOString().slice(0, 10), // Current date in YYYY-MM-DD format
                },
              },
              {
                AND: [
                  {
                    start_date: {
                      equals: new Date().toISOString().slice(0, 10), // Current date in YYYY-MM-DD format
                    },
                  },
                  {
                    start_hours: {
                      gt: new Date().toISOString().slice(11, 19), // Current time in HH:MM:SS format
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    });

    return response(200, concerts, "Berhasil Mengambil Data", res);
  } catch (error) {
    let statusCode = 500;
    let message = "Something went wrong";
    console.log(error);
    if (error.code) {
      switch (error.code) {
        case "P2002":
          statusCode = 409;
          message = "Duplicate entry error";
          break;
        case "P2025":
          statusCode = 404;
          message = "Record not found";
          break;
        case "P2003":
          statusCode = 400;
          message = "Foreign key constraint failed";
          break;
        // Add more cases as needed
        default:
          statusCode = 500;
          message = "Database error";
      }
    }

    return response(statusCode, error, message, res);
  }
};

const createPayment = async (req, res, next) => {
  const { concertId } = req.body;

  try {
    const concert = await prisma.payment.create({
      data: {
        concertId,
        userId: req.userId,
      },
    });
    return response(200, concert, "Berhasil Menambah Data", res);
  } catch (error) {
    console.log(error);
  }
};

const convertToDDMMYYYY = (dateString) => {
  return moment(dateString).format("DD-MM-YYYY");
};

const extractTimeFromDateTime = (dateTimeString) => {
  return moment.utc(dateTimeString, "YYYY-MM-DD HH:mm:ss.SSS").format("HH:mm:ss");
};
module.exports = { listConcerts };
