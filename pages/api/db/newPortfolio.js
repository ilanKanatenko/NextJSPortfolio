import dbConnect from "../../../utils/dbConnect";
import Portfolio from "../../../models/Portfolio";
import { withApiAuthRequired, getAccessToken } from "@auth0/nextjs-auth0";

export default async function handler(req, res) {
  try {
    await getAccessToken(req, res);
    await dbConnect();
    const newPortfolio = new Portfolio({ ...req.body });
    console.log(newPortfolio);
    await newPortfolio.save();

    res.status(200).json({ success: "true, data: portfolios" });
  } catch (error) {
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message,
    });
  }

  //   await dbConnect();
  //   try {
  //     /* find all the data in our database */
  //     const portfolios = await Portfolio.find({});

  //     console.log(temp);
  //   res.status(200).json({ success: true, data: portfolios });
  //   } catch (error) {
  //     res.status(400).json({ success: false });
  //   }
}
