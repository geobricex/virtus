package com.dua.virtusbk.service;

import com.dua.virtusbk.entity.Question;
import com.dua.virtusbk.repository.QuestionRepository;
import com.dua.virtusbk.util.Methods;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@Service
@Transactional
public class QuestionService {
    @Autowired
    private QuestionRepository questionDAO;

    public String[] saveQuestion(Question question) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";
        if (Methods.verifyMaxLength(question.getFeedbackQuestion(), 500)
                && Methods.verifyMaxLength(question.getHintQuestion(), 200)
                && Methods.verifyMaxLength(question.getDescriptionQuestion(), 500)
                && Methods.verifyMaxLength(question.getTitleQuestion(), 200)
                && Methods.verifyMaxLength(question.getTitleQuestion(), 200)) {
            if (Methods.verifyMaxLength(question.getPathurlfileQuestion(), 200)
                    && Methods.verifyMaxLength(question.getPathurlsignQuestion(), 200)
                    && Methods.verifyMaxLength(question.getPathurlvideoQuestion(), 200)) {
                question.setStateQuestion("A");
                question = questionDAO.save(question);

                JsonObject jsonObject = new JsonObject();
                jsonObject.addProperty("id_question", question.getId());
                status = "2";
                message = "Pregunta registrada con éxito.";
                data = jsonObject.toString();
            } else {
                status = "3";
                message = "Longitud excedida del enlace generado.";
            }
        } else {
            status = "3";
            message = "Longitud excedida en uno de los campos ingresados.";
        }
        return new String[]{status, message, data};
    }

    public String[] updateQuestion(Question question) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";
        if (Methods.verifyMaxLength(question.getFeedbackQuestion(), 500)
                && Methods.verifyMaxLength(question.getHintQuestion(), 200)
                && Methods.verifyMaxLength(question.getDescriptionQuestion(), 500)
                && Methods.verifyMaxLength(question.getTitleQuestion(), 200)
                && Methods.verifyMaxLength(question.getTitleQuestion(), 200)) {
            if (Methods.verifyMaxLength(question.getPathurlfileQuestion(), 200)
                    && Methods.verifyMaxLength(question.getPathurlsignQuestion(), 200)
                    && Methods.verifyMaxLength(question.getPathurlvideoQuestion(), 200)) {
                question = questionDAO.save(question);

                JsonObject jsonObject = new JsonObject();
                jsonObject.addProperty("id_question", question.getId());
                status = "2";
                message = "Pregunta actualizada con éxito.";
                data = jsonObject.toString();
            } else {
                status = "3";
                message = "Longitud excedida del enlace generado.";
            }
        } else {
            status = "3";
            message = "Longitud excedida en uno de los campos ingresados.";
        }
        return new String[]{status, message, data};
    }

    public String[] getQuestion(String id_question) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";

        return new String[]{status, message, data};
    }

    public String[] getQuestions(String id_evaluation) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";

        return new String[]{status, message, data};
    }

}
