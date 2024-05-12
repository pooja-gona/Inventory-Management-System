package com.ooad.inventorymgmt.aws;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    @Query("SELECT u FROM UserEntity u WHERE u.email = :email AND u.password = :password")
    Optional<UserEntity> findByEmailAndPassword(String email, String password);

}

