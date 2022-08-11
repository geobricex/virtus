/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dua.virtusbk.service;

import com.dua.virtusbk.controller.CourseController;
import com.dua.virtusbk.entity.Course;
import com.dua.virtusbk.entity.Person;
import com.dua.virtusbk.repository.CourseRepository;
import com.dua.virtusbk.util.Methods;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Geovanny Brito.
 */
@RestController
@RequestMapping("/course")
public class CourseApi {
    @Autowired
    private CourseRepository courseDAO;
    @Autowired
    private CourseController courseController;

    @GetMapping
    public ResponseEntity<List<Course>> getCourse() {
        List<Course> list = courseDAO.findAll();
        return ResponseEntity.ok(list);
    }

    @PostMapping("/insertcourse")
    public ResponseEntity<String> insertCourse(@RequestBody @Validated Course course, @RequestHeader("token") String sessionToken) {
        String message;
        String[] clains = Methods.getDataToJwt(sessionToken);
        String[] res = Methods.validatePermit(clains[0], clains[1], 1);
        if (res[0].equals("2")) {
            res = courseController.saveCourse(course, clains[0]);
            message = Methods.getJsonMessage(res[0], res[1], res[2]);
            if (res[0].equals("2")) {

                return new ResponseEntity<>(message, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(message, HttpStatus.BAD_GATEWAY);
            }
        } else {
            message = Methods.getJsonMessage("4", "Credenciales de sesión inválidas, vuelve a iniciar sesión "
                    + "e intentalo de nuevo.", "[]");
            return new ResponseEntity<>(message, HttpStatus.BANDWIDTH_LIMIT_EXCEEDED);
        }
    }

    @PostMapping("/updatecourse")
    public ResponseEntity<String> updateCourse(@RequestBody @Validated Course course, @RequestHeader("token") String sessionToken) {
        String message = "[]";
        String[] clains = Methods.getDataToJwt(sessionToken);
        String[] res = Methods.validatePermit(clains[0], clains[1], 1);
        if (res[0].equals("2")) {
            res = courseController.updateCourse(course);
            message = Methods.getJsonMessage(res[0], res[1], res[2]);
            if (res[0].equals("2")) {
                return new ResponseEntity<>(message, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(message, HttpStatus.BAD_GATEWAY);
            }
        } else {
            message = Methods.getJsonMessage("4", "Credenciales de sesión inválidas, vuelve a iniciar sesión "
                    + "e intentalo de nuevo.", "[]");
            return new ResponseEntity<>(message, HttpStatus.BANDWIDTH_LIMIT_EXCEEDED);
        }
    }
}
