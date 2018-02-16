let formidable = require('formidable');

module.exports = function (app) {

  app.get('/admin', function (req, res) {
    if (req.session.userId == null) {
      res.render('pages/admin', {
        showLogin: true,
        showInfo: false
      });
    } else {

      let sql2 = 'SELECT * FROM aabningstider';
      let sql3 = 'SELECT * FROM ansatte';
      let sql4 = 'SELECT * FROM booking';
      let sql5 = 'SELECT * FROM priser';
      let sql6 = 'SELECT * FROM produkter';

      db.query(sql2, [], function (err, aabningstider) {
      db.query(sql3, [], function (err, ansatte) {
      db.query(sql4, [], function (err, booking) {
      db.query(sql5, [], function (err, priser) {
      db.query(sql6, [], function (err, produkter) {

        res.render('pages/admin', {
          showLogin: false,
          showInfo: true,
          user: req.session.user,
          aabningstider: aabningstider,
          ansatte: ansatte,
          booking: booking,
          priser: priser,
          produkter: produkter
        });
      }) // sql6 ends here
      }) // sql5 ends here
      }) // sql4 ends here
      }) // sql3 ends here
      }) // sql2 ends here
    }
	});

  // ================================================================

	app.post('/admin', function (req, res) {

		let message = '';
		let sess = req.session;

		let post = req.body;
		let brugernavn = post.brugernavn;
		let kodeord = post.kodeord;

		let sql = 'SELECT * FROM admin WHERE brugernavn = ? AND kodeord = ?';

		db.query(sql, [brugernavn, kodeord], function (err, bruger) {

			if (bruger.length) {
				req.session.userId = bruger[0].id;
				req.session.user = bruger[0];

		    res.redirect('/admin');
			}
			else {
				message = 'Noget gik galt! prøv igen';
				res.render('pages/admin', {
          showLogin: true,
          showInfo: false,
					message: message,
					messageType: 'alert-danger'
				});
			}
		}); // sql1 ends here
	});

// Gem aendringer start
  app.post('/aabningstider', function (req, res) {
    console.log("req.body");
    console.log(req.body);
        db.query(`UPDATE aabningstider SET dag = ?, fra = ?, til = ?, status = ? WHERE id = ${req.body.id}`,[req.body.dag, req.body.fra, req.body.til, req.body.status], function (err, data) {
          console.log("query done");
            res.json(data);
            if (err) console.log(err);
        })
      });
    app.post('/ansatte', function (req, res) {
      console.log("req.body");
      console.log(req.body);
          db.query(`UPDATE ansatte SET navn = ?, efternavn = ? WHERE id = ${req.body.id}`,[req.body.navn, req.body.efternavn], function (err, data) {
            console.log("query done");
              res.json(data);
              if (err) console.log(err);
          })
      });
      app.post('/booking', function (req, res) {
        console.log("req.body");
        console.log(req.body);
            db.query(`UPDATE booking SET navn = ?, dato = ?, telefon = ?, email = ?, ansat = ? WHERE id = ${req.body.id}`,[req.body.navn, req.body.dato, req.body.telefon, req.body.email, req.body.ansat] , function (err, data) {
              console.log("query done");
                res.json(data);
                if (err) console.log(err);
            })
        });
        app.post('/priser', function (req, res) {
          console.log("req.body");
          console.log(req.body);
              db.query(`UPDATE priser SET type = ?, pris = ? WHERE id = ${req.body.id}`,[req.body.type, req.body.pris] , function (err, data) {
                console.log("query done");
                  res.json(data);
                  if (err) console.log(err);
              })
          });
          app.post('/produkter', function (req, res) {
            console.log("req.body");
            console.log(req.body);
                db.query(`UPDATE produkter SET varenr = ?, pris = ?, producent = ?, navn = ?, beskrivelse = ? WHERE id = ${req.body.id}`,[req.body.varenr, req.body.pris, req.body.producent, req.body.navn, req.body.beskrivelse] , function (err, data) {
                  console.log("query done");
                    res.json(data);
                    if (err) console.log(err);
                })
            });
            // Gem aendringer end

// Slet start
  app.delete('/delete/:id', (req, res, next) => {
    if (req.body.db_table == "ans") tableName = "ansatte";
    if (req.body.db_table == "boo") tableName = "booking";
    if (req.body.db_table == "pri") tableName = "priser";
    if (req.body.db_table == "pro") tableName = "produkter";
    let id = (isNaN(req.params.id) ? 0 : req.params.id);
    if (id > 0) {
        db.query(`DELETE FROM ${tableName} WHERE id = ${req.params.id}`, (err, rows) => {
            if (err) {
                console.log(err);
                res.json(400);
            } else {
                res.json(204);
            }
        })
    } else {
        res.json(400, {
            message: 'id ikke valid'
        });
    }
});
// Slet end

  app.post('/getFormData', function (req, res) {
    let tableName;
    console.log("getFormData");
    console.log(req.body);
    if (req.body.db_table == "aab") tableName = "aabningstider";
    if (req.body.db_table == "ans") tableName = "ansatte";
    if (req.body.db_table == "boo") tableName = "booking";
    if (req.body.db_table == "pri") tableName = "priser";
    if (req.body.db_table == "pro") tableName = "produkter";
    db.query(`SELECT * FROM ${tableName} WHERE id = ${req.body.id}` , function (err, data) {
      console.log(data);
        res.json(data);
        if (err) console.log(err);
    });
  });

	// ================================================================

	app.get('/logout', function (req, res) {
		req.session.destroy(function (err) {
			res.redirect('/');
		});
	});

	// ================================================================

} // End of: module.exports
