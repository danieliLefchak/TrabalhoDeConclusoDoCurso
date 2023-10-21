package com.utfpr.TCC.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.minio.MinioClient;
import lombok.Data;

@Data
@Configuration
@ConfigurationProperties(prefix = "minio")
public class MinioConfig {
	private String endpoint;
	
	private Integer port;
	
	private String accessKey;
	
	private String secretKey;
	
	private boolean secure;
	
	private String bucketName;
	
	private long imageSize;
	
	private long fileSize;
	
	@Bean
	public MinioClient minioClient() {
		MinioClient minioClient =
		MinioClient.builder()
			.credentials(accessKey, secretKey)
			.endpoint(endpoint,port,secure)
			.build();
		return minioClient;
	}
}
