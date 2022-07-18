package com.learning.library2.service.impl;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

public class FileUploadUtil {

    public static void saveFile(String uploadDir, String fileName, MultipartFile multipartFile) throws IOException {
        //String fileLocation = new File("src/main/resources/static/").getAbsolutePath();
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        try (InputStream inputStream = multipartFile.getInputStream()) {
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new IOException("Could not save image file: " + fileName, e);
        }
    }
    public static void deleteFile(String uploadDir, String fileName) throws IOException {
        //String fileLocation = new File("src/main/resources/static/").getAbsolutePath();
        Path uploadPath = Paths.get( uploadDir);
        /*
        if (!Files.exists(uploadPath)) {
            //do something
        } */
        try {
            Path filePath = uploadPath.resolve(fileName);
            if (!Files.exists(filePath)) {
                return;
            }
            Files.delete(filePath);
        } catch (IOException e) {
            throw new IOException("Could not delete image file: " + fileName, e);
        }
    }
    public static void deleteFolder(String deleteDir, String folderName) throws IOException {
        Path uploadPath = Paths.get(deleteDir);
        /*
        if (!Files.exists(uploadPath)) {
            //do something
        } */
        try {
            Path filePath = uploadPath.resolve(folderName);
            if (!Files.exists(filePath)) {
                return;
            }
            Files.delete(filePath);
        } catch (IOException e) {
            throw new IOException("Could not delete folder: " + folderName, e);
        }
    }
}
