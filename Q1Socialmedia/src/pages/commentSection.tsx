import { useEffect, useState } from "react";
import { fetchComments } from "../api/socialmediaApi";

interface Comment {
  id: string;
  postid: string;
  content: string;
}

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await fetchComments(postId);
        setComments(response.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    getComments();
  }, [postId]);

  return (
    <div className="mt-4 p-4 border rounded bg-gray-50">
      <h3 className="text-lg font-semibold mb-2">💬 Comments</h3>

      {loading ? (
        <p className="text-gray-500">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-500">No comments available.</p>
      ) : (
        <ul className="space-y-2">
          {comments.map((comment) => (
            <li key={comment.id} className="p-2 bg-white shadow-sm rounded">
              {comment.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentSection;
