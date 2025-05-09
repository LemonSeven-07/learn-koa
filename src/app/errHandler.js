module.exports = (err, ctx) => {
  let status = 500;
  switch (err.code) {
    case '400':
      status = 400;
      break;
    case '409':
      status = 409;
      break;
    case '404':
      status = 404;
      break;
    case '401':
      status = 401;
      break;
    default:
      status = 500;
  }
  ctx.status = status;
  ctx.body = err;
  // 这里可以添加日志记录的逻辑
  // 比如将错误信息写入文件或数据库
  // fs.appendFile('error.log', `${new Date()} - ${err.message}\n`, (error) => {
  //   if (error) {
  //     console.error('Failed to write to log file:', error)
  //   }
  // })
  // 也可以发送邮件通知管理员
  // sendEmailToAdmin(err)
  // 这里可以使用邮件发送库来发送邮件
  // 例如使用 nodemailer 库
};
