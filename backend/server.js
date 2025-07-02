const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

mongoose.connect('mongodb://localhost:27017/loginDemo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB csatlakozva'))
  .catch(err => console.error('MongoDB hiba:', err));

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});
const User = mongoose.model('User', userSchema);

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.status(401).json({ message: 'Hibás felhasználó' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Hibás jelszó' });

  res.json({ message: 'Sikeres belépés', user: { username } });
});

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const exists = await User.findOne({ username });
  if (exists) return res.status(400).json({ message: 'Felhasználó már létezik' });

  const hash = await bcrypt.hash(password, 10);
  await User.create({ username, password: hash });
  res.json({ message: 'Sikeres regisztráció' });
});

app.listen(PORT, () => console.log(`Szerver fut: http://localhost:${PORT}`));
