package com.example.shoe.controller;

import com.example.shoe.dto.request.ChiTietHoaDonRequest;
import com.example.shoe.service.ChiTietHoaDonService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/chi-tiet-hoa-don")
public class ChiTietHoaDonController {
    ChiTietHoaDonService chiTietHoaDonService;

    @GetMapping("/hoa-don/{hoaDonId}")
    public ResponseEntity<?> getAllChiTietHoaDonByHoaDonId(@PathVariable("hoaDonId") Integer hoaDonId) {
        return ResponseEntity.status(HttpStatus.OK).body(chiTietHoaDonService.getAllChiTietHoaDonByHoaDonId(hoaDonId));
    }

    @PostMapping("/hoa-don/{hoaDonId}")
    public ResponseEntity<?> createChiTietHoaDon(
            @PathVariable("hoaDonId") Integer hoaDonId,
            @RequestBody @Valid ChiTietHoaDonRequest request) {
        request.setHoaDonId(hoaDonId);
        return ResponseEntity.status(HttpStatus.CREATED).body(chiTietHoaDonService.createChiTietHoaDon(request));
    }

    @DeleteMapping("/{chiTietHoaDonId}")
    public ResponseEntity<?> deleteChiTietHoaDon(@PathVariable("chiTietHoaDonId") Integer chiTietHoaDonId) {
        chiTietHoaDonService.deleteChiTietHoaDon(chiTietHoaDonId);
        return ResponseEntity.noContent().build();
    }
}
