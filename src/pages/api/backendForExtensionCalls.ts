import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

const cors = Cors({
  methods: ["GET", "POST"],
  origin: "*",
});

// Define a type for the middleware function
type Middleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (result: any) => void
) => void;

// Helper method to wait for a middleware to execute before continuing
// And to throw an error if anything goes wrong
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
  // Run the middleware
  await runMiddleware(req, res, cors);

  // Rest of your API logic
  res.status(200).json({ success: "Success" });
}
