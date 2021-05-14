const fs=require('fs')
const{AccessKeyID,SecretAccessKey,region,Bucket}= require('../config/index')
const S3= require('aws-sdk/clients/s3')
const s3= new S3({
    AccessKeyID:AccessKeyID,
    SecretAccessKey:SecretAccessKey,
    region:region
  })

  function uploadFile(file){
      const fileStream=fs.createReadStream(file.path)
      const uploadParams={
          Bucket:Bucket,
          Body:fileStream,
          Key:file.filename
      }
      s3.upload(uploadParams).promise()
    //   console.log(uploadParams);
  }
  exports.uploadFile=uploadFile