/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dua.virtusbk.service;

import com.dua.virtusbk.controller.SyllabuController;
import com.dua.virtusbk.entity.Course;
import com.dua.virtusbk.entity.Syllabu;
import com.dua.virtusbk.repository.SyllabuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Geovanny Brito.
 */
@RestController
@RequestMapping("/syllabu")
public class SyllabuApi {
    @Autowired
    private SyllabuRepository syllabuDAO;

    @Autowired
    private SyllabuController syllabuController;

    @GetMapping
    public ResponseEntity<List<Syllabu>> getSyllabu() {
        List<Syllabu> list = syllabuDAO.findAll();
        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<Syllabu> insertCourse(@RequestBody @Validated Syllabu syllabu) {

        String[] res = syllabuController.saveSyllabu(syllabu);
        if (res[0].equals("2")) {
            return ResponseEntity.ok(syllabu);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
