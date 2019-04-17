const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = 'ee9f261ae90f3df01977355cbe7ceb6c';
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', {nameAlert: null});
});

app.post('/', function (req, res) {
  const name = req.body.name;
  switch(name) {
    case "":
      break;
    case "秦旺":
      res.render('index', {nameAlert: "叫我干嘛？"});
      break;
    case "王欣迪":
      // 找到这个你牛逼，请保守我的小秘密
      alert("我用什么才能留住你？\n\n" +
        "我给你瘦落的街道、绝望的落日、荒郊的月亮。\n" +
        "我给你一个久久地望着孤月的人的悲哀。\n" +
        "我给你我已死去的祖辈，后人们用大理石祭奠的先魂：\n" +
        "我父亲的父亲，阵亡于布宜诺斯艾利斯的边境，两颗子弹射穿了他的胸膛，死的时候蓄着胡子，尸体被士兵们用牛皮裹起\n" +
        "我母亲的祖父——那年才二十四岁——在秘鲁率领三百人冲锋，如今都成了消失的马背上的亡魂。\n\n" +
        "我给你我的书中所能蕴含的一切悟力，以及我生活中所能有的男子气概和幽默。\n" +
        "我给你一个从未有过信仰的人的忠诚。\n" +
        "我给你我设法保全的我自己的核心——不营字造句，不和梦交易，不被时间、欢乐和逆境触动的核心。\n" +
        "我给你早在你出生前多年的一个傍晚看到的一朵黄玫瑰的记忆。\n" +
        "我给你关于你生命的诠释，关于你自己的理论，你的真实而惊人的存在。\n" +
        "我给你我的寂寞、我的黑暗、我心的饥渴；我试图用困惑、危险、失败来打动你。\n");
      break;
    case "张梓烨":
    case "黎诗琪":
    case "沈楚鹰":
      document.getElementById("name").innerHTML = name + "是个好人";
      break;
    case "申雨泽":
      // 这位爷是个沙雕
      const fck = "整天学人家讲大道理，教别人写代码，做项目\n满口的低耦合、高内聚、大并发、框架内核、底层原理、结构算法\n自己一写代码，10 行代码 9 行报错! \n想吃饭？吃 * 吧你！";
      alert(fck);
      console.error(fck);
      // document.getElementById("name").innerHTML = "申雨泽快滚吧";
      break;
    default:
      const randomNum = Math.random();
      if (randomNum < 0.5) {
        document.getElementById("name").innerHTML = "你好，" + name + "!";
      } else if (randomNum < 0.75) {
        document.getElementById("name").innerHTML = "今天过得怎么样？";
      } else if (randomNum < 0.78) {
        document.getElementById("name").innerHTML = name + "是个弟弟";
      } else {
        document.getElementById("name").innerHTML = name + "真可爱";
      }
      }
});

app.get('/weather', function (req, res) {
  res.render('weather', {weather: null, error: null});
});

app.post('/weather', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  request(url, function (err, response, body) {
    if(err){
      res.render('weather', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body);
      if(weather.main === undefined){
        res.render('weather', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}.`;
        res.render('weather', {weather: weatherText, error: null});
      }
    }
  });
});

app.listen(80, function () {
  console.log('Server running at port 80')
});

// original: https://github.com/bmorelli25