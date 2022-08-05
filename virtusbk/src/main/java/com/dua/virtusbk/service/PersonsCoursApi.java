/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dua.virtusbk.service;

import com.dua.virtusbk.controller.CourseController;
import com.dua.virtusbk.entity.PersonsCours;
import com.dua.virtusbk.repository.PersonsCourseRepository;
import com.dua.virtusbk.util.Methods;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Geovanny Brito.
 */
@RestController
@RequestMapping("/personscours")
public class PersonsCoursApi {
    @Autowired
    private PersonsCourseRepository personscoursDAO;
    @Autowired
    private CourseController courseController;

    @GetMapping
    public ResponseEntity<List<PersonsCours>> getPersonsCours() {
        List<PersonsCours> list = personscoursDAO.findAll();
        return ResponseEntity.ok(list);
    }

    @PostMapping("/joincourse")
    public ResponseEntity<String> joinCourse(@RequestBody String data, @RequestHeader("token") String sessionToken) {
        String message = "[]";
        String[] clains = Methods.getDataToJwt(sessionToken);
        String[] res = Methods.validatePermit(clains[0], clains[1], 1);
        if (res[0].equals("2")) {
            JsonObject jso = Methods.stringToJSON(data);
            String id_course = Methods.JsonToString(jso, "id_course", "");
            res = courseController.joinCourse(id_course, clains[0]);
            if (res[0].equals("2")) {
                message = Methods.getJsonMessage(res[0], res[1], res[2]);
                return new ResponseEntity<>(message, HttpStatus.OK);
            } else {
                message = Methods.getJsonMessage("4", "Credenciales de sesión inválidas, vuelve a iniciar sesión "
                        + "e intentalo de nuevo.", "[]");
                return new ResponseEntity<>(message, HttpStatus.BAD_GATEWAY);
            }
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
