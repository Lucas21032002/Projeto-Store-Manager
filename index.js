require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Productsrouters = require('./routes/productsRoutes');
const Salesrouters = require('./routes/salesRoutes');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// rota dos produtos // 
app.use('/products', Productsrouters);

// rota de sales //
app.use('/sales', Salesrouters);

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});