import dbConnect from "../../../utils/dbConnect";
import Portfolio from "../../../models/Portfolio";
import { withApiAuthRequired, getAccessToken } from "@auth0/nextjs-auth0";

export default async function handler(req, res) {
  try {
    await getAccessToken(req, res);
    await dbConnect();
    const query = Portfolio.findByIdAndDelete(req.body._id);
    query.exec();
    res.status(200).json({ success: "true, data: portfolios" });
  } catch (error) {
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message,
    });
  }
}
