package com.ooad.inventorymgmt.aws;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    public List<Payment> findAllPayments() {
        return paymentRepository.findAll();
    }
}
