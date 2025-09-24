const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Sample data
const students = [
  { id: 1, name: "LAVANYA", age: 20, grade: "A" },
  { id: 2, name: "PURUSHOTHAM", age: 22, grade: "B" },
  { id: 3, name: "GREESHMA", age: 21, grade: "A" },
  { id: 4, name: "SATHWIK", age: 23, grade: "C" },
  { id: 5, name: "SASI", age: 20, grade: "B" },
  { id: 6, name: "ADITYA", age: 22, grade: "C" },
  { id: 7, name: "KAVYA", age: 21, grade: "A" },
  { id: 8, name: "Hannah", age: 23, grade: "B" },
  { id: 9, name: "Ian", age: 20, grade: "A" },
  { id: 10, name: "Jane", age: 22, grade: "C" },
];

// GET /students?search=&page=&limit=&sortBy=&order=
app.get("/students", (req, res) => {
  let { search, page, limit, sortBy, order } = req.query;

  // Filtering
  let filtered = students;
  if (search) {
    filtered = filtered.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  }
// Sorting
  if (sortBy) {
    filtered.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return order === "desc" ? 1 : -1;
      if (a[sortBy] > b[sortBy]) return order === "desc" ? -1 : 1;
      return 0;
    });
  }

  // Pagination
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;
  const startIndex = (page - 1) * limit;
  const paginated = filtered.slice(startIndex, startIndex + limit);

  res.json({
    total: filtered.length,
    page,
    limit,
    data: paginated
  });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
