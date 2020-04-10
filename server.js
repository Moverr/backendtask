const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
  

app.get('/', (req, res) => {
  res.send('Hello World');
});
 
const PORT = process.env.PORT || 3300;
app.listen(PORT, () => console.log(`Backend is running on port :${PORT}`));
 


