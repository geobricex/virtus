package com.dua.virtusbk.controller;

import com.dua.virtusbk.entity.Course;
import com.dua.virtusbk.entity.Person;
import com.dua.virtusbk.entity.PersonsCours;
import com.dua.virtusbk.repository.CourseRepository;
import com.dua.virtusbk.repository.PersonsCourseRepository;
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


@Service
@Transactional
public class CourseController {
    @Autowired
    private CourseRepository courseDAO;

    @Autowired
    private PersonsCourseRepository personcourseDAO;


    public String[] saveCourse(Course course) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";

        course = courseDAO.save(course);

        status = "2";
        message = "Curso registrado con éxito.";


        return new String[]{status, message, data};
    }

    public String[] updateCourse(Course course) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";

        course = courseDAO.save(course);

        status = "2";
        message = "Curso actualizado con éxito.";

        return new String[]{status, message, data};
    }

    public String[] joinCourse(String id_course, String id_person) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";
        PersonsCours personsCours = new PersonsCours();
        Person person = new Person();
        Course course = new Course();

        person.setId(Long.parseLong(id_person));
        course.setId(Long.parseLong(id_course));

        personsCours.setPersonsIdPerson(person);
        personsCours.setCoursesIdCourse(course);

        String timeStamp = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss").format(Calendar.getInstance().getTime());
        personsCours.setDateregPersonCourse(Instant.parse(timeStamp));

        personsCours = personcourseDAO.save(personsCours);

        status = "2";
        message = "Curso actualizado con éxito.";

        return new String[]{status, message, data};
    }

}
