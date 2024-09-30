import moment from "moment";

export function getPostDate(frontmatter: Record<string, any>): Date {
    return new Date(frontmatter.date || frontmatter.pubDate);
}

export function formatDate(date: Date, format: string) {
    return moment(date).format(format);
}
