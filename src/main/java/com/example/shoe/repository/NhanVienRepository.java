package com.example.shoe.repository;

import com.example.shoe.entity.NhanVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NhanVienRepository extends JpaRepository<NhanVien, Integer> {
    List<NhanVien> findByTrangThai(Boolean trangThai);
}
