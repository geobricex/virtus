package com.dua.virtusbk.controller;

import com.dua.virtusbk.entity.Person;
import com.dua.virtusbk.repository.PersonRepository;
import com.dua.virtusbk.util.DataStatic;
import com.dua.virtusbk.util.Methods;
import com.dua.virtusbk.util.TemplateEmail;
import com.dua.virtusbk.util.WeEncoder;
import com.google.gson.JsonObject;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class PersonController {
    @Autowired
    private PersonRepository personDAO;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private WeEncoder weEncoder;

    public String[] sigUp(Person person) {
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";
        if (Methods.comprobeEmail(person.getEmailPerson())
                && ((Methods.comprobePassword(person.getPasswordPerson())
                && person.getTypePerson().equals("native")))
                && Methods.testregex("[0-9]+\\-[0-9]+\\-[0-9]+", person.getIdLocation())) {

            String sendEmailCode = weEncoder.getEmailCode();

            person.setCodeverificationPerson(sendEmailCode);
            person.setEmailPerson(person.getEmailPerson().toLowerCase());
            person.setPasswordPerson(bCryptPasswordEncoder.encode(person.getPasswordPerson()));
            person.setTypePerson("S");
            person = personDAO.save(person);

            if (person.getTypePerson().equals("S")) {
                TemplateEmail templateEmail = new TemplateEmail();
                templateEmail.insertUser(person.getEmailPerson(), person.getNamePerson(), person.getLastnamePerson(), person.getCodeverificationPerson());
                status = "2";
                message = "Usuario registrado con éxito.";
            } else {
                status = "4";
                message = "Datos del usuario no disponibles.";
            }

        } else {
            status = "3";
            message = "Los parámetros ingresados no son válidos";
        }
        return new String[]{status, message, data};
    }

    public String[] logIn(String email, String password, String provider) {
        System.out.println("logIn Controller");
        String status = "4", message = "Error en los parámetros introducidos", data = "[]";
        if (Methods.comprobeEmail(email)
                && ((Methods.comprobePassword(password)
                && provider.equals("native")))) {
            Person person = new Person();
            person.setEmailPerson(email.toLowerCase());
            person.setPasswordPerson(password);

            List<Person> Persons = personDAO.findByEmailList(person.getEmailPerson());

            if (Persons.size() == 1) {// solo exista un usuario con el correo electrónico
                if (bCryptPasswordEncoder.matches(person.getPasswordPerson(), Persons.get(0).getPasswordPerson())) {
                    switch (Persons.get(0).getTypePerson()) {
                        case "S":
                            status = "5";
                            message = "La cuenta no se encuentra verificada.";
                            break;
                        case "I":
                            status = "5";
                            message = "La cuenta se encuentra inactiva.";
                            break;
                        case "A":
                            status = "2";
                            message = "Sesión de administración iniciada con éxito.";
                            break;
                        case "U":
                            status = "2";
                            message = "Sesión iniciada con éxito.";
                            break;
                        default:
                            status = "3";
                            message = "Los parámetros de acceso no son válidos.";
                            return new String[]{status, message, data};
                    }
                    data = "[" + personToJson(Persons.get(0)).toString() + "]";
                } else {
                    status = "3";
                    message = "Correo electrónico y/o contraseña no coinciden.";
                }

            } else {
                status = "4";
                message = "Usuario no encontrado.";
            }
        } else {
            if (!provider.equals("native")) {
                status = "3";
                message = "Los parámetros de acceso no son válidos, verifique que está accediendo con el proveedor correcto.";
            } else {
                status = "3";
                message = "Los parámetros ingresados no son válidos";
            }
        }

        return new String[]{status, message, data};
    }

    public JsonObject personToJson(Person person) {
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("user_token", getJWTTokenfromUser(person));
        jsonObject.addProperty("email_person", person.getEmailPerson());
        jsonObject.addProperty("lastname_person", person.getLastnamePerson());
        jsonObject.addProperty("name_person", person.getNamePerson());
        jsonObject.addProperty("type_person", person.getTypePerson());
        jsonObject.addProperty("provider_person", person.getProviderPerson());
        jsonObject.addProperty("pathimg_person", person.getPathimgPerson());
        return jsonObject;
    }

    public String getJWTTokenfromUser(Person person) {

        List<GrantedAuthority> grantedAuthorities = AuthorityUtils
                .commaSeparatedStringToAuthorityList(person.getTypePerson());

        String tokenJWT = Jwts
                .builder()
                .setId("softtekJWT")
                .setSubject(person.getEmailPerson())
                .claim("user", person.getId())
                .claim("permit", person.getTypePerson())
                .claim("authorities",
                        grantedAuthorities.stream()
                                .map(GrantedAuthority::getAuthority)
                                .collect(Collectors.toList()))
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 10800000))//180 min
                .signWith(SignatureAlgorithm.HS512,
                        DataStatic.privateKey.getBytes()).compact();

        return tokenJWT;
    }

}
