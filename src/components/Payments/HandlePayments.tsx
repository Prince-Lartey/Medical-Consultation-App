"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import type { usePaystackPayment as PaystackHookType } from 'react-paystack';

export interface ConfigProps {
    reference: string;
    email: string;
    amount: number;
    publicKey: string;
    currency: string;
}

const HandlePayments = ({transactionConfig}: {transactionConfig: ConfigProps}) => {
    const [isClient, setIsClient] = useState(false);
    const [PaystackButton, setPaystackButton] = useState<typeof PaystackHookType | null>(null);
    
    useEffect(() => {
        setIsClient(true);
        // Import the Paystack hook dynamically only on the client side
        const importPaystack = async () => {
        const { usePaystackPayment } = await import('react-paystack');
        setPaystackButton(() => usePaystackPayment);
        };
        
        importPaystack();
    }, []);

    const handlePayment = () => {
        if (!PaystackButton) return;

        const onSuccess = (reference: any) => {
            console.log(reference);
        };

        const onClose = () => {
            console.log('closed');
        };

        const initializePayment = PaystackButton(transactionConfig);
        initializePayment({ onSuccess, onClose });
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            {isClient && (
                <Button onClick={handlePayment} disabled={!PaystackButton}>
                    Pay
                </Button>
            )}
        </div>
    );
};

export default HandlePayments;