package com.ooad.inventorymgmt.aws;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<Boolean> signup(@RequestBody UserEntity user) {
        try {
            // Save the new user to the database
            UserEntity savedUserEntity = userRepository.save(user);
            return ResponseEntity.ok(Boolean.TRUE);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody UserEntity user) {
        Optional<UserEntity> userOptional = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
        return userOptional.isPresent() ? ResponseEntity.ok(Boolean.TRUE) : ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Boolean.FALSE);
    }
}
