package com.example.shoe.controller;

import com.example.shoe.dto.request.SanPhamRequest;
import com.example.shoe.dto.response.SanPhamResponse;
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

@CrossOrigin("*")
@RestController
@RequestMapping("/san-pham")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SanPhamController {
    SanPhamService sanPhamService;

    @GetMapping("")
    public ResponseEntity<?> getAllSanPham(
            @RequestParam(required = false) Boolean trangThai, Pageable pageable) {
        Page<SanPhamResponse> sanPhamPage = sanPhamService.getSanPhamByStatus(trangThai, pageable);
        return ResponseEntity.ok(sanPhamPage);
    }

    @PostMapping("")
    public ResponseEntity<?> createSanPham(@RequestBody @Valid SanPhamRequest request) {
        SanPhamResponse sanPhamResponse = sanPhamService.createSanPham(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(sanPhamResponse);
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getSanPhamById(@PathVariable("id") Integer id) {
        SanPhamResponse sanPhamResponse = sanPhamService.getSanPhamById(id);
        return ResponseEntity.ok(sanPhamResponse);
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updateSanPham(@PathVariable("id") Integer id, @RequestBody @Valid SanPhamRequest request) {
        SanPhamResponse sanPhamResponse = sanPhamService.updateSanPham(id, request);
        return ResponseEntity.ok(sanPhamResponse);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSanPham(@PathVariable Integer id) {
        sanPhamService.deleteSanPham(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<Page<SanPhamResponse>> searchSanPham(
            @RequestParam String keyword,
            @RequestParam(required = false) Boolean trangThai,
            Pageable pageable) {
        Page<SanPhamResponse> sanPhamResponses = sanPhamService.searchSanPham(keyword, trangThai, pageable);
        return ResponseEntity.ok(sanPhamResponses);
    }

}
