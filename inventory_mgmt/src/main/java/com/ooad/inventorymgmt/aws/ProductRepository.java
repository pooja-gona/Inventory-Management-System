package com.ooad.inventorymgmt.aws;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product,Integer> {
    // Custom query method to find a product by name using JPQL
    @Query("SELECT p FROM Product p WHERE p.productName = :name")
    Product findProductByName(@Param("name") String name);

    @Modifying
    @Query("DELETE FROM Product p WHERE p.id = :id")
    void deleteProductById(@Param("id") int id);

    @Query("SELECT p FROM Product p WHERE p.id = :id")
    Optional<Product> findProductByID(@Param("id") String id);

}
