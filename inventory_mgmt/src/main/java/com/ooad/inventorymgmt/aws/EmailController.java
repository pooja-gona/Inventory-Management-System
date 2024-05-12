package com.ooad.inventorymgmt.aws;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/email")
public class EmailController {
    @Autowired
    private EmailSenderService emailSenderService;

    @PostMapping("/send")
    public void sendEmail(@RequestBody EmailRequest emailRequest) {
        // Assuming you have an EmailRequest class with "to", "subject", and "body" properties
        emailSenderService.sendSimpleEmail(emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getBody());
    }
}
