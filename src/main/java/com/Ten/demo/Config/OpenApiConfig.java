package com.Ten.demo.Config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "openapi")
@Getter
@Setter
public class OpenApiConfig {

    //@Value("${openapi.service-key}")
    private String serviceKey;

//    public String getServiceKey() {
//        return serviceKey;
//    }



}
