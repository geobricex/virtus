/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dua.virtusbk.controller;

import com.dua.virtusbk.entity.Util;
import com.dua.virtusbk.service.CourseService;
import com.dua.virtusbk.entity.Course;
import com.dua.virtusbk.repository.CourseRepository;
import com.dua.virtusbk.util.Methods;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * @author Geovanny Brito.
 */
@RestController
@RequestMapping("/course")
public class CourseApi {
    @Autowired
    private CourseRepository courseDAO;
    @Autowired
    private CourseService courseService;

    @GetMapping
    public ResponseEntity<List<Course>> getCourse() {
        List<Course> list = courseDAO.findAllByOrderByIdDesc();
        return ResponseEntity.ok(list);
    }

    @GetMapping(value = "{id}")
    public ResponseEntity<Course> getCourse(@PathVariable("id") Long id_course) {
        Optional<Course> courseOptional = courseDAO.findById(id_course);
        if (courseOptional.isPresent()) {
            return ResponseEntity.ok(courseOptional.get());
        } else {
            return ResponseEntity.noContent().build();
        }
    }


    @PostMapping("/insertcourse")
    public ResponseEntity<String> insertCourse(@RequestBody @Validated Course course, @RequestHeader("token") String sessionToken) {
        String message;
        String[] clains = Methods.getDataToJwt(sessionToken);
        String[] res = Methods.validatePermit(clains[0], clains[1], 1);
        if (res[0].equals("2")) {
            res = courseService.saveCourse(course, clains[0]);
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
            res = courseService.updateCourse(course, clains[0]);
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

    @PostMapping("/selectcoursesyllabutopic")
    public ResponseEntity<String> selectCourseSyllabuTopic(@RequestBody String data) {//, @RequestHeader("token") String sessionToken) {
        String message = "[]";

//        JsonObject jso = Methods.stringToJSON(data);
//        String sessionToken = Methods.JsonToString(jso, "sessionToken", "");
//
//        String[] clains = Methods.getDataToJwt(sessionToken);
//        String[] res = Methods.validatePermit(clains[0], clains[1], 1);
//        if (res[0].equals("2")) {
        JsonObject jso = Methods.stringToJSON(data);
        String id_course = Methods.JsonToString(jso, "id_course", "");
        String[] res = courseService.selectCourseSyllabuTopic(id_course);
        message = Methods.getJsonMessage(res[0], res[1], res[2]);
        if (res[0].equals("2") || res[0].equals("3")) {
            return new ResponseEntity<>(message, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(message, HttpStatus.BAD_GATEWAY);
        }
//        } else {
//            message = Methods.getJsonMessage("4", "Credenciales de sesión inválidas, vuelve a iniciar sesión "
//                    + "e intentalo de nuevo.", "[]");
//            return new ResponseEntity<>(message, HttpStatus.BANDWIDTH_LIMIT_EXCEEDED);
//        }
    }
}
