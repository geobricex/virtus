package com.dua.virtusbk.repository;

import com.dua.virtusbk.entity.Person;
import com.dua.virtusbk.entity.Setting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface SettingRepository extends JpaRepository<Setting, Long> {

    List<Setting> findByPersonsIdPersonOrderByDateregSettingDesc(Person person);

}
