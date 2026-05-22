// pages/client/CheckoutPage/components/ShippingForm.jsx

export default function ShippingForm({ form, onChange }) {
    return (
        <div>
            <SectionTitle number='01' title='Shipping Address' />

            <div className='mt-6 flex flex-col gap-6'>
                <Field
                    label='Full Name'
                    name='recipientName'
                    value={form.recipientName}
                    onChange={onChange}
                    placeholder='Julian Vandervilt'
                />
                <Field
                    label='Phone Number'
                    name='recipientPhone'
                    value={form.recipientPhone}
                    onChange={onChange}
                    placeholder='+1 (555) 000-0000'
                    type='tel'
                />
                <Field
                    label='Shipping Address'
                    name='shippingAddress'
                    value={form.shippingAddress}
                    onChange={onChange}
                    placeholder='123 Architecture Ave, New York, NY 10001'
                />
                <Field
                    label='Notes'
                    name='note'
                    value={form.note}
                    onChange={onChange}
                    placeholder='Delivery instructions or architectural considerations...'
                    multiline
                />
            </div>
        </div>
    );
}

function Field({ label, name, value, onChange, placeholder, type = 'text', multiline }) {
    const base = `
        w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800
        py-3 text-sm text-black dark:text-white
        placeholder:text-zinc-300 dark:placeholder:text-zinc-600
        outline-none focus:border-black dark:focus:border-white
        transition
    `;

    return (
        <div>
            <p className='mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400'>
                {label}
            </p>
            {multiline ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    rows={3}
                    className={`${base} resize-none`}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={base}
                />
            )}
        </div>
    );
}

export function SectionTitle({ number, title }) {
    return (
        <div className='flex items-center gap-4'>
            {number && (
                <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-xs font-medium text-zinc-400 dark:border-zinc-700'>
                    {number}
                </span>
            )}
            <h2 className='text-xl font-light tracking-tight text-black dark:text-white'>
                {title}
            </h2>
        </div>
    );
}