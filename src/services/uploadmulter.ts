import multer from 'multer'

export const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, process.env.UPLOAD_FOLDER!)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
})
