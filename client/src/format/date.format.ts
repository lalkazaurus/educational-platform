export const formatDate = (dateValue: string | Date) => {
    const date = new Date(dateValue);
    return new Intl.DateTimeFormat("uk-UA", {
      day: "2-digit",
      month: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
};