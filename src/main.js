const { PORT } = require('./config/config.default.js');

const app = require('./app/index.js');

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
