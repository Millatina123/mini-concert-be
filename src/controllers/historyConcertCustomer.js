const prisma = require("../prismaClient");
const response = require("../../response.js");
const { Prisma } = require("@prisma/client");
const moment = require("moment/moment");
const historyTicketCustomer = async (req, res, next) => {
  try {
    const concerts = await prisma.concert.findMany({
      where: {
        is_start: 2,
        payments: {
          some: {
            userId: req.user.userId,
            verified: true, // Filter payments by the current user
          },
        },
      },

      include: {
        payments: {
          where: {
            userId: req.user.userId,
            verified: true, // Filter payments by the current user
          },
          take: 1,
        },
      },
    });

    const concertsWithPaymentFlag = concerts.map((concert) => {
      const hasPayment = concert.payments.length > 0;
      return {
        ...concert,
        hasPayment: hasPayment,
      };
    });

    return response(200, concertsWithPaymentFlag, "Berhasil Mengambil Data", res);
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
const updateReviewRating = async (req, res, next) => {
  const { paymentId } = req.params;
  const { rating, review } = req.body;
  try {
    const updatedPayment = await prisma.payment.update({
      where: {
        id: parseInt(paymentId, 10),
      },
      data: {
        rating,
        review,
      },
    });

    return response(200, updatedPayment , "Berhasil Mengupdate Data", res);
  } catch (error) {
    console.log(error);
    return response(500, error, "Failed to update link_yt", res);
  }
};

module.exports = { historyTicketCustomer, updateReviewRating };
