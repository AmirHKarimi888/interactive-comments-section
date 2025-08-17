export default function () {
    function formatDateAgo(dateString) {
        // Normalize date string
        const [year, month, day] = dateString.split("-").map(p => p.trim());
        const date = new Date(year, month - 1, day);
        const now = new Date();

        // Difference in ms
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Yesterday";
        if (diffDays < 30) return `${diffDays} days ago`;
        if (diffDays < 365) {
            const months = Math.floor(diffDays / 30);
            return `${months} month${months > 1 ? "s" : ""} ago`;
        }
        const years = Math.floor(diffDays / 365);
        return `${years} year${years > 1 ? "s" : ""} ago`;
    }

    return { formatDateAgo };
}