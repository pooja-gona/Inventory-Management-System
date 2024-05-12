package com.ooad.inventorymgmt.aws;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InvoiceController {
	
	@Autowired
	InvoiceRepository invoiceRepository;
	
	
	
	
	 @PostMapping("/invoices")
	    public ResponseEntity<InvoiceEntity> createInvoice(@RequestBody InvoiceEntity invoice) {
		
		 String invoiceid = UUID.randomUUID().toString().substring(0, 7);
		 invoice.setTotalPrice(invoice.getPrice() * invoice.getQuantity());
		 invoice.setInvoiceId(invoiceid);
		 invoice.setCreatedDate(new Date(System.currentTimeMillis()));
		 invoice.setUpdatedDate(new Date(System.currentTimeMillis()));
		 invoice.setDueDate(calculateDueDate(new Date(System.currentTimeMillis())));
		 invoice.setAmountPaid(0);
		 invoice.setAmountDue(invoice.getPrice() * invoice.getQuantity());
		 InvoiceEntity savedInvoice = invoiceRepository.save(invoice);
	        return ResponseEntity.ok(savedInvoice);
	        
	    }
	 
	 @PutMapping(value = "/invoices/{invoiceId}")
	    public ResponseEntity<InvoiceEntity> updateInvoice(@PathVariable("invoiceId") String id, @RequestBody InvoiceEntity invoiceDetails) {
	        InvoiceEntity invoice = invoiceRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Invoice not found with id: " + id));
	        
	        invoice.setProductId(invoice.getProductId());
	        invoice.setCustomerName(invoiceDetails.getCustomerName());
	        invoice.setCustomerAddress(invoiceDetails.getCustomerAddress());
	        invoice.setCustomerEmail(invoiceDetails.getCustomerEmail());
	        invoice.setCustomerPhoneNo(invoiceDetails.getCustomerPhoneNo());
	        invoice.setPrice(invoice.getPrice());
	        invoice.setQuantity(invoice.getQuantity());
	        invoice.setTotalPrice(invoice.getPrice() * invoice.getQuantity());
	        invoice.setCreatedDate(invoice.getCreatedDate());
	        invoice.setUpdatedDate(new Date(System.currentTimeMillis()));
	        invoice.setDueDate(invoice.getDueDate());
	        
	        InvoiceEntity updatedInvoice = invoiceRepository.save(invoice);
	        return ResponseEntity.ok(updatedInvoice);
	        
	 }
	 
	 public Date calculateDueDate(Date creationDate) {
		 	
	        Calendar calendar = Calendar.getInstance();
	        calendar.setTime(creationDate);
	        
	        calendar.add(Calendar.DAY_OF_MONTH, 15);
	        
	        Date dueDate = calendar.getTime();
	        
		 return dueDate;
	 }
	 
	 @GetMapping("/invoices/{invoiceId}")
	    public ResponseEntity<InvoiceEntity> getInvoiceById(@PathVariable("invoiceId") String id) {
	        InvoiceEntity invoice = invoiceRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Invoice not found with id: " + id));
	        return ResponseEntity.ok(invoice);
	    }

	    @GetMapping("/invoices")
	    public ResponseEntity<List<InvoiceEntity>> getAllInvoices() {
	        List<InvoiceEntity> invoices = invoiceRepository.findAllByOrderByDueDate();
	        return ResponseEntity.ok(invoices);
	    }
	    
	    @DeleteMapping("/invoices/{invoiceId}")
	    public ResponseEntity<?> deleteInvoice(@PathVariable("invoiceId") String id) {
	        InvoiceEntity invoice = invoiceRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Invoice not found with id: " + id));
	        invoiceRepository.delete(invoice);
	        return ResponseEntity.ok().build();
	    }
	    
	    @GetMapping("/searchInvoices")
	    public List<InvoiceEntity> searchInvoices(
	    		@RequestParam(value = "none", required = false) String none,
	            @RequestParam(value = "invoiceId", required = false) String invoiceId,
	            @RequestParam(value = "customerName", required = false) String customerName,
	            @RequestParam(value = "customerEmail",required = false) String customerEmail) {
	    	
	    	List<InvoiceEntity> list = new ArrayList<>();
	    	
//	    	if(invoiceId == null && customerEmail == null && customerName == null) {
//	    		list.addAll(invoiceRepository.findAll());
//	    	}
	    	
	    	if(invoiceId != null) {
	    		list.addAll(invoiceRepository.findByInvoiceIdIgnoreCase(invoiceId));
	    	}
	    	else if (customerName != null) {
	    		list.addAll(invoiceRepository.findByCustomerNameIgnoreCaseContaining(customerName));
	    	}
	    	else if(customerEmail != null) {
	    		list.addAll(invoiceRepository.findByCustomerEmailIgnoreCase(customerEmail));
	    	}
	    	else {
	    		list.addAll(invoiceRepository.findAll());
	    	}
	    	
	    	return list;
	    }

}
