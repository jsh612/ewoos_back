import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-2"
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "ewoos/ewoos",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    }
  }),
  limits: {
    // 업로드 파일 수 제한
    files: 5
  }
});

// single("input태그 name")
// (formData 이용시 : formData.append("여기이름", 파일)) -->formData.append("file", 파일)
export const uploadMiddleware = upload.array("file", 5);

export const uploadController = (req, res) => {
  console.log("업로드된 파일", req.files);
  res.json(req.files.map(v => v.location));
};
