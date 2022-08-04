package com.dua.virtusbk.service;


import com.dua.virtusbk.controller.PersonController;
import com.dua.virtusbk.entity.Person;
import com.dua.virtusbk.repository.PersonRepository;
import com.dua.virtusbk.util.Methods;
import com.google.gson.JsonObject;
import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/persons")
//@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST})
public class PersonApi {//implements UserDetailsService {

    @Autowired
    private PersonRepository personDAO;

    @Autowired
    public PersonController personController;

    //@RequestMapping(value = "", method = RequestMethod.GET)
    @GetMapping
    public ResponseEntity<List<Person>> getPersons() {
        List<Person> listProducts = personDAO.findAll();
        return ResponseEntity.ok(listProducts);
    }

    @GetMapping(value = "{id}")
    public ResponseEntity<Person> getPerson(@PathVariable("token") String sessionToken) {
        System.out.println("getPerson...");

        String[] clains = Methods.getDataToJwt(sessionToken);
        String[] res = Methods.validatePermit(clains[0], clains[1], 1);
        if (res[0].equals("2")) {
            return ResponseEntity.ok(personController.getPerson(Long.getLong(clains[0])));
        } else {
            return ResponseEntity.noContent().build();
        }

    }

    @GetMapping("/byemail/{email}")
    public ResponseEntity<Person> getListByEmail(@PathVariable String email) {
        Optional<Person> findPerson = Optional.ofNullable(personDAO.findByEmail(email));
        if (findPerson.isPresent()) {
            Person person = findPerson.get();
            person.setPasswordPerson(null);
            person.setCodeverificationPerson(null);
            return ResponseEntity.ok(person);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<Person> insertPerson(@RequestBody @Validated Person person) {
        System.out.println("insertPerson...");
        String[] res = personController.signUp(person);
        if (res[0].equals("2")) {
            return ResponseEntity.ok(person);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/requestcode")
    public ResponseEntity<String> requestCodePerson(@RequestBody String data) {
        System.out.println("requestCodePerson...");
        String message;
        JsonObject jso = Methods.stringToJSON(data);
        if (jso.size() > 0) {
            String flag = Methods.JsonToString(jso, "flag", "");
            String email = Methods.JsonToString(jso, "email", "");
            String code = Methods.JsonToString(jso, "code", "");
            String[] res = personController.requestCode(flag, email, code);

            message = Methods.getJsonMessage(res[0], res[1], res[2]);

            return new ResponseEntity<>(message, HttpStatus.OK);
        } else {
            message = Methods.getJsonMessage("4", "Parametros de entrada vacios.", "[]");
            return new ResponseEntity<>(message, HttpStatus.BAD_GATEWAY);
        }

    }

    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<String> loginByEmail(@RequestBody @Validated String data, @RequestHeader("provider") String dataHeader) {
        System.out.println("logIn...");
        String message;
        JsonObject jso = Methods.stringToJSON(data);
        if (jso.size() > 0) {
            String email = Methods.JsonToString(jso, "email", "");
            String password = Methods.JsonToString(jso, "password", "");
            String provider = dataHeader;

            String[] res = personController.logIn(email, password, provider);

            message = Methods.getJsonMessage(res[0], res[1], res[2]);
            return new ResponseEntity<>(message, HttpStatus.OK);
        } else {
            message = Methods.getJsonMessage("4", "Parametros de entrada vacios.", "[]");
            return new ResponseEntity<>(message, HttpStatus.BAD_GATEWAY);
        }

    }

//    @Override
//    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//        System.out.println("loadUserByEmail");
//        Person person = personDAO.findByEmail(email);
//        List<GrantedAuthority> typePersonRole = new ArrayList<>();
//        typePersonRole.add(new SimpleGrantedAuthority(person.getTypePerson()));
//        UserDetails userDetails = new User(person.getEmailPerson(), person.getPasswordPerson(), typePersonRole);
//        System.out.println(person.getEmailPerson() + " " + person.getPasswordPerson() + " " + typePersonRole);
//        return userDetails;
//    }

    @PutMapping
    public String updatePerson(@RequestBody Person person, @RequestHeader("token") String sessionToken) {
        String message = "[]";
        String[] clains = Methods.getDataToJwt(sessionToken);
        String[] res = Methods.validatePermit(clains[0], clains[1], 1);
        if (res[0].equals("2")) {
            personController.updatePerson(person);
        } else {
            message = Methods.getJsonMessage("4", "Credenciales de sesión inválidas, vuelve a iniciar sesión "
                    + "e intentalo de nuevo.", "[]");
        }
        return message;
    }

    @DeleteMapping(value = "{id}")
    public ResponseEntity<Person> deletePerson(@PathVariable("id") Long id_person) {
        personDAO.deleteById(id_person);
        return ResponseEntity.ok(null);
    }

}
