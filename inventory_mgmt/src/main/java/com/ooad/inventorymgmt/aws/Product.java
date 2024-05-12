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
@Table(name = "IM_PRODUCT")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @Column(name = "PRODUCT_ID")
    private int productId;

    @Column(name = "PRODUCT_NAME")
    private String productName;

    @Column(name = "PRODUCT_PRICE")
    private Double productPrice;

    @Column(name = "PRODUCT_QUANTY")
    private Integer productQuanty;

    @Column(name = "GENERATE_DATE")
    private Date productGenerateDate;

    @Column(name = "UPDATE_DATE")
    private Date productUpdateDate;

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Double getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(Double productPrice) {
        this.productPrice = productPrice;
    }

    public Integer getProductQuanty() {
        return productQuanty;
    }

    public void setProductQuanty(Integer productQuanty) {
        this.productQuanty = productQuanty;
    }

    public Date getProductGenerateDate() {
        return productGenerateDate;
    }

    public void setProductGenerateDate(Date productGenerateDate) {
        this.productGenerateDate = productGenerateDate;
    }

    public Date getProductUpdateDate() {
        return productUpdateDate;
    }

    public void setProductUpdateDate(Date productUpdateDate) {
        this.productUpdateDate = productUpdateDate;
    }

    public Integer getProductUserID() {
        return productUserID;
    }

    public void setProductUserID(Integer productUserID) {
        this.productUserID = productUserID;
    }

    @Column(name = "USER_ID")
    private int productUserID;
    
}

