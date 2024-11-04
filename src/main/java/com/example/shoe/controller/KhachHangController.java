package com.example.shoe.controller;

import com.example.shoe.dto.request.KhachHangRequest;
import com.example.shoe.dto.response.KhachHangResponse;
import com.example.shoe.service.KhachHangService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/khach-hang")
public class KhachHangController {
    KhachHangService khachHangService;

    @GetMapping
    public ResponseEntity<?> getAllKhachHang(@RequestParam(value = "keyword", required = false) String keyword,
                                             Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(khachHangService.getAllKhachHang(pageable, keyword));
    }

    @PostMapping
    public ResponseEntity<?> createKhachHang(@RequestBody @Valid KhachHangRequest request) {
        KhachHangResponse newKhachHang = khachHangService.createKhachHang(request);
        return ResponseEntity.status(HttpStatus.OK).body(newKhachHang);
    }

    @GetMapping("/{khachHangId}")
    public ResponseEntity<?> getOneKhachHang(@PathVariable("khachHangId") Integer khachHangId) {
        KhachHangResponse getOne = khachHangService.getOneKhachHang(khachHangId);
        return ResponseEntity.status(HttpStatus.OK).body(getOne);
    }

    @PutMapping("/{khachHangId}")
    public ResponseEntity<?> updateKhachHang(@PathVariable("khachHangId") Integer khachHangId,
                                             @RequestBody @Valid KhachHangRequest request) {
        KhachHangResponse updateKhachHang = khachHangService.updateKhachHang(khachHangId, request);
        return ResponseEntity.status(HttpStatus.OK).body(updateKhachHang);
    }

    @DeleteMapping("/{khachHangId}")
    public ResponseEntity<?> deleteKhachHang(@PathVariable("khachHangId") Integer khachHangId) {
        Boolean isDeleted = khachHangService.deleteKhachHang(khachHangId);
        if (isDeleted) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
