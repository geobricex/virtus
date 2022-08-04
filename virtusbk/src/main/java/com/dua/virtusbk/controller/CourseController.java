package com.dua.virtusbk.controller;

import com.dua.virtusbk.entity.Course;
import com.dua.virtusbk.entity.Person;
import com.dua.virtusbk.repository.CourseRepository;
import com.dua.virtusbk.repository.PersonRepository;
import com.dua.virtusbk.util.DataStatic;
import com.dua.virtusbk.util.Methods;
import com.dua.virtusbk.util.TemplateEmail;
import com.dua.virtusbk.util.WeEncoder;
import com.google.gson.JsonObject;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional
public class CourseController {
    @Autowired
    private CourseRepository courseDAO;

    public String[] saveCourse(Course course) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";

        course = courseDAO.save(course);

        status = "2";
        message = "Curso registrado con éxito.";


        return new String[]{status, message, data};
    }
}
