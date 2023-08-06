// pages/api/model.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { prompt } = req.body;
    try {
      const response = await fetch("http://localhost:5000/model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      console.log("response", response);
      // Read the response as text
      const text = await response.text();
      console.log("text", text);
      // const data = await response.json();
      // Split the text into lines and parse each line as JSON
      const textIntoArr = text
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((line) => JSON.parse(line));

      const choiceTexts = textIntoArr.map((obj) => obj.choices[0].text);

      console.log("choiceTexts", choiceTexts);

      const data = choiceTexts.join("");
      console.log("data", data);

      console.log("data", data);
      res.status(200).json(data);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: `Error calling model: ${error.message}` });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
