package com.ooad.inventorymgmt.aws;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Date;

import lombok.SneakyThrows;

@RestController
@RequestMapping("/Product")
public class ProductController {
    
        @Autowired
        private ProductRepository productRepository;

        @PostMapping("/create")
        public ResponseEntity<Product> saveProduct(@RequestBody Product product) {
            try {
                product.setProductGenerateDate(new Date());
                product.setProductUpdateDate(new Date());
                // Save the new product to the database
                Product savedProduct = productRepository.save(product);
                return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        @PutMapping("/edit/{id}")
        public ResponseEntity<Product> updateProduct(@PathVariable int id, @RequestBody Product updatedProduct) {
            try {
                Product existingProduct = productRepository.findById(id).orElse(null);
                updatedProduct.setProductUpdateDate(new Date());
                if (existingProduct != null) {
                    // Update only the fields that are provided in the request
                    if (updatedProduct.getProductName() != null) {
                        existingProduct.setProductName(updatedProduct.getProductName());
                    }
                    if (updatedProduct.getProductPrice() != null) {
                        existingProduct.setProductPrice(updatedProduct.getProductPrice());
                    }
                    if (updatedProduct.getProductQuanty() != null) {
                        existingProduct.setProductQuanty(updatedProduct.getProductQuanty());
                    }
                    
                    existingProduct.setProductUpdateDate(new Date());
                    // Save the updated product to the database
                    Product savedProduct = productRepository.save(existingProduct);
        
                    return ResponseEntity.ok(savedProduct);
                } else {
                    return ResponseEntity.notFound().build(); // Product not found
                }
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }


        @GetMapping
        public List<Product> findProducts() {
            return productRepository.findAll();
        }

        // Search by UserId
        @SneakyThrows
        @GetMapping("/id/{id}")
        public Product findProduct(@PathVariable int id) {
            Product product = new Product();
            try {
                product = productRepository.findById(id).orElseThrow(() -> new Exception("Product not available"));
            } catch (Exception e) {
                e.printStackTrace();
            }
            return product;
        }

        // Search by name
        @GetMapping("/name/{name}")
        public ResponseEntity<Product> findProductByName(@PathVariable String name) {
            Product product = productRepository.findProductByName(name);
            if (product != null) {
                return ResponseEntity.ok(product); // Return the product with a 200 OK response
            } else {
                return ResponseEntity.notFound().build(); // Return a 404 Not Found response
            }
        }

        // Delete by name
        @DeleteMapping("/delete/{id}")
        public ResponseEntity<String> deleteProductById(@PathVariable int id) {
            try {
                // Check if the product with the given ID exists
                if (productRepository.existsById(id)) {
                    productRepository.deleteById(id);
                    return ResponseEntity.ok("Product deleted successfully");
                } else {
                    return ResponseEntity.notFound().build(); // Return a 404 Not Found response
                }
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
}
