package com.Ten.demo.Controller;

import com.Ten.demo.Dto.UserRequestDto;
import com.Ten.demo.Service.UserService;
import com.Ten.demo.Entity.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController // ⭐ @Controller → @RestController 변경 (JSON 응답용)
@RequestMapping("/auth")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ✅ 회원가입: JSON 응답으로 상태 전달
    @PostMapping("/register")
    public ResponseEntity<String> register(@ModelAttribute UserRequestDto dto) {
        userService.register(dto);
        return ResponseEntity.ok("회원가입 성공");
    }

    // ✅ 로그인: 세션 설정 + 상태 반환
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String userId,
                                        @RequestParam String password,
                                        HttpSession session) {
        User user = userService.login(userId, password);
        session.setAttribute("user", user.getId());
        return ResponseEntity.ok("로그인 성공");
    }

    // ✅ 로그아웃: 세션 무효화
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("로그아웃 성공");
    }
}
