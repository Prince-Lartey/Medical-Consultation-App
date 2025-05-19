import HandlePayments from '@/components/Payments/HandlePayments'
import React from 'react'

export default function page() {
    const config = {
        reference: (new Date()).getTime().toString(),
        email: "user@example.com",
        amount: 200,
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
        currency: "GHS",
    };

    return (
        <div>
            <HandlePayments transactionConfig={config}/>
        </div>
    )
}
