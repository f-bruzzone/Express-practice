const express = require('express');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');
const app = express();
const path = require('path');


let comments = [
    {
        id: uuid(),
        username: 'user1',
        comment: 'This is the first comment.'
    },
    {
        id: uuid(),
        username: 'user2',
        comment: 'This is the second comment.'
    },
    {
        id: uuid(),
        username: 'user3',
        comment: 'This is the third comment.'
    },
    {
        id: uuid(),
        username: 'user4',
        comment: 'This is the fourth comment.'
    }
]


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment });
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment });
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments');
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    console.log(comments);
    res.redirect('/comments')
})

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() });
    res.redirect('/comments');
})

app.listen(3000, () => {
    console.log('On port 3000!')
})