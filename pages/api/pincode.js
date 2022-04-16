// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  let pincodes = {
    "410206": ["Panvel", "Maharashtra"],
    "410207": ["Kharagpur", "West Bengal"]
  }
    res.status(200).json(pincodes)
  }
  