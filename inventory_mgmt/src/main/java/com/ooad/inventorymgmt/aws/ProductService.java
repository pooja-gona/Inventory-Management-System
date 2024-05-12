package com.ooad.inventorymgmt.aws;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository repository;

    public List<Product> findAllProducts(){
        return repository.findAll();
    }
    public Optional<Product> findProductByID(String ID) {
        return repository.findProductByID(ID);
    }
}
