package com.ooad.inventorymgmt.aws;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.transaction.Transactional;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentrepository;
    
    @Autowired
    private InvoiceRepository invoiceRepository;

    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments() {
        List<Payment> payments = paymentrepository.findAll();
        return ResponseEntity.ok(payments);
    }

    @PostMapping("/create/invoices/{invoiceId}")
    @Transactional
    public ResponseEntity<Payment> createPayment(@PathVariable(value = "invoiceId") String invoiceId, 
    		@RequestBody Payment payment) {
        try {
        	
        	 InvoiceEntity invoice = invoiceRepository.findById(invoiceId)
     	            .orElseThrow(() -> new RuntimeException("Invoice not found with id: " + invoiceId));
        	 
        	 int amountP = payment.getAmount();
        	 
            // Set the createdDate to the current date
            String paymentId = UUID.randomUUID().toString().substring(0, 10);
            payment.setPaymentId(paymentId);
            payment.setInvoiceId(invoiceId);
            payment.setCreatedDate(new Date(System.currentTimeMillis()));
            payment.setAmountPaid(invoice.getAmountPaid() + amountP);
            payment.setAmountDue(invoice.getTotalPrice() - (invoice.getAmountPaid()+amountP));
            payment.setAmount(0);
            payment.setTotalPrice(invoice.getTotalPrice());
            
            Payment createdPayment = paymentrepository.save(payment);

            updateAmountDuePaidDetails(invoiceId, amountP);

            return ResponseEntity.ok(createdPayment);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @Transactional
    public void updateAmountDuePaidDetails(String invoiceId, int amountP) {
    	
    	 InvoiceEntity invoice = invoiceRepository.findById(invoiceId)
  	            .orElseThrow(() -> new RuntimeException("Invoice not found with id: " + invoiceId));
     	 
    	 int amountPaid = invoice.getAmountPaid() + amountP;
    	 int amountDue = (invoice.getTotalPrice() - (invoice.getAmountPaid()+amountP));
         invoiceRepository.updateInvoiceAmounts(invoiceId, amountDue, amountPaid);
      
    }
}
