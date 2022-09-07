import { App } from 'vue'
import registerEle from './registerEle'
import registerFormatTime from './FormmatTime'
export function globalRegister(app: App) {
  registerEle(app)
  registerFormatTime(app)
}
