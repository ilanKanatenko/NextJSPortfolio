import dbConnect from "../../../utils/dbConnect";
import Portfolio from "../../../models/Portfolio";

export default async function handler(req, res) {
  await dbConnect();
  try {
    /* find all the data in our database */
    const portfolios = await Portfolio.find({});

    console.log(temp);
    res.status(200).json({ success: true, data: portfolios });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
