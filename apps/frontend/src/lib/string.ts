export const SafeString = (text: string) => text.replaceAll(/\d|\./gu, "").trim().replaceAll(" ", "-").toLowerCase()
