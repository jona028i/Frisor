// load the things we need
const express    = require('express');
const app        = express();
const path       = require('path');
const session    = require('express-session');
const bodyParser = require('body-parser');

require("./config/db_config") (app);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  	secret: 'hårknuden er awesome',
  	resave: false,
  	saveUninitialized: true,
  	// maxAge er i millisekunder 5*60*1000 = 300.000ms = 5min
  	cookie: { maxAge: 5 * 60 * 6000 } // 30 minutter
  }));

require("./routes/admin") (app);
require("./routes/booking") (app);
require("./routes/aabningstider") (app);
require("./routes/ansatte") (app);

// require stylesheet
app.use(express.static('public'));

// index page
app.get('/', function(req, res) {
  let booking = require("./data/booking.json");
  let aabningstider = require("./data/aabningstider.json");
  let ansatte = require("./data/ansatte.json");
  let priser = require("./data/priser.json");
  let produkter = require("./data/produkter.json");
    res.render('pages/index', {
      booking: booking,
      aabningstider: aabningstider,
      ansatte: ansatte,
      priser: priser,
      produkter: produkter
    });
});

const port = 3000;
app.listen(port);
console.log(`Server started http://localhost:${port}`);
