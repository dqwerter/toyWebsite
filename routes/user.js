const fs = require('fs');

module.exports = {
    manageUserPage: (req, res) => {
        let query = "SELECT * FROM users ORDER BY id ASC"; // query database to get all the users

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('manage-user.ejs', {
                users: result
            });
        });
    },
    adduserPage: (req, res) => {
        res.render('add-user.ejs', {
            message: ''
        });
    },
    adduser: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let gender = req.body.gender;
        let number = req.body.number;
        let username = req.body.username;
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = username + '.' + fileExtension;

        let usernameQuery = "SELECT * FROM users WHERE user_name ='" + username + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Username already exists';
                res.render('add-user.ejs', {
                    message
                });
            } else {
                // check the filetype before uploading it
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    // upload the file to the /public/assets/img directory
                    uploadedFile.mv(`public/assets/img/${image_name}`, (err) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        // send the user's details to the database
                        let query = "INSERT INTO users (first_name, last_name, gender, number, image, user_name) VALUES ('" +
                            first_name + "', '" + last_name + "', '" + gender + "', '" + number + "', '" + image_name + "', '" + username + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/user');
                        });
                    });
                } else {
                    message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                    res.render('add-user.ejs', {
                        message
                    });
                }
            }
        });
    },
    edituserPage: (req, res) => {
        let userId = req.params.id;
        let query = "SELECT * FROM users WHERE id = '" + userId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-user.ejs', {
                user: result[0]
                ,message: ''
            });
        });
    },
    edituser: (req, res) => {
        let userId = req.params.id;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let gender = req.body.gender;
        let number = req.body.number;

        let query = "UPDATE `users` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `gender` = '" + gender + "', `number` = '" + number + "' WHERE `users`.`id` = '" + userId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/user');
        });
    },
    deleteuser: (req, res) => {
        let userId = req.params.id;
        let getImageQuery = 'SELECT image from `users` WHERE id = "' + userId + '"';
        let deleteUserQuery = 'DELETE FROM users WHERE id = "' + userId + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].image;

            fs.unlink(`public/assets/img/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/user');
                });
            });
        });
    }
};
