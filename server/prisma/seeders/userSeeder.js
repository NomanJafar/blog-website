const { Roles } = require("@prisma/client");
const generateRandomHTMLContent = require("../../utils/generateRandomHTMLContent");


const userSeeder = async (prisma) => {
    const user = await prisma.users.upsert({
        where: { email: 'noman@abc.com' },
        update: {},
        create: {
            username: 'Noman Jafar',
            email: 'noman@abc.com',
            password: await bcrypt.hash('123456', 10),
            role: Roles.ADMIN,
            posts: {
                create: {
                    title: 'how to be a super admin',
                    content: generateRandomHTMLContent(),
                },
            },
        },
    });
    console.log('SuperAdmin created successfully', user);

    for (let i = 0; i < 50; i++) {
        const user = await prisma.users.upsert({
            where: { email: `user${i}@gmail.com` },
            update: {},
            create: {
                username: `user ${i}`,
                email: `user${i}@gmail.com`,
                password: await bcrypt.hash(`user${i}`, 10),
                role: Roles.USER,
                posts: {
                    create: Array.from({ length: 3 }, (_, index) => ({
                        title: `user ${i} post ${index + 1}`,
                        content: generateRandomHTMLContent(),
                    })),
                },
            },
        });
        console.log(`user created successfully  user: ${i}`, user);
    }
};

module.exports = userSeeder;
