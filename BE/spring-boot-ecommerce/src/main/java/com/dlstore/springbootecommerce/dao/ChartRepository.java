package com.dlstore.springbootecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.dlstore.springbootecommerce.entity.Order;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "orders")
public interface ChartRepository extends JpaRepository<Order, Long> {

}
