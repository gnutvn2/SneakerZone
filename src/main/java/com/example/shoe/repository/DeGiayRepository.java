package com.example.shoe.repository;

import com.example.shoe.entity.DeGiay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeGiayRepository extends JpaRepository<DeGiay, Integer> {
    boolean existsByTenDeGiay(String tenDeGiay);
}
