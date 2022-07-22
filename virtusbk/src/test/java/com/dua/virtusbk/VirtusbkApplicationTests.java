package com.dua.virtusbk;

import com.dua.virtusbk.entity.Person;
import com.dua.virtusbk.repository.PersonRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootTest
class VirtusbkApplicationTests {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Test
    void testPerson() {
//        Person person = new Person();
//
//        person.setPasswordPerson(bCryptPasswordEncoder.encode("JenyNoMeQuiere"));
//        System.out.println("PASSWORD= " + person.getPasswordPerson());
//
//        assert (!person.getPasswordPerson().equals("JenyNoMeQuiere"));

//        assert(person.getPasswordPerson().equals("$2a$10$o6hu0j36Aoi/Cotr0JO0E.6OsYNN55pFx8VB9Upwg6s1aSGUh8aYK"));//$2a$10$3vEwZXT5.BbXtnye5BVzDeEnYKFZQHLi0AfwijZ20IiU7.wVoXJpi
    }

}
