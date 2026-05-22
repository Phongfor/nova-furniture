import { FiCheck } from 'react-icons/fi';
import { ORDER_STATUS_CONFIG } from '../orders/orderStatusConfig';
import { ORDER_STEPS } from '../orders/orderConstants';

export default function OrderTracker({
    status
}) {
    if (status === 'CANCELLED') {
        return (
            <div className='rounded-xl border border-red-200 bg-red-50 px-6 py-4 dark:border-red-900/30 dark:bg-red-950/20'>
                <p className='text-sm font-medium text-red-600 dark:text-red-400'>
                    This order has been cancelled.
                </p>
            </div>
        );
    }

    const currentIdx =
        ORDER_STEPS.indexOf(status);

    return (
        <div className='flex items-center gap-0'>
            {ORDER_STEPS.map((step, i) => {
                const done = i <= currentIdx;

                const isLast =
                    i === ORDER_STEPS.length - 1;

                return (
                    <div
                        key={step}
                        className='flex flex-1 items-center'
                    >
                        <div className='flex flex-col items-center gap-2'>
                            <div
                                className={`
                                    flex h-7 w-7 items-center justify-center rounded-full border-2 transition
                                    ${
                                        done
                                            ? 'border-black bg-black dark:border-white dark:bg-white'
                                            : 'border-zinc-300 dark:border-zinc-700'
                                    }
                                `}
                            >
                                {done && (
                                    <FiCheck
                                        size={12}
                                        className='text-white dark:text-black'
                                    />
                                )}
                            </div>

                            <p
                                className={`
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-widest
                                    whitespace-nowrap
                                    ${
                                        done
                                            ? 'text-black dark:text-white'
                                            : 'text-zinc-400'
                                    }
                                `}
                            >
                                {
                                    ORDER_STATUS_CONFIG[
                                        step
                                    ]?.label
                                }
                            </p>
                        </div>

                        {!isLast && (
                            <div
                                className={`
                                    flex-1 h-px mx-2 mb-5
                                    ${
                                        i < currentIdx
                                            ? 'bg-black dark:bg-white'
                                            : 'bg-zinc-200 dark:bg-zinc-800'
                                    }
                                `}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}