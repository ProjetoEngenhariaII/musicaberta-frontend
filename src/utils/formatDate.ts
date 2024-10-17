export function formatRelativeDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const secondsDifference = Math.floor((now.getTime() - date.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });

  if (secondsDifference < 60) {
    return rtf.format(-secondsDifference, "second");
  } else if (secondsDifference < 3600) {
    const minutes = Math.floor(secondsDifference / 60);
    return rtf.format(-minutes, "minute");
  } else if (secondsDifference < 86400) {
    const hours = Math.floor(secondsDifference / 3600);
    return rtf.format(-hours, "hour");
  } else if (secondsDifference < 2592000) {
    const days = Math.floor(secondsDifference / 86400);
    return rtf.format(-days, "day");
  } else if (secondsDifference < 31536000) {
    const months = Math.floor(secondsDifference / 2592000);
    return rtf.format(-months, "month");
  } else {
    const years = Math.floor(secondsDifference / 31536000);
    return rtf.format(-years, "year");
  }
}
