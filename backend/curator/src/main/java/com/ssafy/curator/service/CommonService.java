package com.ssafy.curator.service;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import java.io.*;
import java.util.Base64;
import java.util.UUID;


@Service
public class CommonService {

    public String rnd(String originName, byte[] fileData, String path) throws Exception {

//        String extension = originName.substring(originName.lastIndexOf("."), originName.length());
        UUID uuid = UUID.randomUUID();
        String savedName = uuid.toString();
        File target = new File(path, savedName);

        FileCopyUtils.copy(fileData, target);
        return savedName;
    }

    public String imageEncoding(String path) throws IOException {
        InputStream imageStream3 = new FileInputStream(path);
        byte[] imageByteArray3 = IOUtils.toByteArray(imageStream3);
        String base64data3 = Base64.getEncoder().encodeToString(imageByteArray3);
        imageStream3.close();
        String imageInfo = "data:image/png;base64," + base64data3;
        return imageInfo;
    }
}
