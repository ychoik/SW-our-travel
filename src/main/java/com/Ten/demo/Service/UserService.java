package com.Ten.demo.Service;

import com.Ten.demo.Dto.UserRequestDto;
import com.Ten.demo.Repository.UserRepository;
import com.Ten.demo.Entity.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // 회원가입
    public void register(UserRequestDto dto) {
        if (userRepository.findByuserId(dto.getUserId()).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 사용자입니다.");
        }

        User user = new User();
        user.setUserId(dto.getUserId());
        user.setUserName(dto.getUserName());
        user.setPassword(passwordEncoder.encode(dto.getPassword())); // 비밀번호 암호화
        user.setEmail(dto.getEmail());

        userRepository.save(user);
    }

    // 로그인
    public User login(String userId, String password) {
        User user = userRepository.findByuserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        return user;
    }

    // 세션에 저장된 userId로 사용자 정보 조회
    public User findUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 사용자를 찾을 수 없습니다."));
    }
}
