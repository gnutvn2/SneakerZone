package com.example.shoe.controller;

import com.example.shoe.dto.request.ThuongHieuRequest;
import com.example.shoe.entity.ThuongHieu;
import com.example.shoe.service.ThuongHieuService;
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
@RequestMapping("/thuong-hieu")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ThuongHieuController {
    ThuongHieuService thuongHieuService;

    @GetMapping("")
    public ResponseEntity<?> getAllThuongHieu(Pageable pageable) {
        Page<ThuongHieu> thuongHieu = thuongHieuService.getThuongHieu(pageable);
        return ResponseEntity.ok(thuongHieu);
    }

    @PostMapping("")
    public ResponseEntity<?> createThuongHieu(@RequestBody @Valid ThuongHieuRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(thuongHieuService.createThuongHieu(request));
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getThuongHieuId(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(thuongHieuService.getThuongHieuId(id));
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updateThuongHieu(@PathVariable("id") Integer id, @RequestBody @Valid ThuongHieuRequest thuongHieuRequest) {
        return ResponseEntity.ok(thuongHieuService.updateThuongHieu(id, thuongHieuRequest));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteThuongHieu(@PathVariable("id") Integer id) {
        thuongHieuService.deleteThuongHieu(id);
        return ResponseEntity.status(HttpStatus.OK).body("Xóa thương hiệu thành công!");
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchThuongHieu(
            @RequestParam(required = false) String keyword,
            Pageable pageable){
        Page<ThuongHieu> thuongHieu = thuongHieuService.searchThuongHieu(keyword, pageable);
        return ResponseEntity.ok(thuongHieu);
    }
}
