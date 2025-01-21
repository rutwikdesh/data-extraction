// IMPORTS
import express from "express";
import cors from "cors";
import morgan from "morgan";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import { createObjectCsvWriter } from "csv-writer";

// INIT EXPRESS
const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// API ROUTES
app.get("/generate-csv", async (req, res) => {
  try {
    const apisToIntegrate = [
      "https://jsonplaceholder.typicode.com/users",
      "https://jsonplaceholder.typicode.com/posts",
      "https://jsonplaceholder.typicode.com/comments",
    ];

    const [usersData, postsData, commentsData] = await Promise.all(
      apisToIntegrate.map((url) => axios.get(url))
    );

    const users = usersData.data,
      posts = postsData.data,
      comments = commentsData.data;

    const maxLength = Math.max(users.length, posts.length, comments.length);

    const combinedData = [];

    for (let i = 1; i <= maxLength; i++) {
      const user = users.find((item) => item.id === i);
      const post = posts.find((item) => item.id === i);
      const comment = comments.find((item) => item.id === i);

      combinedData.push({
        name: user?.name ?? "",
        title: post?.title ?? "",
        body: comment?.body ?? "",
      });
    }

    const csvFilePath = path.join(__dirname, "combinedData.csv");

    const writeToCSV = createObjectCsvWriter({
      path: csvFilePath,
      header: [
        { id: "name", title: "Name" },
        { id: "title", title: "Title" },
        { id: "body", title: "Body" },
      ],
    });

    await writeToCSV.writeRecords(combinedData);

    res.status(200).json({
      message: `Request Successful!`,
      filePath: csvFilePath,
    });
  } catch (error) {
    console.error("Error generating CSV: ", error.message);
    res.status(500).json({
      message: "Failed to generate CSV file.",
      error: error.message,
    });
  }
});

// LISTEN FOR CONNECTIONS
app.listen(PORT, () => {
  console.log(
    `Listening on PORT ${PORT} 🚀. You can access it here: http://localhost:${PORT}`
  );
});
