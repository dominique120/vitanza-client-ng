export class Tools {


  static getDateTime(): string {
    const now = new Date();
    const offsetMs = now.getTimezoneOffset() * 60 * 1000;
    const dateLocal = new Date(now.getTime() - offsetMs);
    const str = dateLocal.toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");

    return str;
  }

  static getDate(): string {
    const now = new Date();
    const offsetMs = now.getTimezoneOffset() * 60 * 1000;
    const dateLocal = new Date(now.getTime() - offsetMs);
    const str = dateLocal.toISOString().slice(0, 10).replace(/-/g, "/").replace("T", " ");

    return str;
  }

  // needs more testing
  static getOffsetDate(offsetDays:number): string {
    const now = new Date();
    const offsetMs = offsetDays * 24 * 60 * 60 * 1000
    const dateLocal = new Date(now.getTime() - offsetMs);
    const str = dateLocal.toISOString().slice(0, 10).replace(/-/g, "/").replace("T", " ");

    return str;
  }

  static getOffsetDateTime(offsetDays:number): string {
    const now = new Date();
    const offsetMs = offsetDays * 24 * 60 * 60 * 1000
    const dateLocal = new Date(now.getTime() - offsetMs);
    const str = dateLocal.toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");

    return str;
  }
}
