import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

const cors = Cors({
  methods: ["GET", "POST"],
  origin: "*",
});

type Middleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (result: any) => void
) => void;

const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Middleware
) => {
  return new Promise<void>((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

type Data = {
  success: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await runMiddleware(req, res, cors);

  console.log("Received data:", req.body);

  res.status(200).json({ success: "Success" });
}

/*
console.log(recentlyAdded);
      const dateAddedFirstBookmark = recentlyAdded[0];
      const dateConversionFirstBookMark = new Date(
        dateAddedFirstBookmark.dateAdded
      );

      const dateFirstBookMarkUSFormat =
        dateConversionFirstBookMark.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        });
      console.log("First Bookmark was added on: ", dateFirstBookMarkUSFormat);


*/
