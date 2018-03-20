var express = require('express');
var app = express();

app.set('views', './');
app.set('view engine', 'ejs');

app.use(express.static('./'));

app.get('/', function(req, res){
  res.render('index');
});

app.listen(8000);
