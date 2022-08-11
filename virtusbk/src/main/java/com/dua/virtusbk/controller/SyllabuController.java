package com.dua.virtusbk.controller;

import com.dua.virtusbk.ExcludeProxiedFields;
import com.dua.virtusbk.entity.Course;
import com.dua.virtusbk.entity.Person;
import com.dua.virtusbk.entity.Syllabu;
import com.dua.virtusbk.repository.CourseRepository;
import com.dua.virtusbk.repository.PersonRepository;
import com.dua.virtusbk.repository.SyllabuRepository;
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
@Transactional
public class SyllabuController {
    @Autowired
    private SyllabuRepository syllabuDAO;

    public String[] saveSyllabu(Syllabu syllabu) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";

        syllabu.setDateregSyllabu(Methods.nowLocalDateTime());
        syllabu.setDateupdateSyllabu(Methods.nowLocalDateTime());
        syllabu.setStateSyllabu("A");
        syllabu = syllabuDAO.save(syllabu);

        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("id_syllabu", syllabu.getId());
        status = "2";
        message = "Módulo registrado con éxito.";
        data = jsonObject.toString();

        return new String[]{status, message, data};
    }

    public String[] updateSyllabu(Syllabu syllabu) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";

        syllabu.setDateupdateSyllabu(Methods.nowLocalDateTime());
        syllabu = syllabuDAO.save(syllabu);
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("id_syllabu", syllabu.getId());
        status = "2";
        message = "Módulo actualizado con éxito.";
        data = jsonObject.toString();

        return new String[]{status, message, data};
    }

    public String[] getSyllabus(String id_course) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";

        List<Syllabu> syllabus = syllabuDAO.findByIdCourseList(Long.parseLong(id_course));
        if (syllabus.size() > 0) {
            Gson gson = new GsonBuilder().setExclusionStrategies(new ExcludeProxiedFields()).create();
            data = gson.toJson(syllabus);
            status = "2";
            message = "Información obetnida con éxito.";
            System.out.println(data);

        } else {
            status = "4";
            message = "No se ha encontrado información.";
        }

        return new String[]{status, message, data};
    }

    public String[] getSyllabu(String id_syllabu) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";

        Object[] syllabus = syllabuDAO.findIdSyllabu(Long.parseLong(id_syllabu));
        if (syllabus.length > 0) {
            Gson gson = new GsonBuilder().setExclusionStrategies(new ExcludeProxiedFields()).create();
            data = gson.toJson(syllabus);
            status = "2";
            message = "Información obetnida con éxito.";
            System.out.println(data);

        } else {
            status = "4";
            message = "No se ha encontrado información.";
        }

        return new String[]{status, message, data};
    }

    public JsonObject syllabuToJson(List<Syllabu> syllabus) {

        JsonObject jsonObject = new JsonObject();
//        for (Syllabu syllabu : syllabus) {
//            jsonObject.addProperty("id_syllabu", syllabu.getId().toString());
//            jsonObject.addProperty("name_syllabu", syllabu.getNameSyllabu());
//            jsonObject.addProperty("description_syllabu", syllabu.getDescriptionSyllabu());
//            jsonObject.addProperty("keywords_syllabu", syllabu.getKeywordsSyllabu());
//            jsonObject.addProperty("pathimg_syllabus", syllabu.getPathimgSyllabus());
//            jsonObject.addProperty("datereg_syllabu", syllabu.getDateregSyllabu().toString());
//            jsonObject.addProperty("dateupdate_syllabu", syllabu.getDateupdateSyllabu().toString());
//            jsonObject.addProperty("state_syllabu", syllabu.getStateSyllabu());
//        }
//        System.out.println(jsonObject.toString());
        return jsonObject;
    }
}
