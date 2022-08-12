/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dua.virtusbk.service;

import com.dua.virtusbk.controller.EvaluationController;
import com.dua.virtusbk.controller.TopicController;
import com.dua.virtusbk.entity.Evaluation;
import com.dua.virtusbk.entity.Topic;
import com.dua.virtusbk.repository.EvaluationRepository;
import com.dua.virtusbk.util.Methods;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Geovanny Brito.
 */
@RestController
@RequestMapping("/evaluation")
public class EvaluationApi {
    @Autowired
    private EvaluationRepository evaluationDAO;

    @Autowired
    private EvaluationController evaluationController;

    @GetMapping
    public ResponseEntity<List<Evaluation>> getEvaluation() {
        List<Evaluation> list = evaluationDAO.findAll();
        return ResponseEntity.ok(list);
    }

    @PostMapping("/insertevaluation")
    public ResponseEntity<String> insertEvaluation(@RequestBody @Validated Evaluation evaluation, @RequestHeader("token") String sessionToken) {
        String message;
        String[] clains = Methods.getDataToJwt(sessionToken);
        String[] res = Methods.validatePermit(clains[0], clains[1], 1);
        if (res[0].equals("2")) {
            res = evaluationController.saveEvaluation(evaluation);
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

    @PostMapping("/updateevaluation")
    public ResponseEntity<String> updateEvaluation(@RequestBody @Validated Evaluation evaluation, @RequestHeader("token") String sessionToken) {
        String message;
        String[] clains = Methods.getDataToJwt(sessionToken);
        String[] res = Methods.validatePermit(clains[0], clains[1], 1);
        if (res[0].equals("2")) {
            res = evaluationController.updateEvaluation(evaluation);
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

    @PostMapping("/getevaluations")
    public ResponseEntity<String> getEvaluations(@RequestBody @Validated String id_topic) {//, @RequestHeader("token") String sessionToken) {
        System.out.println("getevaluations...");
        String message = "";
//        JsonObject jso = Methods.stringToJSON(token);
//        String sToken = Methods.JsonToString(jso, "token", "");
//        String[] clains = Methods.getDataToJwt(sToken);
//        String[] res = Methods.validatePermit(clains[0], clains[1], 1);
//        if (res[0].equals("2")) {
        JsonObject jso = Methods.stringToJSON(id_topic);
        String topic_id_evaluation = Methods.JsonToString(jso, "topic_id_evaluation", "");
        if (!topic_id_evaluation.equals("")) {
            String[] res = evaluationController.getEvaluations(topic_id_evaluation);
            message = Methods.getJsonMessage(res[0], res[1], res[2]);
            if (res[0].equals("2")) {
                return new ResponseEntity<>(message, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(message, HttpStatus.BANDWIDTH_LIMIT_EXCEEDED);
            }
        } else {
            return new ResponseEntity<>(message, HttpStatus.BAD_GATEWAY);
        }
//        } else {
//            return ResponseEntity.noContent().build();
//        }
    }

    @PostMapping("/getevaluation")
    public ResponseEntity<String> getEvaluation(@RequestBody @Validated String id_evaluations) {//, @RequestHeader("token") String sessionToken) {
        System.out.println("getevaluation...");
        String message;
//        JsonObject jso = Methods.stringToJSON(token);
//        String sToken = Methods.JsonToString(jso, "token", "");
//        String[] clains = Methods.getDataToJwt(sToken);
//        String[] res = Methods.validatePermit(clains[0], clains[1], 1);
//        if (res[0].equals("2")) {
        JsonObject jso = Methods.stringToJSON(id_evaluations);
        String id_evaluation = Methods.JsonToString(jso, "id_evaluation", "");
        String[] res = evaluationController.getEvaluation(id_evaluation);
        message = Methods.getJsonMessage(res[0], res[1], res[2]);
        if (res[0].equals("2")) {
            return new ResponseEntity<>(message, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(message, HttpStatus.BANDWIDTH_LIMIT_EXCEEDED);
        }
//        } else {
//            return ResponseEntity.noContent().build();
//        }
    }

    @PostMapping("/getEvaluationQuestions")
    public ResponseEntity<String> getEvaluationQuestions(@RequestBody @Validated String data, @RequestHeader("token") String sessionToken) {
        System.out.println("getEvaluationQuestions...");
        String message;
        /*TEMPORAL*/
//        JsonObject jso = Methods.stringToJSON(data);
//        String sessionToken = Methods.JsonToString(jso, "sessionToken", "");
        /*FIN TEMPORAL*/
        String[] clains = Methods.getDataToJwt(sessionToken);
        String[] res = Methods.validatePermit(clains[0], clains[1], 1);
        if (res[0].equals("2")) {
            JsonObject jso = Methods.stringToJSON(data);
            if (jso.size() > 0) {
                String id_evaluation = Methods.JsonToString(jso, "id_evaluation", "");
                res = evaluationController.getEvaluationQuestions(id_evaluation, clains[0]);
                message = Methods.getJsonMessage(res[0], res[1], res[2]);
                if (res[0].equals("2")) {
                    return new ResponseEntity<>(message, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(message, HttpStatus.BAD_GATEWAY);
                }
            } else {
                message = Methods.getJsonMessage("4", "Parametros de entrada no válidos.", "[]");
                return new ResponseEntity<>(message, HttpStatus.BAD_GATEWAY);
            }
        } else {
            message = Methods.getJsonMessage("4", "Credenciales de sesión inválidas, vuelve a iniciar sesión "
                    + "e intentalo de nuevo.", "[]");
            return new ResponseEntity<>(message, HttpStatus.BANDWIDTH_LIMIT_EXCEEDED);
        }
    }
}
