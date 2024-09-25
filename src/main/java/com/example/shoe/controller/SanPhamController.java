package com.example.shoe.controller;

import com.example.shoe.dto.request.SanPhamRequest;
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

@CrossOrigin("*")
@RestController
@RequestMapping("/san-pham")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SanPhamController {
    SanPhamService sanPhamService;

    @GetMapping("")
    public ResponseEntity<?> getAllSanPham(Pageable pageable){
        Page<SanPham> sanPham = sanPhamService.getSanPham(pageable);
        return ResponseEntity.ok(sanPham);
    }

    @PostMapping("")
    public ResponseEntity<?> createSanPham(@RequestBody @Valid SanPhamRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(sanPhamService.createSanPham(request));
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getSanPhamId(@PathVariable("id") Integer id){
        return ResponseEntity.ok(sanPhamService.getSanPhamId(id));
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updateSanPham(@PathVariable("id") Integer id, @RequestBody @Valid SanPhamRequest request){
        return ResponseEntity.ok(sanPhamService.updateSanPham(id, request));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteSanPham(@PathVariable("id") Integer id){
        sanPhamService.deleteSanPham(id);
        return ResponseEntity.status(HttpStatus.OK).body("Xóa sản phẩm thành công!");
    }
}
