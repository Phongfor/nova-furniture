package com.novafurniture.NovaFurniture.service.impl;

import com.novafurniture.NovaFurniture.dto.request.AddToCartRequest;
import com.novafurniture.NovaFurniture.dto.request.UpdateCartItemRequest;
import com.novafurniture.NovaFurniture.dto.response.CartItemResponse;
import com.novafurniture.NovaFurniture.dto.response.CartResponse;
import com.novafurniture.NovaFurniture.entity.CartItem;
import com.novafurniture.NovaFurniture.entity.Product;
import com.novafurniture.NovaFurniture.entity.User;
import com.novafurniture.NovaFurniture.exception.AppException;
import com.novafurniture.NovaFurniture.exception.ErrorCode;
import com.novafurniture.NovaFurniture.mapper.CartItemMapper;
import com.novafurniture.NovaFurniture.repository.CartItemRepository;
import com.novafurniture.NovaFurniture.repository.ProductRepository;
import com.novafurniture.NovaFurniture.repository.UserRepository;
import com.novafurniture.NovaFurniture.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CartServiceImpl implements CartService {

    private final CartItemRepository cartItemRepository;
    private final ProductRepository  productRepository;
    private final UserRepository     userRepository;
    private final CartItemMapper     cartItemMapper;

    @Override
    public CartResponse getCart(Long userId) {
        List<CartItem> items = cartItemRepository.findByUserId(userId);
        return buildCartResponse(items);
    }

    @Override
    @Transactional
    public CartResponse addToCart(Long userId, AddToCartRequest request) {
        // Nếu sản phẩm đã có → cộng thêm quantity
        cartItemRepository.findByUserIdAndProductId(userId, request.getProductId())
                .ifPresentOrElse(existing -> {
                    existing.setQuantity(existing.getQuantity() + request.getQuantity());
                    cartItemRepository.save(existing);
                }, () -> {
                    User user = userRepository.findById(userId)
                            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
                    Product product = productRepository.findById(request.getProductId())
                            .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

                    CartItem newItem = CartItem.builder()
                            .user(user)
                            .product(product)
                            .quantity(request.getQuantity())
                            .build();
                    cartItemRepository.save(newItem);
                });

        return getCart(userId);
    }

    @Override
    @Transactional
    public CartResponse updateCartItem(Long userId, Long cartItemId, UpdateCartItemRequest request) {
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new AppException(ErrorCode.CART_ITEM_NOT_FOUND));

        // Đảm bảo item thuộc về user này
        if (!item.getUser().getId().equals(userId)) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        item.setQuantity(request.getQuantity());
        cartItemRepository.save(item);

        return getCart(userId);
    }

    @Override
    @Transactional
    public CartResponse removeCartItem(Long userId, Long cartItemId) {
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new AppException(ErrorCode.CART_ITEM_NOT_FOUND));

        if (!item.getUser().getId().equals(userId)) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        cartItemRepository.delete(item);
        return getCart(userId);
    }

    @Override
    @Transactional
    public void clearCart(Long userId) {
        cartItemRepository.deleteByUserId(userId);
    }

    // ── Helper ──────────────────────────────────────────────────────────────
    private CartResponse buildCartResponse(List<CartItem> items) {
        List<CartItemResponse> itemResponses = items.stream()
                .map(item -> {
                    CartItemResponse resp = cartItemMapper.toResponse(item);
                    BigDecimal subtotal = item.getProduct().getPrice()
                            .multiply(BigDecimal.valueOf(item.getQuantity()));
                    resp.setSubtotal(subtotal);
                    return resp;
                })
                .toList();

        BigDecimal totalPrice = itemResponses.stream()
                .map(CartItemResponse::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        CartResponse cart = new CartResponse();
        cart.setItems(itemResponses);
        cart.setTotalItems(itemResponses.size());
        cart.setTotalPrice(totalPrice);
        return cart;
    }
}