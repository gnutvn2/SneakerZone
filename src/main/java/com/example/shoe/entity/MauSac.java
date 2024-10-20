package com.example.shoe.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "mau_sac")
public class MauSac {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Column(name = "ma_mau_sac")
    String maMauSac;
    @Column(name = "ten_mau_sac")
    String tenMauSac;
    @OneToMany(mappedBy = "mauSac")
    @JsonManagedReference
    List<ChiTietSanPham> listChiTietSanPham;
}
