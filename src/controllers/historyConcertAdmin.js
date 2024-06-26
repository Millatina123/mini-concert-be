const prisma = require("../prismaClient");
const response = require("../../response.js");
const { Prisma } = require("@prisma/client");
const moment = require("moment/moment");
const historyConcertAdmin = async (req, res, next) => {
  try {
    const concerts = await prisma.concert.findMany({
      where: {
        is_start: 2,
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

const detailConcert = async (req, res, next) => {
  try {
    const concertId = parseInt(req.params.id, 10);

    const concert = await prisma.concert.findUnique({
      where: {
        id: concertId,
      },
      include: {
        payments: {
          where: {
            verified: true, // Only include verified payments
          },
        },
      },
    });

    if (!concert) {
      return response(404, null, "Concert not found", res);
    }

    // Aggregations
    const totalPayments = await prisma.payment.count({
      where: {
        concertId: concertId,
        verified: true,
      },
    });

    const averageRating = await prisma.payment.aggregate({
      _avg: {
        rating: true,
      },
      where: {
        concertId: concertId,
        verified: true,
        NOT: {
          rating: null,
        },
      },
    });

    const totalRevenue = concert.price * totalPayments;

    const result = {
      concert,
      totalPayments,
      totalRevenue, // Calculated as price * totalPayments
      averageRating: averageRating._avg.rating || 0, // Handle case where there are no ratings
    };

    return response(200, result, "Successfully retrieved concert data", res);
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

module.exports = { historyConcertAdmin, detailConcert };
