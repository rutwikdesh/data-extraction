# About the Repo

An Express.js route that integrates data from three different API endpoints,
extracts specific key values from their responses, writes these values into a CSV file, and
returns the path to the generated CSV file.

## Steps to Run the Project

1. Clone the GitHub repository by executing `git clone https://github.com/rutwikdesh/data-extraction.git` in your terminal.
2. After cloning the repo, navigate to the project directory using any code editor like VSCode.
3. Run `npm install` to install dependencies.
4. Start the server: `npm run start`.
5. Access the /generate-csv route by visiting http://localhost:3000/generate-csv in your browser or using a tool like Postman.
6. Check the response for the path to the generated CSV file. It would be named **combinedData.csv**
