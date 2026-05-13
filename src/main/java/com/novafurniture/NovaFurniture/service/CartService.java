package com.novafurniture.NovaFurniture.service;

import com.novafurniture.NovaFurniture.dto.request.AddToCartRequest;
import com.novafurniture.NovaFurniture.dto.request.UpdateCartItemRequest;
import com.novafurniture.NovaFurniture.dto.response.CartResponse;

public interface CartService {
    CartResponse getCart(Long userId);
    CartResponse addToCart(Long userId, AddToCartRequest request);
    CartResponse updateCartItem(Long userId, Long cartItemId, UpdateCartItemRequest request);
    CartResponse removeCartItem(Long userId, Long cartItemId);
    void clearCart(Long userId);
}