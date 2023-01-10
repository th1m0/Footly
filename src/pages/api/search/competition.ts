// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { LeagueResponse } from "footballApi";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import footballApi from "../../../lib/footballApi/FootballApi";
import { authOptions } from "../auth/[...nextauth]";

type Data = {
  success: boolean;
  data?: LeagueResponse | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (req.method != "POST" || !session)
    return res.status(404).json({ success: false });

  const data = await footballApi.leagueManager.get({ search: "ere" });

  res.status(200).json({
    success: true,
    data,
  });
}
