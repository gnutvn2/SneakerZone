package com.example.shoe.controller;

import com.example.shoe.dto.request.ChiTietSanPhamRequest;
import com.example.shoe.dto.response.ChiTietSanPhamResponse;
import com.example.shoe.service.ChiTietSanPhamService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("chi-tiet-san-pham")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChiTietSanPhamController {

    ChiTietSanPhamService chiTietSanPhamService;

    @GetMapping
    public ResponseEntity<?> getAllChiTietSanPham(Pageable pageable) {
        Page<ChiTietSanPhamResponse> response = chiTietSanPhamService.getAllChiTietSanPham(pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getChiTietSanPhamById(@PathVariable Integer id) {
        ChiTietSanPhamResponse response = chiTietSanPhamService.getChiTietSanPhamById(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<?> createChiTietSanPham(@RequestBody ChiTietSanPhamRequest request) {
        ChiTietSanPhamResponse response = chiTietSanPhamService.createChiTietSanPham(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateChiTietSanPham(@PathVariable Integer id, @RequestBody ChiTietSanPhamRequest request) {
        ChiTietSanPhamResponse response = chiTietSanPhamService.updateChiTietSanPham(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteChiTietSanPham(@PathVariable Integer id) {
        chiTietSanPhamService.deleteChiTietSanPham(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchChiTietSanPham(@RequestParam(required = false) String keyword, Pageable pageable) {
        Page<ChiTietSanPhamResponse> response = chiTietSanPhamService.searchChiTietSanPham(keyword, pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/filter")
    public ResponseEntity<?> filterChiTietSanPham(
            @RequestParam(required = false) String maChiTietSanPham,
            @RequestParam(required = false) Optional<Integer> sanPhamId,
            @RequestParam(required = false) Optional<Integer> sizeId,
            @RequestParam(required = false) Optional<Integer> mauSacId,
            @RequestParam(required = false) Optional<Integer> chatLieuId,
            @RequestParam(required = false) Optional<Double> giaMin,
            @RequestParam(required = false) Optional<Double> giaMax,
            @RequestParam(required = false) Optional<Integer> deGiayId,
            Pageable pageable) {

        Page<ChiTietSanPhamResponse> response = chiTietSanPhamService.filterChiTietSanPham(
                maChiTietSanPham, sanPhamId, sizeId, mauSacId, chatLieuId, giaMin, giaMax, deGiayId, pageable);

        return ResponseEntity.ok(response);
    }

}
