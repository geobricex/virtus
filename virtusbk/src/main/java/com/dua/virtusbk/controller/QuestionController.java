package com.dua.virtusbk.controller;

import com.dua.virtusbk.ExcludeProxiedFields;
import com.dua.virtusbk.entity.Question;
import com.dua.virtusbk.entity.Topic;
import com.dua.virtusbk.repository.QuestionRepository;
import com.dua.virtusbk.repository.TopicRepository;
import com.dua.virtusbk.util.Methods;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class QuestionController {
    @Autowired
    private QuestionRepository questionDAO;

    public String[] saveQuestion(Question question) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";

        question.setStateQuestion("A");
        question = questionDAO.save(question);

        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("id_question", question.getId());
        status = "2";
        message = "Usuario registrado con éxito.";
        data = jsonObject.toString();

        return new String[]{status, message, data};
    }

    public String[] updateQuestion(Question question) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";


        return new String[]{status, message, data};
    }

    public String[] getQuestions(String id_) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";

        return new String[]{status, message, data};
    }

}
