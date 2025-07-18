const prisma = require('./client');
const bcrypt = require('bcryptjs');

const sampleData = async () => {
  try {
    await prisma.user.deleteMany();
    await prisma.post.deleteMany();

    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: await bcrypt.hash('secureAdminPassword123', 10), // In a real app, hash this!
        role: 'ADMIN',
      },
    });

    const regularUser1 = await prisma.user.create({
      data: {
        email: 'user1@example.com',
        password: await bcrypt.hash('userPassword123', 10), // In a real app, hash this!
        role: 'USER',
      },
    });

    const regularUser2 = await prisma.user.create({
      data: {
        email: 'user2@example.com',
        password: await bcrypt.hash('anotherUserPassword', 10), // In a real app, hash this!
        role: 'USER',
      },
    });

    console.log('Users created:', { adminUser, regularUser1, regularUser2 });

    // 2. Create Posts (only by the admin user)
    const post1 = await prisma.post.create({
      data: {
        title: 'My First Blog Post',
        content: Buffer.from('This is the exciting content of my very first blog post!'),
        published: true,
        userId: adminUser.id,
      },
    });

    const post2 = await prisma.post.create({
      data: {
        title: 'An Admin-Only Article',
        content: Buffer.from('Only admins can create articles like this one.'),
        published: false, // This post is not yet published
        userId: adminUser.id,
      },
    });

    console.log('Posts created:', { post1, post2 });

    // 3. Create Comments
    const comment1 = await prisma.comment.create({
      data: {
        content: 'Great post, I really enjoyed reading it!',
        userId: regularUser1.id,
        postId: post1.id,
      },
    });

    const comment2 = await prisma.comment.create({
      data: {
        content: 'I have a question about this topic.',
        userId: regularUser2.id,
        postId: post1.id,
      },
    });

    const comment3 = await prisma.comment.create({
      data: {
        content: 'Interesting points!',
        userId: adminUser.id,
        postId: post1.id,
      },
    });

    console.log('Comments created:', { comment1, comment2, comment3 });

    console.log('Sample data population complete!');
  } catch (error) {
    console.error('Error populating data:', error);
  } finally {
    await prisma.$disconnect(); // Uncomment if running as a standalone script
  }
};

// Call the function to execute
sampleData();