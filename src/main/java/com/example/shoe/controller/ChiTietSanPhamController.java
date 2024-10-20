package com.example.shoe.controller;

import com.example.shoe.dto.request.ChiTietSanPhamRequest;
import com.example.shoe.dto.response.ChiTietSanPhamResponse;
import com.example.shoe.service.ChiTietSanPhamService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("chi-tiet-san-pham")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChiTietSanPhamController {
    ChiTietSanPhamService chiTietSanPhamService;

    @GetMapping("/san-pham/{id}")
    public ResponseEntity<?> getAllChiTietSanPhamBySanPhamId(@PathVariable Integer id, Pageable pageable) {
        Page<ChiTietSanPhamResponse> response = chiTietSanPhamService.getAllChiTietSanPhamBySanPhamId(id, pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getChiTietSanPhamById(@PathVariable Integer id) {
        ChiTietSanPhamResponse response = chiTietSanPhamService.getChiTietSanPhamById(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createChiTietSanPham(@Valid @ModelAttribute ChiTietSanPhamRequest request) {
        ChiTietSanPhamResponse response = chiTietSanPhamService.createChiTietSanPham(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateChiTietSanPham(@PathVariable Integer id, @ModelAttribute ChiTietSanPhamRequest request) {
        try {
            ChiTietSanPhamResponse response = chiTietSanPhamService.updateChiTietSanPham(id, request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đã xảy ra lỗi khi cập nhật chi tiết sản phẩm.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteChiTietSanPham(@PathVariable Integer id) {
        try {
            chiTietSanPhamService.deleteChiTietSanPham(id);
            return ResponseEntity.noContent().build();
        } catch (DataIntegrityViolationException e) {
            // 409 Conflict: Nếu có ràng buộc dữ liệu không thể xóa
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Không thể xóa chi tiết sản phẩm do có liên kết với dữ liệu khác.");
        } catch (RuntimeException e) {
            // 404 Not Found: Nếu chi tiết sản phẩm không tồn tại
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Chi tiết sản phẩm không tồn tại.");
        } catch (Exception e) {
            // 500 Internal Server Error: Lỗi không lường trước khác
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Đã xảy ra lỗi khi xóa chi tiết sản phẩm.");
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchChiTietSanPham(@RequestParam(required = false) String keyword, Pageable pageable) {
        Page<ChiTietSanPhamResponse> response = chiTietSanPhamService.searchChiTietSanPham(keyword, pageable);
        return ResponseEntity.ok(response);
    }

}
