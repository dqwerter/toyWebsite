module.exports = {
  get404Page: (req, res) => {
    res.render('404');
    const iconv = require('iconv-lite');
    const fs = require('fs');
    const path = require('path');
    fs.readFile(path.join(__dirname, '../public/resources/Bohemian-Rhapsody.lrc'), (err, data) => {
      if (err) {
        console.error(err);
      } else {
        let lrc = iconv.decode(data, 'UTF8').split('\n');
        let regx = /\[(\d{2}):(\d{2})\.(\d{2})](.*)/;
        let newregx = /\[\w{2}:(.*)]/;
        let start = new Date().getTime();
        lrc.forEach((value) => {
          let str = regx.exec(value);
          if (str) {
            let minute = parseFloat(str[1]);
            let second = parseFloat(str[2]);
            let millisecond = parseFloat(str[3]);
            let content = str[4];
            let end = new Date().getTime();
            let time = minute * 60 * 1000 + second * 1000 + millisecond - (end - start + 3000);
            setTimeout(() => {
              console.log("[" + minute + ":" + second + ":" + millisecond + "]",content);
            }, time);
          } else {
            let deputy = newregx.exec(value);
            if (deputy) {
              console.log(deputy[1]);
            }
          }
        });
      }
    });
  },
};