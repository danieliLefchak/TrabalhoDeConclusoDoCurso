package com.utfpr.TCC.service;

import io.minio.messages.Bucket;
import org.springframework.web.multipart.MultipartFile;

import com.utfpr.TCC.miniopayload.FileResponse;

import java.io.InputStream;
import java.util.List;

public interface MinioService {

    FileResponse putObject(MultipartFile multipartFile, String bucketName, String fileType);

    InputStream downloadObject(String bucketName, String objectName);

    boolean bucketExists(String bucketName);

    void makeBucket(String bucketName);

    List<String> listBucketName();

    List<Bucket> listBuckets();

    boolean removeBucket(String bucketName);

    List<String> listObjectNames(String bucketName);

    boolean removeObject(String bucketName, String objectName);

    boolean removeListObject(String bucketName, List<String> objectNameList);

    String getObjectUrl(String bucketName,String objectName);
}
