export default function getUserPfp(username: string) {
    return `https://api.dicebear.com/7.x/adventurer-neutral/png?seed=${username}`;
}
