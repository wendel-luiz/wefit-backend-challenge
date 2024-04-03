import { app } from "./config/di-container"

void app
  .start()
  .catch((err) =>
    console.error("An error has occured while running the app: ", err)
  )
