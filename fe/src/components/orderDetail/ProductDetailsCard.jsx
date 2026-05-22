import OrderSectionCard from "../common/OrderSectionCard";
import OrderSectionTitle from "../common/OrderSectionTitle";
import OrderProductItem from "./OrderProductItem";


export default function ProductDetailsCard({
    items
}) {
    return (
        <OrderSectionCard>
            <OrderSectionTitle>
                Product Details
            </OrderSectionTitle>

            <div className='flex flex-col gap-4'>
                {items?.map((item) => (
                    <OrderProductItem
                        key={item.id}
                        item={item}
                    />
                ))}
            </div>
        </OrderSectionCard>
    );
}