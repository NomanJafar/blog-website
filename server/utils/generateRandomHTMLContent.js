const { faker } = require('@faker-js/faker');

const generateRandomHTMLContent = () => {
    const tagOptions = ["p", "h1", "h2",];

    const getRandomTag = () => {
        const randomIndex = Math.floor(Math.random() * tagOptions.length);
        return tagOptions[randomIndex];
    };

    const content = Array.from({ length: 5 }, () => {
        const randomTag = getRandomTag();
        const randomContent = faker.lorem.sentence();
        return `<${randomTag}>${randomContent}</${randomTag}>`;
    });

    return content.join("");
};

module.exports = generateRandomHTMLContent;