"use client"

import { Plus, X } from 'lucide-react';
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function ArrayInput({setItems, items = [], itemTitle,} : {setItems: any, items: string[], itemTitle: string}) {
    const [item, setItem] = useState("");
    const [showTagForm, setShowTagForm] = useState(false);

    function addItem () {
        if (!item) return;
        setItems([...items, item]);
        setItem("");
    }

    function removeItem(index: any) {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    }

    return (
        <div className="sm:col-span-2 col-span-full">
            {
                showTagForm ? (
                    <div className="flex items-center">
                        <div className="relative w-full">
                            <Input
                                type="text"
                                placeholder={`${itemTitle}`}
                                value={item}
                                onChange={(e) => setItem(e.target.value)}
                            />
                        </div>
                        <Button
                            className="ml-2"
                            onClick={addItem}
                        >
                            <Plus className="w-4 h-4 me-2" />
                            Add
                        </Button>
                        <button
                            className="ml-3 shrink-0 w-8 h-8 bg-red-400 rounded-full flex items-center justify-center"
                            onClick={() => setShowTagForm(false)}
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <button
                        className="flex items-center space-x-2 text-slate-800 dark:text-slate-300 py-2 px-4"
                        onClick={() => setShowTagForm(true)}
                    >
                        <Plus />
                        <span>{itemTitle}</span>
                    </button>
                )
            }
            <div className="flex flex-wrap gap-4 mt-4">
                {
                    items.map((item, index) => {
                        return (
                            <div key={index} className="bg-slate-200 flex space-x-2 items-center dark:bg-slate-600 px-4 py-2 rounded-lg cursor-pointer " onClick={() => removeItem(index)}>
                                <span className="text-sm">{item}</span>
                                <X className="w-4 h-4 ms-2" />
                            </div>
                        )
                    })
                }
            </div>
            
        </div>
    )
}
