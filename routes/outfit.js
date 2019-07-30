module.exports = {
  getOutfitPage: (req, res) => {
    const path = require('path');
    res.sendFile(path.join(__dirname, '../views/outfit.html'));
  }
};
