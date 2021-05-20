import axios from "axios";

export default async (req, res) => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${req.query.id}`
    );
    const post = response.data;
    res.status(200).json(post);
  } catch (e) {
    console.error(e);
    res
      .status(e.status || 400)
      .json({ message: "Api Error in getPost by id!" });
  }
};
