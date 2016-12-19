var log4js=require('log4js');//注意log4js的module位置引用是否正确
//log the cheese logger messages to a file, and the console ones as well.
log4js.configure({
  appenders: [
    {
      type: "file",
      filename: "logs/app.log"
      // category:'app' //之间加了category后发现无法写入文件，
    },
    {
      type: "console"
    }
  ],
  replaceConsole: true
});

module.exports = log4js;