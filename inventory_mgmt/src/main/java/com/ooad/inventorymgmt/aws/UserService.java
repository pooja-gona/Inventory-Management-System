package com.ooad.inventorymgmt.aws;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

public class UserService {
    @Autowired
    private UserRepository repository;

    public List<UserEntity> findAllUsers(){return repository.findAll();
    }

}
