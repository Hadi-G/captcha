const express  = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

const port = (process.env.PORT || 8080);
app.listen(port, () => {
  console.log('ok ecoute sur port 8080');
});
