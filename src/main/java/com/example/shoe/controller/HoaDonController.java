package com.example.shoe.controller;

import com.example.shoe.dto.request.HoaDonRequest;
import com.example.shoe.dto.response.HoaDonResponse;
import com.example.shoe.service.HoaDonService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/hoa-don")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class HoaDonController {

    HoaDonService hoaDonService;

    @GetMapping
    public ResponseEntity<?> getAllHoaDonByTrangThai(String trangThai, Pageable pageable) {
        return ResponseEntity.ok(hoaDonService.getAllHoaDonByTrangThai(trangThai, pageable));
    }

    @PostMapping
    public ResponseEntity<?> createHoaDon(@RequestBody @Valid HoaDonRequest request) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(hoaDonService.createHoaDon(request));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Lỗi tạo hóa đơn: " + e.getMessage());
        }
    }

    @GetMapping("/{hoaDonId}")
    public ResponseEntity<?> getOneHoaDon(@PathVariable("hoaDonId") Integer hoaDonId) {
        return ResponseEntity.status(HttpStatus.OK).body(hoaDonService.getOneHoaDon(hoaDonId));
    }

    @PutMapping("/{hoaDonId}")
    public ResponseEntity<?> updateHoaDon(@PathVariable("hoaDonId") Integer hoaDonId,
                                          @RequestBody @Valid HoaDonRequest request) {
        try {
            HoaDonResponse hoaDon = hoaDonService.getOneHoaDon(hoaDonId);
            if ("Đã thanh toán".equals(hoaDon.getTrangThai())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Hóa đơn đã thanh toán, không thể cập nhật");
            }
            return ResponseEntity.status(HttpStatus.OK).body(hoaDonService.updateHoaDon(hoaDonId, request));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Lỗi cập nhật hóa đơn: " + e.getMessage());
        }
    }

    @DeleteMapping("{hoaDonId}")
    public ResponseEntity<?> deleteHoaDon(@PathVariable("hoaDonId") Integer hoaDonId) {
        try {
            HoaDonResponse hoaDon = hoaDonService.getOneHoaDon(hoaDonId);
            if ("Đã thanh toán".equals(hoaDon.getTrangThai())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Hóa đơn đã thanh toán, không thể xóa");
            }
            hoaDonService.deleteHoaDon(hoaDonId);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi hệ thống");
        }
    }
}

