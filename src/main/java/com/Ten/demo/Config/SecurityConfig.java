package com.Ten.demo.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()  // CSRF 비활성화 (필요하면 켜고, 로그아웃은 POST 요청이어야 함)
                .authorizeHttpRequests(authorize ->
                        authorize
                                .requestMatchers("/**").permitAll()  // 모든 경로 허용
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")              // 로그아웃 처리 URL (기본값)
                        .logoutSuccessUrl("/")             // 로그아웃 후 이동할 페이지 (메인페이지)
                        .invalidateHttpSession(true)      // 세션 무효화
                        .deleteCookies("JSESSIONID")      // 쿠키 삭제
                );

        return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}



