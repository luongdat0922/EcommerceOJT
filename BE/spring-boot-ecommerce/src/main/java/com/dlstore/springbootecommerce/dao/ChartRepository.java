package com.dlstore.springbootecommerce.dao;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.dlstore.springbootecommerce.entity.Order;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "orders")
public interface ChartRepository extends JpaRepository<Order, Long> {

	@RestResource(path = "betweenDates", rel = "betweenDates")
	List<Order> findByDateCreatedBetween(@Param("start") Date start, @Param("end") Date end);
}
