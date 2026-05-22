import OrderSectionCard from "../common/OrderSectionCard";
import OrderSectionTitle from "../common/OrderSectionTitle";


export default function ShippingInfoCard({
    order
}) {
    return (
        <OrderSectionCard>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                <div>
                    <OrderSectionTitle>
                        Shipping Address
                    </OrderSectionTitle>

                    <p className='text-sm font-medium text-black dark:text-white'>
                        {order.recipientName}
                    </p>

                    <p className='mt-1 text-sm text-zinc-500 dark:text-zinc-400'>
                        {order.shippingAddress}
                    </p>

                    <p className='text-sm text-zinc-500 dark:text-zinc-400'>
                        {order.recipientPhone}
                    </p>
                </div>

                <div>
                    <OrderSectionTitle>
                        Shipping Method
                    </OrderSectionTitle>

                    <p className='text-sm font-medium text-black dark:text-white'>
                        Standard Curbside Delivery
                    </p>

                    <p className='mt-1 text-sm text-zinc-500 dark:text-zinc-400'>
                        Delivered via Nova Logistics
                    </p>
                </div>

                {order.note && (
                    <div className='sm:col-span-2'>
                        <OrderSectionTitle>
                            Note
                        </OrderSectionTitle>

                        <p className='text-sm text-zinc-500 dark:text-zinc-400'>
                            {order.note}
                        </p>
                    </div>
                )}
            </div>
        </OrderSectionCard>
    );
}