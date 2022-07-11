package com.dua.virtusbk.service;


import com.dua.virtusbk.entity.Person;
import com.dua.virtusbk.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/persons")
public class PersonApis {

    @Autowired
    private PersonRepository personDAO;

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

    @PostMapping
    public ResponseEntity<Person> insertPerson(@RequestBody Person person) {
        System.out.println("Email insert: "+person.getEmailPerson());
        Person newPerson = personDAO.save(person);
        return ResponseEntity.ok(newPerson);
    }

    @PutMapping
    public ResponseEntity<Person> updatePersons(@RequestBody Person person) {
        Person upPerson = personDAO.save(person);
        if (upPerson != null) {
            return ResponseEntity.ok(upPerson);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping(value = "{id}")
    public ResponseEntity<Person> deletePersons(@PathVariable("id") Long id_person) {
        personDAO.deleteById(id_person);
        return ResponseEntity.ok(null);
    }
}
