package com.novafurniture.NovaFurniture.service.impl;

import com.novafurniture.NovaFurniture.dto.response.PageResponse;
import com.novafurniture.NovaFurniture.dto.response.WishlistItemResponse;
import com.novafurniture.NovaFurniture.entity.Product;
import com.novafurniture.NovaFurniture.entity.User;
import com.novafurniture.NovaFurniture.entity.WishlistItem;
import com.novafurniture.NovaFurniture.exception.AppException;
import com.novafurniture.NovaFurniture.exception.ErrorCode;
import com.novafurniture.NovaFurniture.mapper.WishlistMapper;
import com.novafurniture.NovaFurniture.repository.ProductRepository;
import com.novafurniture.NovaFurniture.repository.UserRepository;
import com.novafurniture.NovaFurniture.repository.WishlistRepository;
import com.novafurniture.NovaFurniture.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WishlistServiceImpl implements WishlistService {

    private final WishlistRepository wishlistRepository;
    private final ProductRepository  productRepository;
    private final UserRepository     userRepository;
    private final WishlistMapper     wishlistMapper;

    @Override
    @Transactional
    public WishlistItemResponse toggleWishlist(Long userId, Long productId) {

        // Nếu đã có → remove và trả về null
        Optional<WishlistItem> existing = wishlistRepository
                .findByUserIdAndProductId(userId, productId);

        if (existing.isPresent()) {
            wishlistRepository.delete(existing.get());
            wishlistRepository.flush();
            return null;
        }

        // Chưa có → add mới
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        WishlistItem item = WishlistItem.builder()
                .user(user)
                .product(product)
                .build();

        return wishlistMapper.toResponse(wishlistRepository.save(item));
    }

    @Override
    public PageResponse<WishlistItemResponse> getMyWishlist(Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<WishlistItem> items = wishlistRepository.findByUserId(userId, pageable);

        return PageResponse.<WishlistItemResponse>builder()
                .content(items.getContent().stream().map(wishlistMapper::toResponse).toList())
                .pageNumber(items.getNumber())
                .pageSize(items.getSize())
                .totalElements(items.getTotalElements())
                .totalPages(items.getTotalPages())
                .last(items.isLast())
                .build();
    }

    @Override
    public boolean isWishlisted(Long userId, Long productId) {
        return wishlistRepository.existsByUserIdAndProductId(userId, productId);
    }
}