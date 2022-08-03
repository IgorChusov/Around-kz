class EnvConfig {
  public static get apiUrl (): string {
    return String(process.env.REACT_APP_API_URL).trim()
  }

  public static get apiKey (): string {
    return String(process.env.REACT_APP_API_KEY).trim()
  }

  public static get keyYand (): string {
    return String(process.env.REACT_APP_YND_KEY).trim()
  }
}

export default EnvConfig
