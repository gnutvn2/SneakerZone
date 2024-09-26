package com.example.shoe.controller;

import com.example.shoe.dto.request.SanPhamRequest;
import com.example.shoe.dto.response.SanPhamResponse;
import com.example.shoe.entity.SanPham;
import com.example.shoe.service.SanPhamService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/san-pham")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SanPhamController {
    SanPhamService sanPhamService;

    @GetMapping("")
    public ResponseEntity<?> getAllSanPham(
            @RequestParam(defaultValue = "true") Boolean trangThai,
            Pageable pageable
    ) {
        Page<SanPham> sanPham = sanPhamService.getSanPham(trangThai, pageable);
        System.out.println(trangThai);
        return ResponseEntity.ok(sanPham);
    }

    @PostMapping("")
    public ResponseEntity<?> createSanPham(@RequestBody @Valid SanPhamRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(sanPhamService.createSanPham(request));
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getSanPhamId(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(sanPhamService.getSanPhamId(id));
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updateSanPham(@PathVariable("id") Integer id, @RequestBody @Valid SanPhamRequest request) {
        return ResponseEntity.ok(sanPhamService.updateSanPham(id, request));
    }

    @PutMapping("/status/{id}")
    public Boolean updateTrangThai(@PathVariable Integer id) {
       return sanPhamService.updateTrangThai(id);
    }

}
