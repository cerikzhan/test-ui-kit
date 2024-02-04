export interface IAppConfig {
  colors: {
    primary: string;
    secondary: string;
  }
}

export function changeVariables() {
  fetch('../../../pro.config.json').then((response) => {
    return response.json()
  }).then((config: IAppConfig) => {
    const r = document.querySelector(':root')

    r.style.setProperty('--pro-primary', config.colors.primary)
    r.style.setProperty('--pro-secondary', config.colors.secondary)
  })

}
