/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dua.virtusbk.service;

import com.dua.virtusbk.entity.Evaluation;
import com.dua.virtusbk.repository.EvaluationRepository;
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
@RequestMapping("/evaluation")
public class EvaluationApi {
    @Autowired
    private EvaluationRepository evaluationDAO;


    @GetMapping
    public ResponseEntity<List<Evaluation>> getEvaluation() {
        List<Evaluation> list = evaluationDAO.findAll();
        return ResponseEntity.ok(list);
    }
}
