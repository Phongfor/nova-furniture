package com.novafurniture.NovaFurniture.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {

    // SYSTEM
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),

    // USER MODULE
    USER_NOT_FOUND(1101, "User not found", HttpStatus.NOT_FOUND),
    USER_ALREADY_EXISTS(1102, "User already exists", HttpStatus.CONFLICT),

    // AUTH MODULE
    UNAUTHENTICATED(1201, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1202, "You do not have permission", HttpStatus.FORBIDDEN),
    INVALID_CREDENTIALS(1203, "Email or password is incorrect", HttpStatus.UNAUTHORIZED),
    INVALID_TOKEN(1204, "Invalid or expired token", HttpStatus.UNAUTHORIZED),

    // PRODUCT MODULE
    PRODUCT_NOT_FOUND(2001, "Product not found", HttpStatus.NOT_FOUND),
    CATEGORY_NOT_FOUND(2002, "Category not found", HttpStatus.NOT_FOUND),
    BRAND_NOT_FOUND(2003, "Brand not found", HttpStatus.NOT_FOUND),
    CATEGORY_HAS_CHILDREN(2004, "Cannot delete category that has sub-categories", HttpStatus.BAD_REQUEST),

    //CART MODULE
    CART_ITEM_NOT_FOUND(4001, "Cart item not found", HttpStatus.NOT_FOUND),
    CART_ITEM_ALREADY_EXISTS(4002, "Product already in cart", HttpStatus.CONFLICT),
    INSUFFICIENT_STOCK(4003, "Insufficient stock", HttpStatus.BAD_REQUEST),

    // ORDER MODULE
    ORDER_NOT_FOUND(3001, "Order not found", HttpStatus.NOT_FOUND),
    CART_EMPTY(4004,"Cart is empty", HttpStatus.BAD_REQUEST),
    ORDER_CANNOT_CANCEL(3002,"Only PENDING orders can be cancelled", HttpStatus.BAD_REQUEST);

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}