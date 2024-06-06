const prisma = require("../prismaClient");
const response = require("../../response.js");
const moment = require("moment/moment");
const { Prisma } = require("@prisma/client");

const now = moment().startOf("day");
const listSettingConcert = async (req, res, next) => {
  try {
    const concerts = await prisma.concert.findMany();

    const futureConcerts = concerts.filter((concert) => {
      // Combine start_date and start_hours into a single datetime string
      const concertDateTime = moment(concert.start_date, "DD-MM-YYYY").startOf("day");

      var check_data = concertDateTime.isSame(now);
      console.log(check_data);
      return concertDateTime.isSameOrAfter(now);
    });

    return response(200, futureConcerts, "Berhasil Mengambil Data", res);
  } catch (error) {
    console.log(error);
    return response(403, error, "Something went wrong", res);
  }
};

const updateLinkYtConcert = async (req, res, next) => {
  const { concertId } = req.params;
  const { link_yt } = req.body;
  try {
    var iframeString = link_yt.replace(/width="[^"]*"/, "").replace(/height="[^"]*"/, "");

    // Add className attribute
    var iframe = iframeString.replace("<iframe", '<iframe className="w-full h-1/2"');

    const updatedConcert = await prisma.concert.update({
      where: {
        id: parseInt(concertId, 10),
      },
      data: {
        link_yt: iframe,
        is_start: true,
      },
    });

    return response(200, updatedConcert, "Berhasil Mengupdate Data", res);
  } catch (error) {
    console.log(error);
    return response(500, error, "Failed to update link_yt", res);
  }
};

module.exports = { listSettingConcert, updateLinkYtConcert };
