package com.example.shoe.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.shoe.dto.request.ChiTietSanPhamRequest;
import com.example.shoe.dto.response.ChiTietSanPhamResponse;
import com.example.shoe.entity.*;
import com.example.shoe.mapper.ShoeMapper;
import com.example.shoe.repository.*;
import com.example.shoe.service.ChiTietSanPhamService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Map;
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ChiTietSanPhamImpl implements ChiTietSanPhamService {
    Logger logger = LoggerFactory.getLogger(ChiTietSanPhamImpl.class);
    ChiTietSanPhamRepository chiTietSanPhamRepository;
    ShoeMapper shoeMapper;
    Cloudinary cloudinary;
    SanPhamRepository sanPhamRepository;
    MauSacRepository mauSacRepository;
    SizeRepository sizeRepository;
    ChatLieuRepository chatLieuRepository;
    DeGiayRepository deGiayRepository;

    @Override
    public Page<ChiTietSanPhamResponse> getAllChiTietSanPhamBySanPhamId(Integer id, Pageable pageable) {
        Page<ChiTietSanPham> chiTietSanPhamPage = chiTietSanPhamRepository.findBySanPhamId(id, pageable);
        Page<ChiTietSanPhamResponse> responsePage =
                chiTietSanPhamPage.map(chiTietSanPham -> shoeMapper.toChiTietSanPhamResponse(chiTietSanPham));
        return responsePage;
    }

    @Override
    public ChiTietSanPhamResponse getChiTietSanPhamById(Integer id) {
        ChiTietSanPham chiTietSanPham = chiTietSanPhamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(id + " chi tiết sản phẩm không tồn tại!"));
        return shoeMapper.toChiTietSanPhamResponse(chiTietSanPham);
    }

    @Override
    public ChiTietSanPhamResponse createChiTietSanPham(ChiTietSanPhamRequest request) {
        String imageUrl = "";
        try {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(request.getHinhAnh().getBytes(), ObjectUtils.emptyMap());
            imageUrl = (String) uploadResult.get("url");
        } catch (IOException e) {
            logger.error("Lỗi khi upload hình ảnh lên Cloudinary", e);
            throw new RuntimeException("Upload hình ảnh thất bại!", e);
        }

        ChiTietSanPham chiTietSanPham = shoeMapper.toChiTietSanPham(request);
        chiTietSanPham.setHinhAnh(imageUrl);

        chiTietSanPham = chiTietSanPhamRepository.save(chiTietSanPham);

        return shoeMapper.toChiTietSanPhamResponse(chiTietSanPham);
    }

    @Override
    public ChiTietSanPhamResponse updateChiTietSanPham(Integer id, ChiTietSanPhamRequest request) {
        logger.info("Cập nhật chi tiết sản phẩm với ID: " + id);
        ChiTietSanPham chiTietSanPham = chiTietSanPhamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Chi tiết sản phẩm không tồn tại!"));

        if (!request.getTenChiTietSanPham().equals(chiTietSanPham.getTenChiTietSanPham())) {
            chiTietSanPham.setTenChiTietSanPham(request.getTenChiTietSanPham());
        }

        if (request.getHinhAnh() != null && !request.getHinhAnh().isEmpty()) {
            logger.info("Đang cập nhật hình ảnh mới cho sản phẩm với ID: " + id);
            String hinhAnhUrl = uploadImage(request.getHinhAnh());
            chiTietSanPham.setHinhAnh(hinhAnhUrl);
        }

        updateChiTietSanPhamDetails(chiTietSanPham, request);

        chiTietSanPham = chiTietSanPhamRepository.save(chiTietSanPham);
        return shoeMapper.toChiTietSanPhamResponse(chiTietSanPham);
    }

    private void updateChiTietSanPhamDetails(ChiTietSanPham chiTietSanPham, ChiTietSanPhamRequest request) {
        chiTietSanPham.setSanPham(sanPhamRepository.findById(request.getSanPhamId())
                .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại!")));

        chiTietSanPham.setSize(sizeRepository.findById(request.getSizeId())
                .orElseThrow(() -> new RuntimeException("Size không tồn tại!")));

        chiTietSanPham.setMauSac(mauSacRepository.findById(request.getMauSacId())
                .orElseThrow(() -> new RuntimeException("Màu sắc không tồn tại!")));

        chiTietSanPham.setChatLieu(chatLieuRepository.findById(request.getChatLieuId())
                .orElseThrow(() -> new RuntimeException("Chất liệu không tồn tại!")));

        chiTietSanPham.setDeGiay(deGiayRepository.findById(request.getDeGiayId())
                .orElseThrow(() -> new RuntimeException("Đế giày không tồn tại!")));

        chiTietSanPham.setMaChiTietSanPham(request.getMaChiTietSanPham());
        chiTietSanPham.setTenChiTietSanPham(request.getTenChiTietSanPham());
        chiTietSanPham.setSoLuongTon(request.getSoLuongTon());
        chiTietSanPham.setGia(request.getGia());
        chiTietSanPham.setTrangThai(request.getTrangThai());
    }

    private String uploadImage(MultipartFile hinhAnh) {
        try {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(hinhAnh.getBytes(), ObjectUtils.emptyMap());
            return (String) uploadResult.get("url");
        } catch (IOException e) {
            logger.error("Lỗi khi upload hình ảnh lên Cloudinary", e);
            throw new RuntimeException("Lỗi khi upload hình ảnh lên Cloudinary", e);
        }
    }

    @Override
    public void deleteChiTietSanPham(Integer id) {
        logger.info("Đang xóa chi tiết sản phẩm với ID: " + id);
        if (!chiTietSanPhamRepository.existsById(id)) {
            throw new RuntimeException("Chi tiết sản phẩm không tồn tại");
        }
        try {
            chiTietSanPhamRepository.deleteById(id);
            logger.info("Đã xóa chi tiết sản phẩm với ID: " + id);
        } catch (DataIntegrityViolationException e) {
            logger.error("Không thể xóa chi tiết sản phẩm với ID: " + id + " do ràng buộc dữ liệu.", e);
            throw new DataIntegrityViolationException("Không thể xóa chi tiết sản phẩm do có liên kết với dữ liệu khác.", e);
        } catch (Exception e) {
            logger.error("Lỗi khi xóa chi tiết sản phẩm với ID: " + id, e);
            throw new RuntimeException("Đã xảy ra lỗi khi xóa chi tiết sản phẩm.", e);
        }
    }


    @Override
    public Page<ChiTietSanPhamResponse> searchChiTietSanPham(String keyword, Pageable pageable) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return chiTietSanPhamRepository.findAll(pageable)
                    .map(shoeMapper::toChiTietSanPhamResponse);
        }
        return chiTietSanPhamRepository.searchChiTietSanPham(keyword.trim(), pageable)
                .map(shoeMapper::toChiTietSanPhamResponse);
    }
}
