package com.dlstore.springbootecommerce.services;

import com.dlstore.springbootecommerce.dto.Purchase;
import com.dlstore.springbootecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
    
}
