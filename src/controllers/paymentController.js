const prisma = require("../prismaClient");
const response = require("../../response.js");
const { Prisma } = require("@prisma/client");
const moment = require("moment/moment");
const generateTransactionCode = require("../utils/generateTransactioCode");

const now = moment();
const listConcerts = async (req, res, next) => {
  console.log(req.user.userId);
  try {
    const concerts = await prisma.concert.findMany({
      where: {
        is_start: {
          equals: 0,
        },
      },
      include: {
        payments: {
          where: {
            userId: req.user.userId,
          },
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

const createPayment = async (req, res, next) => {
  const { concertId, evidence } = req.body;
  const transactionCode = generateTransactionCode();
  try {
    const concert = await prisma.payment.create({
      data: {
        concertId,
        userId: req.user.userId,
        transaction_code: transactionCode,
        evidence,
      },
    });
    return response(200, concert, "Berhasil Menambah Data", res);
  } catch (error) {
    console.log(error);
  }
};

const listVerifyPayment = async (req, res, next) => {
  try {
    const payments = await prisma.payment.findMany({
      where: {
        verified: false,
      },
      include: {
        user: true,
        concert: true,
      },
    });

    return response(200, payments, "Berhasil Mengambil Data", res);
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

const historyPayment = async (req, res, next) => {
  try {
    const payments = await prisma.payment.findMany({
      where: {
        verified: true,
      },
      include: {
        user: true,
        concert: true,
      },
    });

    return response(200, payments, "Berhasil Mengambil Data", res);
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

const updatePaymentStatus = async (req, res, next) => {
  const { paymentId } = req.params;

  try {
    const updatedPayment = await prisma.payment.update({
      where: {
        id: parseInt(paymentId, 10),
      },
      data: {
        verified: true,
        verifiedAt: new Date(),
      },
    });

    return response(200, updatedPayment, "Payment status updated successfully", res);
  } catch (error) {
    console.log(error);
    return response(500, error, "Failed to update payment status", res);
  }
};

const listTicketCustomer = async (req, res, next) => {
  try {
    const concerts = await prisma.concert.findMany({
      where: {
        is_start: {
          not: 2,
        },
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

const convertToDDMMYYYY = (dateString) => {
  return moment(dateString).format("DD-MM-YYYY");
};

const extractTimeFromDateTime = (dateTimeString) => {
  return moment.utc(dateTimeString, "YYYY-MM-DD HH:mm:ss.SSS").format("HH:mm:ss");
};
module.exports = { listConcerts, createPayment, listVerifyPayment, updatePaymentStatus, listTicketCustomer, historyPayment };
