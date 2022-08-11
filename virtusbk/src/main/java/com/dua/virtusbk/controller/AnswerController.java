package com.dua.virtusbk.controller;

import com.dua.virtusbk.ExcludeProxiedFields;
import com.dua.virtusbk.entity.Answer;
import com.dua.virtusbk.entity.Question;
import com.dua.virtusbk.entity.Topic;
import com.dua.virtusbk.repository.AnswerRepository;
import com.dua.virtusbk.repository.QuestionRepository;
import com.dua.virtusbk.repository.TopicRepository;
import com.dua.virtusbk.util.Methods;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;


@Service
@Transactional
public class AnswerController {
    @Autowired
    private AnswerRepository answerDAO;

    public String[] saveAnswers(Answer answer) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";

        answer.setDateregAnswer(Methods.nowLocalDateTime());
        answer.setDateupdateAnswer(Methods.nowLocalDateTime());
        answer = answerDAO.save(answer);

        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("id_answer", answer.getId());
        status = "2";
        message = "Respuestas registradas con éxito.";
        data = jsonObject.toString();

        return new String[]{status, message, data};
    }

    public String[] updateAnswers(Answer answer) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";

        answer.setDateupdateAnswer(Methods.nowLocalDateTime());
        answer = answerDAO.save(answer);

        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("id_answer", answer.getId());
        status = "2";
        message = "Respuestas actualizadas con éxito.";
        data = jsonObject.toString();

        return new String[]{status, message, data};
    }

    public String[] getAnswers(String id_) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";

        return new String[]{status, message, data};
    }

}
