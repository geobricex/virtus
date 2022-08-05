package com.dua.virtusbk.controller;

import com.dua.virtusbk.ExcludeProxiedFields;
import com.dua.virtusbk.entity.Course;
import com.dua.virtusbk.entity.Person;
import com.dua.virtusbk.entity.Syllabu;
import com.dua.virtusbk.entity.Topic;
import com.dua.virtusbk.repository.CourseRepository;
import com.dua.virtusbk.repository.PersonRepository;
import com.dua.virtusbk.repository.TopicRepository;
import com.dua.virtusbk.util.DataStatic;
import com.dua.virtusbk.util.Methods;
import com.dua.virtusbk.util.TemplateEmail;
import com.dua.virtusbk.util.WeEncoder;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class TopicController {
    @Autowired
    private TopicRepository topicDAO;

    public String[] saveTopic(Topic topic) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";

        topic = topicDAO.save(topic);
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("id_topic", topic.getId());
        status = "2";
        message = "Usuario registrado con éxito.";
        data = jsonObject.toString();

        return new String[]{status, message, data};
    }

    public String[] getTopic(String id_syllabu) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";

        List<Topic> topics = topicDAO.findByIdTopicList(Long.parseLong(id_syllabu));
        if (topics.size() > 0) {
            Gson gson = new GsonBuilder().setExclusionStrategies(new ExcludeProxiedFields()).create();
            data = gson.toJson(topics).toString();
            status = "2";
            message = "Información obetnida con éxito.";
            System.out.println(data);

        } else {
            status = "2";
            message = "No se ha encontrado información.";
        }

        return new String[]{status, message, data};
    }

}
