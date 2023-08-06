package com.dlstore.springbootecommerce.dto;

import lombok.Data;

import java.util.Set;

import com.dlstore.springbootecommerce.entity.Address;
import com.dlstore.springbootecommerce.entity.Customer;
import com.dlstore.springbootecommerce.entity.Order;
import com.dlstore.springbootecommerce.entity.OrderItem;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
