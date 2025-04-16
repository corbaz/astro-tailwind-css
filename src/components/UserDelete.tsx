import React, { useEffect, useCallback } from "react";

interface UserDeleteProps {
    userId?: string;
}

const UserDelete: React.FC<UserDeleteProps> = ({ userId }) => {
    const getUserId = useCallback(() => {
        if (userId) return userId;
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("id") || "";
    }, [userId]);

    useEffect(() => {
        const deleteUser = async () => {
            const id = getUserId();
            if (id) {
                try {
                    await fetch(`/api/users/${id}`, { method: "DELETE" });
                } finally {
                    if (window.refreshUserList) {
                        window.refreshUserList();
                    }
                }
            }
            window.location.href = "/create";
        };
        deleteUser();
    }, [getUserId]);

    return null;
};

export default UserDelete;
