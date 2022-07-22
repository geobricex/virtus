package com.dua.virtusbk.service;


import com.dua.virtusbk.entity.Util;
import com.dua.virtusbk.repository.PersonRepository;
import com.dua.virtusbk.repository.UtilRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/utils")
public class UtilApis {

    @Autowired
    private UtilRepository utilDAO;

    //@RequestMapping(value = "", method = RequestMethod.GET)
    @GetMapping
    public ResponseEntity<List<Util>> getUtils() {
        List<Util> listUtils = utilDAO.findAll();
        return ResponseEntity.ok(listUtils);
    }

    @GetMapping(value = "{id}")
    public ResponseEntity<Util> getUtils(@PathVariable("id") String id_util) {
        Optional<Util> findUtil = utilDAO.findById(id_util);
        if (findUtil.isPresent()) {
            return ResponseEntity.ok(findUtil.get());
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @PostMapping
    public ResponseEntity<Util> insertUtil(@RequestBody Util util) {
        Util newUtil = utilDAO.save(util);
        return ResponseEntity.ok(newUtil);
    }

    @PutMapping
    public ResponseEntity<Util> updateUtil(@RequestBody Util util) {
        Util upUtil = utilDAO.save(util);
        if (upUtil != null) {
            return ResponseEntity.ok(upUtil);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping(value = "{id}")
    public ResponseEntity<Util> deleteUtil(@PathVariable("id") String id_util) {
        utilDAO.deleteById(id_util);
        return ResponseEntity.ok(null);
    }
}
