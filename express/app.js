var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
const cors = require('cors');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var registerRouter = require('./routes/formutente');
var searchBusRouter = require('./routes/searchbus');
var mostraPostiRouter = require('./routes/mostraposti');
var confermaPrenotazioneRouter = require('./routes/confermaprenotazione');

// api controller
var BusRouter = require('./routes/crud/Bus');
var TrattaRouter = require('./routes/crud/Tratta');
var PostoRouter = require('./routes/crud/Posto');
var PrenotazioneRouter = require('./routes/crud/Prenotazione');
var UtenteRouter = require('./routes/crud/Utente');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
/*app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) */// for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }));
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// utility (rendering page)
app.use('/', indexRouter);
app.use('/register',registerRouter);
app.use('/searchbus',searchBusRouter);
app.use('/mostraposti',mostraPostiRouter);
app.use('/confermaprenotazione', confermaPrenotazioneRouter);


//api for model bus
app.get('/api/bus', BusRouter.getBus);
app.get('/api/bus/:id', BusRouter.getBusById);
app.post('/api/addbus', BusRouter.createBus);
app.post('/api/bus/:id',BusRouter.updateBus);
app.delete('/api/bus/delete/:id', BusRouter.deleteBus);

//api for model tratta
app.get('/api/tratta', TrattaRouter.getTratte);
app.get('/api/tratta/:id', TrattaRouter.getTrattaById);
app.post('/api/addtratta', TrattaRouter.createTratta);
app.post('/api/tratta/:id',TrattaRouter.updateTratta);
app.delete('/api/tratta/delete/:id', TrattaRouter.deleteTratta);

//api for model posto
app.get('/api/posto', PostoRouter.getPosto);
app.get('/api/posto/:id', PostoRouter.getPostoById);
app.post('/api/addposto', PostoRouter.createPosto);
app.post('/api/posto/:id',PostoRouter.updatePosto);
app.delete('/api/posto/delete/:id', PostoRouter.deletePosto);

//api for model prenotazione
app.get('/api/prenotazione', PrenotazioneRouter.getPrenotazione);
app.get('/api/prenotazione/:id', PrenotazioneRouter.getPrenotazioneById);
app.post('/api/addprenotazione', PrenotazioneRouter.createPrenotazione);
app.post('/api/prenotazione/:id',PrenotazioneRouter.updatePrenotazione);
app.delete('/api/prenotazione/delete/:id', PrenotazioneRouter.deletePrenotazione);

//api for model utente
app.get('/api/utente', UtenteRouter.getUtente);
app.get('/api/utente/:id', UtenteRouter.getUtenteById);
app.post('/api/utente', UtenteRouter.createUtente);
app.post('/api/utente/:id',UtenteRouter.updateUtente);
app.delete('/api/utente/delete/:id', UtenteRouter.deleteUtente);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000);
module.exports = app;
