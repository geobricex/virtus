package com.dua.virtusbk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
public class VirtusbkApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(VirtusbkApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(VirtusbkApplication.class);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("persons/**")
                        .allowedOrigins("http://localhost:8888")
                        .allowedOrigins("https://aplicaciones.uteq.edu.ec/")
                        .allowedMethods("GET", "HEAD", "POST", "PUT", "DELETE")
                        .maxAge(3600);
            }
        };

    }
}
