package com.srs.common.component.fileStorage;

import io.minio.*;
import io.minio.http.Method;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.concurrent.TimeUnit;

/**
 * MinIO file storage template
 */
@Slf4j
@Component
public class MinioTemplate {

    @Autowired
    private MinioClient minioClient;

    private static final String DEFAULT_BUCKET = "srs";

    /**
     * Upload file
     */
    public String upload(MultipartFile file, String objectName) throws Exception {
        return upload(file, objectName, DEFAULT_BUCKET);
    }

    /**
     * Upload file to specified bucket
     */
    public String upload(MultipartFile file, String objectName, String bucket) throws Exception {
        if (!bucketExists(bucket)) {
            makeBucket(bucket);
        }
        InputStream inputStream = file.getInputStream();
        minioClient.putObject(PutObjectArgs.builder()
                .bucket(bucket)
                .object(objectName)
                .stream(inputStream, file.getSize(), -1)
                .contentType(file.getContentType())
                .build());
        inputStream.close();
        return getPresignedObjectUrl(bucket, objectName);
    }

    /**
     * Check if bucket exists
     */
    public boolean bucketExists(String bucket) throws Exception {
        return minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucket).build());
    }

    /**
     * Create bucket
     */
    public void makeBucket(String bucket) throws Exception {
        if (!bucketExists(bucket)) {
            minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucket).build());
        }
    }

    /**
     * Get presigned object URL
     */
    public String getPresignedObjectUrl(String bucket, String objectName) throws Exception {
        return minioClient.getPresignedObjectUrl(GetPresignedObjectUrlArgs.builder()
                .method(Method.GET)
                .bucket(bucket)
                .object(objectName)
                .expiry(7, TimeUnit.DAYS)
                .build());
    }

    /**
     * Get presigned object URL with custom expiry
     */
    public String getPresignedObjectUrl(String bucket, String objectName, int expiry, TimeUnit unit) throws Exception {
        return minioClient.getPresignedObjectUrl(GetPresignedObjectUrlArgs.builder()
                .method(Method.GET)
                .bucket(bucket)
                .object(objectName)
                .expiry(expiry, unit)
                .build());
    }

    /**
     * Delete object
     */
    public void delete(String objectName) throws Exception {
        delete(objectName, DEFAULT_BUCKET);
    }

    /**
     * Delete object from specified bucket
     */
    public void delete(String objectName, String bucket) throws Exception {
        minioClient.removeObject(RemoveObjectArgs.builder().bucket(bucket).object(objectName).build());
    }

    /**
     * Get object stream
     */
    public InputStream getObject(String objectName) throws Exception {
        return getObject(objectName, DEFAULT_BUCKET);
    }

    /**
     * Get object stream from specified bucket
     */
    public InputStream getObject(String objectName, String bucket) throws Exception {
        return minioClient.getObject(GetObjectArgs.builder().bucket(bucket).object(objectName).build());
    }
}
