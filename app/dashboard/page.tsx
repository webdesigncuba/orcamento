'use client'
import { SectionCards } from "@/components/section-card";
import { useEffect } from "react";

export default function DashBoardPage(){
     useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(localStorage);
        if (!token) {
            window.location.href = '/login';
        }
    }), [];

    return(
        <div className="flex flex-col min-h-screen bg-gray-100">
           <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <SectionCards />
                    </div>
                </div>
            </div>
        </div>
    )
}
