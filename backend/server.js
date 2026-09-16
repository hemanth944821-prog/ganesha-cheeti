const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = require('../api/index');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Ganesha Cheeti Backend DB API running on http://localhost:${PORT}`);
});
