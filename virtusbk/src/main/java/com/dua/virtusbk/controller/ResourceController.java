package com.dua.virtusbk.controller;

import com.dua.virtusbk.ExcludeProxiedFields;
import com.dua.virtusbk.entity.Evaluation;
import com.dua.virtusbk.entity.Resource;
import com.dua.virtusbk.entity.Topic;
import com.dua.virtusbk.repository.ResourceRepository;
import com.dua.virtusbk.repository.TopicRepository;
import com.dua.virtusbk.util.Methods;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.ObjectError;

import java.util.List;


@Service
public class ResourceController {
    @Autowired
    private ResourceRepository resourceDAO;

    public String[] saveResource(Resource resource) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";

        resource.setDateregResource(Methods.nowLocalDateTime());
        resource.setDateupdateResource(Methods.nowLocalDateTime());
        resource.setStateResource("A");
        resource = resourceDAO.save(resource);

        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("id_resource", resource.getId());
        status = "2";
        message = "Recurso agregado con éxito.";
        data = jsonObject.toString();

        return new String[]{status, message, data};
    }

    public String[] updateResource(Resource resource) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";

        resource.setDateupdateResource(Methods.nowLocalDateTime());
        resource.setStateResource("A");
        resource = resourceDAO.save(resource);

        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("id_resource", resource.getId());
        status = "2";
        message = "Recurso actualizado con éxito.";
        data = jsonObject.toString();

        return new String[]{status, message, data};
    }

    public String[] getResources(String id_topic) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";
        List<Resource> resources = resourceDAO.findIdTopicResourceList(Long.parseLong(id_topic));
        if (resources.size() > 0) {
            Gson gson = new GsonBuilder().setExclusionStrategies(new ExcludeProxiedFields()).create();
            data = gson.toJson(resources);
            status = "2";
            message = "Información obetnida con éxito.";
            System.out.println(data);

        } else {
            status = "4";
            message = "No se ha encontrado información.";
        }
        return new String[]{status, message, data};
    }

    public String[] getResource(String id_resource) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";
        Object[] evaluations = resourceDAO.findIdResource(Long.parseLong(id_resource));
        if (evaluations.length > 0) {
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

}
