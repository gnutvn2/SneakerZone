package com.example.shoe.controller;

import com.example.shoe.dto.request.NhanVienRequest;
import com.example.shoe.service.NhanVienService;
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
@RequestMapping("/nhan-vien")
public class NhanVienController {
    NhanVienService nhanVienService;

    @GetMapping
    public ResponseEntity<?> getNhanVienByStatus(@RequestParam(required = false) Boolean trangThai) {
        return ResponseEntity.ok(nhanVienService.getAllNhanVien(trangThai));
    }

    @PostMapping
    public ResponseEntity<?> createNhanVien(@RequestBody @Valid NhanVienRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(nhanVienService.createNhanVien(request));
    }

    @GetMapping("/{nhanVienId}")
    public ResponseEntity<?> getOneNhanVien(@PathVariable("nhanVienId") Integer nhanVienId) {
        return ResponseEntity.ok(nhanVienService.getOneNhanVien(nhanVienId));
    }

    @PutMapping("/{nhanVienId}")
    public ResponseEntity<?> updateNhanVien(@PathVariable("nhanVienId") Integer nhanVienId,
                                            @RequestBody @Valid NhanVienRequest request) {
        return ResponseEntity.ok(nhanVienService.updateNhanVien(nhanVienId, request));
    }

    @PutMapping("/changeStatus/{nhanVienId}")
    public ResponseEntity<String> changeStatus(@PathVariable("nhanVienId") Integer nhanVienId) {
        try {
            Boolean newStatus = nhanVienService.changeStatus(nhanVienId);
            String statusMessage = newStatus ? "Hoạt động" : "Ngừng hoạt động";
            return ResponseEntity.status(HttpStatus.OK).body("Nhân viên với ID: " + nhanVienId + " , trạng thái mới: " + statusMessage);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy nhân viên với ID: " + nhanVienId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đã xảy ra lỗi: " + e.getMessage());
        }
    }

}
