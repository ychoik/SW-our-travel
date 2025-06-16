package com.Ten.demo.Controller;

import com.Ten.demo.Entity.User;
import com.Ten.demo.Service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class SessionUserController {

    private final UserService userService;

    public SessionUserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserInfo(HttpSession session) {
        Object userId = session.getAttribute("user");

        if (userId == null) {
            return ResponseEntity.ok(Collections.singletonMap("loggedIn", false));
        }

        User user = userService.findUserById((Long) userId);
        Map<String, Object> response = Map.of(
                "loggedIn", true,
                "userName", user.getUserName()
        );
        return ResponseEntity.ok(response);
    }
}

