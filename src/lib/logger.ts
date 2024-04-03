export class Logger {
  public static info(message: string): void {
    console.info(`INFO: ${new Date().toISOString()}: ${message}`)
  }

  public static warn(message: string): void {
    console.warn(`WARN: ${new Date().toISOString()}: ${message}`)
  }

  public static error(message: string): void {
    console.warn(`ERROR: ${new Date().toISOString()}: ${message}`)
  }

  public static fatal(message: string): void {
    console.warn(`FATAL: ${new Date().toISOString()}: ${message}`)
  }
}
