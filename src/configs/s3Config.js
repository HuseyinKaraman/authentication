
const s3Config = {
    bucketName : process.env.AWS_BUCKET_NAME,
    region : process.env.AWS_REGION,
    accessKeyId : process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY,
}

export default s3Config