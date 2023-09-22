// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectMongo from "../../src/app/database/connection";

export default function handle(req, res) {
  connectMongo();
  res.status(200).json({ name: "John Doe" });
}
