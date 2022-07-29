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
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping
    public ResponseEntity<Course> insertCourse(@RequestBody @Validated Course course) {

        String[] res = courseController.saveCourse(course);
        if (res[0].equals("2")) {
            return ResponseEntity.ok(course);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
