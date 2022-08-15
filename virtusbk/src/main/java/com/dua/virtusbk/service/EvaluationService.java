package com.dua.virtusbk.service;

import com.dua.virtusbk.ExcludeProxiedFields;
import com.dua.virtusbk.entity.Evaluation;
import com.dua.virtusbk.entity.EvaluationQuestionCategory;
import com.dua.virtusbk.entity.QuestionCategory;
import com.dua.virtusbk.repository.EvaluationQuestionCategoryRepository;
import com.dua.virtusbk.repository.EvaluationRepository;
import com.dua.virtusbk.util.Methods;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;


@Service
@Transactional
public class EvaluationService {
    @Autowired
    private EvaluationRepository evaluationDAO;

    @Autowired
    private EvaluationQuestionCategoryRepository evaluationQuestionCategoryDAO;

    public String[] saveEvaluation(Evaluation evaluation) {
        System.out.println("saveEvaluation");
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";

        evaluation.setDateregEvaluation(Methods.nowLocalDateTime());
        evaluation.setDateupdateEvaluation(Methods.nowLocalDateTime());
        evaluation.setState_evaluation("A");
        evaluation.setNumberquestionEvaluation(120);
        System.out.println(evaluation);
        evaluation = evaluationDAO.save(evaluation);

        //*TABLA INTERMEDIA*//
        //*1 EVLUACIÓN CON MUCHOS TIPOS DE PREGUNTA*//
        List<EvaluationQuestionCategory> evaluationQuestionCategories = new ArrayList<>();
        for (int typeQuestion = 1; typeQuestion <= 6; typeQuestion++) {
            evaluationQuestionCategories.add
                    (new EvaluationQuestionCategory
                            (evaluation, new QuestionCategory((long) typeQuestion), 0));
        }
        evaluationQuestionCategories = evaluationQuestionCategoryDAO.saveAll(evaluationQuestionCategories);
        //*FIN TABLA INTERMEDIA*//

        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("id_evaluation", evaluation.getId());
        status = "2";
        message = "Evaluación registrada con éxito.";
        data = jsonObject.toString();

        return new String[]{status, message, data};
    }

    public String[] updateEvaluation(Evaluation evaluation) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";

        evaluation.setDateupdateEvaluation(Methods.nowLocalDateTime());
        evaluation.setState_evaluation("A");
        evaluation = evaluationDAO.save(evaluation);

        //*TABLA INTERMEDIA*//
        //*1 EVLUACIÓN CON MUCHOS TIPOS DE PREGUNTA*//
        List<EvaluationQuestionCategory> evaluationQuestionCategories = new ArrayList<>();
        for (int typeQuestion = 1; typeQuestion <= 6; typeQuestion++) {
            evaluationQuestionCategories.add
                    (new EvaluationQuestionCategory
                            (evaluation, new QuestionCategory((long) typeQuestion), 0));
        }
        evaluationQuestionCategories = evaluationQuestionCategoryDAO.saveAll(evaluationQuestionCategories);
        //*FIN TABLA INTERMEDIA*//

        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("id_evaluation", evaluation.getId());
        status = "2";
        message = "Evaluación actualizada con éxito.";
        data = jsonObject.toString();

        return new String[]{status, message, data};

    }

    public String[] getEvaluations(String id_topic) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";

        List<Evaluation> evaluations = evaluationDAO.findIdTopicEvaluationList(Long.parseLong(id_topic));
        if (evaluations.size() > 0) {
            Gson gson = new GsonBuilder().setExclusionStrategies(new ExcludeProxiedFields()).create();
            data = gson.toJson(evaluations);
            status = "2";
            message = "Información obetnida con éxito.";
            System.out.println(data);

        } else {
            status = "4";
            message = "No se ha encontrado información.";
        }

        return new String[]{status, message, data};
    }

    public String[] getEvaluation(String id_evaluation) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";

        List<Map<String, Object>> evaluations = evaluationDAO.findIdEvaluation(Long.parseLong(id_evaluation));
        if (evaluations.size() > 0) {
            Gson gson = new GsonBuilder().setExclusionStrategies(new ExcludeProxiedFields()).create();
            data = gson.toJson(evaluations);
            status = "2";
            message = "Información obetnida con éxito.";
            System.out.println(data);

        } else {
            status = "4";
            message = "No se ha encontrado información.";
        }

        return new String[]{status, message, data};
    }

    public String[] getEvaluationQuestions(String id_evaluation, String id_person) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";

        String homeInformation = evaluationDAO.returnEvaluation(Integer.parseInt(id_evaluation), Integer.parseInt(id_person));

        JsonArray jso = Methods.stringToJsonArray(homeInformation);
        if (!jso.toString().equals("[]")) {
            status = "2";
            message = "Información retornada con éxito.";
            data = jso.toString();
        }

        return new String[]{status, message, data};
    }

}
