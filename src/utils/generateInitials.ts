export function generateInitials(name: string | null | undefined): string {
    if(name) {
        const nameParts = name.split(' ');
        const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join('');
        return initials.length > 2 ? initials.slice(0, 2) : initials;
    } else {
        return "AB"
    }
}