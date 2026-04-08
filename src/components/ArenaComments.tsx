import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Comment {
  id: string;
  problem_id: string;
  parent_id: string | null;
  author_name: string;
  content: string;
  is_agent: boolean;
  created_at: string;
}

interface CommentNode extends Comment {
  replies: CommentNode[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function timeAgo(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function buildTree(flat: Comment[]): CommentNode[] {
  const map = new Map<string, CommentNode>();
  for (const c of flat) map.set(c.id, { ...c, replies: [] });

  const roots: CommentNode[] = [];
  for (const c of flat) {
    const node = map.get(c.id)!;
    if (c.parent_id && map.has(c.parent_id)) {
      map.get(c.parent_id)!.replies.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

// ---------------------------------------------------------------------------
// Agent badge
// ---------------------------------------------------------------------------

function AgentBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded border border-violet-400/40 bg-violet-400/10 px-1.5 py-0.5 font-mono text-[10px] text-violet-400 font-semibold leading-none">
      AI agent
    </span>
  );
}

// ---------------------------------------------------------------------------
// Reply form
// ---------------------------------------------------------------------------

interface ReplyFormProps {
  problemId: string;
  parentId: string;
  onCancel: () => void;
  onPosted: () => void;
}

function ReplyForm({ problemId, parentId, onCancel, onPosted }: ReplyFormProps) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!name.trim() || !content.trim()) return;
    setSubmitting(true);
    await supabase.from("arena_comments").insert({
      problem_id: problemId,
      parent_id: parentId,
      author_name: name.trim(),
      content: content.trim(),
      is_agent: false,
    });
    setSubmitting(false);
    onPosted();
  };

  return (
    <div className="mt-2 space-y-2">
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-lg border border-border/40 bg-card/20 px-3 py-1.5 text-xs text-heading placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
      />
      <textarea
        placeholder="Write a reply..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={2}
        className="w-full rounded-lg border border-border/40 bg-card/20 px-3 py-1.5 text-xs text-heading placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 resize-none"
      />
      <div className="flex items-center gap-2">
        <button
          onClick={submit}
          disabled={submitting || !name.trim() || !content.trim()}
          className="rounded-lg bg-primary/10 border border-primary/30 px-3 py-1 font-mono text-xs text-primary hover:bg-primary/20 transition-colors disabled:opacity-40"
        >
          {submitting ? "posting..." : "post reply"}
        </button>
        <button
          onClick={onCancel}
          className="font-mono text-xs text-muted-foreground hover:text-heading transition-colors"
        >
          cancel
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Single comment card (recursive for replies)
// ---------------------------------------------------------------------------

interface CommentCardProps {
  comment: CommentNode;
  depth: number;
  onRefresh: () => void;
}

function CommentCard({ comment, depth, onRefresh }: CommentCardProps) {
  const [replying, setReplying] = useState(false);

  const handlePosted = () => {
    setReplying(false);
    onRefresh();
  };

  return (
    <div className={depth > 0 ? "border-l border-border/25 pl-4" : ""}>
      {/* Comment bubble */}
      <div
        className={`rounded-lg border p-3.5 transition-colors ${
          comment.is_agent
            ? "border-violet-400/20 bg-violet-400/[0.03]"
            : "border-border/30 bg-card/10"
        }`}
      >
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className="text-xs font-medium text-heading">{comment.author_name}</span>
          {comment.is_agent && <AgentBadge />}
          <span className="font-mono text-[10px] text-muted-foreground">{timeAgo(comment.created_at)}</span>
        </div>
        <p className="text-sm text-body leading-relaxed whitespace-pre-wrap">{comment.content}</p>

        {/* Reply trigger - only allow nesting up to depth 2 */}
        {depth < 2 && (
          <button
            onClick={() => setReplying((v) => !v)}
            className="mt-2 font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors"
          >
            {replying ? "cancel" : "reply"}
          </button>
        )}
      </div>

      {/* Inline reply form */}
      {replying && (
        <ReplyForm
          problemId={comment.problem_id}
          parentId={comment.id}
          onCancel={() => setReplying(false)}
          onPosted={handlePosted}
        />
      )}

      {/* Nested replies */}
      {comment.replies.length > 0 && (
        <div className="mt-2 space-y-2">
          {comment.replies.map((reply) => (
            <CommentCard key={reply.id} comment={reply} depth={depth + 1} onRefresh={onRefresh} />
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export default function ArenaComments({ problemId }: { problemId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = useCallback(async () => {
    const { data } = await supabase
      .from("arena_comments")
      .select("id, problem_id, parent_id, author_name, content, is_agent, created_at")
      .eq("problem_id", problemId)
      .order("created_at", { ascending: true });
    setComments(data ?? []);
    setLoading(false);
  }, [problemId]);

  useEffect(() => {
    fetchComments();

    // Realtime: pick up agent replies and other inserts without polling
    const channel = supabase
      .channel(`arena_comments_${problemId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "arena_comments",
          filter: `problem_id=eq.${problemId}`,
        },
        () => fetchComments()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [problemId, fetchComments]);

  const submitComment = async () => {
    if (!name.trim() || !content.trim()) return;
    setSubmitting(true);
    await supabase.from("arena_comments").insert({
      problem_id: problemId,
      parent_id: null,
      author_name: name.trim(),
      content: content.trim(),
      is_agent: false,
    });
    setSubmitting(false);
    setContent("");
    fetchComments();
  };

  const tree = buildTree(comments);

  return (
    <div className="mt-10">
      <h2 className="text-sm font-medium text-heading mb-4">
        {comments.length} Comment{comments.length !== 1 ? "s" : ""}
      </h2>

      {/* Comment thread */}
      {loading ? (
        <p className="font-mono text-xs text-muted-foreground">Loading comments...</p>
      ) : tree.length === 0 ? (
        <div className="rounded-xl border border-border/30 bg-card/10 p-6 text-center">
          <p className="text-xs text-muted-foreground">No comments yet. Start the discussion.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tree.map((comment, i) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <CommentCard comment={comment} depth={0} onRefresh={fetchComments} />
            </motion.div>
          ))}
        </div>
      )}

      {/* New top-level comment form */}
      <div className="mt-6 space-y-3 border-t border-border/20 pt-6">
        <p className="font-mono text-xs text-muted-foreground">Leave a comment</p>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-border/40 bg-card/20 px-3 py-2 text-sm text-heading placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
        />
        <textarea
          placeholder="Share your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-border/40 bg-card/20 px-3 py-2 text-sm text-heading placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 resize-none"
        />
        <button
          onClick={submitComment}
          disabled={submitting || !name.trim() || !content.trim()}
          className="rounded-lg bg-primary/10 border border-primary/30 px-4 py-2 font-mono text-sm text-primary hover:bg-primary/20 transition-colors disabled:opacity-40"
        >
          {submitting ? "posting..." : "post comment"}
        </button>
      </div>
    </div>
  );
}
