/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dua.virtusbk.service;

import com.dua.virtusbk.entity.Question;
import com.dua.virtusbk.entity.Resource;
import com.dua.virtusbk.repository.QuestionRepository;
import com.dua.virtusbk.repository.ResourceRepository;
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
@RequestMapping("/resource")
public class ResourceApi {
    @Autowired
    private ResourceRepository resourceDAO;


    @GetMapping
    public ResponseEntity<List<Resource>> getResource() {
        List<Resource> list = resourceDAO.findAll();
        return ResponseEntity.ok(list);
    }
}
