export default function() {
    let uuid = `${Math.floor(Math.random() * 10000000000)}`;

    return { uuid };
}