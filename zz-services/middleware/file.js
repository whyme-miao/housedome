const multer = require("multer");
const path = require("path");
// 上传文件的路径存放
const uploadPath = path.resolve(__dirname, "../uploads");
const upload = multer({ dest: uploadPath });
module.exports = function (router) {
  router.post("/upload", upload.single("file"), (req, res) => {
    const file = req.file
    // 会自动隐藏后缀名
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
}
