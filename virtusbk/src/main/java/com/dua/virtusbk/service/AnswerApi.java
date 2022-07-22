/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dua.virtusbk.service;

import com.dua.virtusbk.entity.Answer;
import com.dua.virtusbk.repository.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author Geovanny Brito.
 */
@RestController
@RequestMapping("/answer")
public class AnswerApi {
    @Autowired
    private AnswerRepository answerDAO;


    @GetMapping
    public ResponseEntity<List<Answer>> getAnswer() {
        List<Answer> list = answerDAO.findAll();
        return ResponseEntity.ok(list);
    }
}
