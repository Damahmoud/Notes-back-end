const express = require('express');
const mongoose = require('mongoose');
const Note = require('./models/blog');
const app = express();

const db = 'mongodb+srv://samo:10203040@notes.g8evh.mongodb.net/?retryWrites=true&w=majority&appName=notes'
mongoose.connect(db)
  .then(result => app.listen(3000, ()=> console.log('online')))
  .catch(err => console.log("err", err));


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
  res.render('index', { title: "home".toUpperCase()});
});

app.get('/home', (req, res) => {
  res.redirect('/');
});


app.get('/mahmoud', (req, res) => {
  Note.find()
    .then(result => res.send(result))
    .catch(err => console.log(err));
});

app.get('/notes', (req, res) => {
  Note.find()
  .then(r => {
    res.render('notes', { title: req.url.slice(1).toUpperCase(), notes: r });
    console.log(r);
  })
  .catch(err => console.log(err));  
});

app.post('/data', (req, res) => {
  const note = new Note({
    title: req.body.title,  
    body: req.body.body    
  });

  note.save()
    .then(result => {
      res.redirect('/notes');
    })
    .catch(err => console.log(err));
});

app.use((req, res) => {
  res.status(404).render('404', { title: req.url.slice(1)});
});



