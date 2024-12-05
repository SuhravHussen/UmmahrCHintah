const mockedBlogs = [
  {
    id: '1',
    originalPostLink: 'https://example.com/blog/1',
    title: 'Blog 1',
    content: { text: 'Content 1', richText: 'Rich Content 1' },
    dateWritten: new Date('2023-01-01'),
    keywords: ['test'],
    authorId: 'author1',
    totalViews: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
    readingTime: '5 MIN',
    author: {
      id: 'author1',
      name: 'Test Author',
      image: '',
    },
  },
  {
    id: '2',
    title: 'Blog 2',
    originalPostLink: 'https://example.com/blog/2',
    content: { text: 'Content 2', richText: 'Rich Content 2' },
    dateWritten: new Date('2023-01-02'),
    keywords: ['test'],
    authorId: 'author1',
    totalViews: 200,
    createdAt: new Date(),
    updatedAt: new Date(),
    readingTime: '5 MIN',
    author: {
      id: 'author1',
      name: 'Test Author',
      image: '',
    },
  },
];

export default mockedBlogs;
