import CommonSidebar from "../common/CommonSidebar";
import { useContext } from "react";
import { SidebarContext } from "../../contexts/SidebarProvider";
import { Link } from "react-router-dom";

export default function CartSidebar({ open, onClose }) {
    const { cartItems } = useContext(SidebarContext);

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    return (
        <CommonSidebar
            open={open}
            onClose={onClose}
            title={`Shopping Cart (${cartItems.length})`}
            footer={
                <div className="space-y-3">
                    {/* Total */}
                    <div className="flex items-center justify-between text-base font-semibold text-black dark:text-white">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-3">
                        <Link
                            to="/cart"
                            onClick={onClose}
                            className="
                                flex-1 rounded-full border border-black
                                py-3 text-center text-sm font-medium
                                text-black transition hover:bg-black hover:text-white

                                dark:border-white dark:text-white
                                dark:hover:bg-white dark:hover:text-black
                            "
                        >
                            View Cart
                        </Link>

                        <Link
                            to="/checkout"
                            onClick={onClose}
                            className="
                                flex-1 rounded-full bg-black
                                py-3 text-center text-sm font-medium
                                text-white transition hover:opacity-80

                                dark:bg-white dark:text-black
                            "
                        >
                            Checkout
                        </Link>
                    </div>
                </div>
            }
        >
            {cartItems.length === 0 ? (
                <p className="text-zinc-500 dark:text-zinc-400">
                    Your cart is empty.
                </p>
            ) : (
                <ul className="space-y-4">
                    {cartItems.map((item) => (
                        <li key={item.id} className="flex gap-4">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="h-20 w-20 rounded-xl object-cover"
                            />
                            <div className="flex flex-1 flex-col justify-between">
                                <p className="text-sm font-medium text-black dark:text-white">
                                    {item.name}
                                </p>
                                <p className="text-sm text-zinc-500">
                                    x{item.quantity}
                                </p>
                                <p className="text-sm font-semibold text-black dark:text-white">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </CommonSidebar>
    );
}