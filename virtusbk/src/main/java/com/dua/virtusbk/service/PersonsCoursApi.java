/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dua.virtusbk.service;

import com.dua.virtusbk.entity.Answer;
import com.dua.virtusbk.entity.PersonsCours;
import com.dua.virtusbk.repository.AnswerRepository;
import com.dua.virtusbk.repository.PersonsCoursRepository;
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
@RequestMapping("/personscours")
public class PersonsCoursApi {
    @Autowired
    private PersonsCoursRepository personscoursDAO;


    @GetMapping
    public ResponseEntity<List<PersonsCours>> getPersonsCours() {
        List<PersonsCours> list = personscoursDAO.findAll();
        return ResponseEntity.ok(list);
    }
}
