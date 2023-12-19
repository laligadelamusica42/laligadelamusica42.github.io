"use client"
import { useSession, signOut, SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";

const Dashboard = () => {
    const [sessionData, setSession] = useState(null);
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            setSession(session);
        }
    }, [session]);

    if (!sessionData) {
        return <div>User need's to be signed in</div>;
    }

    return (
        <div>
            <h1 className="text-4xl font-bold text-white">Dashboard</h1>
            <p>Signed in as: {session.user.name}</p>
            <img src={`${session.user.image}`} alt={session.user.email} />
        </div>
    );
};

export default Dashboard;