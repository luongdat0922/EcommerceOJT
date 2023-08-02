package com.dlstore.springbootecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dlstore.springbootecommerce.entity.Gallery;

public interface GalleryRepository extends JpaRepository<Gallery, String> {

}
