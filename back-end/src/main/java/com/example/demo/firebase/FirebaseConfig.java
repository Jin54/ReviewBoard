package com.example.demo.firebase;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Bucket;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.StorageClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Configuration
public class FirebaseConfig {


    String bucketName="temp";
    String imgUrl = "https://firebasestorage.googleapis.com/v0/b/%s/o/%s?alt=media";
//
//    @PostConstruct
//    public void init() {
//        try {
//            FileInputStream serviceAccount =
//                    new FileInputStream("src/main/resources/serviceAccountKey.json");
//            FirebaseOptions options = new FirebaseOptions.Builder()
//                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
//                    .build();
//            FirebaseApp.initializeApp(options);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//
//
//    public List<String> save(MultipartFile[] files) {
//
//        if (files == null)
//            return null;
//        Bucket bucket = StorageClient.getInstance().bucket(bucketName);
//        List<String> fileList = new ArrayList<>();
//        for ( MultipartFile file : files) {
//            try {
//                String name = generateFileName(file.getOriginalFilename());
//                bucket.create("jin/" + name, file.getBytes(), file.getContentType());
//                String url = String.format(imgUrl, bucketName,"jin%2F" + name);
//                fileList.add(url);
//                // do whatever you want with that
//            } catch (Exception e) {
//                //  throw internal error;
//            }
//        }
//
//        return fileList;
//    }
//
//
//
//

    String generateFileName(String originalFileName) {
        return UUID.randomUUID().toString() + getExtension(originalFileName);
    }

    String getExtension(String originalFileName) {
        return StringUtils.getFilenameExtension(originalFileName);
    }

}