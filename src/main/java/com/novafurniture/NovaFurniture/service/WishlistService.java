package com.novafurniture.NovaFurniture.service;

import com.novafurniture.NovaFurniture.dto.response.PageResponse;
import com.novafurniture.NovaFurniture.dto.response.WishlistItemResponse;

public interface WishlistService {
    WishlistItemResponse toggleWishlist(Long userId, Long productId);
    PageResponse<WishlistItemResponse> getMyWishlist(Long userId, int page, int size);
    boolean isWishlisted(Long userId, Long productId);
}