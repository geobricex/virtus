/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dua.virtusbk.service;

import com.dua.virtusbk.entity.Syllabu;
import com.dua.virtusbk.repository.SyllabuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author Geovanny Brito.
 */
@RestController
@RequestMapping("/syllabu")
public class SyllabuApi {
    @Autowired
    private SyllabuRepository syllabuDAO;


    @GetMapping
    public ResponseEntity<List<Syllabu>> getSyllabu() {
        List<Syllabu> list = syllabuDAO.findAll();
        return ResponseEntity.ok(list);
    }
}
