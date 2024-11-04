package com.example.shoe.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "vai_tro")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VaiTro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Column(name = "ma_vai_tro")
    String maVaiTro;
    @Column(name = "ten_vai_tro")
    String tenVaiTro;
}
