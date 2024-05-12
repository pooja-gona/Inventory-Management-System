package com.ooad.inventorymgmt.aws;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "im_payment")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Payment {
    @Id
    @Column(name = "payment_id", length = 120)
    private String paymentId;

    @Column(name = "invoice_id", length = 45)
    private String invoiceId;

    @Column(name = "created_date")
    private Date createdDate;

    @Column(name = "amount_paid")
    private int amountPaid;

    @Column(name = "amount_due")
    private int amountDue;

    @Column(name = "total_price")
    private int totalPrice;
    
    @Column(name = "amount") 
    private int amount;
    
    public int getAmount() {
    	return amount;
    }
    
    public void setAmount(int amount) {
    	this.amount = amount;
    }

    public String getPaymentId() {
        return paymentId;
    }
    
    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }
    
    public String getInvoiceId() {
        return invoiceId;
    }
    
    public void setInvoiceId(String invoiceId) {
        this.invoiceId = invoiceId;
    }
    
    public Date getCreatedDate() {
        return createdDate;
    }
    
    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }
    
    public int getAmountPaid() {
        return amountPaid;
    }
    
    public void setAmountPaid(int amountPaid) {
        this.amountPaid = amountPaid;
    }
    
    public int getAmountDue() {
        return amountDue;
    }
    
    public void setAmountDue(int amountDue) {
        this.amountDue = amountDue;
    }
    
    public int getTotalPrice() {
        return totalPrice;
    }
    
    public void setTotalPrice(int totalPrice) {
        this.totalPrice = totalPrice;
    }
    
}
