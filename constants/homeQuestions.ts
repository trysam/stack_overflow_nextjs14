export const questions = [
  {
    title: "How to use TypeScript with React?",
    description: "I'm trying to integrate TypeScript with a React project.",
    tags: [
      { _id: 1, tag: "typescript" },
      { _id: 2, tag: "react" },
    ],
    author: { name: "John Doe", _id: "a1" },
    date: new Date("2023-06-15"),
    _id: "q1",
    avatarImage: "avatar1.jpg",
    avartarfallback: "default_avatar.jpg",
    answers: [
      {
        author: "Jane Smith",
        date: new Date("2023-06-16"),
        id: "a1",
        content:
          "You can start by installing TypeScript and configuring tsconfig.json.",
      },
    ],
    upvotes: 5,
    views: 100,
  },
  {
    title: "Best practices for REST API design?",
    description: "What are some best practices for designing RESTful APIs?",
    tags: [
      { _id: 3, tag: "api" },
      { _id: 4, tag: "rest" },
    ],
    author: { name: "Alice Brown", _id: "a2" },
    date: new Date("2023-06-10"),
    _id: "q2",
    avatarImage: "avatar2.jpg",
    avartarfallback: "default_avatar.jpg",
    answers: [
      {
        author: "Bob Green",
        date: new Date("2023-06-11"),
        id: "a2",
        content:
          "Use nouns for endpoints and make sure to use proper HTTP methods.",
      },
      {
        author: "Charlie White",
        date: new Date("2023-06-12"),
        id: "a3",
        content:
          "Consider versioning your API and providing detailed error messages.",
      },
    ],
    upvotes: 15,
    views: 300,
  },
  {
    title: "How to manage state in React?",
    description:
      "I'm looking for ways to effectively manage state in a large React application.",
    tags: [
      { _id: 5, tag: "react" },
      { _id: 6, tag: "state-management" },
    ],
    author: { name: "Emma Wilson", _id: "a3" },
    date: new Date("2023-06-01"),
    _id: "q3",
    avatarImage: "avatar3.jpg",
    avartarfallback: "default_avatar.jpg",
    answers: [],
    upvotes: 20,
    views: 500,
  },
  {
    title: "How to implement authentication in Node.js?",
    description:
      "What are the best methods for implementing authentication in a Node.js application?",
    tags: [
      { _id: 7, tag: "node.js" },
      { _id: 8, tag: "authentication" },
    ],
    author: { name: "David Clark", _id: "a4" },
    date: new Date("2023-05-20"),
    _id: "q4",
    avatarImage: "avatar4.jpg",
    avartarfallback: "default_avatar.jpg",
    answers: [
      {
        author: "Eva Martinez",
        date: new Date("2023-05-21"),
        id: "a4",
        content: "Consider using JWTs for stateless authentication.",
      },
      {
        author: "Frank Hall",
        date: new Date("2023-05-22"),
        id: "a5",
        content: "You can also use OAuth2 for third-party authentication.",
      },
    ],
    upvotes: 25,
    views: 400,
  },
  {
    title: "Understanding closures in JavaScript",
    description: "Can someone explain closures in JavaScript with examples?",
    tags: [
      { _id: 9, tag: "javascript" },
      { _id: 10, tag: "closures" },
    ],
    author: { name: "Grace Lee", _id: "a5" },
    date: new Date("2023-05-15"),
    _id: "q5",
    avatarImage: "avatar5.jpg",
    avartarfallback: "default_avatar.jpg",
    answers: [
      {
        author: "Hank Kim",
        date: new Date("2023-05-16"),
        id: "a6",
        content:
          "Closures are functions that retain access to their lexical scope even when the function is executed outside that scope.",
      },
    ],
    upvotes: 10,
    views: 250,
  },
  {
    title: "SQL vs NoSQL databases",
    description:
      "What are the key differences between SQL and NoSQL databases?",
    tags: [
      { _id: 11, tag: "sql" },
      { _id: 12, tag: "nosql" },
    ],
    author: { name: "Ivy Miller", _id: "a6" },
    date: new Date("2023-04-30"),
    _id: "q6",
    avatarImage: "avatar6.jpg",
    avartarfallback: "default_avatar.jpg",
    answers: [
      {
        author: "Jack Brown",
        date: new Date("2023-05-01"),
        id: "a7",
        content:
          "SQL databases are relational, while NoSQL databases are non-relational.",
      },
      {
        author: "Kara Wilson",
        date: new Date("2023-05-02"),
        id: "a8",
        content:
          "SQL databases use structured query language and are table-based, whereas NoSQL databases can be document-based, key-value pairs, graph databases, or wide-column stores.",
      },
    ],
    upvotes: 8,
    views: 180,
  },
  {
    title: "CSS Grid vs Flexbox",
    description: "When should I use CSS Grid and when should I use Flexbox?",
    tags: [
      { _id: 13, tag: "css" },
      { _id: 14, tag: "grid" },
    ],
    author: { name: "Liam Johnson", _id: "a7" },
    date: new Date("2023-04-20"),
    _id: "q7",
    avatarImage: "avatar7.jpg",
    avartarfallback: "default_avatar.jpg",
    answers: [
      {
        author: "Mia White",
        date: new Date("2023-04-21"),
        id: "a9",
        content: "Use Grid for 2D layouts and Flexbox for 1D layouts.",
      },
    ],
    upvotes: 12,
    views: 220,
  },
];
