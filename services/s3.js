const fs = require("fs");
const aws = require("aws-sdk");
const {AccessKeyID,SecretAccessKey,BUCKET,region}=require("../config/index")
// aws config
aws.config.update({
  accessKeyId:AccessKeyID,
  secretAccessKey:SecretAccessKey,
});
aws.config.region = region;
const s3 = new aws.S3();
async function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: BUCKET,
    Body: fileStream,
    Key: file.filename,
    acl: "public-read",
		ContentType: "image/jpeg"
  };
  return await s3.upload(uploadParams).promise();
}
exports.uploadFile = uploadFile;



async function deleteFile(key) {
  const deleteParams = {
    Bucket: BUCKET,
    Key: key
  };
  return await s3.deleteObject(deleteParams).promise()
}
exports.deleteFile = deleteFile;

