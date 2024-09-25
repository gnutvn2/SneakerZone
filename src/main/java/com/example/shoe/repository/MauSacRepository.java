package com.example.shoe.repository;

import com.example.shoe.entity.MauSac;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MauSacRepository extends JpaRepository<MauSac, Integer> {
    boolean existsByTenMauSac(String tenMauSac);
}
