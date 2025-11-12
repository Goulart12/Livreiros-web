import moment from 'moment/moment'

export class DateTimeService {
  static formatDate(date: string): void | string {
    const dateFormat = new Intl.DateTimeFormat('pt-br', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).format(new Date(date))

    return dateFormat
      .replace(/\./g, '')
      .replace(/\s+de\s+/g, ' ')
      .trim()
  }

  static formatTime(date: string): string {
    return new Intl.DateTimeFormat('pt-br', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(new Date(date))
  }
}
