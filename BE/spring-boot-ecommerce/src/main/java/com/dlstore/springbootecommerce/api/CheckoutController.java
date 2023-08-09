package com.dlstore.springbootecommerce.api;

import org.springframework.web.bind.annotation.*;

import com.dlstore.springbootecommerce.dto.Purchase;
import com.dlstore.springbootecommerce.dto.PurchaseResponse;
import com.dlstore.springbootecommerce.services.CheckoutService;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {

        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);

        return purchaseResponse;
        
    }

}









