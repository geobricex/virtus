package com.dua.virtusbk.controller;

import com.dua.virtusbk.ExcludeProxiedFields;
import com.dua.virtusbk.entity.Course;
import com.dua.virtusbk.entity.Person;
import com.dua.virtusbk.entity.PersonsCours;
import com.dua.virtusbk.repository.CourseRepository;
import com.dua.virtusbk.repository.PersonsCourseRepository;
import com.dua.virtusbk.util.Methods;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.xml.crypto.Data;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.List;


@Service
@Transactional
public class CourseController {
    @Autowired
    private CourseRepository courseDAO;

    @Autowired
    private PersonsCourseRepository personcourseDAO;

    public String[] saveCourse(Course course, String id_person) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";

        course.setPersonsIdPerson(new Person(Long.parseLong(id_person)));
        course.setDateregCourse(Methods.nowLocalDateTime());
        course.setDateupdateCourse(Methods.nowLocalDateTime());
        course.setStateCourse("A");
        course = courseDAO.save(course);

        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("id_course", course.getId());
        status = "2";
        message = "Curso registrado con éxito.";
        data = jsonObject.toString();

        return new String[]{status, message, data};
    }

    public String[] updateCourse(Course course, String id_person) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";

        course = courseDAO.save(course);

        status = "2";
        message = "Curso actualizado con éxito.";
        data = "[{\"id_course\":" + course.getId() + "}]";

        return new String[]{status, message, data};
    }

    public String[] joinCourse(String id_course, String id_person) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";
        PersonsCours personsCours = new PersonsCours();

        personsCours.setPersonsIdPerson(new Person(Long.parseLong(id_person)));
        personsCours.setCoursesIdCourse(new Course(Long.parseLong(id_course)));

//        Person person = new Person();
//        Course course = new Course();
//        person.setId(Long.parseLong(id_person));
//        course.setId(Long.parseLong(id_course));
//        personsCours.setPersonsIdPerson(person);
//        personsCours.setCoursesIdCourse(course);

        personsCours.setStatePersonCourse("A");
        personsCours.setDateregPersonCourse(Methods.nowLocalDateTime());

        personsCours = personcourseDAO.save(personsCours);

        Gson gson = new GsonBuilder().setExclusionStrategies(new ExcludeProxiedFields()).create();

        data = gson.toJson(personsCours);
        status = "2";
        message = "Información recuperada con éxito.";

        return new String[]{status, message, data};
    }

    public String[] myCourseJoin(String id_person, String state_course_person) {
        System.out.println("myCourseJoin");
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";

        String personsCours = personcourseDAO.findByPersonCourseF(Long.parseLong(id_person), state_course_person);

        JsonArray jso = Methods.stringToJsonArray(personsCours);
        if (!jso.toString().equals("[]")) {
            status = "2";
            message = "Información retornada con éxito.";
            data = jso.toString();
        }

        System.out.println(data);
        return new String[]{status, message, data};
    }

    public String[] allCourseNoJoin(String id_person, String state_course_person) {
        System.out.println("allCourseNoJoin");
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";

        String personsCours = personcourseDAO.finAllCourseNoJoin(Long.parseLong(id_person), state_course_person);
        JsonArray jso = Methods.stringToJsonArray(personsCours);
        if (!jso.toString().equals("[]")) {
            status = "2";
            message = "Información retornada con éxito.";
            data = jso.toString();
        }

        System.out.println(data);
        return new String[]{status, message, data};
    }

    public String[] selectCourseSyllabuTopic(String id_course) {
        System.out.println("allCourseNoJoin");
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";

        String personsCours = personcourseDAO.finSelectCourseSyllabuTopic(Long.parseLong(id_course));
        JsonArray jso = Methods.stringToJsonArray(personsCours);
        if (!jso.toString().equals("[]")) {
            status = "2";
            message = "Información retornada con éxito.";
            data = jso.toString();
        }

        System.out.println(data);
        return new String[]{status, message, data};
    }
}
