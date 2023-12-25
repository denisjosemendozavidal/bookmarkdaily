import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

type BookmarkDataFromExtension = {
  dateAdded: number;
  dateLastUsed: number;
  id: string;
  index: number;
  parentId: string;
  title: string;
  url: string;
};

const cors = Cors({
  methods: ["GET", "POST"],
  origin: "*",
});

type Middleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (result: Error | null) => void
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

const sendingDataToBackEnd = async (data: BookmarkDataFromExtension[]) => {
  const formattedData = data.map((bookmark) => {
    const dateAdded = new Date(bookmark.dateAdded).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    const dateLastUsed = new Date(bookmark.dateLastUsed).toLocaleDateString(
      "en-US",
      {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }
    );

    return {
      ...bookmark,
      dateAdded,
      dateLastUsed,
    };
  });

  console.log("Formatted Data to send to backend:", formattedData);
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

  await sendingDataToBackEnd(req.body as BookmarkDataFromExtension[]);

  res.status(200).json({ success: "Success" });
}
