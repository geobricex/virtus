/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dua.virtusbk.service;

import com.dua.virtusbk.controller.TopicController;
import com.dua.virtusbk.entity.Course;
import com.dua.virtusbk.entity.Syllabu;
import com.dua.virtusbk.entity.Topic;
import com.dua.virtusbk.repository.SyllabuRepository;
import com.dua.virtusbk.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Geovanny Brito.
 */
@RestController
@RequestMapping("/topic")
public class TopicApi {
    @Autowired
    private TopicRepository topicDAO;

    @Autowired
    private TopicController topicController;
    @RequestMapping(value = "/topics", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<List<Topic>> getTopic() {
        List<Topic> list = topicDAO.findAll();
        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<Topic> insertCourse(@RequestBody @Validated Topic topic) {

        String[] res = topicController.saveTopic(topic);
        if (res[0].equals("2")) {
            return ResponseEntity.ok(topic);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
