module.exports = {
  getKnowherePage: (req, res) => {
    const query = "SELECT c.id, c.content, c.comment_time, u.user_name FROM comments AS c, users AS u WHERE c.user_id = u.id ORDER BY comment_time DESC;"; // query database to get all the users
    // execute query
    db.query(query, (err, result) => {
      if (err) {
        res.redirect('/');
      }
      res.render('knowhere.ejs', {
        comments: result, errorMessage:''
      });
    });
  },
  addComment: (req, res) => {
    let message = '';
    let content = req.body.comment;
    let username = req.body.username;

    const query = "SELECT c.id, c.content, c.comment_time, u.user_name FROM comments AS c, users AS u WHERE c.user_id = u.id ORDER BY comment_time DESC;"; // query database to get all the users
    let commentQueryResult;
    let userIdQueryResult;
    // execute query
    db.query(query, (err, result) => {
      if (err) {
        res.redirect('/');
      }
      commentQueryResult = result;
    });

    let usernameQuery = "SELECT id FROM users WHERE user_name ='" + username + "'";

    db.query(usernameQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      userIdQueryResult = result;
      if (result.length === 0) {
        console.log('Username dose not exist.');
        message = 'Username dose not exist.';
        res.render('knowhere.ejs', {
          errorMessage: message, comments: commentQueryResult
        });
      } else {
        const addCommentQuerry = "insert into comments(content, user_id, comment_time) values('" + content + "', '" + result[0].id + "', now());";
        db.query(addCommentQuerry, (err, result) => {
          if (err) {
            return res.status(500).send(err);
          } else {
            const query = "SELECT c.id, c.content, c.comment_time, u.user_name FROM comments AS c, users AS u WHERE c.user_id = u.id ORDER BY comment_time DESC;"; // query database to get all the users
            // execute query
            db.query(query, (err, result) => {
              if (err) {
                res.redirect('/');
              }
              res.render('knowhere.ejs', {
                comments: result, errorMessage:''
              });
            });
          }
        });
      }
    });
  },
};
