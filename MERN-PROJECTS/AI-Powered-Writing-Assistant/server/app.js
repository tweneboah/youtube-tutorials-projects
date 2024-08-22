const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const analyzeRoutes = require('./routes/analyze');

app.use('/api/analyze', analyzeRoutes);
const spellCheckRoutes = require('./routes/spellcheck');

app.use('/api/spellcheck', spellCheckRoutes);
const grammarCheckRoutes = require('./routes/grammarcheck');

app.use('/api/grammarcheck', grammarCheckRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
