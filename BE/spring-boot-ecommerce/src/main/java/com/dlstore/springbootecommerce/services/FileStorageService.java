package com.dlstore.springbootecommerce.services;

import java.io.IOException;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.dlstore.springbootecommerce.dao.GalleryRepository;
import com.dlstore.springbootecommerce.entity.Gallery;

@Service
public class FileStorageService {

	@Autowired
	GalleryRepository galleryRepository;
	
	public Gallery store(MultipartFile file) throws IOException {
	    String fileName = StringUtils.cleanPath(file.getOriginalFilename());
	    Gallery gallery = new Gallery(fileName, file.getContentType(), file.getBytes());

	    return galleryRepository.save(gallery);
	  }

	  public Gallery getFile(String id) {
	    return galleryRepository.findById(id).get();
	  }
	  
	  public Stream<Gallery> getAllFiles() {
	    return galleryRepository.findAll().stream();
	  }
}
