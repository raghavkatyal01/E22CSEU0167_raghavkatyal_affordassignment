import { useEffect, useState, useContext } from "react";
import { fetchUsers, fetchPosts } from "../api/socialmediaApi";
import { AuthContext } from "../context/AuthContext";

interface User {
    id: string;
    name: string;
    postCount: number;
}

const TopUsers = () => {
    const { token } = useContext(AuthContext);
    const [topUsers, setTopUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTopUsers = async () => {
            if (!token) return;

            try {
                const usersResponse = await fetchUsers(token);
                const postsResponse = await fetchPosts(token);

                console.log("Users API Response:", usersResponse);
                console.log("Posts API Response:", postsResponse);

                const users: User[] = Object.entries(usersResponse.users || {}).map(([id, name]) => ({
                    id,
                    name: name as string,
                    postCount: 0, 
                }))
                const postCounts: Record<string, number> = {};
                postsResponse.posts.forEach((post: { userid: string }) => {
                    postCounts[post.userid] = (postCounts[post.userid] || 0) + 1;
                });


                const usersWithPostCounts = users.map((user) => ({
                    ...user,
                    postCount: postCounts[user.id] || 0,
                }));

                const sortedUsers = usersWithPostCounts
                    .sort((a, b) => b.postCount - a.postCount)
                    .slice(0, 5);

                setTopUsers(sortedUsers);
            } catch (error) {
                console.error("Error fetching top users:", error);
            } finally {
                setLoading(false);
            }
        };

        getTopUsers();
    }, [token]);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">🔥 Top 5 Users</h1>

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : (
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <ul>
                        {topUsers.map((user, index) => (
                            <li key={user.id} className="border-b py-4 flex justify-between items-center">
                                <span className="text-lg font-semibold">
                                    {index + 1}. {user.name}
                                </span>
                                <span className="text-blue-600 font-medium">{user.postCount} Posts</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TopUsers;
