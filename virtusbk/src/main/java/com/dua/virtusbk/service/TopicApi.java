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
import com.dua.virtusbk.util.Methods;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @PostMapping("/inserttopic")
    public ResponseEntity<String> insertTopic(@RequestBody @Validated Topic topic, @RequestHeader("token") String sessionToken) {
        String message;
        String[] clains = Methods.getDataToJwt(sessionToken);
        String[] res = Methods.validatePermit(clains[0], clains[1], 1);
        if (res[0].equals("2")) {
            res = topicController.saveTopic(topic);
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
    @PostMapping("/inserttopic")
    public ResponseEntity<String> updateTopic(@RequestBody @Validated Topic topic, @RequestHeader("token") String sessionToken) {
        String message;
        String[] clains = Methods.getDataToJwt(sessionToken);
        String[] res = Methods.validatePermit(clains[0], clains[1], 1);
        if (res[0].equals("2")) {
            res = topicController.updateTopic(topic);
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

    @PostMapping("/gettopics")
    public ResponseEntity<String> getTopics(@RequestBody String id_syllabyu) {
        System.out.println("getTopics...");
        String message;
//        JsonObject jso = Methods.stringToJSON(sessionToken);
//        String sToken = Methods.JsonToString(jso, "sessionToken", "");
//        String[] clains = Methods.getDataToJwt(sToken);
//        String[] res = Methods.validatePermit(clains[0], clains[1], 1);
//        if (res[0].equals("2")) {
        JsonObject jso = Methods.stringToJSON(id_syllabyu);
        String course_id_syllabu = Methods.JsonToString(jso, "syllabu_id_topic", "");
        String[] res = topicController.getTopic(course_id_syllabu);
        if (res[0].equals("2")) {
            message = Methods.getJsonMessage(res[0], res[1], res[2]);
            return new ResponseEntity<>(message, HttpStatus.OK);
        } else {
            message = Methods.getJsonMessage("4", "Credenciales de sesión inválidas, vuelve a iniciar sesión "
                    + "e intentalo de nuevo.", "[]");
            return new ResponseEntity<>(message, HttpStatus.BANDWIDTH_LIMIT_EXCEEDED);
        }
//        } else {
//            return ResponseEntity.noContent().build();
//        }
    }
}
