export default function (name) {
    const generateRandomColor = () => {
        const hex = Math.floor(Math.random() * 0xffffff).toString(16);
        return `${hex.padStart(6, '0')}`;
    }

    let avatarUrl = new URL("https://ui-avatars.com/api/");
    avatarUrl.searchParams.set("name", name);
    avatarUrl.searchParams.set("background", generateRandomColor());
    avatarUrl.searchParams.set("color", "fff");

    return { avatarUrl };
}