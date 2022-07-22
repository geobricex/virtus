/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dua.virtusbk.service;

import com.dua.virtusbk.entity.Evaluation;
import com.dua.virtusbk.entity.Question;
import com.dua.virtusbk.repository.EvaluationRepository;
import com.dua.virtusbk.repository.QuestionRepository;
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
@RequestMapping("/question")
public class QuestionApi {
    @Autowired
    private QuestionRepository questionDAO;


    @GetMapping
    public ResponseEntity<List<Question>> getQuestion() {
        List<Question> list = questionDAO.findAll();
        return ResponseEntity.ok(list);
    }
}
