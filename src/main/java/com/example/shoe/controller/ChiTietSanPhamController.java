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
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("chi-tiet-san-pham")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChiTietSanPhamController {
    ChiTietSanPhamService chiTietSanPhamService;

    @GetMapping("/san-pham/{sanPhamId}")
    public ResponseEntity<?> getAllChiTietSanPhamBySanPhamId(@PathVariable Integer sanPhamId, Pageable pageable) {
        Page<ChiTietSanPhamResponse> response = chiTietSanPhamService.getAllChiTietSanPhamBySanPhamId(sanPhamId, pageable);
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "/san-pham/{sanPhamId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createChiTietSanPhamBySanPhamId(
            @PathVariable Integer sanPhamId,
            @Valid @ModelAttribute ChiTietSanPhamRequest request) {
            ChiTietSanPhamResponse response = chiTietSanPhamService.createChiTietSanPhamBySanPhamId(sanPhamId, request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/san-pham/{sanPhamId}/chi-tiet/{chiTietSanPhamId}")
    public ResponseEntity<?> getChiTietSanPhamBySanPhamId(
            @PathVariable Integer sanPhamId,
            @PathVariable Integer chiTietSanPhamId) {
        ChiTietSanPhamResponse response = chiTietSanPhamService.getChiTietSanPhamByIdAndSanPhamId(chiTietSanPhamId, sanPhamId);
        return ResponseEntity.ok(response);
    }

    @PutMapping(value = "/san-pham/{sanPhamId}/chi-tiet/{chiTietSanPhamId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateChiTietSanPham(
            @PathVariable Integer sanPhamId,
            @PathVariable Integer chiTietSanPhamId,
            @Valid @ModelAttribute ChiTietSanPhamRequest request,
            @RequestParam(required = false) MultipartFile hinhAnh) {
        try {
            ChiTietSanPhamResponse response = chiTietSanPhamService.updateChiTietSanPhamBySanPhamId(sanPhamId, chiTietSanPhamId, request, hinhAnh); // Truyền hinhAnh
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đã xảy ra lỗi khi cập nhật chi tiết sản phẩm.");
        }
    }


    @DeleteMapping("/san-pham/{sanPhamId}/chi-tiet/{chiTietSanPhamId}")
    public ResponseEntity<?> deleteChiTietSanPham(@PathVariable Integer sanPhamId, @PathVariable Integer chiTietSanPhamId) {
        try {
            chiTietSanPhamService.deleteChiTietSanPhamBySanPhamId(sanPhamId, chiTietSanPhamId);
            return ResponseEntity.noContent().build();
        } catch (DataIntegrityViolationException e) {
            // 409 Conflict: Nếu có ràng buộc dữ liệu không thể xóa
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Không thể xóa chi tiết sản phẩm do có liên kết với dữ liệu khác.");
        } catch (RuntimeException e) {
            // 404 Not Found: Nếu chi tiết sản phẩm hoặc sản phẩm không tồn tại
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        } catch (Exception e) {
            // 500 Internal Server Error: Lỗi không lường trước khác
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Đã xảy ra lỗi khi xóa chi tiết sản phẩm.");
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchChiTietSanPham(
            @RequestParam Integer sanPhamId,
            @RequestParam(required = false) String keyword,
            Pageable pageable) {
        Page<ChiTietSanPhamResponse> response = chiTietSanPhamService.searchChiTietSanPham(sanPhamId, keyword, pageable);
        return ResponseEntity.ok(response);
    }


}
