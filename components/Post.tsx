import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div  className="font-sans px-8 " onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2 className="mt-8 ">{post.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown className="mt-8 "children={post.content} />
      <style jsx>{`
        div {
       
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Post;
