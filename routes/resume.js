module.exports = {
  getResumePage: (req, res) => {
    res.render('resume');
  },
  getResumePageZhCN: (req, res) => {
    res.render('resume-zh-CN');
  },
};