package com.dua.virtusbk.service;


import com.dua.virtusbk.entity.Person;
import com.dua.virtusbk.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/persons")
public class PersonApi implements UserDetailsService {

    @Autowired
    private PersonRepository personDAO;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    //@RequestMapping(value = "", method = RequestMethod.GET)
    @GetMapping
    public ResponseEntity<List<Person>> getPersons() {
        List<Person> listProducts = personDAO.findAll();
        return ResponseEntity.ok(listProducts);
    }

    @GetMapping(value = "{id}")
    public ResponseEntity<Person> getPersons(@PathVariable("id") Long id_person) {
        Optional<Person> findPerson = personDAO.findById(id_person);
        if (findPerson.isPresent()) {
            return ResponseEntity.ok(findPerson.get());
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping("/byemail/{email}")
    public ResponseEntity<Person> getListOfLaptopsByBrand(@PathVariable String email) {
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

    @PostMapping
    public ResponseEntity<Person> insertPerson(@RequestBody Person person) {
        System.out.println("Email insert: "+person.getEmailPerson());
        Person newPerson = personDAO.save(person);
        return ResponseEntity.ok(newPerson);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("loadUserByEmail");
        Person person = personDAO.findByEmail(email);
        List<GrantedAuthority> typePersonRole = new ArrayList<>();
        typePersonRole.add(new SimpleGrantedAuthority(person.getTypePerson()));
        UserDetails userDetails = new User(person.getEmailPerson(), person.getPasswordPerson(), typePersonRole);
        System.out.println(person.getEmailPerson() + " " + person.getPasswordPerson() + " " + typePersonRole);
        return userDetails;
    }

    @PutMapping
    public ResponseEntity<Person> updatePerson(@RequestBody Person person) {
        Person upPerson = personDAO.save(person);
        if (upPerson != null) {
            return ResponseEntity.ok(upPerson);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping(value = "{id}")
    public ResponseEntity<Person> deletePerson(@PathVariable("id") Long id_person) {
        personDAO.deleteById(id_person);
        return ResponseEntity.ok(null);
    }

}
