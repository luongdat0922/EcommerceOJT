package com.dlstore.springbootecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dlstore.springbootecommerce.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
