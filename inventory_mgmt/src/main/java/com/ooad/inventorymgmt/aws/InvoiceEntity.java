package com.ooad.inventorymgmt.aws;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "IM_INVOICE")
public class InvoiceEntity {
	
	  	@Id
	    @Column(name = "INVOICE_ID")
	    private String invoiceId;
	  	
	  	@Column(name = "PRODUCT_ID")
	    private String productId;
	    
	  	@Column(name = "CUSTOMER_NAME")
	  	private String customerName;
	  	
		@Column(name = "CUSTOMER_ADDRESS")
	  	private String customerAddress;
		
		@Column(name = "CUSTOMER_EMAIL")
	  	private String customerEmail;
	  	 
		@Column(name = "CUSTOMER_PHONENO")
	  	private String customerPhoneNo;
		
	  	@Column(name = "PRICE")
	  	private int price;
	  	
	  	@Column(name = "QUANTITY")
	  	private int quantity;
	  	
	  	@Column(name = "TOTAL_PRICE")
	  	private int totalPrice;
	  	
	  	@Column(name = "CREATED_DATE")
	  	private Date createdDate;
	  	
	  	@Column(name = "UPDATED_DATE")
	  	private Date updatedDate;
	  	
	  	@Column(name = "DUE_DATE")
	  	private Date dueDate;
	  	
	  	@Column(name = "AMOUNT_PAID")
	    private int amountPaid;

	    @Column(name = "AMOUNT_DUE")
	    private int amountDue;
	    
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

		public String getInvoiceId() {
			return invoiceId;
		}

		public void setInvoiceId(String invoiceId) {
			this.invoiceId = invoiceId;
		}

		public String getProductId() {
			return productId;
		}

		public void setProductId(String productId) {
			this.productId = productId;
		}

		public String getCustomerName() {
			return customerName;
		}

		public void setCustomerName(String customerName) {
			this.customerName = customerName;
		}

		public String getCustomerAddress() {
			return customerAddress;
		}

		public void setCustomerAddress(String customerAddress) {
			this.customerAddress = customerAddress;
		}

		public String getCustomerEmail() {
			return customerEmail;
		}

		public void setCustomerEmail(String customerEmail) {
			this.customerEmail = customerEmail;
		}

		public String getCustomerPhoneNo() {
			return customerPhoneNo;
		}

		public void setCustomerPhoneNo(String customerPhoneNo) {
			this.customerPhoneNo = customerPhoneNo;
		}

		public int getPrice() {
			return price;
		}

		public void setPrice(int price) {
			this.price = price;
		}

		public int getQuantity() {
			return quantity;
		}

		public void setQuantity(int quantity) {
			this.quantity = quantity;
		}

		public int getTotalPrice() {
			return totalPrice;
		}

		public void setTotalPrice(int totalPrice) {
			this.totalPrice = totalPrice;
		}

		public Date getCreatedDate() {
			return createdDate;
		}

		public void setCreatedDate(Date createdDate) {
			this.createdDate = createdDate;
		}

		public Date getUpdatedDate() {
			return updatedDate;
		}

		public void setUpdatedDate(Date updatedDate) {
			this.updatedDate = updatedDate;
		}

		public Date getDueDate() {
			return dueDate;
		}

		public void setDueDate(Date dueDate) {
			this.dueDate = dueDate;
		}
	  	

}
