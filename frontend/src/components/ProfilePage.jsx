import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProfilePage() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        favorite_category: "",
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setUser(data));
    }, []);

    // Handle input changes
    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    // Save updates
    async function saveChanges() {
        const token = localStorage.getItem("token");

        const res = await fetch("/api/auth/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(user),
        });

        const data = await res.json();

        if (res.ok) {
            alert("Profile updated successfully!");
            setUser(data);
            setIsEditing(false);
        } else {
            alert(data.error || "Could not update profile.");
        }
    }

    return (
        
        <div className="profile-page">
            <div>
            <Link to="/" className="nav-link">
                <button className="nav-link">Back to HomePage</button>
            </Link>
            </div>
            <h1>Your Profile</h1>
            <p><strong>Username:</strong></p>
            {isEditing ? (
                <input
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                />
            ) : (
                <p>{user.username}</p>
            )}

            <p><strong>Email:</strong></p>
            {isEditing ? (
                <input
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                />
            ) : (
                <p>{user.email}</p>
            )}

            <p><strong>Favorite Category:</strong></p>
            {isEditing ? (
                <input
                    name="favorite_category"
                    value={user.favorite_category}
                    onChange={handleChange}
                />
            ) : (
                <p>{user.favorite_category}</p>
            )}

            {!isEditing ? (
                <button onClick={() => setIsEditing(true)}>Edit Profile</button>
            ) : (
                <button onClick={saveChanges}>Save</button>
            )}
        </div>
    );
}

export default ProfilePage;
